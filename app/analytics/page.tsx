import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BudgetDistributionChart } from "@/components/analytics/budget-distribution-chart"
import { SpendingTrendsChart } from "@/components/analytics/spending-trends-chart"
import { FundSourcesChart } from "@/components/analytics/fund-sources-chart"
import { DepartmentComparisonChart } from "@/components/analytics/department-comparison-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AnalyticsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600 mt-2">Interactive visualizations of financial data and trends</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetDistributionChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fund Sources Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <FundSourcesChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingTrendsChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Budget Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <DepartmentComparisonChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
