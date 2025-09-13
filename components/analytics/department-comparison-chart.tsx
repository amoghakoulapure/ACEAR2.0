"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface DepartmentData {
  department: string
  allocated: number
  spent: number
  utilization: number
}

export function DepartmentComparisonChart() {
  const [data, setData] = useState<DepartmentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: budgetData } = await supabase
        .from("budget_allocations")
        .select(`
          allocated_amount,
          spent_amount,
          departments!inner(name, code)
        `)
        .eq("fiscal_year", 2024)

      if (budgetData) {
        const departmentTotals = budgetData.reduce(
          (acc, item) => {
            const deptName = item.departments?.name || "Unknown"
            if (!acc[deptName]) {
              acc[deptName] = { allocated: 0, spent: 0 }
            }
            acc[deptName].allocated += Number(item.allocated_amount)
            acc[deptName].spent += Number(item.spent_amount)
            return acc
          },
          {} as Record<string, { allocated: number; spent: number }>,
        )

        const chartData = Object.entries(departmentTotals).map(([department, totals]) => ({
          department: department.length > 15 ? department.substring(0, 15) + "..." : department,
          allocated: totals.allocated,
          spent: totals.spent,
          utilization: totals.allocated > 0 ? (totals.spent / totals.allocated) * 100 : 0,
        }))

        setData(chartData.sort((a, b) => b.allocated - a.allocated))
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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
          <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "utilization") {
                return [`${value.toFixed(1)}%`, "Utilization Rate"]
              }
              return [`$${value.toLocaleString()}`, name === "allocated" ? "Allocated" : "Spent"]
            }}
          />
          <Legend />
          <Bar dataKey="allocated" fill="#3b82f6" name="Allocated Budget" />
          <Bar dataKey="spent" fill="#10b981" name="Amount Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
