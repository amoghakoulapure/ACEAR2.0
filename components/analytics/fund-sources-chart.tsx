"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface FundData {
  name: string
  total: number
  available: number
  utilized: number
}

export function FundSourcesChart() {
  const [data, setData] = useState<FundData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: fundData } = await supabase.from("fund_sources").select("name, total_amount, available_amount")

      if (fundData) {
        const chartData = fundData.map((fund) => ({
          name: fund.name.length > 20 ? fund.name.substring(0, 20) + "..." : fund.name,
          total: Number(fund.total_amount),
          available: Number(fund.available_amount),
          utilized: Number(fund.total_amount) - Number(fund.available_amount),
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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
          <Legend />
          <Bar dataKey="utilized" stackId="a" fill="#ef4444" name="Utilized" />
          <Bar dataKey="available" stackId="a" fill="#10b981" name="Available" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
