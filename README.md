# 📚 EISR Publishing Portal (IPP)

<div align="center">

![EISR Logo](public/eisr.png)

**Eye-Innovations Scientific Research — Academic Publishing Portal**

*A production-ready, full-stack academic journal management system*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?logo=mysql)](https://mysql.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

[Live Demo](https://eye-isr.com) · [Report Bug](https://github.com/eyeisr/ipp/issues) · [Request Feature](https://github.com/eyeisr/ipp/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Journals](#-journals)
- [Workflow Diagram](#-complete-system-workflow)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Role-Based Access](#-role-based-access-control)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)

---

## 🌟 Overview

The **EISR Publishing Portal (IPP)** is a comprehensive academic journal management system that digitizes the entire lifecycle of a research manuscript — from submission by authors, through peer review, editorial decision-making, and all the way to final publication on the public-facing journal website.

It is designed to be **multi-journal**, supporting multiple EISR journals from a single unified platform, with full role-based dashboards for **Authors**, **Reviewers**, **Editors**, and **Administrators**.

---

## 📰 Journals

| Journal | ID | Abbreviation | Focus |
|---|---|---|---|
| Journal of Eye-Innovation in Security Analysis | `jeisa` | JEISA | Cybersecurity, InfoSec, Blockchain |
| Journal of Eye-Innovation in Machine Learning | `jeiml` | JEIML | AI, ML, Deep Learning, Robotics |

---

## 🔄 Complete System Workflow

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    EISR PUBLISHING PORTAL — FULL WORKFLOW                ║
╚══════════════════════════════════════════════════════════════════════════╝

  ┌─────────────┐
  │   VISITOR   │  Browses public journal pages, articles, editorial board
  └──────┬──────┘
         │ Registers / Logs In
         ▼
  ┌─────────────┐
  │   AUTHOR    │
  └──────┬──────┘
         │
         │ 1. SUBMIT MANUSCRIPT
         │    ├── Step 1: Enter Title + confirm checklist
         │    ├── Step 2: Upload Files (PDF/DOCX)
         │    ├── Step 3: Add Co-Authors / Contributors
         │    ├── Step 4: Comments for Editor
         │    └── Step 5: Review & Submit
         │
         │    ✉️  Author receives email confirmation
         │
         ▼
  ┌─────────────┐
  │   EDITOR    │  (Receives notification of new submission)
  └──────┬──────┘
         │
         │ 2. PRE-REVIEW DECISION
         │    ├── View submission files
         │    ├── Check metadata (Title, Abstract, Contributors)
         │    └── Either:
         │         ├── ✅ Move to Review Stage
         │         ├── ✏️  Request Revisions from Author
         │         └── ❌ Decline Submission
         │
         │ 3. ASSIGN REVIEWERS
         │    ├── Enter reviewer name + email
         │    └── System sends automated invitation email
         │         └── Email contains secure Accept / Decline links
         │
         ▼
  ┌─────────────┐
  │  REVIEWER   │  (Receives invitation email)
  └──────┬──────┘
         │
         │ 4. REVIEW PROCESS (4-Step Wizard)
         │    ├── Step 1: View submission details + Accept or Decline
         │    │            └── If Declined → Editor is notified → Assign another
         │    ├── Step 2: Read Reviewer Guidelines
         │    ├── Step 3: Download & Review manuscript files
         │    │    ├── Fill evaluation form:
         │    │    │    ├── Comments for Author
         │    │    │    ├── Private comments for Editor
         │    │    │    ├── Rating (1–10)
         │    │    │    └── Recommendation:
         │    │    │         ├── Accept
         │    │    │         ├── Minor Revision
         │    │    │         ├── Major Revision
         │    │    │         └── Reject
         │    │    └── Optionally upload annotated file
         │    └── Step 4: Completion (Review Submitted)
         │
         ▼
  ┌─────────────┐
  │   EDITOR    │  (Reviews submitted recommendations)
  └──────┬──────┘
         │
         │ 5. EDITORIAL DECISION
         │    ├── View all reviewer recommendations + ratings
         │    ├── Record final decision:
         │    │    ├── ✅ Accept → Status → "Accepted"
         │    │    ├── ✏️  Revisions Requested → Notifies Author
         │    │    └── ❌ Decline → Status → "Declined"
         │    └── Optionally add editor comments (visible to author)
         │
         ▼
  ┌─────────────┐           ┌──────────────────────────────────┐
  │   AUTHOR    │           │  If "Revisions Requested":       │
  └──────┬──────┘           │  Author uploads revised file     │
         │                  │  → Editor reviews again          │
         │ 6. PUBLICATION   └──────────────────────────────────┘
         │    ├── Editor changes status → "Published"
         │    ├── Sets Journal ID (jeisa / jeiml)
         │    └── Article appears on public journal website
         │
         ▼
  ┌──────────────────┐
  │  PUBLIC WEBSITE  │
  └──────────────────┘
       ├── Article Detail Page (Title, Abstract, Authors, Citation)
       ├── VIEW PDF button → Opens browser inline PDF viewer
       ├── DOWNLOAD TEMPLATE button → Journal-specific .docx template
       └── Journal pages (Archive, Editorial Board, Policies)
```

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based session management
- bcrypt password hashing
- Role-based access control (RBAC) — `author`, `reviewer`, `editor`, `admin`
- Secure reviewer invitation via tokenized email links
- Forgot Password with SMTP email reset flow

### 📝 Submission System
- 5-step guided submission wizard
- Multi-file upload with drag & drop support
- Co-author / contributor management
- Journal-aware submission (auto-detects journal from URL parameter)
- Dynamic journal-specific template download (JEIMT / JEISA templates)

### 🔬 Peer Review System
- Automated reviewer invitation emails (Nodemailer + SMTP)
- 4-step review wizard for reviewers
- Dual-comment system (comments for authors + private comments for editors)
- Rating system (1–10 scale)
- Recommendation tracking (Accept / Minor / Major / Reject)
- Review status: Pending → Accepted → Completed / Declined

### 📊 Role-Specific Dashboards
| Role | Dashboard Features |
|---|---|
| **Author** | Submission stats, active/published/declined list, revision alerts |
| **Reviewer** | Pending invitations, active assignments, completed reviews |
| **Editor** | All submissions queue, reviewer assignment, editorial decisions |
| **Admin** | Full access to all submissions and user management |

### 🌐 Public Journal Pages
- Modern floating card article layout
- Inline PDF viewer (browser-native, no download required)
- Auto-generated citations (APA-style)
- Keywords, abstract, license (CC BY 4.0) sections
- Editorial team pages with photos
- Journal policies (Ethics, Plagiarism, Archiving, etc.)
- Indexing & abstracting information
- Responsive, mobile-friendly design

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.x |
| **UI Library** | React | 19.x |
| **Styling** | TailwindCSS + Vanilla CSS | 4.x |
| **Database** | MySQL | 8.0 |
| **ORM/Driver** | mysql2/promise (connection pool) | 3.x |
| **Authentication** | jsonwebtoken + bcrypt | Latest |
| **Email** | Nodemailer (SMTP) | 8.x |
| **Animations** | Framer Motion | 12.x |
| **Icons** | Lucide React | Latest |
| **Fonts** | Google Fonts (Noto Sans, Merriweather) | — |

---

## 📁 Project Structure

```
ipp/
├── public/                    # Static assets
│   ├── eisr.png               # Logo
│   ├── baner0001-0004.jpg     # Dashboard sliding banners
│   ├── uploads/               # Uploaded manuscript files
│   ├── JEIMT-Template.docx    # Machine Learning journal template
│   └── JEISA-Template.docx    # Security Analysis journal template
│
├── src/
│   ├── app/
│   │   ├── page.js            # 🏠 Homepage (sliding banner, journals, articles)
│   │   ├── layout.js          # Root layout (fonts, metadata)
│   │   │
│   │   ├── journals/          # Journal-specific pages
│   │   │   └── [slug]/        # Dynamic journal pages
│   │   │       └── [section]/ # About, Policies, Editorial Team, etc.
│   │   │
│   │   ├── articles/
│   │   │   └── [slug]/        # Article detail page (floating card UI)
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.js        # Main dashboard (Author/Editor/Reviewer)
│   │   │   ├── layout.js      # Dashboard layout + sidebar
│   │   │   ├── submit/        # Manuscript submission wizard
│   │   │   ├── submissions/   # Submission management
│   │   │   │   └── [id]/      # Submission workflow (Editor view)
│   │   │   ├── reviewer/      # Reviewer-specific pages
│   │   │   │   └── assignments/[id]/ # Review evaluation wizard
│   │   │   └── profile/       # User profile editor
│   │   │
│   │   ├── api/               # 🔌 Next.js API Routes
│   │   │   ├── auth/          # Login + Register
│   │   │   ├── profile/       # Get/Update user profile
│   │   │   ├── submissions/   # CRUD for submissions
│   │   │   │   └── [id]/      # Single submission + decision + revisions
│   │   │   ├── reviewer/      # Reviewer assignments + reviews
│   │   │   ├── articles/      # Public article API
│   │   │   │   └── [id]/      # Single article fetch
│   │   │   ├── upload/        # File upload handler
│   │   │   ├── download/      # Secure file download/view (inline support)
│   │   │   └── setup/         # DB setup / migration route
│   │   │
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── forgot-password/   # Forgot password
│   │   ├── reset-password/    # Reset password (token-based)
│   │   ├── editors/           # Editorial team public page
│   │   ├── leadership/        # Leadership team page
│   │   ├── apc/               # Article Processing Charges page
│   │   ├── contact/           # Contact page
│   │   └── policies/          # Policy pages
│   │
│   └── lib/
│       ├── db.js              # MySQL connection pool
│       ├── data.js            # Static data (journals, menus, editorial team)
│       └── auth.js            # JWT helper utilities
│
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
├── next.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org))
- **MySQL** 8.0+ ([Download](https://dev.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com))

### 1. Clone the Repository

```bash
git clone https://github.com/eyeisr/ipp.git
cd ipp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-super-secret-64-char-minimum-random-string
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=eisr_db
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### 4. Set Up the Database

First, create the database in MySQL:

```sql
CREATE DATABASE eisr_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run the setup route to auto-create all tables:

```bash
# Start the dev server first
npm run dev

# In another terminal or browser, visit:
curl http://localhost:3000/api/setup
```

This will create all required tables automatically.

### 5. Create an Admin Account

Register via the UI at `/register`, then manually update your role in MySQL:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### 6. Start the Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | ✅ | Full URL of the app (e.g. `https://eye-isr.com`) |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens (min. 64 chars) |
| `MYSQL_HOST` | ✅ | MySQL server hostname |
| `MYSQL_PORT` | ✅ | MySQL port (default: `3306`) |
| `MYSQL_USER` | ✅ | MySQL username |
| `MYSQL_PASSWORD` | ✅ | MySQL password |
| `MYSQL_DATABASE` | ✅ | MySQL database name |
| `SMTP_HOST` | ⚠️ Optional | SMTP server for outgoing emails |
| `SMTP_PORT` | ⚠️ Optional | SMTP port (usually `587` for TLS) |
| `SMTP_USER` | ⚠️ Optional | Email address for sending |
| `SMTP_PASS` | ⚠️ Optional | App password (not regular password) |

> **Note:** Without SMTP variables, reviewer invitation emails and password reset emails won't send. A fallback link is shown on-screen in development mode.

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login, returns JWT token |
| `POST` | `/api/forgot-password` | Send password reset email |
| `POST` | `/api/reset-password` | Reset password with token |

### Submissions
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/submissions` | List submissions (role-aware) |
| `POST` | `/api/submissions` | Create new submission |
| `GET` | `/api/submissions/[id]` | Get single submission detail |
| `PUT` | `/api/submissions/[id]` | Update submission metadata |
| `POST` | `/api/submissions/[id]/decision` | Record editorial decision |
| `POST` | `/api/submissions/[id]/revisions` | Submit revised manuscript |

### Reviews & Assignments
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reviewer/assignments` | List reviewer assignments |
| `POST` | `/api/reviewer/assignments` | Assign reviewer (sends email) |
| `PATCH` | `/api/reviewer/assignments/[id]` | Accept or Decline assignment |
| `GET` | `/api/reviewer/reviews` | Get review for a submission |
| `POST` | `/api/reviewer/reviews` | Submit or save draft review |

### Public Articles
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/articles` | List published articles |
| `GET` | `/api/articles/[id]` | Get single article with file path |

### Files
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload manuscript file |
| `GET` | `/api/download?file=X` | Download file by name |
| `GET` | `/api/download?file=X&inline=true` | View file inline in browser (PDF viewer) |

### Utilities
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/setup` | Initialize / migrate database tables |
| `GET` | `/api/profile` | Get logged-in user profile |
| `PUT` | `/api/profile` | Update user profile |

---

## 👥 Role-Based Access Control

```
┌──────────┬────────────────────────────────────────────────────────────┐
│   Role   │  Permissions                                               │
├──────────┼────────────────────────────────────────────────────────────┤
│ author   │ Submit manuscripts, view own submissions, submit revisions  │
│ reviewer │ Accept/decline invitations, submit reviews                  │
│ editor   │ All above + assign reviewers, record editorial decisions    │
│ admin    │ All editor permissions + full user & submission management  │
└──────────┴────────────────────────────────────────────────────────────┘
```

### Changing a User's Role

```sql
-- Make a user an editor
UPDATE users SET role = 'editor' WHERE email = 'editor@example.com';

-- Make a user an admin
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

---

## 🗄️ Database Schema

```sql
-- Core tables created automatically by /api/setup

users                  -- All registered users (authors, reviewers, editors, admins)
submissions            -- Manuscript submissions (linked to users + journals)
submission_contributors -- Co-authors for each submission
submission_files       -- Uploaded files per submission
reviewer_assignments   -- Links submissions to reviewers, tracks status
submission_reviews     -- Completed review forms from reviewers
```

**Key column notes:**
- `submissions.status` → `Submitted` | `Under Review` | `Revisions Requested` | `Accepted` | `Declined` | `Published`
- `submissions.journal_id` → `jeisa` | `jeiml`
- `reviewer_assignments.status` → `Pending` | `Accepted` | `Declined` | `Completed`

---

## 🚢 Deployment

### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in the **Vercel Dashboard → Settings → Environment Variables**.

### Option 2: Self-Hosted VPS (Ubuntu/cPanel)

```bash
# Build the production bundle
npm run build

# Start with PM2 process manager
npm install -g pm2
pm2 start npm --name "eisr-portal" -- start
pm2 save
pm2 startup
```

Use **Nginx** as a reverse proxy:

```nginx
server {
    listen 80;
    server_name eye-isr.com www.eye-isr.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads/ {
        alias /path/to/your/app/public/uploads/;
    }
}
```

### Option 3: cPanel with Node.js

1. Upload files via FTP or Git
2. In cPanel → **Node.js App** → Create New App
3. Set **Application root** to your project folder
4. Set **Application startup file** to `server.js` or use the npm start script
5. Add environment variables in cPanel
6. Run `npm install` and `npm run build` via SSH terminal

---

## 📧 Email Configuration (SMTP)

For **Gmail**, generate an App Password:
1. Go to [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification → App Passwords
3. Generate password for "Mail"
4. Use this in `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=official.eyeisr@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
```

---

## 🔒 Security Checklist for Production

- [ ] Set a strong `JWT_SECRET` (64+ random characters)
- [ ] Use environment variables — never hardcode credentials
- [ ] Enable HTTPS with SSL certificate (Let's Encrypt / cPanel)
- [ ] Set MySQL user with least-privilege access
- [ ] Restrict `/api/setup` route in production (add auth check)
- [ ] Enable MySQL remote access restrictions
- [ ] Set up automated database backups

---

## 📜 License

This project is **proprietary software** developed for **Eye-Innovations Scientific Research (EISR)**. All rights reserved. Unauthorized copying, distribution, or modification is prohibited.

---

## 🙏 Credits

Built with ❤️ for the EISR research community.

- **Framework**: [Next.js](https://nextjs.org)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://framer.com/motion)
- **Email**: [Nodemailer](https://nodemailer.com)

---

<div align="center">
  <strong>Eye-Innovations Scientific Research</strong><br/>
  <a href="https://eye-isr.com">eye-isr.com</a> · <a href="mailto:info@eisr.com">info@eisr.com</a>
</div>
