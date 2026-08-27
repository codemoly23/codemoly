#!/bin/bash
set -e

# ============================================
# CodeMoly - Optimized Deployment
# Zero-downtime with smart caching
#
# The live app keeps serving ./.next untouched for the whole build.
# The build goes into ./.next-build (via NEXT_DIST_DIR, see next.config.ts)
# and is swapped in atomically only after it succeeds.
# ============================================

# Set CI environment for non-interactive mode
export CI=true

# Raise open-file-descriptor limit. GitHub Actions (appleboy/ssh-action) runs this
# over a non-login SSH session where the soft nofile limit defaults to 1024, which
# starves Turbopack's CSS/PostCSS worker IPC and makes `next build` hang on
# app/globals.css ("timeout while receiving message from process / deadline has
# elapsed"). Hard limit is 1048576; 65536 is plenty for the build.
ulimit -n 65536 2>/dev/null || true
echo "[$(date '+%Y-%m-%d %H:%M:%S')] nofile limit (soft/hard): $(ulimit -Sn)/$(ulimit -Hn)"

APP_NAME="codemoly"
APP_DIR="/var/www/codemoly"
PORT=3020
BRANCH="main"
BUILD_DIR="$APP_DIR/.next-build"
LOCK_FILE="$APP_DIR/.deploy.lock"
# V8 heap cap for the build. Prevents the kernel OOM killer from silently reaping
# a Turbopack worker mid-IPC (which surfaces as the timeout above). Tune against
# the preflight `free -h` output; drop to 1536 if the box has <= 2 GB free.
NODE_MEM_MB=2048

# Telegram Config - set these as secrets on the server/CI environment, never hardcode
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN:-}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID:-}"

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
    if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
        return 0
    fi
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

# Best-effort evidence of the kernel OOM killer reaping a build worker.
oom_report() {
    {
        dmesg -T 2>/dev/null | grep -iE 'killed process|out of memory|oom' | tail -5
        journalctl -k --since "30 min ago" 2>/dev/null | grep -i 'oom' | tail -5
    } 2>/dev/null || true
}

fail_deploy() {
    local error_msg="$1"
    error "$error_msg"

    send_telegram "❌ <b>DEPLOY FAILED: $APP_NAME</b>

🔀 Branch: $BRANCH
❗ Error: $error_msg
✅ Action: Live app untouched, still serving previous build
🕐 Time: $(date '+%Y-%m-%d %H:%M:%S UTC')"

    exit 1
}

# NEXT_DIST_DIR and NODE_OPTIONS are set inline for the build command ONLY.
# Never export them: `pm2 restart --update-env` would propagate NEXT_DIST_DIR
# into the runtime and make the app serve a directory that no longer exists.
run_build() {
    local label="$1"
    log "Building application ($label)..."
    NEXT_DIST_DIR=.next-build NODE_OPTIONS="--max-old-space-size=${NODE_MEM_MB}" pnpm build
}

# ============================================
# Main Deployment
# ============================================

