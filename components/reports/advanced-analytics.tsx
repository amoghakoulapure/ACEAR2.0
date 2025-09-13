"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Activity, AlertTriangle, Target } from "lucide-react"

interface Profile {
  id: string
  role: string
  department_id?: string
}

interface AdvancedAnalyticsProps {
  profile: Profile
}

export function AdvancedAnalytics({ profile }: AdvancedAnalyticsProps) {
  const [selectedMetric, setSelectedMetric] = useState("efficiency")
  const [timeframe, setTimeframe] = useState("quarterly")

  const isAdmin = profile.role === "super_admin" || profile.role === "financial_admin"

  const analyticsModules = [
    {
      id: "efficiency",
      title: "Budget Efficiency Analysis",
      description: "Analyze spending efficiency across departments and categories",
      icon: Target,
      metrics: ["Cost per student", "Research ROI", "Administrative overhead", "Facility utilization"],
    },
    {
      id: "trends",
      title: "Predictive Spending Trends",
      description: "Forecast future spending patterns based on historical data",
      icon: TrendingUp,
      metrics: ["Seasonal patterns", "Growth projections", "Budget forecasts", "Risk indicators"],
    },
    {
      id: "benchmarking",
      title: "Comparative Benchmarking",
      description: "Compare performance against industry standards and peer institutions",
      icon: BarChart3,
      metrics: ["Peer comparison", "Industry benchmarks", "Best practices", "Performance gaps"],
    },
    {
      id: "anomaly",
      title: "Anomaly Detection",
      description: "Identify unusual spending patterns and potential issues",
      icon: AlertTriangle,
      metrics: ["Spending anomalies", "Budget overruns", "Unusual transactions", "Risk assessment"],
    },
  ]

  const insights = [
    {
      type: "positive",
      title: "Research Efficiency Improved",
      description: "Research spending efficiency increased by 15% compared to last quarter",
      impact: "High",
    },
    {
      type: "warning",
      title: "Administrative Costs Rising",
      description: "Administrative overhead has increased 8% above target levels",
      impact: "Medium",
    },
    {
      type: "info",
      title: "Seasonal Pattern Detected",
      description: "Equipment purchases typically spike in Q3, plan accordingly",
      impact: "Low",
    },
    {
      type: "positive",
      title: "Fund Diversification Success",
      description: "Successfully reduced dependency on single funding source to 45%",
      impact: "High",
    },
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Advanced Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Advanced analytics features are available to administrators only</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Advanced Analytics</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Deep insights and predictive analytics for strategic financial planning
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="modules" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Analytics Modules</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="configure">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsModules.map((module) => {
                const Icon = module.icon
                return (
                  <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-700">Key Metrics:</p>
                        <div className="flex flex-wrap gap-1">
                          {module.metrics.map((metric) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Run Analysis
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                      <Badge className={getImpactColor(insight.impact)}>{insight.impact} Impact</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configure" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Analysis Frequency</label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Primary Metric Focus</label>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efficiency">Budget Efficiency</SelectItem>
                      <SelectItem value="utilization">Resource Utilization</SelectItem>
                      <SelectItem value="performance">Performance Metrics</SelectItem>
                      <SelectItem value="risk">Risk Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Automated Alerts</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Budget variance &gt; 10%</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Unusual spending patterns</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Efficiency drops below threshold</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Fund utilization milestones</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full">Save Configuration</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
