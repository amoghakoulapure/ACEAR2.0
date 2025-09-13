import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function RecentTransactions() {
  const supabase = await createClient()

  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
      *,
      budget_allocations!inner(
        department_id,
        category,
        departments!inner(name, code)
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10)

  // Sample data for demo purposes
  const sampleTransactions = [
    {
      id: "TXN001",
      description: "Lab Equipment Purchase",
      status: "completed",
      department_name: "Computer Science",
      vendor_name: "TechLabs Pvt Ltd",
      amount: 500000,
      transaction_date: "2024-06-15",
      invoice_number: "INV-2024-001",
    },
    {
      id: "TXN002",
      description: "Renovation Work",
      status: "completed",
      department_name: "Civil",
      vendor_name: "Builders Co.",
      amount: 1200000,
      transaction_date: "2024-05-28",
      invoice_number: "INV-2024-002",
    },
    {
      id: "TXN003",
      description: "Event Funding",
      status: "approved",
      department_name: "Computer Science",
      vendor_name: "National Level Hackathon",
      amount: 250000,
      transaction_date: "2024-03-05",
      invoice_number: "INV-2024-003",
    },
    {
      id: "TXN004",
      description: "Intercollege Event",
      status: "completed",
      department_name: "Sports",
      vendor_name: "Annual Sports Meet",
      amount: 300000,
      transaction_date: "2024-04-12",
      invoice_number: "INV-2024-004",
    },
    {
      id: "TXN005",
      description: "Digital Library Subscription",
      status: "pending",
      department_name: "Library",
      vendor_name: "EduSoft Pvt Ltd",
      amount: 150000,
      transaction_date: "2024-02-18",
      invoice_number: "INV-2024-005",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "approved":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "flagged":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Recent Transactions</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Latest financial activities</p>
        </div>
        <Link href="/transactions">
          <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status === "completed" && "✅"}
                    {transaction.status === "approved" && "👍"}
                    {transaction.status === "pending" && "⏳"}
                    {transaction.status === "rejected" && "❌"}
                    {transaction.status === "flagged" && "🚩"}
                    {" " + transaction.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {transaction.budget_allocations?.departments?.name} • {transaction.vendor_name} •{" "}
                  {new Date(transaction.transaction_date).toLocaleDateString("en-IN")}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{formatCurrency(Number(transaction.amount))}</div>
                <div className="text-sm text-gray-500">{transaction.invoice_number}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
