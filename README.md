***

# ACEAR Institute Financial Transparency System

A **comprehensive financial transparency web platform** for ACEAR Institute, built to foster trust, clarity, and accountability in institutional fund management. Designed for all stakeholders (faculty, students, parents, donors, auditors), the system simplifies budget allocation, fund tracking, dashboard analytics, anomaly detection, and public transparency.

***

## Features

- **Multiple User Roles**  
  - Admins: Oversee all budgets, approve transactions, manage users.  
  - Department Heads: Allocate and track department funds, review expenses.  
  - Faculty: Propose events/projects, monitor funding.  
  - Students & Parents: Access real-time dashboards, submit feedback on spendings.  
  - Donors/Alumni: Explore impact dashboards for their contributions.  
  - Auditors: Read-only access to audit reports and compliance data.

- **Financial Management**  
  - Centralized budget allocations with fine-grained categories (Salaries, Infrastructure, Library, R&D, Scholarships, Maintenance).  
  - Track funds from **source → department → project/event → vendor**.  
  - Fully exportable reports (PDF, Excel, CSV).

- **Dashboards & Reports**  
  - Interactive Sankey diagrams, line/pie charts to visualize flows.  
  - Department and project "cards": budget, spent, balance.  
  - Drill-down reporting (vendor, invoices, payment history).

- **Smart Features**  
  - Live fund usage tracking.  
  - Anomaly detection for suspicious activity (overspending, duplicate vendors, etc.).  
  - Custom alerts: Email, SMS, Push notifications.  
  - Public portal with restricted, high-level transparency.  
  - Comment/feedback system for students, parents, donors.

***

## Updated Demo Data

**Departments and Allocations:**  
- Computer Science: ₹62,00,000  
- Electronics: ₹47,00,000  
- Civil Engineering: ₹39,00,000  
- Humanities & Social Sciences: ₹14,00,000  
- Sports & Wellness: ₹6,00,000  

**Sample Transactions:**  
- ₹6,75,000 – AlphaTech Solutions – Robotics Lab Equipment – Computer Science  
- ₹8,80,000 – GreenBuild Limited – Classroom Renovation – Civil Engineering  
- ₹4,10,000 – National Robotics Challenge – Electronics  
- ₹1,90,000 – Annual Sports Carnival – Sports & Wellness  
- ₹2,30,000 – Library Archives Upgrade – Humanities & Social Sciences  

***

## Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, shadcn/ui  
- **Backend:** Supabase (PostgreSQL, Auth, RESTful APIs)  
- **Auth:** Supabase Auth with robust email verification  
- **Visualization:** Recharts, d3.js  
- **Deployment:** Vercel/Netlify (frontend), Supabase (backend)  
- **AI Summarization:** Groq Integration (using `GORQ_API_KEY`)  
- **Cloud:** Google Cloud for AI integration (`GOOGLE_CLOUD_PROJECT` & `GOOGLE_CLOUD_LOCATION`)

***

## Authentication & Verification

Accounts are secured via **Supabase Auth**—ensuring all newly registered users complete **email verification** before accessing role dashboards.  
> Demo login:  
> [haloavy@gmail.com](mailto:haloavy@gmail.com) and password: Ayush2005

***

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=service-role-key

GOOGLE_CLOUD_PROJECT=your-google-project-id
GOOGLE_CLOUD_LOCATION=us-central1

GORQ_API_KEY=your-groq-api-key
```

***

## Installation & Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/amoghakoulapure/ACEAR2.0.git
cd ACEAR2.0
npm install
```

### 2. Set up UI Components

```bash
npx shadcn@latest add "https://v0.app/chat/b/b_lUMo72tR6Pw?...token=..."
```
(Pulls dashboard and auth templates)

### 3. Configure Supabase and Environment Variables

Set environment variables as above.

### 4. Launch Dev Server

```bash
npm run dev
# App available at http://localhost:3000
```

***

## Recommended Database Schema (Supabase)

**Key Tables:**

- `users` (id, name, email, role, verified, department_id)  
- `departments` (id, name, budget_total, head_user_id)  
- `funds` (id, department_id, category, amount_allocated, amount_spent, start_date, end_date)  
- `transactions` (id, fund_id, vendor_name, description, amount, date, status, created_by)  
- `vendors` (id, name, contact_info)  
- `projects` (id, name, department_id, budget, status)  
- `feedback` (id, user_id, transaction_id, comment, rating, timestamp)  
- `alerts` (id, user_id, message, type, created_at, read)  
- `audit_reports` (id, department_id, file_url, period, created_at)

Relationships:

- `users.department_id → departments.id`  
- `funds.department_id → departments.id`  
- `funds.id → transactions.fund_id`  
- `projects.department_id → departments.id`  
- `transactions.vendor_name → vendors.name`  
- `feedback.transaction_id → transactions.id`

Enable Supabase Row-Level Security (RLS).

***

## Security

- Robust **Row-Level Security** enforcing role-based data access.  
- Tamper-proof, digitally signed transactions.  
- Sensitive info such as salaries and vendor contracts restricted to admins.  
- Public dashboard exposes only non-sensitive, aggregated data.

***

## Deployment

1. Deploy frontend via **Vercel** or **Netlify**.  
2. Configure all environment variables in hosting provider.  
3. Serve backend and Auth via **Supabase Hosting**.

***

## Contributing

1. Fork repository and create feature branches (`feature-x`).  
2. Maintain transparency focus in dashboards and data handling.  
3. Submit pull requests for review.

## Contribution
1. V0 for front-end
2. Firebase
3. VS code
4. Supabase
also special thanks to ChatGPT and Gemini AI




***

![ACEAR Institute Financial Transparency System ER Diagram]

***
<img width="988" height="924" alt="ACEAR Institute Financial Transparency System – ER Diagram - visual selection" src="https://github.com/user-attachments/assets/229bf151-6afb-4f99-8abc-57236ac1a498" />
Image generated- ER diagram(using NAPKIN.AI)



