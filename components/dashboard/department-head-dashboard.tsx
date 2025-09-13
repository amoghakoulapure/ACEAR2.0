import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  department_id?: string
}

interface DepartmentHeadDashboardProps {
  profile: Profile
}

export async function DepartmentHeadDashboard({ profile }: DepartmentHeadDashboardProps) {
  const supabase = await createClient()

  // Get department information
  const { data: department } = await supabase.from("departments").select("*").eq("id", profile.department_id).single()

  // Get department budget allocations
  const { data: budgetAllocations } = await supabase
    .from("budget_allocations")
    .select(`
      *,
      fund_sources!inner(name, type)
    `)
    .eq("department_id", profile.department_id)
    .eq("fiscal_year", 2024)

  // Get recent transactions for this department
  const { data: recentTransactions } = await supabase
    .from("transactions")
    .select(`
      *,
      budget_allocations!inner(department_id)
    `)
    .eq("budget_allocations.department_id", profile.department_id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get pending transactions count
  const { count: pendingCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("budget_allocations.department_id", profile.department_id)
    .eq("status", "pending")

  const totalAllocated = budgetAllocations?.reduce((sum, item) => sum + Number(item.allocated_amount), 0) || 0
  const totalSpent = budgetAllocations?.reduce((sum, item) => sum + Number(item.spent_amount), 0) || 0
  const utilizationRate = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Department Dashboard</h1>
          <p className="text-gray-600 mt-2">
            {department?.name} ({department?.code}) - Financial Overview
          </p>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAllocated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Allocated for FY 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">${totalSpent.toLocaleString()} spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalAllocated - totalSpent).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{(100 - utilizationRate).toFixed(1)}% remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetAllocations?.map((allocation) => {
                const categoryUtilization =
                  Number(allocation.allocated_amount) > 0
                    ? (Number(allocation.spent_amount) / Number(allocation.allocated_amount)) * 100
                    : 0

                return (
                  <div key={allocation.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{allocation.category.replace("_", " ").toUpperCase()}</h4>
                        <p className="text-sm text-muted-foreground">{allocation.fund_sources?.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${Number(allocation.spent_amount).toLocaleString()} / $
                          {Number(allocation.allocated_amount).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{categoryUtilization.toFixed(1)}% used</div>
                      </div>
                    </div>
                    <Progress value={categoryUtilization} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Department Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions?.slice(0, 8).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{transaction.description}</h4>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {transaction.vendor_name} • {new Date(transaction.transaction_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${Number(transaction.amount).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
