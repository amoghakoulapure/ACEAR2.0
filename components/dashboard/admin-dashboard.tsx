import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { AnomalyAlerts } from "@/components/dashboard/anomaly-alerts"
import { SystemOverview } from "@/components/dashboard/system-overview"
import { ColorfulStats } from "@/components/dashboard/colorful-stats"
import { DepartmentCards } from "@/components/dashboard/department-cards"
import { FundingSourcesCard } from "@/components/dashboard/funding-sources-card"
import { ContactInfoCard } from "@/components/dashboard/contact-info-card"
import { SampleTransactions } from "@/components/dashboard/sample-transactions"
import { AdminControlPanel } from "@/components/dashboard/admin-control-panel"
import { UserManagement } from "@/components/dashboard/user-management"
import { AuditTrail } from "@/components/dashboard/audit-trail"
import { FinancialReports } from "@/components/dashboard/financial-reports"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, FileText, Settings, AlertTriangle, Database, Lock } from "lucide-react"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  department_id?: string
}

interface AdminDashboardProps {
  profile: Profile
}

export function AdminDashboard({ profile }: AdminDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Admin Header with User Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ACEAR Institute Financial Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Administrative Control Center</p>
          <div className="flex items-center space-x-3 mt-3">
            <Badge variant="default" className="bg-red-600">
              <Shield className="h-3 w-3 mr-1" />
              ADMIN ACCESS
            </Badge>
            <Badge variant="outline">
              <Users className="h-3 w-3 mr-1" />
              {profile.full_name}
            </Badge>
            <Badge variant="outline">
              <Lock className="h-3 w-3 mr-1" />
              {profile.role.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts for Admins */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Administrative Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-white rounded border-l-4 border-red-500">
              <span className="text-sm font-medium">3 pending budget approvals require immediate attention</span>
              <Button size="sm" variant="destructive">
                Review
              </Button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border-l-4 border-amber-500">
              <span className="text-sm font-medium">Department of Engineering exceeded Q3 budget by 12%</span>
              <Button size="sm" variant="outline">
                Investigate
              </Button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border-l-4 border-blue-500">
              <span className="text-sm font-medium">5 new user access requests pending approval</span>
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ColorfulStats />

      {/* Admin-specific Management Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminControlPanel />
        <UserManagement />
      </div>

      <DepartmentCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FundingSourcesCard />
        <ContactInfoCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetOverview />
        <AnomalyAlerts />
      </div>

      {/* Advanced Admin Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FinancialReports />
        <AuditTrail />
        <div>
          <SystemOverview />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SampleTransactions />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Records</span>
                <span className="font-semibold">1,247,892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="font-semibold text-green-600">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">System Health</span>
                <Badge className="bg-green-600">Optimal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Users</span>
                <span className="font-semibold">127</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
