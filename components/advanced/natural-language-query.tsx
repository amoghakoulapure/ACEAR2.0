"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const sampleQueries = [
  "Show me how education budget was distributed across districts in Q2",
  "Which department has the highest spending variance this month?",
  "Compare research grants allocation between 2023 and 2024",
  "Find all transactions above ₹1 lakh in the last 30 days",
  "What percentage of total budget is allocated to infrastructure?",
]

const queryResults = {
  "education budget": {
    type: "bar",
    data: [
      { district: "North Campus", amount: 2500000, percentage: 35 },
      { district: "South Campus", amount: 1800000, percentage: 25 },
      { district: "East Campus", amount: 1600000, percentage: 22 },
      { district: "West Campus", amount: 1300000, percentage: 18 },
    ],
    summary: "Education budget Q2 distribution shows North Campus receiving the highest allocation at ₹25L (35%)",
  },
  "highest spending variance": {
    type: "variance",
    data: [
      { department: "Civil Engineering", budgeted: 5000000, actual: 6200000, variance: 24 },
      { department: "Computer Science", budgeted: 4500000, actual: 4100000, variance: -9 },
      { department: "Mechanical", budgeted: 3800000, actual: 3200000, variance: -16 },
    ],
    summary: "Civil Engineering has the highest spending variance at +24% (₹12L over budget)",
  },
}

export function NaturalLanguageQuery() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const processQuery = async () => {
    setIsProcessing(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simple keyword matching for demo
    if (query.toLowerCase().includes("education budget")) {
      setResult(queryResults["education budget"])
    } else if (query.toLowerCase().includes("spending variance")) {
      setResult(queryResults["highest spending variance"])
    } else {
      setResult({
        type: "text",
        summary:
          "I understand you're asking about financial data. Let me analyze the available information and provide insights based on current budget allocations and spending patterns.",
      })
    }

    setIsProcessing(false)
  }

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗣️ Natural Language Financial Querying
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              NLP-Powered
            </Badge>
          </CardTitle>
          <CardDescription>
            Ask complex financial questions in plain English and get visual, verifiable answers instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about ACEAR's finances..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && processQuery()}
              />
              <Button
                onClick={processQuery}
                disabled={!query.trim() || isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? "Processing..." : "Ask"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try asking:</span>
              {sampleQueries.map((sample, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => setQuery(sample)} className="text-xs">
                  {sample}
                </Button>
              ))}
            </div>
          </div>

          {result && (
            <Card className="bg-white border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  🎯 Query Results
                  <Badge variant="secondary">Verified</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">{result.summary}</p>

                {result.type === "bar" && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="district" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, "Amount"]} />
                        <Bar dataKey="amount" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {result.type === "variance" && (
                  <div className="space-y-4">
                    {result.data.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{item.department}</span>
                          <div className="text-sm text-gray-600">
                            Budgeted: ₹{item.budgeted.toLocaleString()} | Actual: ₹{item.actual.toLocaleString()}
                          </div>
                        </div>
                        <Badge variant={item.variance > 0 ? "destructive" : "secondary"}>
                          {item.variance > 0 ? "+" : ""}
                          {item.variance}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
