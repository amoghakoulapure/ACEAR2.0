"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const auditTrail = [
  {
    id: "AT_001",
    timestamp: "2024-01-15T15:30:22.123Z",
    action: "Budget Allocation Created",
    user: "Dr. Amogh Koulapure",
    amount: "₹5,00,000",
    department: "Civil Engineering",
    hash: "0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    previousHash: "0x6c754d849a2355808b8763bfca831e0ea78c6c8bc0b88aafb2648403cdc86620",
    verified: true,
  },
  {
    id: "AT_002",
    timestamp: "2024-01-15T14:45:10.456Z",
    action: "Transaction Approved",
    user: "Prof. Sarah Johnson",
    amount: "₹2,50,000",
    department: "Computer Science",
    hash: "0x6c754d849a2355808b8763bfca831e0ea78c6c8bc0b88aafb2648403cdc86620",
    previousHash: "0x5b643c738a1244707a7652aeb9720d0d967b5b7ab0a77998e1537302bcb75510",
    verified: true,
  },
  {
    id: "AT_003",
    timestamp: "2024-01-15T13:20:45.789Z",
    action: "Fund Source Added",
    user: "System Admin",
    amount: "₹50,00,000",
    department: "General Fund",
    hash: "0x5b643c738a1244707a7652aeb9720d0d967b5b7ab0a77998e1537302bcb75510",
    previousHash: "0x4a532b627a0133606a6541ada8610c0c856a4a6aa0966887d0426201aba64400",
    verified: true,
  },
]

export function TemporalAuditTrails() {
  const verifyChain = () => {
    // In real implementation, this would verify the entire chain
    console.log("Verifying audit trail chain integrity...")
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⏰ Temporal Audit Trails with Immutable Timestamping
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
              Cryptographically Linked
            </Badge>
          </CardTitle>
          <CardDescription>
            Every transaction gets cryptographically timestamped and linked to previous states, creating an unbreakable
            chain of financial accountability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2,847</div>
                <div className="text-sm text-green-700">Audit Records</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-blue-700">Chain Integrity</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-purple-700">Broken Links</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">SHA-256</div>
                <div className="text-sm text-orange-700">Hash Algorithm</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Immutable Audit Chain</h3>
            <Button onClick={verifyChain} variant="outline" className="border-gray-600 text-gray-600 bg-transparent">
              Verify Chain Integrity
            </Button>
          </div>

          <div className="space-y-4">
            {auditTrail.map((record, index) => (
              <Card key={record.id} className="border-l-4 border-l-gray-500 relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{record.action}</span>
                        <Badge variant="outline">{record.id}</Badge>
                        {record.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>User: {record.user}</div>
                        <div>Amount: {record.amount}</div>
                        <div>Department: {record.department}</div>
                        <div>Timestamp: {new Date(record.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                        <div>Hash: {record.hash}</div>
                        <div>Previous: {record.previousHash}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-gray-400">#{auditTrail.length - index}</div>
                    </div>
                  </div>

                  {index < auditTrail.length - 1 && (
                    <div className="absolute left-6 bottom-0 w-0.5 h-4 bg-gray-300 transform translate-y-full" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Cryptographic Security Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-semibold">🔗 Chain Linking</div>
                  <div className="text-gray-600">Each record cryptographically linked to previous</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">⏰ Precise Timestamping</div>
                  <div className="text-gray-600">Microsecond precision with NTP synchronization</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">🛡️ Tamper Detection</div>
                  <div className="text-gray-600">Any modification breaks the chain integrity</div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">📜 Immutable History</div>
                  <div className="text-gray-600">Complete audit trail preserved forever</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
