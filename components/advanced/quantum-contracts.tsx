"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const contracts = [
  {
    id: "QC_001",
    name: "Budget Allocation Contract",
    algorithm: "CRYSTALS-Kyber",
    status: "deployed",
    security: "Post-Quantum",
    transactions: 1247,
  },
  {
    id: "QC_002",
    name: "Audit Trail Contract",
    algorithm: "CRYSTALS-Dilithium",
    status: "deployed",
    security: "Post-Quantum",
    transactions: 892,
  },
  {
    id: "QC_003",
    name: "Governance Voting Contract",
    algorithm: "FALCON",
    status: "testing",
    security: "Post-Quantum",
    transactions: 0,
  },
]

export function QuantumResistantContracts() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚛️ Quantum-Resistant Smart Contract Architecture
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Post-Quantum
            </Badge>
          </CardTitle>
          <CardDescription>
            Future-proof security against quantum computing threats using post-quantum cryptographic algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-700">Active Contracts</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2,139</div>
                <div className="text-sm text-blue-700">Transactions</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">256-bit</div>
                <div className="text-sm text-purple-700">Security Level</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-orange-700">Quantum-Safe</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deployed Smart Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <Card key={contract.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{contract.name}</span>
                            <Badge variant="outline">{contract.id}</Badge>
                            <Badge variant={contract.status === "deployed" ? "secondary" : "outline"}>
                              {contract.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            Algorithm: <span className="font-medium">{contract.algorithm}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Transactions: <span className="font-medium">{contract.transactions.toLocaleString()}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {contract.security}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Post-Quantum Algorithms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🔐</div>
                  <div className="font-semibold">CRYSTALS-Kyber</div>
                  <div className="text-gray-600">Key encapsulation mechanism</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">✍️</div>
                  <div className="font-semibold">CRYSTALS-Dilithium</div>
                  <div className="text-gray-600">Digital signature scheme</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🦅</div>
                  <div className="font-semibold">FALCON</div>
                  <div className="text-gray-600">Compact signatures</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">⚠️ Quantum Threat Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current RSA/ECC Vulnerability</span>
                  <Badge variant="destructive">High Risk by 2030</Badge>
                </div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-gray-600">
                  Our post-quantum implementation provides security against both classical and quantum attacks
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
