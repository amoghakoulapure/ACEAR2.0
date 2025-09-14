ACEAR Institute Financial Transparency System
A comprehensive financial transparency web platform for ACEAR Institute, built to foster trust, clarity, and accountability in institutional fund management. Designed for all stakeholders (faculty, students, parents, donors, auditors), the system simplifies budget allocation, fund tracking, dashboard analytics, anomaly detection, and public transparency.
Features
Multiple User Roles
Admins: Oversee all budgets, approve transactions, manage users.
Department Heads: Allocate and track department funds, review expenses.
Faculty: Propose events/projects, monitor funding.
Students & Parents: Access real-time dashboards, submit feedback on spendings.
Donors/Alumni: Explore impact dashboards for their contributions.
Auditors: Read-only access to audit reports and compliance data.
Financial Management
Centralized budget allocations with fine-grained categories (Salaries, Infrastructure, Library, R&D, Scholarships, Maintenance).
Track funds from source → department → project/event → vendor.
Fully exportable reports (PDF, Excel, CSV).
Dashboards & Reports
Interactive Sankey diagrams, line/pie charts to visualize flows.
Department and project "cards": budget, spent, balance.
Drill-down reporting (vendor, invoices, payment history).
Smart Features
Live fund usage tracking.
Anomaly detection for suspicious activity (overspending, duplicate vendors, etc.).
Custom alerts: Email, SMS, Push notifications.
Public portal with restricted, high-level transparency.
Comment/feedback system for students, parents, donors.
Sample Data
Department allocations, demo transactions, salary and scholarships structures provided for prototyping.
Updated Demo Data
Departments and Allocations:
Computer Science: ₹62,00,000
Electronics: ₹47,00,000
Civil Engineering: ₹39,00,000
Humanities & Social Sciences: ₹14,00,000
Sports & Wellness: ₹6,00,000
Sample Transactions:
₹6,75,000 – AlphaTech Solutions – Robotics Lab Equipment – Computer Science
₹8,80,000 – GreenBuild Limited – Classroom Renovation – Civil Engineering
₹4,10,000 – National Robotics Challenge – Electronics
₹1,90,000 – Annual Sports Carnival – Sports & Wellness
₹2,30,000 – Library Archives Upgrade – Humanities & Social Sciences
Recurring Expenses:
Faculty salaries, staff compensation, annual scholarships, library subscriptions, campus maintenance
Tech Stack
Frontend: Next.js, React, TailwindCSS, shadcn/ui
Backend: Supabase (PostgreSQL, Auth, RESTful APIs)
Auth: Supabase Auth with robust email verification
Visualization: Recharts, d3.js
Deployment: Vercel/Netlify (frontend), Supabase (backend)
Authentication & Verification
Accounts are secured via Supabase Auth—ensuring all newly registered users complete email verification before accessing role dashboards.
Demo login:
amoghakoulapure@gmail.com
Installation & Quick Start
1. Clone & Install
bash
git clone https://github.com/amoghakoulapure/ACEAR2.0.git
cd ACEAR2.0
npm install
2. Set up UI Components
bash
npx shadcn@latest add "https://v0.app/chat/b/b_lUMo72tR6Pw?...token=..."
(Pulls dashboard and auth templates)
3. Configure Supabase
Set up Supabase project and get API credentials:
text
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=service-role-key
4. Launch Dev Server
bash
npm run dev
# App at http://localhost:3000
Supabase Recommended Schema
Key Tables:
users (id, name, email, role, verified, department_id)
departments (id, name, budget_total, head_user_id)
funds (id, department_id, category, amount_allocated, amount_spent, start_date, end_date)
transactions (id, fund_id, vendor_name, description, amount, date, status, created_by)
vendors (id, name, contact_info)
projects (id, name, department_id, budget, status)
feedback (id, user_id, transaction_id, comment, rating, timestamp)
alerts (id, user_id, message, type, created_at, read)
audit_reports (id, department_id, file_url, period, created_at)
Relationships:
users.department_id → departments.id
funds.department_id → departments.id
funds.id → transactions.fund_id
projects.department_id → departments.id
transactions.vendor_name → vendors.name
feedback.transaction_id → transactions.id
Enable Supabase RLS for privacy and access control
Security
Robust Supabase Row-Level Security (RLS) for user roles
Tamper-proof, digitally signed transactions
Sensitive info (e.g., salaries, contracts) restricted to admins
Public dashboard exposes only non-sensitive, aggregate data
Deployment
Ship frontend via Vercel or Netlify
Configure environment variables
Serve backend/Auth via Supabase Hosting
Contributing
Fork and create dedicated branches (feature-x, bugfix-y)
Keep dashboards and financial models transparency-centric
Submit Pull Requests for code review
License
MIT License
