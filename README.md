# EISR Portal

**Eye-Innovations Scientific Research — Academic Publishing Portal**

A full-stack academic journal management system built with **Next.js 16**, **MySQL**, and **JWT authentication**. Supports the complete submission workflow from author submission through peer review to publication.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started (Development)](#getting-started-development)
- [Production Deployment](#production-deployment)
  - [Option A: Docker (Recommended)](#option-a-docker-recommended)
  - [Option B: Manual / VPS](#option-b-manual--vps)
  - [Option C: Vercel + PlanetScale](#option-c-vercel--planetscale)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Security Checklist](#security-checklist)
- [Nginx Reverse Proxy](#nginx-reverse-proxy-ssl)

---

## Overview

EISR Portal is a professional academic publishing platform modelled on OJS (Open Journal Systems). It provides:

- Public journal and article browsing
- Author submission and manuscript tracking dashboard
- Reviewer assignment and review workflow
- JWT-secured REST API
- Admin-ready MySQL backend

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Frontend | React 19, Tailwind CSS v4, Framer Motion |
| Icons | Lucide React |
| Auth | JSON Web Tokens (JWT) + bcrypt |
| Database | MySQL 8 via `mysql2/promise` (connection pool) |
| Containerisation | Docker + Docker Compose |
| Hosting | Any VPS, Railway, Render, or Vercel |

---

## Features

### Public Site
- 🏠 Home page with auto-sliding hero banner (4 images, 5s crossfade)
- 📰 Journal listing — JEIML, JEISA
- 📖 Article detail pages with sliding hero banners
- 📋 Journal pages with full navigation (Archives, Current Issue, Journal Menu, Policies, About)
- 📄 Policy pages (Open Access, Peer Review, Publication Ethics, etc.)
- 💰 Journals APC page
- 👥 Leadership Team page
- 📬 Contact page

### Dashboard (Authenticated)
- 🔐 JWT login / registration with bcrypt password hashing
- 📊 Dashboard home — real-time submission stats, user profile, recent submissions
- 📝 Author workflow — Submit, track, revise, view editorial activity
- 🔍 Reviewer workflow — Action required, all assignments, completed, declined
- 👤 Profile editor — Identity, Contact, Roles, Password tabs
- 🔔 Notification bell
- 🚪 Header shows user avatar dropdown (Dashboard / Edit Profile / Logout) when logged in

### API
- `POST /api/auth/login` — Authenticate, receive JWT
- `POST /api/auth/register` — Register new user
- `GET/PUT /api/profile` — Fetch and update user profile
- `GET/POST /api/submissions` — List and create submissions
- `GET /api/submissions/[id]` — Single submission detail
- `GET /api/setup` — DB schema initialisation endpoint

---

## Project Structure

```
ipp/
├── public/                 # Static assets (banners, logos, journal covers)
├── src/
│   ├── app/
│   │   ├── api/            # REST API route handlers
│   │   │   ├── auth/       # login, register
│   │   │   ├── profile/    # GET/PUT user profile
│   │   │   ├── submissions/# GET/POST + [id]
│   │   │   └── setup/      # DB initialisation
│   │   ├── dashboard/      # Protected author/reviewer area
│   │   │   ├── layout.js   # Sidebar + header + footer wrapper
│   │   │   ├── page.js     # Dashboard home with sliding banner
│   │   │   ├── submissions/# Active, declined, published, [id] detail
│   │   │   ├── reviewer/   # Action-required, all, completed, declined
│   │   │   ├── submit/     # New submission form
│   │   │   └── profile/    # User profile editor
│   │   ├── journals/[slug] # Journal pages (JEIML, JEISA)
│   │   ├── articles/[slug] # Article detail pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── policies/       # All policy pages
│   │   └── page.js         # Homepage
│   ├── components/
│   │   ├── Header.js       # Smart header (Login btn / User dropdown)
│   │   ├── Footer.js       # Site-wide footer
│   │   ├── JournalHero.js  # Sliding banner + journal nav
│   │   └── Logo.js         # EISR logo SVG component
│   └── lib/
│       ├── db.js           # MySQL connection pool
│       ├── auth.js         # JWT verify helper
│       ├── data.js         # Static journal/article seed data
│       └── utils.js        # Tailwind cn() utility
├── .env.example            # Environment variable template
├── Dockerfile              # Multi-stage production Docker build
├── docker-compose.yml      # App + MySQL containers
└── next.config.mjs         # Next.js standalone output config
```

---

## Database Schema

The schema is auto-created by visiting `GET /api/setup` (first-time setup only).

### `users` table
| Column | Type | Notes |
|---|---|---|
| id | INT PK AUTO | |
| username | VARCHAR(100) UNIQUE | |
| email | VARCHAR(255) UNIQUE | |
| password | VARCHAR(255) | bcrypt hashed |
| given_name | VARCHAR(100) | |
| family_name | VARCHAR(100) | |
| affiliation | TEXT | |
| country | VARCHAR(100) | |
| orcid | VARCHAR(50) | |
| role | ENUM | 'author', 'reviewer', 'editor', 'admin' |
| created_at | TIMESTAMP | |

### `submissions` table
| Column | Type | Notes |
|---|---|---|
| id | INT PK AUTO | |
| user_id | INT FK | → users.id |
| title | VARCHAR(500) | |
| abstract | TEXT | |
| keywords | TEXT | |
| status | VARCHAR(50) | Submitted / Review / Copyediting / Published / Declined |
| file_path | VARCHAR(500) | Uploaded file path |
| editor_comments | TEXT | |
| created_at | TIMESTAMP | |

---

## Getting Started (Development)

### Prerequisites
- Node.js 20+
- MySQL 8.0+

### 1. Clone & Install

```bash
git clone https://github.com/your-org/eisr-portal.git
cd eisr-portal/ipp
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=eisr_db
JWT_SECRET=your_long_random_secret_minimum_64_chars
```

### 3. Create the Database

```sql
CREATE DATABASE eisr_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then visit **http://localhost:3000/api/setup** once to create all tables.

### 4. Run Dev Server

```bash
npm run dev
```

App runs at **http://localhost:3000**

---

## Production Deployment

### Option A: Docker (Recommended)

This is the easiest path for any Linux VPS (Ubuntu, Debian, etc.).

#### 1. Create production `.env` on the server

```bash
cp .env.example .env
nano .env   # fill in all values
```

Add `MYSQL_ROOT_PASSWORD` too (required for the MySQL Docker container):

```env
MYSQL_ROOT_PASSWORD=VERY_STRONG_ROOT_PASSWORD
MYSQL_HOST=db           # ← use service name inside Docker network
NODE_ENV=production
JWT_SECRET=64_char_random_string_here
```

#### 2. Generate a secure JWT secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. Build and start

```bash
docker compose up -d --build
```

#### 4. Initialise the database (first time only)

```bash
curl http://localhost:3000/api/setup
```

#### 5. Verify

```bash
docker compose ps
docker compose logs eisr_portal -f
```

App is live at **http://YOUR_SERVER_IP:3000**

---

### Option B: Manual / VPS

```bash
# Install Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and install
git clone https://github.com/your-org/eisr-portal.git
cd eisr-portal/ipp
npm ci

# Set env vars
cp .env.example .env.local
# Edit .env.local with production values

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "eisr-portal" -- start
pm2 save
pm2 startup
```

---

### Option C: Vercel + PlanetScale

1. Push code to GitHub
2. Import repo in Vercel dashboard
3. Set all environment variables in Vercel project settings
4. Use PlanetScale or Neon as MySQL-compatible managed DB
5. Deploy

> **Note:** Vercel does not support persistent file uploads. If you need manuscript file storage, use an S3-compatible bucket (Cloudflare R2, AWS S3, etc.) and store the URL in `file_path`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MYSQL_HOST` | ✅ | Database host (use `db` for Docker) |
| `MYSQL_PORT` | ✅ | Database port (default: 3306) |
| `MYSQL_USER` | ✅ | Database user |
| `MYSQL_PASSWORD` | ✅ | Database password |
| `MYSQL_DATABASE` | ✅ | Database name (`eisr_db`) |
| `MYSQL_ROOT_PASSWORD` | Docker only | MySQL root password for Docker container |
| `JWT_SECRET` | ✅ | Minimum 64-char random string |
| `NODE_ENV` | ✅ | `production` in prod, `development` locally |
| `NEXT_PUBLIC_APP_URL` | Optional | Public URL for canonical links |

---

## API Reference

All protected endpoints require: `Authorization: Bearer <token>`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | ❌ | Login → returns JWT |
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `GET` | `/api/profile` | ✅ | Get current user profile |
| `PUT` | `/api/profile` | ✅ | Update current user profile |
| `GET` | `/api/submissions` | ✅ | List user's submissions |
| `POST` | `/api/submissions` | ✅ | Create new submission |
| `GET` | `/api/submissions/[id]` | ✅ | Get single submission |
| `GET` | `/api/setup` | ❌ | Initialise DB schema (run once) |

---

## Security Checklist

Before going live:

- [ ] Set a **strong, unique** `JWT_SECRET` (min 64 chars, random)
- [ ] Set a **strong** `MYSQL_PASSWORD` and `MYSQL_ROOT_PASSWORD`
- [ ] Remove or protect the `/api/setup` endpoint after first run
- [ ] Enable HTTPS via Nginx + Let's Encrypt (see below)
- [ ] Add `NEXT_PUBLIC_APP_URL` to your canonical URL
- [ ] Ensure `.env` / `.env.local` is in `.gitignore` (it is by default)
- [ ] Review uploaded file types and add server-side MIME validation
- [ ] Rotate JWT secret if leaked

---

## Nginx Reverse Proxy + SSL

Install Nginx and Certbot on your server:

```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

Create `/etc/nginx/sites-available/eisr`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
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
sudo ln -s /etc/nginx/sites-available/eisr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get free SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## License

Copyright © 2026 Eye-Innovations Scientific Research (EISR). All rights reserved.
