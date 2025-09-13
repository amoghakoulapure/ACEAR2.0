import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, AlertTriangle, Users } from "lucide-react"

export async function DashboardStats() {
  const supabase = await createClient()

  // Get total budget allocation
  const { data: budgetData } = await supabase
    .from("budget_allocations")
    .select("allocated_amount, spent_amount")
    .eq("fiscal_year", 2024)

  const totalAllocated = budgetData?.reduce((sum, item) => sum + Number(item.allocated_amount), 0) || 0
  const totalSpent = budgetData?.reduce((sum, item) => sum + Number(item.spent_amount), 0) || 0

  // Get pending transactions count
  const { count: pendingCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // Get active alerts count
  const { count: alertsCount } = await supabase
    .from("anomaly_alerts")
    .select("*", { count: "exact", head: true })
    .eq("is_resolved", false)

  // Get departments count
  const { count: departmentsCount } = await supabase.from("departments").select("*", { count: "exact", head: true })

  const utilizationRate = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAllocated.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            ${totalSpent.toLocaleString()} spent ({utilizationRate.toFixed(1)}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">${(totalAllocated - totalSpent).toLocaleString()} remaining</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount || 0}</div>
          <p className="text-xs text-muted-foreground">{alertsCount || 0} active alerts</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{departmentsCount || 0}</div>
          <p className="text-xs text-muted-foreground">Active departments</p>
        </CardContent>
      </Card>
    </div>
  )
}
