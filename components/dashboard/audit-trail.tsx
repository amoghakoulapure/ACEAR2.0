import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, User, DollarSign, Settings } from "lucide-react"

export function AuditTrail() {
  const auditEvents = [
    {
      id: 1,
      action: "Budget Approved",
      user: "Dr. Amogh Akoula",
      details: "Engineering Dept Q4 budget approved - ₹2.4M",
      timestamp: "2024-03-15 14:30",
      type: "budget",
      severity: "info",
    },
    {
      id: 2,
      action: "User Created",
      user: "Admin System",
      details: "New faculty account created for Dr. Rajesh Kumar",
      timestamp: "2024-03-15 13:45",
      type: "user",
      severity: "info",
    },
    {
      id: 3,
      action: "Expense Alert",
      user: "System Monitor",
      details: "Computer Science Dept exceeded monthly limit by 8%",
      timestamp: "2024-03-15 12:20",
      type: "expense",
      severity: "warning",
    },
    {
      id: 4,
      action: "Report Generated",
      user: "Finance Team",
      details: "Q3 Financial Summary Report exported",
      timestamp: "2024-03-15 11:15",
      type: "report",
      severity: "info",
    },
    {
      id: 5,
      action: "Permission Changed",
      user: "Dr. Amogh Akoula",
      details: "Granted auditor access to Priya Sharma",
      timestamp: "2024-03-15 10:30",
      type: "security",
      severity: "high",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "budget":
      case "expense":
        return <DollarSign className="h-4 w-4" />
      case "user":
      case "security":
        return <User className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-600"
      case "warning":
        return "bg-amber-600"
      default:
        return "bg-blue-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Audit Trail
        </CardTitle>
        <CardDescription>Recent system activities and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {auditEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">{getIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{event.action}</p>
                    <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{event.details}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{event.user}</span>
                    <span className="mx-2">•</span>
                    <span>{event.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
