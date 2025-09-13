"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertTriangle, Building, DollarSign, Activity } from "lucide-react"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ColorfulStats() {
  const stats = [
    {
      title: "Total Budget",
      value: formatCurrency(14300000),
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      textColor: "text-white",
    },
    {
      title: "Total Spent",
      value: formatCurrency(11000000),
      change: "77% utilized",
      trend: "up",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-green-500 to-green-600",
      textColor: "text-white",
    },
    {
      title: "Active Departments",
      value: "5",
      change: "All operational",
      trend: "stable",
      icon: Building,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      textColor: "text-white",
    },
    {
      title: "Anomalies Detected",
      value: "1",
      change: "Civil Dept",
      trend: "down",
      icon: AlertTriangle,
      color: "bg-gradient-to-r from-red-500 to-red-600",
      textColor: "text-white",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className={`${stat.color} p-6`}>
              <CardHeader className="p-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-sm font-medium ${stat.textColor} opacity-90`}>{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.textColor} opacity-80`} />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
                <div className="flex items-center space-x-1">
                  {stat.trend === "up" && <TrendingUp className={`h-3 w-3 ${stat.textColor} opacity-80`} />}
                  {stat.trend === "down" && <TrendingDown className={`h-3 w-3 ${stat.textColor} opacity-80`} />}
                  {stat.trend === "stable" && <Activity className={`h-3 w-3 ${stat.textColor} opacity-80`} />}
                  <span className={`text-xs ${stat.textColor} opacity-90`}>{stat.change}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