main() {
    cd "$APP_DIR"
    START_TIME=$(date +%s)

    # Refuse to run concurrently with another deploy on this box
    exec 200>"$LOCK_FILE"
    if ! flock -n 200; then
        error "Another deployment is already running (lock: $LOCK_FILE)"
        exit 1
    fi

    log "=========================================="
    log "Starting deployment for $APP_NAME"
    log "=========================================="

    # Cleanup leftovers from any previous killed/failed run
    rm -rf "$BUILD_DIR" "$APP_DIR/.next-old" "$APP_DIR/.next-cache-tmp" "$APP_DIR/.next-failed" 2>/dev/null || true

    # Preflight diagnostics (for tuning NODE_MEM_MB and spotting resource pressure)
    log "Preflight: memory / cpu / disk"
    free -h 2>/dev/null || true
    log "CPUs: $(nproc 2>/dev/null || echo '?')"
    df -h "$APP_DIR" 2>/dev/null || true

    # Save current lockfile hash
    OLD_LOCK_HASH=""
    if [ -f "$APP_DIR/.lockfile-hash" ]; then
        OLD_LOCK_HASH=$(cat "$APP_DIR/.lockfile-hash")
    fi

    # Step 1: Pull latest code
    log "Pulling latest code from $BRANCH..."
    if ! git pull origin "$BRANCH"; then
        fail_deploy "git pull failed"
    fi

    # Step 2: Check if dependencies changed
    NEW_LOCK_HASH=$(md5sum "$APP_DIR/pnpm-lock.yaml" 2>/dev/null | cut -d' ' -f1 || echo "none")

    if [ "$OLD_LOCK_HASH" != "$NEW_LOCK_HASH" ] || [ ! -d "$APP_DIR/node_modules" ]; then
        log "Dependencies changed, installing..."
        if ! pnpm install --frozen-lockfile --prefer-offline; then
            fail_deploy "pnpm install failed"
        fi
        echo "$NEW_LOCK_HASH" > "$APP_DIR/.lockfile-hash"
    else
        log "Dependencies unchanged, skipping install"
    fi

    # Step 3: Seed build cache by COPY - the live .next stays untouched and serving
    if [ -d "$APP_DIR/.next/cache" ]; then
        log "Seeding build cache from current build..."
        mkdir -p "$BUILD_DIR"
        cp -r "$APP_DIR/.next/cache" "$BUILD_DIR/cache" 2>/dev/null || true
    fi

    # Step 4: Build into .next-build; on failure retry once with a cold cache
    # (a cache written by a previously killed build can poison every rebuild)
    RETRY_NOTE=""
    if ! run_build "attempt 1, warm cache"; then
        error "Build attempt 1 failed - clearing cache and retrying once"
        OOM_INFO="$(oom_report)"
        [ -n "$OOM_INFO" ] && error "Possible OOM kills detected:"$'\n'"$OOM_INFO"
        free -h 2>/dev/null || true
        rm -rf "$BUILD_DIR"
        if ! run_build "attempt 2, cold cache"; then
            OOM_INFO="$(oom_report)"
            rm -rf "$BUILD_DIR"
            fail_deploy "pnpm build failed (both attempts). OOM evidence: ${OOM_INFO:-none found}"
        fi
        RETRY_NOTE="
⚠️ Succeeded only on cold-cache retry (cache corruption likely)"
    fi

    # Step 5: Atomic swap - the only moment the live dir is touched (~milliseconds)
    log "Swapping in new build..."
    mv "$APP_DIR/.next" "$APP_DIR/.next-old"
    mv "$BUILD_DIR" "$APP_DIR/.next"

    # Step 6: Restart PM2
    log "Restarting PM2..."
    PM2_HOME=/home/ubuntu/.pm2 pm2 restart "$APP_NAME" --update-env || PM2_HOME=/home/ubuntu/.pm2 pm2 start "$APP_DIR/ecosystem.config.js"
    PM2_HOME=/home/ubuntu/.pm2 pm2 save

    # Step 7: Health check; on failure roll back to the previous build
    sleep 3
    if ! health_check; then
        error "Health check failed - rolling back to previous build"
        mv "$APP_DIR/.next" "$APP_DIR/.next-failed"
        mv "$APP_DIR/.next-old" "$APP_DIR/.next"
        PM2_HOME=/home/ubuntu/.pm2 pm2 restart "$APP_NAME" --update-env || true
        PM2_HOME=/home/ubuntu/.pm2 pm2 save
        health_check || true

        send_telegram "❌ <b>DEPLOY FAILED: $APP_NAME</b>

🔀 Branch: $BRANCH
❗ Error: Health check failed after swap
✅ Action: Rolled back to previous build (bad build kept at .next-failed)
🕐 Time: $(date '+%Y-%m-%d %H:%M:%S UTC')"

        exit 1
    fi

    # Step 8: Cleanup
    log "Cleaning up..."
    rm -rf "$APP_DIR/.next-old" 2>/dev/null || true

    # Calculate deployment time
    END_TIME=$(date +%s)
    DEPLOY_TIME=$((END_TIME - START_TIME))

    # Step 9: Send success notification
    COMMIT=$(git rev-parse --short HEAD)
    send_telegram "✅ <b>DEPLOYED: $APP_NAME</b>

🔀 Branch: $BRANCH
📝 Commit: $COMMIT
⏱ Time: ${DEPLOY_TIME}s${RETRY_NOTE}
🕐 $(date '+%Y-%m-%d %H:%M:%S UTC')"

    log "=========================================="
    log "Deployment completed in ${DEPLOY_TIME} seconds!"
    log "=========================================="

    exit 0
}

# The whole body lives in main() so bash parses the entire file before executing
# anything - this script overwrites itself via `git pull` while running.
main "$@"
