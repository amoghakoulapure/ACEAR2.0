import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from "lucide-react"

export function FinancialReports() {
  const reports = [
    {
      name: "Monthly Budget Analysis",
      description: "Detailed monthly budget vs actual spending",
      lastGenerated: "2024-03-15",
      status: "ready",
      type: "budget",
    },
    {
      name: "Department Expense Report",
      description: "Per-department expense breakdown and trends",
      lastGenerated: "2024-03-14",
      status: "ready",
      type: "expense",
    },
    {
      name: "Funding Sources Analysis",
      description: "Analysis of all funding sources and utilization",
      lastGenerated: "2024-03-13",
      status: "generating",
      type: "funding",
    },
    {
      name: "Audit Compliance Report",
      description: "Compliance status and audit trail summary",
      lastGenerated: "2024-03-12",
      status: "ready",
      type: "audit",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Financial Reports
        </CardTitle>
        <CardDescription>Generate and download detailed financial reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" size="sm" className="h-auto p-2 flex flex-col items-center bg-transparent">
              <PieChart className="h-5 w-5 mb-1" />
              <span className="text-xs">Budget</span>
            </Button>
            <Button variant="outline" size="sm" className="h-auto p-2 flex flex-col items-center bg-transparent">
              <BarChart3 className="h-5 w-5 mb-1" />
              <span className="text-xs">Expenses</span>
            </Button>
            <Button variant="outline" size="sm" className="h-auto p-2 flex flex-col items-center bg-transparent">
              <TrendingUp className="h-5 w-5 mb-1" />
              <span className="text-xs">Trends</span>
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Available Reports</h4>
            <div className="space-y-3">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{report.name}</div>
                    <div className="text-xs text-gray-500">{report.description}</div>
                    <div className="flex items-center mt-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {report.lastGenerated}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={report.status === "ready" ? "default" : "secondary"}
                      className={report.status === "ready" ? "bg-green-600" : "bg-amber-600"}
                    >
                      {report.status}
                    </Badge>
                    {report.status === "ready" && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
