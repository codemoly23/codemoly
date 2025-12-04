# CodeMoly Admin Panel & CMS Implementation Plan

## Overview

এই ডকুমেন্টটি CodeMoly ওয়েবসাইটের জন্য একটি self-hosted CMS (Content Management System) এবং Admin Panel এর সম্পূর্ণ implementation plan।

---

## Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | Backend API (`/api/*`) - existing project এ integrated থাকবে |
| **MySQL** | Existing VPS database server (molyecom, molylearn এর সাথে shared) |
| **Prisma ORM** | Type-safe database access, migrations, schema management |
| **NextAuth.js** | Authentication (admin login) |
| **bcrypt** | Password hashing |

### Frontend (Admin Panel)
| Technology | Purpose |
|------------|---------|
| **Next.js App Router** | Admin pages under `/admin/*` |
| **Sun Editor** | Rich text editor (as specified) |
| **React Hook Form** | Form handling |
| **Zod** | Validation |
| **SWR/TanStack Query** | Data fetching & caching |

### File Storage
| Technology | Purpose |
|------------|---------|
| **Local File System** | `/public/uploads/` for images (self-hosted) |
| **Sharp** | Image optimization |

---

## Database Schema Design

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============ AUTHENTICATION ============
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  blogs     Blog[]
}

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
}

// ============ SITE SETTINGS ============
model SiteSettings {
  id              String   @id @default("main")
  heroVideoUrl    String   @default("https://www.youtube.com/embed/9s2ydfkRz2E")
  heroTitle       String?
  heroSubtitle    String?
  servicesTitle   String   @default("Intelligent Solutions for Every Business Need")
  servicesDesc    String   @default("Transform your operations with our comprehensive suite of AI-powered automation services...")
  updatedAt       DateTime @updatedAt
}

