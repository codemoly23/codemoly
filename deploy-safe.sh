#!/bin/bash
set -e

# ============================================
# CodeMoly - Optimized Deployment
# Zero-downtime with atomic folder swap
# ============================================

# Set CI environment for non-interactive mode
export CI=true

APP_NAME="codemoly"
APP_DIR="/var/www/codemoly"
PORT=3020
BRANCH="main"

# Telegram Config
TELEGRAM_BOT_TOKEN="8249121385:AAE2xwzRENwj3CG3SG96j3uWmvBVJtNh0Ss"
TELEGRAM_CHAT_ID="7337103477"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ============================================
# Functions
# ============================================

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

send_telegram() {
    local message="$1"
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -d chat_id="${TELEGRAM_CHAT_ID}" \
        -d text="$message" \
        -d parse_mode="HTML" > /dev/null 2>&1 || true
}

health_check() {
    local max_attempts=12
    local attempt=1

    log "Running health check on port $PORT..."

    while [ $attempt -le $max_attempts ]; do
        # Check if the app is responding (home page or any valid route)
        if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" | grep -qE "200|304"; then
            log "Health check passed!"
            return 0
        fi
        log "Health check attempt $attempt/$max_attempts failed, waiting..."
        sleep 3
        attempt=$((attempt + 1))
    done

    error "Health check failed after $max_attempts attempts"
    return 1
}

rollback() {
    local error_msg="$1"
    error "$error_msg"

    # Restore old build if exists
    if [ -d "$APP_DIR/.next-old" ]; then
        log "Restoring previous build..."
        rm -rf "$APP_DIR/.next" 2>/dev/null || true
        mv "$APP_DIR/.next-old" "$APP_DIR/.next"

        PM2_HOME=/home/ubuntu/.pm2 pm2 restart "$APP_NAME" --update-env || true
        PM2_HOME=/home/ubuntu/.pm2 pm2 save
        log "Rollback completed"
    fi

    # Send failure notification
    send_telegram "❌ <b>DEPLOY FAILED: $APP_NAME</b>

🔀 Branch: $BRANCH
❗ Error: $error_msg
✅ Action: Auto-rollback completed
🕐 Time: $(date '+%Y-%m-%d %H:%M:%S UTC')"

    exit 1
}

# ============================================
# Main Deployment
# ============================================

cd "$APP_DIR"

log "=========================================="
log "Starting deployment for $APP_NAME"
log "=========================================="

# Cleanup any previous failed deployment
rm -rf "$APP_DIR/.next-old" 2>/dev/null || true
rm -rf "$APP_DIR/.next-new" 2>/dev/null || true

# Step 1: Pull latest code
log "Pulling latest code from $BRANCH..."
if ! git pull origin "$BRANCH"; then
    rollback "git pull failed"
fi

# Step 2: Install dependencies
log "Installing dependencies..."
if ! pnpm install --frozen-lockfile; then
    rollback "pnpm install failed"
fi

# Step 3: Preserve old build (atomic rename - instant)
if [ -d "$APP_DIR/.next" ]; then
    log "Preserving current build..."
    mv "$APP_DIR/.next" "$APP_DIR/.next-old"
fi

# Step 4: Build application
log "Building application..."
if ! pnpm build; then
    # Build failed - restore old build
    if [ -d "$APP_DIR/.next-old" ]; then
        mv "$APP_DIR/.next-old" "$APP_DIR/.next"
    fi
    rollback "pnpm build failed"
fi

# Step 5: Restart PM2
log "Restarting PM2..."
PM2_HOME=/home/ubuntu/.pm2 pm2 restart "$APP_NAME" --update-env || PM2_HOME=/home/ubuntu/.pm2 pm2 start "$APP_DIR/ecosystem.config.js"
PM2_HOME=/home/ubuntu/.pm2 pm2 save

# Step 6: Health check
sleep 5
if ! health_check; then
    rollback "Health check failed - app not responding"
fi

# Step 7: Cleanup old build (only after success)
log "Cleaning up old build..."
rm -rf "$APP_DIR/.next-old" 2>/dev/null || true

# Step 8: Send success notification
COMMIT=$(git rev-parse --short HEAD)
send_telegram "✅ <b>DEPLOYED: $APP_NAME</b>

🔀 Branch: $BRANCH
📝 Commit: $COMMIT
🕐 Time: $(date '+%Y-%m-%d %H:%M:%S UTC')"

log "=========================================="
log "Deployment completed successfully!"
log "=========================================="

exit 0
