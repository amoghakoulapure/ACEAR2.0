import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"

export async function TransactionsList() {
  const supabase = await createClient()

  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
      *,
      budget_allocations!inner(
        category,
        departments!inner(name, code)
      )
    `)
    .order("transaction_date", { ascending: false })
    .limit(50)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Transactions</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Vendor</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-center py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{transaction.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{transaction.budget_allocations?.departments?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.budget_allocations?.departments?.code}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">
                      {transaction.budget_allocations?.category?.replace("_", " ").toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{transaction.vendor_name || "N/A"}</td>
                  <td className="py-3 px-4 text-right font-medium">${Number(transaction.amount).toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.invoice_number || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
