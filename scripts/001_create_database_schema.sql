-- ACEAR Institute Financial Transparency System Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles enum
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'financial_admin', 
  'department_head',
  'faculty',
  'staff',
  'student',
  'parent',
  'donor',
  'auditor',
  'public'
);

-- Department types enum
CREATE TYPE department_type AS ENUM (
  'academic',
  'support'
);

-- Fund source types enum
CREATE TYPE fund_source_type AS ENUM (
  'government_grants',
  'tuition_fees',
  'donations',
  'research_grants',
  'endowment',
  'other'
);

-- Budget category types enum
CREATE TYPE budget_category AS ENUM (
  'salaries_benefits',
  'research_development',
  'infrastructure_maintenance',
  'student_services',
  'administrative_costs',
  'equipment_supplies',
  'utilities',
  'other'
);

-- Transaction status enum
CREATE TYPE transaction_status AS ENUM (
  'pending',
  'approved',
  'completed',
  'rejected',
  'flagged'
);

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'public',
  department_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  type department_type NOT NULL,
  head_id UUID REFERENCES public.profiles(id),
  budget_allocation DECIMAL(15,2) DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create fund sources table
CREATE TABLE IF NOT EXISTS public.fund_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type fund_source_type NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  available_amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  donor_name TEXT,
  grant_period_start DATE,
  grant_period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budget allocations table
CREATE TABLE IF NOT EXISTS public.budget_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES public.departments(id),
  fund_source_id UUID NOT NULL REFERENCES public.fund_sources(id),
  category budget_category NOT NULL,
  allocated_amount DECIMAL(15,2) NOT NULL,
  spent_amount DECIMAL(15,2) DEFAULT 0,
  fiscal_year INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_allocation_id UUID NOT NULL REFERENCES public.budget_allocations(id),
  amount DECIMAL(15,2) NOT NULL,
  description TEXT NOT NULL,
  transaction_date DATE NOT NULL,
  vendor_name TEXT,
  invoice_number TEXT,
  status transaction_status DEFAULT 'pending',
  approved_by UUID REFERENCES public.profiles(id),
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create anomaly alerts table
CREATE TABLE IF NOT EXISTS public.anomaly_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  related_transaction_id UUID REFERENCES public.transactions(id),
  related_budget_id UUID REFERENCES public.budget_allocations(id),
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint for department_id in profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT fk_profiles_department 
FOREIGN KEY (department_id) REFERENCES public.departments(id);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomaly_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin')
    )
  );

-- Create RLS policies for departments
CREATE POLICY "Everyone can view departments" ON public.departments
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin')
    )
  );

-- Create RLS policies for fund sources
CREATE POLICY "Authenticated users can view fund sources" ON public.fund_sources
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage fund sources" ON public.fund_sources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin')
    )
  );

-- Create RLS policies for budget allocations
CREATE POLICY "Users can view budget allocations" ON public.budget_allocations
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND (
      -- Public access for transparency
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid()) OR
      -- Department heads can see their department's budget
      EXISTS (
        SELECT 1 FROM public.profiles p
        JOIN public.departments d ON p.department_id = d.id
        WHERE p.id = auth.uid() 
        AND (p.role = 'department_head' OR d.id = budget_allocations.department_id)
      )
    )
  );

CREATE POLICY "Admins can manage budget allocations" ON public.budget_allocations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin')
    )
  );

-- Create RLS policies for transactions
CREATE POLICY "Users can view transactions" ON public.transactions
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND (
      -- Users can see transactions they created
      created_by = auth.uid() OR
      -- Department heads can see their department's transactions
      EXISTS (
        SELECT 1 FROM public.profiles p
        JOIN public.departments d ON p.department_id = d.id
        JOIN public.budget_allocations ba ON ba.department_id = d.id
        WHERE p.id = auth.uid() 
        AND ba.id = transactions.budget_allocation_id
        AND p.role = 'department_head'
      ) OR
      -- Admins and auditors can see all
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('super_admin', 'financial_admin', 'auditor')
      )
    )
  );

CREATE POLICY "Users can create transactions" ON public.transactions
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin', 'department_head', 'faculty', 'staff')
    )
  );

-- Create RLS policies for audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin', 'auditor')
    )
  );

-- Create RLS policies for anomaly alerts
CREATE POLICY "Admins can view anomaly alerts" ON public.anomaly_alerts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'financial_admin', 'auditor')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_department ON public.profiles(department_id);
CREATE INDEX idx_departments_type ON public.departments(type);
CREATE INDEX idx_budget_allocations_department ON public.budget_allocations(department_id);
CREATE INDEX idx_budget_allocations_fiscal_year ON public.budget_allocations(fiscal_year);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_budget_allocation ON public.transactions(budget_allocation_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_anomaly_alerts_created_at ON public.anomaly_alerts(created_at);
