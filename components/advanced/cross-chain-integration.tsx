"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const networks = [
  { name: "Ethereum", status: "connected", transactions: 1247, color: "bg-blue-500" },
  { name: "Polygon", status: "connected", transactions: 892, color: "bg-purple-500" },
  { name: "Binance Smart Chain", status: "connected", transactions: 634, color: "bg-yellow-500" },
  { name: "Avalanche", status: "syncing", transactions: 0, color: "bg-red-500" },
]

const crossChainTransactions = [
  {
    id: "CC_001",
    from: "ACEAR Institute (Ethereum)",
    to: "Research Consortium (Polygon)",
    amount: "₹5,00,000",
    purpose: "Joint research funding",
    status: "completed",
    timestamp: "2024-01-15 14:30:22",
  },
  {
    id: "CC_002",
    from: "Government Grant (BSC)",
    to: "ACEAR Institute (Ethereum)",
    amount: "₹25,00,000",
    purpose: "Infrastructure development",
    status: "pending",
    timestamp: "2024-01-15 15:45:10",
  },
]

export function CrossChainIntegration() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌐 Cross-Chain Institutional Integration
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Multi-Network
            </Badge>
          </CardTitle>
          <CardDescription>
            Smart contracts that interact across multiple blockchain networks for inter-institutional fund tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-green-700">Connected Networks</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2,773</div>
                <div className="text-sm text-blue-700">Cross-Chain TXs</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-purple-700">Partner Institutions</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">99.8%</div>
                <div className="text-sm text-orange-700">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Network Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networks.map((network, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${network.color}`} />
                      <div>
                        <div className="font-semibold">{network.name}</div>
                        <div className="text-sm text-gray-600">
                          {network.transactions.toLocaleString()} transactions
                        </div>
                      </div>
                    </div>
                    <Badge variant={network.status === "connected" ? "secondary" : "outline"}>{network.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Cross-Chain Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossChainTransactions.map((tx) => (
                  <Card key={tx.id} className="border-l-4 border-l-teal-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{tx.amount}</span>
                            <Badge variant="outline">{tx.id}</Badge>
                            <Badge variant={tx.status === "completed" ? "secondary" : "outline"}>{tx.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>From: {tx.from}</div>
                            <div>To: {tx.to}</div>
                            <div>Purpose: {tx.purpose}</div>
                          </div>
                          <p className="text-xs text-gray-500">{tx.timestamp}</p>
                        </div>
                        <div className="text-right">
                          {tx.status === "completed" && <span className="text-green-600 font-medium">✓ Completed</span>}
                          {tx.status === "pending" && <span className="text-yellow-600 font-medium">⏳ Pending</span>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Cross-Chain Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold">🔗 Interoperability</div>
                  <div className="text-gray-600">Seamless fund transfers between institutions</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">💰 Cost Efficiency</div>
                  <div className="text-gray-600">Reduced transaction fees across networks</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">🌍 Global Reach</div>
                  <div className="text-gray-600">Connect with international institutions</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">📊 Unified Tracking</div>
                  <div className="text-gray-600">Single dashboard for all network activities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
