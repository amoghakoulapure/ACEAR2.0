import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, GraduationCap, BookOpen, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  department_id?: string
}

interface StudentParentDashboardProps {
  profile: Profile
}

export async function StudentParentDashboard({ profile }: StudentParentDashboardProps) {
  const supabase = await createClient()

  // Get public financial data for transparency
  const { data: budgetSummary } = await supabase
    .from("budget_allocations")
    .select(`
      category,
      allocated_amount,
      spent_amount,
      departments!inner(name, type)
    `)
    .eq("fiscal_year", 2024)

  // Calculate totals by department type
  const academicTotal =
    budgetSummary
      ?.filter((item) => item.departments?.type === "academic")
      .reduce((sum, item) => sum + Number(item.allocated_amount), 0) || 0

  const supportTotal =
    budgetSummary
      ?.filter((item) => item.departments?.type === "support")
      .reduce((sum, item) => sum + Number(item.allocated_amount), 0) || 0

  const totalBudget = academicTotal + supportTotal
  const academicPercentage = totalBudget > 0 ? (academicTotal / totalBudget) * 100 : 0
  const supportPercentage = totalBudget > 0 ? (supportTotal / totalBudget) * 100 : 0

  // Get student services spending
  const studentServicesSpending =
    budgetSummary
      ?.filter((item) => item.category === "student_services")
      .reduce((sum, item) => sum + Number(item.spent_amount), 0) || 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.role === "student" ? "Student" : "Parent"} Portal
          </h1>
          <p className="text-gray-600 mt-2">Transparency into ACEAR Institute's financial operations</p>
        </div>
        <Link href="/public/transparency">
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Full Transparency Portal
          </Button>
        </Link>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Institute Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Fiscal Year 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicPercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">${academicTotal.toLocaleString()} allocated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Services</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${studentServicesSpending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Spent on student programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>How Your Tuition is Allocated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Academic Programs & Research</span>
                <span className="text-sm text-muted-foreground">{academicPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={academicPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                Faculty salaries, research, equipment, and academic resources
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Support Services & Infrastructure</span>
                <span className="text-sm text-muted-foreground">{supportPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={supportPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                Student services, library, IT, facilities, and administration
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Spending Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Department Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetSummary
              ?.filter((item) => item.departments?.type === "academic")
              .reduce(
                (acc, item) => {
                  const deptName = item.departments?.name || "Unknown"
                  if (!acc[deptName]) {
                    acc[deptName] = 0
                  }
                  acc[deptName] += Number(item.allocated_amount)
                  return acc
                },
                {} as Record<string, number>,
              )
              ? Object.entries(
                  budgetSummary
                    ?.filter((item) => item.departments?.type === "academic")
                    .reduce(
                      (acc, item) => {
                        const deptName = item.departments?.name || "Unknown"
                        if (!acc[deptName]) {
                          acc[deptName] = 0
                        }
                        acc[deptName] += Number(item.allocated_amount)
                        return acc
                      },
                      {} as Record<string, number>,
                    ) || {},
                )
                  .sort(([, a], [, b]) => b - a)
                  .map(([department, amount]) => (
                    <div key={department} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="font-medium">{department}</span>
                      <span className="text-sm font-semibold">${amount.toLocaleString()}</span>
                    </div>
                  ))
              : null}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Transparency Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/public/transparency">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Complete Financial Reports
              </Button>
            </Link>
            <Link href="/public/transparency#fund-sources">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <DollarSign className="h-4 w-4 mr-2" />
                Funding Sources
              </Button>
            </Link>
            <Link href="/public/transparency#spending-trends">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BookOpen className="h-4 w-4 mr-2" />
                Spending Trends
              </Button>
            </Link>
            <Link href="/public/transparency#contact">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <GraduationCap className="h-4 w-4 mr-2" />
                Contact Financial Office
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
