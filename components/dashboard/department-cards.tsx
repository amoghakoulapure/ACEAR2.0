"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, BarChart3 } from "lucide-react"
import { useState } from "react"

interface Department {
  name: string
  totalBudget: number
  spent: number
  remaining: number
  utilization: number
  health: "healthy" | "moderate" | "overspent"
  transactions: number
}

const sampleDepartments: Department[] = [
  {
    name: "Computer Science",
    totalBudget: 5000000,
    spent: 3800000,
    remaining: 1200000,
    utilization: 76,
    health: "healthy",
    transactions: 24,
  },
  {
    name: "Mechanical",
    totalBudget: 4000000,
    spent: 2100000,
    remaining: 1900000,
    utilization: 52,
    health: "moderate",
    transactions: 18,
  },
  {
    name: "Civil",
    totalBudget: 3500000,
    spent: 3700000,
    remaining: -200000,
    utilization: 106,
    health: "overspent",
    transactions: 31,
  },
  {
    name: "Library",
    totalBudget: 1000000,
    spent: 800000,
    remaining: 200000,
    utilization: 80,
    health: "healthy",
    transactions: 12,
  },
  {
    name: "Sports",
    totalBudget: 800000,
    spent: 600000,
    remaining: 200000,
    utilization: 75,
    health: "healthy",
    transactions: 8,
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

const getHealthColor = (health: string) => {
  switch (health) {
    case "healthy":
      return "bg-green-500"
    case "moderate":
      return "bg-yellow-500"
    case "overspent":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getHealthBadge = (health: string) => {
  switch (health) {
    case "healthy":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🟢 Healthy</Badge>
    case "moderate":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Moderate</Badge>
    case "overspent":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔴 Overspent</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

export function DepartmentCards() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Department Overview</h2>
        <p className="text-sm text-gray-600">Real-estate style property cards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleDepartments.map((dept) => (
          <Card
            key={dept.name}
            className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">{dept.name}</CardTitle>
                {getHealthBadge(dept.health)}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>{dept.transactions} transactions</span>
                <span>•</span>
                <span>{dept.utilization}% utilized</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget Utilization</span>
                  <span className="font-medium">{dept.utilization}%</span>
                </div>
                <Progress
                  value={Math.min(dept.utilization, 100)}
                  className={`h-2 ${dept.health === "overspent" ? "[&>div]:bg-red-500" : dept.health === "moderate" ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Budget</p>
                  <p className="font-semibold text-blue-600">{formatCurrency(dept.totalBudget)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Spent</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(dept.spent)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Remaining</p>
                  <p className={`font-semibold ${dept.remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                    {formatCurrency(dept.remaining)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Health</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getHealthColor(dept.health)}`}></div>
                    <span className="text-xs capitalize">{dept.health}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs bg-transparent"
                  onClick={() => setSelectedDept(dept.name)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
