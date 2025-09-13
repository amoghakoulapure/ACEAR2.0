import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, DollarSign, TrendingDown } from "lucide-react"

export async function AnomalyAlerts() {
  const supabase = await createClient()

  const { data: alerts } = await supabase
    .from("anomaly_alerts")
    .select("*")
    .eq("is_resolved", false)
    .order("created_at", { ascending: false })
    .limit(5)

  const sampleAlerts = [
    {
      id: "ALERT001",
      type: "budget_overrun",
      title: "Civil Department Budget Exceeded",
      description: "Civil Department has overspent by ₹2,00,000 on renovation project. Immediate review required.",
      severity: "high",
      created_at: "2024-06-15T10:30:00Z",
    },
    {
      id: "ALERT002",
      type: "low_utilization",
      title: "Mechanical Department Low Spending",
      description: "Mechanical Department spending below 50% utilization at mid-year. Budget review needed.",
      severity: "medium",
      created_at: "2024-06-10T14:20:00Z",
    },
    {
      id: "ALERT003",
      type: "pending_approval",
      title: "Pending Transaction Approval",
      description: "Digital Library Subscription payment of ₹1,50,000 pending approval for 5 days.",
      severity: "medium",
      created_at: "2024-06-08T09:15:00Z",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "budget_overrun":
        return <DollarSign className="h-5 w-5 text-red-500" />
      case "low_utilization":
        return <TrendingDown className="h-5 w-5 text-yellow-500" />
      case "pending_approval":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
    }
  }

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case "high":
        return "🚨"
      case "medium":
        return "⚠️"
      case "low":
        return "ℹ️"
      default:
        return "🔔"
    }
  }

  const displayAlerts = alerts?.length ? alerts : sampleAlerts

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">Active Alerts</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Financial anomalies requiring attention</p>
        </div>
        <Button variant="outline" size="sm" className="bg-orange-50 text-orange-600 hover:bg-orange-100">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAlerts?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
            </div>
          ) : (
            displayAlerts?.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-gray-50">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityEmoji(alert.severity)} {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(alert.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Resolve
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
