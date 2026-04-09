# EISR Publishing Portal (Academic IPP)

**Eye-Innovations Scientific Research — Academic Publishing Portal**

A comprehensive, production-ready academic journal management system built with **Next.js 15**, **MySQL**, and **JWT authentication**. This portal handles the entire lifecycle of a manuscript—from initial author submission to peer review, editorial decisions, and final publication.

---

## 🚀 Key Features

### 🛡️ Secure Registration & Authentication
- **Strong Password Policy**: Minimum 5 characters, requiring at least one uppercase letter, one number, and one special character.
- **Field-Specific Validation**: User-friendly, real-time error feedback directly under input fields.
- **Role-Based Access Control (RBAC)**: Distinct workflows for **Authors**, **Reviewers**, **Editors**, and **Admins**.
- **JWT Protection**: All sensitive API routes and dashboard views are secured via JSON Web Tokens.

### 📝 Full Editorial Workflow
- **Author Submission**: Multi-file uploads, contributor management, and automated email confirmations.
- **Peer Review Management**:
    - Automated invitation emails with secure **Accept/Decline** tokens.
    - Reviewer-specific dashboards for managing active assignments.
    - Professional evaluation forms and recommendation systems.
- **Editorial Decisions**: Editors can record verdicts (Accept, Request Revisions, Decline) with private and public feedback.
- **Author Revision Flow**: Authors receive status alerts and can upload revised manuscripts directly through their submission dashboard.

### 📊 Professional Dashboards
- **Dynamic Stats**: Real-time counters in the sidebar for "Active Submissions," "Published," "Revisions Required," etc.
- **Activity Tracking**: A dedicated "Editorial Activity" tracker showing the exact stage of every manuscript (e.g., *Review in Progress*, *Review Submitted*, *Revisions Received*).
- **Editor Notifications**: In-app alerts for editors when new reviews or revisions are submitted.

### 📰 Public Journal Experience
- **Journal Specific Branding**: Targeted homepages for JEIML, JEISA, and other EISR journals.
- **Searchable Archives**: Easy access to current and past publications.
- **Modern UI**: Built with a "Premium-First" aesthetic using Smooth animations, Google Fonts (Noto Sans), and Lucide icons.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Frontend | React 19, Vanilla CSS, Framer Motion |
| Database | **MySQL 8** (with `mysql2/promise` pooling) |
| Auth | JWT + bcrypt |
| Notifications | **SMTP-based Emails** (Nodemailer) |
| Icons | Lucide React |

---

## 🔧 Installation & Setup

### 1. Environment Configuration
Copy `.env.example` to `.env` and fill in your credentials:

```env
# Database
MYSQL_HOST=localhost
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=eisr_db

# Security
JWT_SECRET=your_minimal_64_char_secret

# Email (Required for Notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2. Database Initialization
1. Create a MySQL database matching your `MYSQL_DATABASE` name.
2. Run the development server: `npm run dev`.
3. Visit `http://localhost:3000/api/setup?key=setup-key-eisr-99` to automatically generate all tables.

### 3. Hardcoded Testing Accounts
The portal includes pre-configured testing accounts. Upon first login with these credentials, the system will automatically sync them to the database.

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin1@eisr.com` | `admin-pass-721` |
| **Editor** | `editor1@eisr.com` | `editor-pass-905` |
| **Reviewer** | `reviewer1@eisr.com` | `reviewer-pass-348` |

---

## 📂 Project Structure

- `/src/app/api`: Backend logic (Auth, Submissions, Reviews, Decisions).
- `/src/app/dashboard`: Role-specific user interfaces.
- `/src/app/journals`: Public journal landing pages and archives.
- `/src/lib`: Database configuration, email templates, and auth helpers.
- `/public/uploads`: Local storage for submitted manuscripts (Production should use S3).

---

## ✅ Production Checklist
- [ ] Update `NEXT_PUBLIC_APP_URL` to your live domain.
- [ ] Ensure **SSL (HTTPS)** is active for secure JWT cookie handling.
- [ ] Set `NODE_ENV=production`.
- [ ] Replace hardcoded test users with registered staff accounts.
- [ ] Configure a professional SMTP service (SendGrid, Mailgun, etc.) for high-volume notifications.

---

## 📜 License
Copyright © 2026 Eye-Innovations Scientific Research (EISR). All rights reserved.