// ============ SERVICES (AI Automations) ============
model Service {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  icon        String   // Icon name from lucide-react
  gradient    String   // Tailwind gradient classes
  features    Json     // Array of feature strings
  stats       Json     // Object with key-value pairs
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ============ PRODUCTS ============
model Product {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  category    String
  image       String   // Path to uploaded image
  icon        String   // Icon name from lucide-react
  gradient    String   // Tailwind gradient classes
  stats       Json     // Object with key-value pairs
  features    Json     // Array of feature strings
  demoUrl     String?
  detailsSlug String   @unique // URL slug for details page
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Product details page content (rich text)
  detailsContent String? @db.Text
}

// ============ BLOG SYSTEM ============
model BlogCategory {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  blogs     Blog[]
}

model Blog {
  id          String       @id @default(cuid())
  title       String
  slug        String       @unique
  excerpt     String?      @db.Text
  content     String       @db.Text // Sun Editor HTML content
  coverImage  String?
  isPublished Boolean      @default(false)
  publishedAt DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  categoryId  String
  category    BlogCategory @relation(fields: [categoryId], references: [id])

  authorId    String
  author      Admin        @relation(fields: [authorId], references: [id])
}

// ============ EVENTS (Global Events Section) ============
model Event {
  id          String      @id @default(cuid())
  title       String
  subtitle    String?     // e.g., "In Paris"
  description String?     @db.Text
  mediaType   MediaType   @default(IMAGE) // IMAGE or VIDEO
  mediaUrl    String      // Image path or YouTube/Video URL
  thumbnail   String?     // Thumbnail for videos
  gradient    String      // Tailwind gradient classes for overlay
  eventDate   DateTime?   // When the event happened/will happen
  location    String?
  externalUrl String?     // Link to event page/details
  order       Int         @default(0)
  isActive    Boolean     @default(true)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum MediaType {
  IMAGE
  VIDEO
  YOUTUBE
}

// ============ EVENT SECTION SETTINGS ============
model EventSectionSettings {
  id              String   @id @default("main")
  sectionTitle    String   @default("Global Events")
  sectionDesc     String   @db.Text @default("Experience CodeMoly on the world stage...")
  displayMode     EventDisplayMode @default(GRID) // GRID or SLIDER
  autoSlideDelay  Int      @default(5000) // milliseconds, for slider mode
  updatedAt       DateTime @updatedAt
}

enum EventDisplayMode {
  GRID    // Show all events in grid (current design)
  SLIDER  // Show as carousel/slider when multiple events
}

// ============ MEDIA LIBRARY ============
model Media {
  id        String   @id @default(cuid())
  filename  String
  path      String
  mimeType  String
  size      Int
  alt       String?
  createdAt DateTime @default(now())
}
```

---

## Folder Structure

```
codemoly/
├── app/
│   ├── admin/                      # Admin Panel Pages
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/
│   │   │   └── page.tsx            # Admin login page
│   │   ├── settings/
│   │   │   └── page.tsx            # Site settings (video URL, texts)
│   │   ├── services/
│   │   │   ├── page.tsx            # Services list
│   │   │   ├── new/page.tsx        # Add new service
│   │   │   └── [id]/page.tsx       # Edit service
│   │   ├── products/
│   │   │   ├── page.tsx            # Products list
│   │   │   ├── new/page.tsx        # Add new product
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Edit product
│   │   │       └── details/page.tsx # Edit product details page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog posts list
│   │   │   ├── new/page.tsx        # Create blog post
│   │   │   ├── [id]/page.tsx       # Edit blog post
│   │   │   └── categories/
│   │   │       └── page.tsx        # Manage categories
│   │   ├── events/                 # Events Management
│   │   │   ├── page.tsx            # Events list
│   │   │   ├── new/page.tsx        # Add new event
│   │   │   ├── [id]/page.tsx       # Edit event
│   │   │   └── settings/page.tsx   # Event section settings
│   │   └── media/
│   │       └── page.tsx            # Media library
│   │
│   ├── api/                        # API Routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts        # NextAuth.js handler
│   │   ├── admin/
│   │   │   ├── settings/
│   │   │   │   └── route.ts        # GET/PUT site settings
│   │   │   ├── services/
│   │   │   │   ├── route.ts        # GET/POST services
│   │   │   │   └── [id]/route.ts   # GET/PUT/DELETE service
│   │   │   ├── products/
│   │   │   │   ├── route.ts        # GET/POST products
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts    # GET/PUT/DELETE product
│   │   │   │       └── details/route.ts # PUT product details
│   │   │   ├── blog/
│   │   │   │   ├── route.ts        # GET/POST blogs
│   │   │   │   ├── [id]/route.ts   # GET/PUT/DELETE blog
│   │   │   │   └── categories/
│   │   │   │       ├── route.ts    # GET/POST categories
│   │   │   │       └── [id]/route.ts # PUT/DELETE category
│   │   │   ├── events/
│   │   │   │   ├── route.ts        # GET/POST events
│   │   │   │   ├── [id]/route.ts   # GET/PUT/DELETE event
│   │   │   │   └── settings/route.ts # GET/PUT event section settings
│   │   │   └── media/
│   │   │       ├── route.ts        # GET/POST (upload)
│   │   │       └── [id]/route.ts   # DELETE
│   │   └── public/                 # Public API for frontend
│   │       ├── settings/route.ts
│   │       ├── services/route.ts
│   │       ├── products/route.ts
│   │       ├── events/route.ts     # Public events API
│   │       └── blog/route.ts
│   │
│   ├── blog/                       # Public blog pages
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/page.tsx         # Blog post
│   │
│   └── products/                   # Public product details
│       └── [slug]/page.tsx         # Product details page
│
├── components/
│   ├── admin/                      # Admin-specific components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── DataTable.tsx
│   │   ├── SunEditorWrapper.tsx    # Sun Editor component
│   │   ├── ImageUploader.tsx
│   │   ├── IconPicker.tsx          # Lucide icon selector
│   │   └── GradientPicker.tsx      # Tailwind gradient selector
│   └── ... (existing components)
│
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── auth.ts                     # NextAuth config
│   └── ... (existing utils)
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── seed.ts                     # Initial data seeding
│   └── migrations/                 # Database migrations
│
├── public/
│   └── uploads/                    # Uploaded media files
│       ├── products/
│       ├── blog/
│       └── general/
│
└── types/
    └── index.ts                    # TypeScript types
```

---

## Implementation Phases

### Phase 1: Foundation Setup ✅ COMPLETED
**Duration: Core infrastructure**

1. **Database Setup**
   - [x] Create new database in existing MySQL server: `CREATE DATABASE codemoly_db;` - **completed**
   - [x] Install Prisma: `pnpm add prisma @prisma/client` - **completed**
   - [x] Initialize Prisma: `npx prisma init` - **completed**
   - [x] Create schema.prisma with all models (MySQL provider) - **completed**
   - [x] Run migrations: `npx prisma db push` - **completed**
   - [x] Create seed script for initial admin user - **completed**

2. **Authentication Setup**
   - [x] Install NextAuth: `pnpm add next-auth bcryptjs` - **completed**
   - [x] Configure NextAuth with Credentials provider - **completed**
   - [x] Create login API route - **completed**
   - [x] Create login page UI - **completed**
   - [x] Add middleware for protected routes - **completed**

3. **Environment Variables** - **completed**
   ```env
   # .env (configured)
   DATABASE_URL="mysql://root:****@localhost:3306/codemoly_db"
   NEXTAUTH_SECRET="configured"
   NEXTAUTH_URL="http://localhost:3002"
   ```

4. **Additional Completed Items**
   - [x] Prisma client singleton (`lib/prisma.ts`) - **completed**
   - [x] Admin dashboard page (`app/admin/page.tsx`) - **completed**
   - [x] Admin dashboard component (`components/admin/AdminDashboard.tsx`) - **completed**
   - [x] Database seeded with initial data (admin user, settings, services, products, events) - **completed**
   - [x] Demo credentials button on login page - **completed**

**Admin Login Credentials:**
- URL: http://localhost:3002/admin/login
- Email: admin@codemoly.com
- Password: admin123

---

### Phase 2: Admin Panel UI ✅ COMPLETED
**Duration: Core admin interface**

1. **Admin Layout**
   - [x] Create admin layout with sidebar navigation - **completed** (`components/admin/AdminLayout.tsx`)
   - [x] Dashboard page with overview stats - **completed** (shows real database counts)
   - [x] Responsive design for admin panel - **completed**

2. **Sun Editor Integration**
   - [x] Install: `pnpm add suneditor suneditor-react` - **completed**
   - [x] Create SunEditorWrapper component - **completed** (`components/admin/SunEditorWrapper.tsx`)
   - [x] Configure toolbar (formatting, images, links, tables) - **completed**
   - [x] Image upload integration - **completed**

3. **Common Components**
   - [x] DataTable with sorting, filtering, pagination - **completed** (`components/admin/DataTable.tsx`)
   - [x] Form components (inputs, selects, toggles) - **completed** (using native + Tailwind)
   - [x] ImageUploader with drag-and-drop - **completed** (`components/admin/ImageUploader.tsx`)
   - [x] IconPicker for Lucide icons - **completed** (`components/admin/IconPicker.tsx`)
   - [x] GradientPicker for Tailwind gradients - **completed** (`components/admin/GradientPicker.tsx`)
   - [ ] Confirmation modals - pending

---

### Phase 3: Site Settings Module ✅ COMPLETED
**Duration: Settings management**

1. **Settings API**
   - [x] GET /api/admin/settings - fetch current settings - **completed**
   - [x] PUT /api/admin/settings - update settings - **completed**
   - [x] GET /api/public/settings - public API for frontend - **completed**

2. **Settings Page**
   - [x] Hero section settings - **completed**
     - YouTube Video URL field
     - Video preview
     - Hero title/subtitle fields
   - [x] Services section header text - **completed**
   - [x] Save/Update functionality - **completed**

3. **Frontend Integration**
   - [x] Update Hero.tsx to accept videoUrl prop - **completed**
   - [x] Update AIAutomations.tsx to accept title/description props - **completed**
   - [x] Homepage fetches settings from database - **completed**

**Admin Settings URL:** http://localhost:3002/admin/settings

---

### Phase 4: Services Management ✅ COMPLETED
**Duration: Full CRUD for services**

1. **Services API**
   - [x] GET /api/admin/services - list all services - **completed**
   - [x] POST /api/admin/services - create service - **completed**
   - [x] GET /api/admin/services/[id] - get single service - **completed**
   - [x] PUT /api/admin/services/[id] - update service - **completed**
   - [x] DELETE /api/admin/services/[id] - delete service - **completed**
   - [x] PUT /api/admin/services/reorder - reorder services - **completed**

2. **Services Admin Pages**
   - [x] List view with DataTable - **completed** (`app/admin/services/page.tsx`, `ServicesClient.tsx`)
   - [x] Create/Edit form with: - **completed** (`components/admin/ServiceForm.tsx`)
     - Title, Description
     - Icon picker
     - Gradient picker
     - Features list (dynamic add/remove)
     - Stats key-value pairs
     - Active/Inactive toggle
     - Live preview
   - [x] New Service page - **completed** (`app/admin/services/new/page.tsx`)
   - [x] Edit Service page - **completed** (`app/admin/services/[id]/page.tsx`)

3. **Frontend Integration**
   - [x] Update AIAutomations.tsx to accept services prop - **completed**
   - [x] Public API endpoint for frontend - **completed** (`app/api/public/services/route.ts`)
   - [x] Homepage fetches services from database - **completed**

**Admin Services URL:** http://localhost:3002/admin/services

---

### Phase 5: Products Management ✅ COMPLETED
**Duration: Products with details pages**

1. **Products API**
   - [x] Full CRUD endpoints - **completed** (`app/api/admin/products/route.ts`, `[id]/route.ts`)
   - [x] Reorder endpoint - **completed** (`app/api/admin/products/reorder/route.ts`)
   - [x] Details content endpoint - **completed** (`app/api/admin/products/[id]/details/route.ts`)
   - [x] Public API for products - **completed** (`app/api/public/products/route.ts`, `[slug]/route.ts`)

2. **Products Admin Pages**
   - [x] List view with thumbnails - **completed** (`app/admin/products/page.tsx`, `ProductsClient.tsx`)
   - [x] Create/Edit form: - **completed** (`components/admin/ProductForm.tsx`)
     - Title, Category, Description
     - Image upload
     - Icon & Gradient pickers
     - Stats and Features
     - Demo URL
     - URL slug (auto-generated, editable)
   - [x] Details page editor (full Sun Editor page) - **completed** (`components/admin/ProductDetailsEditor.tsx`)
   - [x] New Product page - **completed** (`app/admin/products/new/page.tsx`)
   - [x] Edit Product page - **completed** (`app/admin/products/[id]/page.tsx`)
   - [x] Edit Details page - **completed** (`app/admin/products/[id]/details/page.tsx`)

3. **Frontend Integration**
   - [x] Update ProductShowcase.tsx to accept products prop - **completed**
   - [x] Create /products/[slug] dynamic page - **completed** (`app/products/[slug]/page.tsx`)
   - [x] "Learn More" links to details page - **completed**
   - [x] "View Demo" links to external URL - **completed**
   - [x] Homepage fetches products from database - **completed**

**Admin Products URL:** http://localhost:3002/admin/products

---

### Phase 6: Events Management (Global Events Section)
**Duration: Dynamic events with image/video support**

এই section টি বিশেষ কারণ এতে image এবং video দুটোই থাকতে পারে এবং multiple item হলে slider হিসেবে দেখাবে।

#### Design Decisions:

**Display Logic:**
```
যদি events সংখ্যা <= 4:
  → Grid layout এ দেখাবে (বর্তমান design)
যদি events সংখ্যা > 4:
  → Slider/Carousel হিসেবে দেখাবে
  → Auto-slide + Manual navigation
  → Admin থেকে display mode override করা যাবে
```

**Media Type Support:**
| Type | Description | Behavior |
|------|-------------|----------|
| `IMAGE` | Uploaded image | Static display with hover effect |
| `VIDEO` | Direct video URL (mp4) | Plays on hover, muted |
| `YOUTUBE` | YouTube embed URL | Shows thumbnail, plays in modal on click |

1. **Events API**
   - [ ] GET /api/admin/events - list all events
   - [ ] POST /api/admin/events - create event
   - [ ] GET /api/admin/events/[id] - get single event
   - [ ] PUT /api/admin/events/[id] - update event
   - [ ] DELETE /api/admin/events/[id] - delete event
   - [ ] PUT /api/admin/events/reorder - reorder events
   - [ ] GET/PUT /api/admin/events/settings - section settings

2. **Events Admin Pages**
   - [ ] List view with drag-and-drop reorder
   - [ ] Thumbnail preview in list
   - [ ] Create/Edit form with:
     - Title, Subtitle (e.g., "In Paris")
     - Description (optional, Sun Editor for rich text)
     - **Media Type selector** (Image/Video/YouTube)
     - **Conditional upload/URL field**:
       - Image: File upload with preview
       - Video: File upload or URL
       - YouTube: URL input with auto-thumbnail fetch
     - Gradient picker for overlay color
     - Event date picker
     - Location field
     - External URL (link to event page)
     - Active/Inactive toggle
   - [ ] Section Settings page:
     - Section title edit
     - Section description (Sun Editor)
     - Display mode (Grid/Slider)
     - Auto-slide delay (for slider)

3. **Frontend Component Updates**
   - [ ] Create new dynamic Events.tsx component
   - [ ] Implement display mode logic:
     ```tsx
     // Pseudo code
     if (displayMode === 'SLIDER' || events.length > 4) {
       return <EventsSlider events={events} />
     }
     return <EventsGrid events={events} />
     ```
   - [ ] Image event card (current design)
   - [ ] Video event card:
     - Shows thumbnail/first frame
     - Plays on hover (muted, loop)
     - Full video modal on click
   - [ ] YouTube event card:
     - Shows YouTube thumbnail
     - Opens YouTube player modal on click
   - [ ] Slider implementation with Swiper or custom
   - [ ] Touch/swipe support for mobile

4. **Event Card Component Structure**
   ```tsx
   // components/sections/events/EventCard.tsx
   interface EventCardProps {
     event: Event
     onVideoClick?: (videoUrl: string) => void
   }

   // Renders differently based on mediaType:
   // - IMAGE: Current design with image background
   // - VIDEO: Video element with poster, plays on hover
   // - YOUTUBE: Thumbnail with play button overlay
   ```

5. **Video Modal Component**
   - [ ] Full-screen video player modal
   - [ ] YouTube embed support
   - [ ] Native video support
   - [ ] Close on escape/outside click
   - [ ] Keyboard controls

---

### Phase 7: Blog System
**Duration: Complete blog functionality**

1. **Categories API**
   - [ ] CRUD for blog categories
   - [ ] Category management page

2. **Blog API**
   - [ ] Full CRUD endpoints
   - [ ] Image upload for cover
   - [ ] Publish/Unpublish functionality

3. **Blog Admin Pages**
   - [ ] Posts list with filters (category, status)
   - [ ] Create/Edit with Sun Editor
   - [ ] Category selector
   - [ ] Cover image upload
   - [ ] Publish scheduling

4. **Public Blog Pages**
   - [ ] Blog listing page with pagination
   - [ ] Category filter
   - [ ] Individual blog post page
   - [ ] Related posts
   - [ ] Add blog section to homepage

---

### Phase 7: Media Library
**Duration: Centralized media management**

1. **Media API**
   - [ ] Upload endpoint with Sharp optimization
   - [ ] List with pagination
   - [ ] Delete functionality

2. **Media Library Page**
   - [ ] Grid view of all uploads
   - [ ] Upload new files
   - [ ] Copy URL functionality
   - [ ] Delete with confirmation

---

### Phase 9: Polish & Optimization
**Duration: Final touches**

1. **Performance**
   - [ ] API response caching
   - [ ] Image optimization
   - [ ] Lazy loading for admin tables

2. **Security**
   - [ ] Rate limiting on APIs
   - [ ] Input sanitization
   - [ ] CSRF protection

3. **UX Improvements**
   - [ ] Toast notifications
   - [ ] Form autosave
   - [ ] Keyboard shortcuts
   - [ ] Dark mode for admin

---

## API Endpoints Summary

### Admin APIs (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/PUT | `/api/admin/settings` | Site settings |
| GET/POST | `/api/admin/services` | List/Create services |
| GET/PUT/DELETE | `/api/admin/services/[id]` | Single service |
| GET/POST | `/api/admin/products` | List/Create products |
| GET/PUT/DELETE | `/api/admin/products/[id]` | Single product |
| PUT | `/api/admin/products/[id]/details` | Product details |
| GET/POST | `/api/admin/blog` | List/Create blogs |
| GET/PUT/DELETE | `/api/admin/blog/[id]` | Single blog |
| GET/POST | `/api/admin/blog/categories` | Categories |
| GET/POST | `/api/admin/events` | List/Create events |
| GET/PUT/DELETE | `/api/admin/events/[id]` | Single event |
| GET/PUT | `/api/admin/events/settings` | Event section settings |
| GET/POST/DELETE | `/api/admin/media` | Media files |

### Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/settings` | Get site settings |
| GET | `/api/public/services` | Get active services |
| GET | `/api/public/products` | Get active products |
| GET | `/api/public/products/[slug]` | Product details |
| GET | `/api/public/events` | Active events with settings |
| GET | `/api/public/blog` | Published blogs |
| GET | `/api/public/blog/[slug]` | Single blog post |

---

## Dependencies to Install

```bash
# Database & ORM
pnpm add prisma @prisma/client

# Authentication
pnpm add next-auth bcryptjs
pnpm add -D @types/bcryptjs

# Rich Text Editor
pnpm add suneditor suneditor-react

# Form Handling
pnpm add react-hook-form @hookform/resolvers zod

# Data Fetching
pnpm add swr
# or
pnpm add @tanstack/react-query

# Image Processing
pnpm add sharp

# File Upload
pnpm add formidable
pnpm add -D @types/formidable

# Drag & Drop (for reordering)
pnpm add @dnd-kit/core @dnd-kit/sortable

# Slider/Carousel (for Events)
pnpm add swiper

# Date handling
pnpm add date-fns

# Slug generation
pnpm add slugify
```

---

## Environment Setup

```env
# .env.local (create this file)

# Database (MySQL - same server as molyecom, molylearn)
DATABASE_URL="mysql://username:password@localhost:3306/codemoly_db"

# NextAuth
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3002"

# Optional: For production
# NODE_ENV="production"
```

---

## Initial Admin Seed

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default admin
  const hashedPassword = await bcrypt.hash('admin123', 12)

  await prisma.admin.upsert({
    where: { email: 'admin@codemoly.com' },
    update: {},
    create: {
      email: 'admin@codemoly.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  })

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      heroVideoUrl: 'https://www.youtube.com/embed/9s2ydfkRz2E',
      servicesTitle: 'Intelligent Solutions for Every Business Need',
      servicesDesc: 'Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.',
    },
  })

  console.log('Seed completed!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## Security Considerations

1. **Authentication**
   - JWT tokens with short expiry
   - Secure session handling
   - Password strength requirements

2. **Authorization**
   - Role-based access control (SUPER_ADMIN, ADMIN, EDITOR)
   - API middleware for protected routes

3. **Input Validation**
   - Zod schemas for all inputs
   - SQL injection prevention (Prisma handles this)
   - XSS prevention in Sun Editor content

4. **File Upload**
   - File type validation
   - File size limits
   - Filename sanitization

---

## Next Steps

1. **Immediate**: Set up PostgreSQL database
2. **Then**: Initialize Prisma and create schema
3. **Then**: Set up authentication
4. **Then**: Build admin layout and dashboard
5. **Continue**: Implement each module phase by phase

---

## Questions to Consider

1. ~~**Database Hosting**: Local PostgreSQL or Docker container?~~ ✅ MySQL (existing VPS server)
2. **Deployment**: Where will the production site be hosted? (Same VPS as molyecom/molylearn)
3. **Backup Strategy**: How often to backup database? (Can use existing MySQL backup strategy)
4. **Multiple Admins**: Do you need role-based permissions?
5. **Media Storage**: Local uploads or cloud storage (S3) later?

---

*এই plan অনুযায়ী implementation শুরু করতে পারি। প্রথমে Phase 1 দিয়ে শুরু করব - database এবং authentication setup।*
