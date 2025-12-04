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

### 3. Database Setup

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

### 4. Run Development Server

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
| **Password** | `admin123` |

> **Important**: Change the password after first login!

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

## Deployment

For VPS deployment (same server as molyecom, molylearn):

1. Set production environment variables
2. Run `pnpm build`
3. Run `pnpm start` or use PM2

---

## License

Private - CodeMoly
