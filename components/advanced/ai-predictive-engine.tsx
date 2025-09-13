"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const anomalyData = [
  { time: "09:00", normal: 85, anomaly: 12, severity: "low" },
  { time: "10:00", normal: 92, anomaly: 8, severity: "low" },
  { time: "11:00", normal: 78, anomaly: 22, severity: "medium" },
  { time: "12:00", normal: 65, anomaly: 35, severity: "high" },
  { time: "13:00", normal: 88, anomaly: 12, severity: "low" },
  { time: "14:00", normal: 45, anomaly: 55, severity: "critical" },
  { time: "15:00", normal: 82, anomaly: 18, severity: "medium" },
]

const detectedAnomalies = [
  {
    id: 1,
    type: "Unusual Transaction Pattern",
    description: "Civil Engineering Department: 15 transactions of ₹50,000 each within 2 hours",
    confidence: 94,
    severity: "high",
    timestamp: "2024-01-15 14:23:45",
    action: "Transaction blocked pending review",
  },
  {
    id: 2,
    type: "Budget Deviation Alert",
    description: "Research Grants: 340% over allocated quarterly budget",
    confidence: 98,
    severity: "critical",
    timestamp: "2024-01-15 13:45:12",
    action: "Department head notified",
  },
  {
    id: 3,
    type: "Vendor Anomaly",
    description: 'New vendor "TechSolutions Ltd" receiving 80% of IT budget',
    confidence: 87,
    severity: "medium",
    timestamp: "2024-01-15 12:15:30",
    action: "Audit trail initiated",
  },
]

export function AIPredictiveEngine() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false)
            return 100
          }
          return prev + 2
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 AI-Powered Predictive Anomaly Engine
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Real-Time
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced machine learning models using isolation forests and autoencoders to detect fraudulent patterns
            before completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Button onClick={startScan} disabled={isScanning} className="bg-purple-600 hover:bg-purple-700">
              {isScanning ? "Scanning..." : "Start Deep Scan"}
            </Button>
            {isScanning && (
              <div className="flex-1">
                <Progress value={scanProgress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">Analyzing {Math.floor(scanProgress * 50)} transactions...</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-Time Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={anomalyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="normal" stroke="#10b981" strokeWidth={2} name="Normal Activity" />
                    <Line type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} name="Anomalies" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ML Model Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Isolation Forest Accuracy</span>
                    <span className="font-semibold">96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Autoencoder Precision</span>
                    <span className="font-semibold">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>False Positive Rate</span>
                    <span className="font-semibold">2.1%</span>
                  </div>
                  <Progress value={2.1} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detected Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detectedAnomalies.map((anomaly) => (
                  <Alert
                    key={anomaly.id}
                    className={`border-l-4 ${
                      anomaly.severity === "critical"
                        ? "border-l-red-500 bg-red-50"
                        : anomaly.severity === "high"
                          ? "border-l-orange-500 bg-orange-50"
                          : "border-l-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{anomaly.type}</span>
                            <Badge variant={anomaly.severity === "critical" ? "destructive" : "secondary"}>
                              {anomaly.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm">{anomaly.description}</p>
                          <p className="text-xs text-gray-500">{anomaly.timestamp}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{anomaly.action}</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
