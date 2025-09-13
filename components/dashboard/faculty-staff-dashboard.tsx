import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, FileText, Clock, Plus } from "lucide-react"
import Link from "next/link"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  department_id?: string
}

interface FacultyStaffDashboardProps {
  profile: Profile
}

export async function FacultyStaffDashboard({ profile }: FacultyStaffDashboardProps) {
  const supabase = await createClient()

  // Get department information
  const { data: department } = await supabase.from("departments").select("*").eq("id", profile.department_id).single()

  // Get user's transactions
  const { data: userTransactions } = await supabase
    .from("transactions")
    .select(`
      *,
      budget_allocations!inner(
        category,
        departments!inner(name)
      )
    `)
    .eq("created_by", profile.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get pending transactions count
  const { count: pendingCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .eq("created_by", profile.id)
    .eq("status", "pending")

  // Get total amount of user's transactions
  const totalAmount = userTransactions?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) || 0

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
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} - {department?.name}
          </p>
        </div>
        <Link href="/transactions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Transaction Request
          </Button>
        </Link>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{userTransactions?.length || 0} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{department?.code || "N/A"}</div>
            <p className="text-xs text-muted-foreground">{department?.name || "No department"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Recent Transactions</CardTitle>
          <Link href="/transactions">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userTransactions?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No transactions yet</p>
                <Link href="/transactions/new">
                  <Button className="mt-2" size="sm">
                    Create Your First Transaction
                  </Button>
                </Link>
              </div>
            ) : (
              userTransactions?.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{transaction.description}</h4>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {transaction.budget_allocations?.category?.replace("_", " ").toUpperCase()} •{" "}
                      {transaction.vendor_name} • {new Date(transaction.transaction_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${Number(transaction.amount).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{transaction.invoice_number}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/transactions/new">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Submit Expense Request
              </Button>
            </Link>
            <Link href="/transactions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                View My Transactions
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <DollarSign className="h-4 w-4 mr-2" />
                Department Budget View
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
