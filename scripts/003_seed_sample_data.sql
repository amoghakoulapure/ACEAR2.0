-- Seed sample data for ACEAR Institute

-- Adding admin user account
-- Insert admin user (Note: In production, this should be created through Supabase Auth)
-- This is a placeholder for the admin user profile that will be created when they sign up
INSERT INTO public.user_profiles (id, email, full_name, role, department_id, phone, office_location, office_hours, is_active) VALUES
  ('admin-0000-0000-0000-000000000001', 'admin@acear.edu', 'System Administrator', 'admin', NULL, '9000999000', 'Administration Building, Room 205, ACEAR Institute Financial Transparency System, Bangalore-560090', 'Monday - Friday, 9:00 AM - 5:00 PM', true);

-- Insert sample departments
INSERT INTO public.departments (id, name, code, type, budget_allocation, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Computer Science', 'CS', 'academic', 2500000.00, 'Department of Computer Science and Engineering'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mathematics', 'MATH', 'academic', 1800000.00, 'Department of Mathematics and Statistics'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Physics', 'PHYS', 'academic', 2200000.00, 'Department of Physics and Astronomy'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Business Administration', 'BUS', 'academic', 1500000.00, 'School of Business Administration'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Library Services', 'LIB', 'support', 800000.00, 'Academic Library and Information Services'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Student Affairs', 'SA', 'support', 600000.00, 'Student Affairs and Campus Life'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Facilities Management', 'FM', 'support', 1200000.00, 'Campus Facilities and Maintenance'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Information Technology', 'IT', 'support', 900000.00, 'Information Technology Services');

-- Insert sample fund sources
INSERT INTO public.fund_sources (id, name, type, total_amount, available_amount, description, grant_period_start, grant_period_end) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Federal Research Grant - NSF', 'research_grants', 5000000.00, 3200000.00, 'National Science Foundation research funding', '2024-01-01', '2026-12-31'),
  ('660e8400-e29b-41d4-a716-446655440002', 'State Education Funding', 'government_grants', 8000000.00, 6500000.00, 'Annual state education appropriation', '2024-01-01', '2024-12-31'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Student Tuition Revenue', 'tuition_fees', 12000000.00, 10500000.00, 'Undergraduate and graduate tuition fees', '2024-01-01', '2024-12-31'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Alumni Endowment Fund', 'endowment', 3000000.00, 2800000.00, 'Alumni donations and endowment income', '2024-01-01', '2024-12-31'),
  ('660e8400-e29b-41d4-a716-446655440005', 'Corporate Partnership - TechCorp', 'donations', 1500000.00, 1200000.00, 'Corporate sponsorship and research collaboration', '2024-01-01', '2025-12-31');

-- Insert sample budget allocations for current fiscal year (2024)
INSERT INTO public.budget_allocations (id, department_id, fund_source_id, category, allocated_amount, spent_amount, fiscal_year, description) VALUES
  -- Computer Science Department
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', 'salaries_benefits', 1800000.00, 1200000.00, 2024, 'Faculty and staff salaries'),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'research_development', 500000.00, 320000.00, 2024, 'Research projects and development'),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 'equipment_supplies', 200000.00, 150000.00, 2024, 'Computer equipment and lab supplies'),
  
  -- Mathematics Department
  ('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'salaries_benefits', 1200000.00, 800000.00, 2024, 'Faculty and staff salaries'),
  ('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'research_development', 400000.00, 250000.00, 2024, 'Mathematical research projects'),
  ('770e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', 'equipment_supplies', 200000.00, 120000.00, 2024, 'Software licenses and equipment'),
  
  -- Physics Department
  ('770e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 'salaries_benefits', 1500000.00, 1000000.00, 2024, 'Faculty and staff salaries'),
  ('770e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'research_development', 500000.00, 300000.00, 2024, 'Physics research and experiments'),
  ('770e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', 'equipment_supplies', 200000.00, 180000.00, 2024, 'Laboratory equipment'),
  
  -- Support Units
  ('770e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002', 'administrative_costs', 600000.00, 400000.00, 2024, 'Library operations'),
  ('770e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440003', 'student_services', 500000.00, 350000.00, 2024, 'Student programs and services'),
  ('770e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440002', 'infrastructure_maintenance', 1000000.00, 750000.00, 2024, 'Campus maintenance and utilities'),
  ('770e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440005', 'equipment_supplies', 700000.00, 500000.00, 2024, 'IT infrastructure and software');

-- Insert sample transactions
INSERT INTO public.transactions (id, budget_allocation_id, amount, description, transaction_date, vendor_name, invoice_number, status, created_by) VALUES
  -- Recent transactions (using placeholder UUID for created_by - will be updated when real users exist)
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 85000.00, 'Monthly faculty salaries - October 2024', '2024-10-01', 'Payroll Services Inc', 'PAY-2024-10-001', 'completed', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440003', 25000.00, 'Dell Workstation Computers (10 units)', '2024-10-15', 'Dell Technologies', 'DELL-INV-2024-1015', 'completed', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', 15000.00, 'Research software licenses', '2024-10-20', 'Software Solutions Ltd', 'SSL-2024-1020', 'approved', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440008', 45000.00, 'Laboratory equipment maintenance', '2024-10-25', 'LabTech Services', 'LTS-2024-1025', 'pending', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440012', 12000.00, 'HVAC system repair - Building A', '2024-11-01', 'Climate Control Co', 'CCC-2024-1101', 'completed', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440013', 8500.00, 'Network security software renewal', '2024-11-05', 'CyberSafe Systems', 'CSS-2024-1105', 'approved', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440011', 3200.00, 'Student event catering', '2024-11-10', 'Campus Catering', 'CC-2024-1110', 'completed', '00000000-0000-0000-0000-000000000000'),
  ('880e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440010', 5500.00, 'Library book acquisitions', '2024-11-12', 'Academic Publishers', 'AP-2024-1112', 'pending', '00000000-0000-0000-0000-000000000000');

-- Insert sample anomaly alerts
INSERT INTO public.anomaly_alerts (id, type, severity, title, description, related_transaction_id, is_resolved) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', 'budget_overrun', 'medium', 'Equipment Budget Approaching Limit', 'Physics Department equipment budget is at 90% utilization', '880e8400-e29b-41d4-a716-446655440004', false),
  ('990e8400-e29b-41d4-a716-446655440002', 'unusual_spending', 'low', 'Large Single Transaction', 'Transaction amount significantly higher than department average', '880e8400-e29b-41d4-a716-446655440004', false),
  ('990e8400-e29b-41d4-a716-446655440003', 'pending_approval', 'high', 'Long Pending Transaction', 'Transaction pending approval for over 10 days', '880e8400-e29b-41d4-a716-446655440004', false);
