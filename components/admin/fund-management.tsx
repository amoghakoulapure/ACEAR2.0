import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, DollarSign, Calendar } from "lucide-react"

export async function FundManagement() {
  const supabase = await createClient()

  const { data: fundSources } = await supabase
    .from("fund_sources")
    .select("*")
    .order("created_at", { ascending: false })

  const { data: budgetAllocations } = await supabase
    .from("budget_allocations")
    .select(`
      *,
      departments!inner(name, code),
      fund_sources!inner(name, type)
    `)
    .eq("fiscal_year", 2024)
    .order("allocated_amount", { ascending: false })

  const getFundTypeColor = (type: string) => {
    switch (type) {
      case "government_grants":
        return "bg-blue-100 text-blue-800"
      case "tuition_fees":
        return "bg-green-100 text-green-800"
      case "donations":
        return "bg-purple-100 text-purple-800"
      case "research_grants":
        return "bg-orange-100 text-orange-800"
      case "endowment":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Fund Sources Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Fund Sources</span>
          </CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Fund Source
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundSources?.map((fund) => {
              const utilizationRate =
                Number(fund.total_amount) > 0
                  ? ((Number(fund.total_amount) - Number(fund.available_amount)) / Number(fund.total_amount)) * 100
                  : 0

              return (
                <div key={fund.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{fund.name}</h3>
                      <Badge className={getFundTypeColor(fund.type)}>{fund.type.replace("_", " ").toUpperCase()}</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Amount:</span>
                      <span className="font-medium">${Number(fund.total_amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-green-600">
                        ${Number(fund.available_amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Utilized:</span>
                      <span className="font-medium">{utilizationRate.toFixed(1)}%</span>
                    </div>
                  </div>

                  <Progress value={utilizationRate} className="h-2" />

                  {fund.grant_period_start && fund.grant_period_end && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(fund.grant_period_start).toLocaleDateString()} -{" "}
                      {new Date(fund.grant_period_end).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocations Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Budget Allocations (FY 2024)</CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Allocation
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Fund Source</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-right py-3 px-4">Allocated</th>
                  <th className="text-right py-3 px-4">Spent</th>
                  <th className="text-right py-3 px-4">Remaining</th>
                  <th className="text-center py-3 px-4">Utilization</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgetAllocations?.map((allocation) => {
                  const allocated = Number(allocation.allocated_amount)
                  const spent = Number(allocation.spent_amount)
                  const remaining = allocated - spent
                  const utilizationRate = allocated > 0 ? (spent / allocated) * 100 : 0

                  return (
                    <tr key={allocation.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{allocation.departments?.name}</div>
                          <div className="text-sm text-muted-foreground">{allocation.departments?.code}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{allocation.fund_sources?.name}</div>
                          <Badge className={getFundTypeColor(allocation.fund_sources?.type || "")}>
                            {allocation.fund_sources?.type?.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{allocation.category.replace("_", " ").toUpperCase()}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">${allocated.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">${spent.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={remaining < 0 ? "text-red-600" : "text-green-600"}>
                          ${remaining.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Progress value={utilizationRate} className="w-16 h-2" />
                          <span className="text-sm font-medium">{utilizationRate.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
