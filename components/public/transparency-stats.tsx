import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, Building } from "lucide-react"

export async function TransparencyStats() {
  const supabase = await createClient()

  // Get total budget allocation
  const { data: budgetData } = await supabase
    .from("budget_allocations")
    .select("allocated_amount, spent_amount")
    .eq("fiscal_year", 2024)

  const totalAllocated = budgetData?.reduce((sum, item) => sum + Number(item.allocated_amount), 0) || 0
  const totalSpent = budgetData?.reduce((sum, item) => sum + Number(item.spent_amount), 0) || 0

  // Get departments count
  const { count: departmentsCount } = await supabase.from("departments").select("*", { count: "exact", head: true })

  // Get fund sources count
  const { count: fundSourcesCount } = await supabase.from("fund_sources").select("*", { count: "exact", head: true })

  const utilizationRate = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Budget FY 2024</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">${totalAllocated.toLocaleString()}</div>
          <p className="text-xs text-blue-700">Allocated across all programs</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">Budget Utilization</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{utilizationRate.toFixed(1)}%</div>
          <p className="text-xs text-green-700">${totalSpent.toLocaleString()} invested</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-900">Academic Departments</CardTitle>
          <Building className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{departmentsCount || 0}</div>
          <p className="text-xs text-purple-700">Active departments & units</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-900">Funding Sources</CardTitle>
          <Users className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{fundSourcesCount || 0}</div>
          <p className="text-xs text-orange-700">Diverse funding streams</p>
        </CardContent>
      </Card>
    </div>
  )
}
