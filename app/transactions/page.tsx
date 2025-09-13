"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, Download, X } from "lucide-react"
import { toast } from "sonner"

interface Transaction {
  id: string
  transaction_date: string
  description: string
  vendor_name: string | null
  amount: number
  status: string
  invoice_number: string | null
  budget_allocations?: {
    category: string
    departments?: {
      name: string
      code: string
    }
  }
}

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [amountRange, setAmountRange] = useState({ min: "", max: "" })
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  
  const supabase = createClient()

  // Fetch transactions
  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          budget_allocations!inner(
            category,
            departments!inner(name, code)
          )
        `)
        .order("transaction_date", { ascending: false })

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error("Error fetching transactions:", error)
      toast.error("Failed to fetch transactions")
    } finally {
      setLoading(false)
    }
  }

  // Filter and search functionality
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.vendor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.budget_allocations?.departments?.name.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

      // Date range filter
      const transactionDate = new Date(transaction.transaction_date)
      const matchesDateRange = (!dateRange.from || transactionDate >= new Date(dateRange.from)) &&
                              (!dateRange.to || transactionDate <= new Date(dateRange.to))

      // Amount range filter
      const matchesAmountRange = (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
                                (!amountRange.max || transaction.amount <= parseFloat(amountRange.max))

      // Department filter
      const matchesDepartment = departmentFilter === "all" || 
        transaction.budget_allocations?.departments?.code === departmentFilter

      // Category filter
      const matchesCategory = categoryFilter === "all" || 
        transaction.budget_allocations?.category === categoryFilter

      return matchesSearch && matchesStatus && matchesDateRange && 
             matchesAmountRange && matchesDepartment && matchesCategory
    })
  }, [transactions, searchTerm, statusFilter, dateRange, amountRange, departmentFilter, categoryFilter])

  // Export functionality
  const handleExport = async (format: 'csv' | 'excel' = 'csv') => {
    try {
      const exportData = filteredTransactions.map(transaction => ({
        Date: new Date(transaction.transaction_date).toLocaleDateString(),
        Description: transaction.description,
        Department: transaction.budget_allocations?.departments?.name || 'N/A',
        'Department Code': transaction.budget_allocations?.departments?.code || 'N/A',
  Category: transaction.budget_allocations?.category ? transaction.budget_allocations.category.replace("_", " ").toUpperCase() : 'N/A',
        Vendor: transaction.vendor_name || 'N/A',
        Amount: transaction.amount,
        Status: transaction.status,
        'Invoice Number': transaction.invoice_number || 'N/A'
      }))

      if (format === 'csv') {
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      }

      toast.success(`Exported ${filteredTransactions.length} transactions`)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export transactions')
    }
  }

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setDateRange({ from: "", to: "" })
    setAmountRange({ min: "", max: "" })
    setDepartmentFilter("all")
    setCategoryFilter("all")
    setShowFilters(false)
  }

  // Get unique values for filter dropdowns
  const uniqueDepartments = useMemo(() => {
    const depts = transactions.map(t => t.budget_allocations?.departments).filter(Boolean)
    return Array.from(new Set(depts.map(d => d?.code))).map(code => 
      depts.find(d => d?.code === code)
    ).filter(Boolean)
  }, [transactions])

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(transactions.map(t => t.budget_allocations?.category).filter(Boolean)))
  }, [transactions])

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading transactions...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
          <div className="flex space-x-2">
            <Dialog open={showFilters} onOpenChange={setShowFilters}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Filter Transactions</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        placeholder="From"
                      />
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        placeholder="To"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Amount Range</label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        type="number"
                        value={amountRange.min}
                        onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                        placeholder="Min amount"
                      />
                      <Input
                        type="number"
                        value={amountRange.max}
                        onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                        placeholder="Max amount"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {uniqueDepartments.map((dept) => (
                          <SelectItem key={dept?.code ?? ""} value={dept?.code ?? ""}>
                            {dept?.name} ({dept?.code ?? ""})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {uniqueCategories.map((category) => (
                          <SelectItem key={category ?? ""} value={category ?? ""}>
                            {(category ?? '').replace("_", " ").toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={clearFilters} variant="outline" className="flex-1">
                      Clear Filters
                    </Button>
                    <Button onClick={() => setShowFilters(false)} className="flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No transactions found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
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
                        {transaction.budget_allocations?.category ? transaction.budget_allocations.category.replace("_", " ").toUpperCase() : 'N/A'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{transaction.vendor_name || "N/A"}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{Number(transaction.amount).toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.invoice_number || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}