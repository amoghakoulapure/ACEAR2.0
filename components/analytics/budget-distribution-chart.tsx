"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface BudgetData {
  category: string
  amount: number
  color: string
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
]

export function BudgetDistributionChart() {
  const [data, setData] = useState<BudgetData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: budgetData } = await supabase
        .from("budget_allocations")
        .select("category, allocated_amount")
        .eq("fiscal_year", 2024)

      if (budgetData) {
        const categoryTotals = budgetData.reduce(
          (acc, item) => {
            const category = item.category.replace("_", " ").toUpperCase()
            acc[category] = (acc[category] || 0) + Number(item.allocated_amount)
            return acc
          },
          {} as Record<string, number>,
        )

        const chartData = Object.entries(categoryTotals).map(([category, amount], index) => ({
          category,
          amount,
          color: COLORS[index % COLORS.length],
        }))

        setData(chartData)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="h-80 flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
