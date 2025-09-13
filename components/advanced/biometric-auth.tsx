"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

const authMethods = [
  { type: "Fingerprint", status: "active", confidence: 98.5, icon: "👆" },
  { type: "Facial Recognition", status: "active", confidence: 96.8, icon: "👤" },
  { type: "Voice Pattern", status: "pending", confidence: 0, icon: "🎤" },
]

const recentAuth = [
  {
    user: "Dr. Amogh Koulapure",
    action: "Approved ₹2.5L research equipment purchase",
    methods: ["fingerprint", "facial", "voice"],
    timestamp: "2024-01-15 15:45:30",
    confidence: 99.2,
  },
  {
    user: "Prof. Sarah Johnson",
    action: "Authorized department budget reallocation",
    methods: ["fingerprint", "facial"],
    timestamp: "2024-01-15 14:20:15",
    confidence: 97.8,
  },
]

export function BiometricAuth() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentMethod, setCurrentMethod] = useState("")

  const startBiometricScan = async () => {
    setIsScanning(true)
    setScanProgress(0)

    const methods = ["Fingerprint", "Facial Recognition", "Voice Pattern"]

    for (let i = 0; i < methods.length; i++) {
      setCurrentMethod(methods[i])
      for (let j = 0; j <= 100; j += 10) {
        setScanProgress((i * 100 + j) / 3)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    setIsScanning(false)
    setCurrentMethod("")
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔐 Multi-Modal Biometric Authentication
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Triple-Factor
            </Badge>
          </CardTitle>
          <CardDescription>
            Fingerprint + Facial Recognition + Voice Pattern verification for transaction approvals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {authMethods.map((method, index) => (
              <Card
                key={index}
                className={`${
                  method.status === "active" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-semibold">{method.type}</div>
                  <div className={`text-sm ${method.status === "active" ? "text-green-600" : "text-gray-500"}`}>
                    {method.status === "active" ? `${method.confidence}% accuracy` : "Initializing..."}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={startBiometricScan} disabled={isScanning} className="bg-orange-600 hover:bg-orange-700">
              {isScanning ? "Scanning..." : "Test Biometric Authentication"}
            </Button>
            {isScanning && (
              <div className="flex-1">
                <Progress value={scanProgress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">
                  Scanning {currentMethod}... {Math.round(scanProgress)}%
                </p>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Authentication Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAuth.map((auth, index) => (
                  <Alert key={index} className="border-l-4 border-l-green-500 bg-green-50">
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{auth.user}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {auth.confidence}% match
                            </Badge>
                          </div>
                          <p className="text-sm">{auth.action}</p>
                          <div className="flex gap-1 mt-2">
                            {auth.methods.map((method, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {method === "fingerprint" && "👆"}
                                {method === "facial" && "👤"}
                                {method === "voice" && "🎤"}
                                {method}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{auth.timestamp}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-green-600 font-medium">✓ Verified</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Security Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold">🛡️ Anti-Spoofing</div>
                  <div className="text-gray-600">Liveness detection prevents fake biometrics</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">🔐 Encrypted Storage</div>
                  <div className="text-gray-600">Biometric templates stored with AES-256</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">⚡ Real-time Processing</div>
                  <div className="text-gray-600">Sub-second authentication response</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">🎯 High Accuracy</div>
                  <div className="text-gray-600">99.9% accuracy with triple verification</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
