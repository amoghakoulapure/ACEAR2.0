"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

interface Transaction {
  id: string
  type: string
  vendor: string
  department: string
  amount: number
  purpose: string
  date: string
  status: "completed" | "pending" | "approved"
}

const sampleTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "Vendor",
    vendor: "TechLabs Pvt Ltd",
    department: "Computer Science",
    amount: 500000,
    purpose: "Lab Equipment Purchase",
    date: "2024-06-15",
    status: "completed",
  },
  {
    id: "TXN002",
    type: "Vendor",
    vendor: "Builders Co.",
    department: "Civil",
    amount: 1200000,
    purpose: "Renovation Work",
    date: "2024-05-28",
    status: "completed",
  },
  {
    id: "TXN003",
    type: "Project",
    vendor: "National Level Hackathon",
    department: "Computer Science",
    amount: 250000,
    purpose: "Event Funding",
    date: "2024-03-05",
    status: "approved",
  },
  {
    id: "TXN004",
    type: "Project",
    vendor: "Annual Sports Meet",
    department: "Sports",
    amount: 300000,
    purpose: "Intercollege Event",
    date: "2024-04-12",
    status: "completed",
  },
  {
    id: "TXN005",
    type: "Vendor",
    vendor: "EduSoft Pvt Ltd",
    department: "Library",
    amount: 150000,
    purpose: "Digital Library Subscription",
    date: "2024-02-18",
    status: "pending",
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Completed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⏳ Pending</Badge>
    case "approved":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">👍 Approved</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Vendor":
      return "text-blue-600 bg-blue-50"
    case "Project":
      return "text-purple-600 bg-purple-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function SampleTransactions() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Transactions</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Latest financial activities across departments</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleTransactions.map((transaction) => (
            <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Badge className={`${getTypeColor(transaction.type)} border-0`}>{transaction.type}</Badge>
                  <span className="font-medium text-gray-900">{transaction.vendor}</span>
                </div>
                {getStatusBadge(transaction.status)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{transaction.department}</p>
                </div>
                <div>
                  <p className="text-gray-600">Amount</p>
                  <p className="font-semibold text-green-600">{formatCurrency(transaction.amount)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Purpose</p>
                  <p className="font-medium text-gray-900">{transaction.purpose}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">{new Date(transaction.date).toLocaleDateString("en-IN")}</p>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <Button variant="outline" size="sm">
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
