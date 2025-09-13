import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { DepartmentHeadDashboard } from "@/components/dashboard/department-head-dashboard"
import { FacultyStaffDashboard } from "@/components/dashboard/faculty-staff-dashboard"
import { StudentParentDashboard } from "@/components/dashboard/student-parent-dashboard"
import { AuditorDashboard } from "@/components/dashboard/auditor-dashboard"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile to check role
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case "super_admin":
      case "financial_admin":
        return <AdminDashboard profile={profile} />
      case "department_head":
        return <DepartmentHeadDashboard profile={profile} />
      case "faculty":
      case "staff":
        return <FacultyStaffDashboard profile={profile} />
      case "student":
      case "parent":
        return <StudentParentDashboard profile={profile} />
      case "auditor":
        return <AuditorDashboard profile={profile} />
      default:
        return <StudentParentDashboard profile={profile} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <DashboardHeader user={data.user} profile={profile} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{renderDashboard()}</main>
    </div>
  )
}
