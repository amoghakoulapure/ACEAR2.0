"use client"

import { useTransparencyData } from "./transparency-data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TrendData {
  month: string;
  spending: number;
  cumulative: number;
}

export function SpendingTrendsPublic() {
  const { spendingTrends, setSpendingTrends } = useTransparencyData() || {};
  const loading = !spendingTrends;
  const data = spendingTrends || [];

  if (loading) {
    return <div className="h-96 flex items-center justify-center">Loading spending trends...</div>;
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
  );
}
