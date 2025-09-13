"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TrendData {
  month: string
  spending: number
  cumulative: number
}

export function SpendingTrendsPublic() {
  const [data, setData] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: transactionData } = await supabase
        .from("transactions")
        .select("amount, transaction_date")
        .eq("status", "completed")
        .gte("transaction_date", "2024-01-01")
        .lte("transaction_date", "2024-12-31")
        .order("transaction_date")

      if (transactionData) {
        const monthlyData = transactionData.reduce(
          (acc, transaction) => {
            const date = new Date(transaction.transaction_date)
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
            const monthName = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })

            if (!acc[monthKey]) {
              acc[monthKey] = { month: monthName, spending: 0 }
            }
            acc[monthKey].spending += Number(transaction.amount)
            return acc
          },
          {} as Record<string, { month: string; spending: number }>,
        )

        let cumulative = 0
        const chartData = Object.values(monthlyData).map((item) => {
          cumulative += item.spending
          return {
            ...item,
            cumulative,
          }
        })

        setData(chartData)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="h-96 flex items-center justify-center">Loading spending trends...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Patterns (FY 2024)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track how ACEAR Institute invests funds throughout the fiscal year
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `₹${value.toLocaleString()}`,
                  name === "spending" ? "Monthly Spending" : "Cumulative Spending",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Monthly Spending"
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#10b981"
                strokeWidth={3}
                name="Cumulative Spending"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
