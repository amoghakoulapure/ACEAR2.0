import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export async function BudgetOverview() {
  // Sample budget data for demo
  const sampleBudgetData = [
    {
      id: "1",
      department_name: "Computer Science",
      category: "equipment_technology",
      allocated_amount: 5000000,
      spent_amount: 3800000,
      health: "healthy",
    },
    {
      id: "2",
      department_name: "Civil",
      category: "infrastructure_maintenance",
      allocated_amount: 3500000,
      spent_amount: 3700000,
      health: "overspent",
    },
    {
      id: "3",
      department_name: "Mechanical",
      category: "equipment_technology",
      allocated_amount: 4000000,
      spent_amount: 2100000,
      health: "moderate",
    },
    {
      id: "4",
      department_name: "Library",
      category: "academic_resources",
      allocated_amount: 1000000,
      spent_amount: 800000,
      health: "healthy",
    },
    {
      id: "5",
      department_name: "Sports",
      category: "student_activities",
      allocated_amount: 800000,
      spent_amount: 600000,
      health: "healthy",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getHealthBadge = (health: string, utilizationRate: number) => {
    if (health === "overspent" || utilizationRate > 100) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔴 Overspent</Badge>
    } else if (health === "moderate" || utilizationRate < 60) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Moderate</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🟢 Healthy</Badge>
    }
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Budget Overview by Department</CardTitle>
        <p className="text-sm text-gray-600">Current fiscal year utilization</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sampleBudgetData.map((budget) => {
            const utilizationRate =
              budget.allocated_amount > 0 ? (budget.spent_amount / budget.allocated_amount) * 100 : 0

            return (
              <div key={budget.id} className="space-y-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{budget.department_name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{budget.category.replace("_", " ")}</p>
                  </div>
                  {getHealthBadge(budget.health, utilizationRate)}
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Budget Utilization</span>
                  <span className="font-medium">{utilizationRate.toFixed(1)}%</span>
                </div>

                <Progress
                  value={Math.min(utilizationRate, 100)}
                  className={`h-3 ${
                    utilizationRate > 100
                      ? "[&>div]:bg-red-500"
                      : utilizationRate < 60
                        ? "[&>div]:bg-yellow-500"
                        : "[&>div]:bg-green-500"
                  }`}
                />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Spent: </span>
                    <span className="font-semibold text-gray-900">{formatCurrency(budget.spent_amount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Allocated: </span>
                    <span className="font-semibold text-blue-600">{formatCurrency(budget.allocated_amount)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
