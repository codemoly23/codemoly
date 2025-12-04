# CodeMoly - AI Automation Company Website

A modern Next.js website with an integrated CMS admin panel for managing content.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.4.5 (App Router + Turbopack) |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion |
| **Database** | MySQL 8.0 |
| **ORM** | Prisma 6 |
| **Authentication** | NextAuth.js v5 (Credentials Provider) |
| **Rich Text Editor** | Sun Editor |
| **Icons** | Lucide React |
| **Language** | TypeScript |
| **Package Manager** | pnpm |

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create `.env.local` file (copy from `.env`):

```env
# Database (MySQL)
DATABASE_URL="mysql://username:password@localhost:3306/codemoly_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3002"
```

### 3. MySQL Installation

#### Windows

1. Download MySQL Installer from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
2. Run the installer and select "MySQL Server" + "MySQL Workbench"
3. Follow setup wizard, set root password
4. Add MySQL to PATH: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

#### macOS

```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Set root password
mysql_secure_installation
```

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### 4. Database Setup

```bash
# Create database in MySQL
mysql -u root -p
> CREATE DATABASE codemoly_db;
> exit;

# Run migrations
pnpm db:migrate

# Seed initial data
pnpm db:seed
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002) to see the website.

---

## Admin Panel

### Access URL

```
http://localhost:3002/admin
```

### Default Login Credentials

| Field | Value |
|-------|-------|
| **Email** | `admin@codemoly.com` |
| **Password** | Set in `prisma/seed.ts` |

> **Note**: Admin password is defined in the seed file. Check `prisma/seed.ts` for credentials.

### Admin Features

- Site Settings (Hero video, section texts)
- Services Management (AI Automation cards)
- Products Management (Product showcase)
- Events Management (Global events)
- Blog System (Categories + Posts)
- Media Library (Image uploads)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3002) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:seed` | Seed database with initial data |
| `pnpm db:studio` | Open Prisma Studio |

---

## Project Structure

```
codemoly/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   └── ...              # Public pages
├── components/
│   ├── admin/           # Admin components
│   ├── sections/        # Page sections
│   └── ui/              # UI components
├── lib/
│   ├── auth.ts          # NextAuth config
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
└── public/              # Static assets
```

---

## VPS Deployment Guide

Complete guide for deploying CodeMoly on a VPS (Ubuntu/Debian).

### Prerequisites

- Ubuntu 20.04+ or Debian 11+
- Node.js 18+ (via nvm)
- MySQL 8.0
- Nginx (as reverse proxy)
- PM2 (process manager)
- Git

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

### Step 2: Database Setup

```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE codemoly_db;
CREATE USER 'codemoly_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON codemoly_db.* TO 'codemoly_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Clone and Configure

```bash
# Clone repository
cd /var/www
git clone https://github.com/codemoly23/codemoly.git
cd codemoly

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
nano .env
```

**Production `.env` configuration:**

```env
# Database
DATABASE_URL="mysql://codemoly_user:your_strong_password@localhost:3306/codemoly_db"

# NextAuth (generate secret: openssl rand -base64 32)
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="https://codemoly.com"

# Node environment
NODE_ENV="production"
```

### Step 4: Database Migration & Seed

```bash
# Run Prisma migrations
pnpm db:migrate

# Seed initial data (creates admin user, default settings, services, products, events)
pnpm db:seed
```

> **Important**: The seed file (`prisma/seed.ts`) contains:
> - Admin user credentials
> - Default site settings
> - Initial services, products, and events
>
> Review and modify the seed file before running on production if needed.

### Step 5: Build and Start

```bash
# Build for production
pnpm build

# Start with PM2
pm2 start npm --name "codemoly" -- start
pm2 save
pm2 startup
```

### Step 6: Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/codemoly
```

```nginx
server {
    listen 80;
    server_name codemoly.com www.codemoly.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/codemoly /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d codemoly.com -d www.codemoly.com
```

### Useful PM2 Commands

| Command | Description |
|---------|-------------|
| `pm2 status` | Check app status |
| `pm2 logs codemoly` | View logs |
| `pm2 restart codemoly` | Restart app |
| `pm2 stop codemoly` | Stop app |
| `pm2 delete codemoly` | Remove app |

### Update Deployment

```bash
cd /var/www/codemoly
git pull origin main
pnpm install
pnpm db:migrate
pnpm build
pm2 restart codemoly
```

---

## License

Private - CodeMoly
