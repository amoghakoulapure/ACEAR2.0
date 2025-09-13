import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReportGenerator } from "@/components/reports/report-generator"
import { PrebuiltReports } from "@/components/reports/prebuilt-reports"
import { AdvancedAnalytics } from "@/components/reports/advanced-analytics"

export default async function ReportsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive financial reports and perform advanced analysis</p>
        </div>

        <div className="space-y-8">
          {/* Quick Report Generation */}
          <ReportGenerator profile={profile} />

          {/* Pre-built Reports */}
          <PrebuiltReports profile={profile} />

          {/* Advanced Analytics */}
          <AdvancedAnalytics profile={profile} />
        </div>
      </main>
    </div>
  )
}
