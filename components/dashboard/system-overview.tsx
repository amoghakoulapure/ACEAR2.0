import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, DollarSign, Activity } from "lucide-react"

export async function SystemOverview() {
  const supabase = await createClient()

  // Get system statistics
  const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: departmentsCount } = await supabase.from("departments").select("*", { count: "exact", head: true })

  const { count: fundSourcesCount } = await supabase.from("fund_sources").select("*", { count: "exact", head: true })

  const { count: transactionsCount } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Active Users</span>
            </div>
            <Badge variant="outline">{usersCount || 0}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Departments</span>
            </div>
            <Badge variant="outline">{departmentsCount || 0}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Fund Sources</span>
            </div>
            <Badge variant="outline">{fundSourcesCount || 0}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Transactions (30d)</span>
            </div>
            <Badge variant="outline">{transactionsCount || 0}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
