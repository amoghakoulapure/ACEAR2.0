"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

const proofData = [
  {
    id: "zk_001",
    description: "Budget Compliance Verification",
    status: "verified",
    confidence: 99.8,
    timestamp: "2024-01-15 15:30:22",
    details:
      "Verified that Civil Engineering department spending is within allocated budget without revealing specific transaction amounts",
  },
  {
    id: "zk_002",
    description: "Salary Range Compliance",
    status: "verified",
    confidence: 98.5,
    timestamp: "2024-01-15 14:45:10",
    details:
      "Confirmed all faculty salaries comply with institutional guidelines without exposing individual compensation data",
  },
  {
    id: "zk_003",
    description: "Research Grant Allocation",
    status: "pending",
    confidence: 0,
    timestamp: "2024-01-15 16:00:00",
    details: "Verifying research fund distribution across departments...",
  },
]

export function ZKProofVerification() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const generateProof = async () => {
    setIsGenerating(true)
    setProgress(0)

    const steps = [
      "Initializing ZK-SNARK circuit...",
      "Generating witness data...",
      "Computing proof...",
      "Verifying proof validity...",
      "Publishing to verification network...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProgress((i + 1) * 20)
    }

    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔐 Zero-Knowledge Proof Verification
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
              ZK-SNARK
            </Badge>
          </CardTitle>
          <CardDescription>
            Verify budget compliance and institutional data integrity without exposing sensitive information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">127</div>
                <div className="text-sm text-green-700">Proofs Generated</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">99.2%</div>
                <div className="text-sm text-blue-700">Verification Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-purple-700">Privacy Breaches</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={generateProof} disabled={isGenerating} className="bg-indigo-600 hover:bg-indigo-700">
              {isGenerating ? "Generating Proof..." : "Generate New ZK Proof"}
            </Button>
            {isGenerating && (
              <div className="flex-1">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">
                  {progress === 20 && "Initializing ZK-SNARK circuit..."}
                  {progress === 40 && "Generating witness data..."}
                  {progress === 60 && "Computing proof..."}
                  {progress === 80 && "Verifying proof validity..."}
                  {progress === 100 && "Publishing to verification network..."}
                </p>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Proof Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proofData.map((proof) => (
                  <Alert
                    key={proof.id}
                    className={`border-l-4 ${
                      proof.status === "verified"
                        ? "border-l-green-500 bg-green-50"
                        : proof.status === "pending"
                          ? "border-l-yellow-500 bg-yellow-50"
                          : "border-l-red-500 bg-red-50"
                    }`}
                  >
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{proof.description}</span>
                            <Badge variant={proof.status === "verified" ? "secondary" : "outline"}>{proof.id}</Badge>
                            {proof.status === "verified" && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {proof.confidence}% confidence
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{proof.details}</p>
                          <p className="text-xs text-gray-500">{proof.timestamp}</p>
                        </div>
                        <div className="text-right">
                          {proof.status === "verified" && (
                            <span className="text-green-600 font-medium">✓ Verified</span>
                          )}
                          {proof.status === "pending" && (
                            <span className="text-yellow-600 font-medium">⏳ Pending</span>
                          )}
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
              <CardTitle className="text-lg">How Zero-Knowledge Proofs Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="font-semibold">Private Input</div>
                  <div className="text-gray-600">Sensitive financial data remains encrypted</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold">Proof Generation</div>
                  <div className="text-gray-600">ZK-SNARK circuits verify compliance</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="font-semibold">Public Verification</div>
                  <div className="text-gray-600">Anyone can verify without seeing data</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
