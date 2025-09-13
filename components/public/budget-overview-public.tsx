"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface BudgetData {
  category: string
  allocated: number
  spent: number
  percentage: number
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

export function BudgetOverviewPublic() {
  const [data, setData] = useState<BudgetData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: budgetData } = await supabase
        .from("budget_allocations")
        .select("category, allocated_amount, spent_amount")
        .eq("fiscal_year", 2024)

      if (budgetData) {
        const categoryTotals = budgetData.reduce(
          (acc, item) => {
            const category = item.category.replace("_", " ").toUpperCase()
            if (!acc[category]) {
              acc[category] = { allocated: 0, spent: 0 }
            }
            acc[category].allocated += Number(item.allocated_amount)
            acc[category].spent += Number(item.spent_amount)
            return acc
          },
          {} as Record<string, { allocated: number; spent: number }>,
        )

        const totalAllocated = Object.values(categoryTotals).reduce((sum, item) => sum + item.allocated, 0)

        const chartData = Object.entries(categoryTotals).map(([category, amounts]) => ({
          category,
          allocated: amounts.allocated,
          spent: amounts.spent,
          percentage: totalAllocated > 0 ? (amounts.allocated / totalAllocated) * 100 : 0,
        }))

        setData(chartData.sort((a, b) => b.allocated - a.allocated))
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="h-96 flex items-center justify-center">Loading budget data...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Allocation by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="allocated"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Allocated"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Progress by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.map((category, index) => {
              const utilizationRate = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0

              return (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{category.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${category.spent.toLocaleString()} of ${category.allocated.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{utilizationRate.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">utilized</div>
                    </div>
                  </div>
                  <Progress value={utilizationRate} className="h-3" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
