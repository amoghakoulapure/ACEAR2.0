"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Calendar, TrendingUp, PieChart, BarChart3, FileText, AlertTriangle } from "lucide-react"

interface Profile {
  id: string
  role: string
  department_id?: string
}

interface PrebuiltReportsProps {
  profile: Profile
}

export function PrebuiltReports({ profile }: PrebuiltReportsProps) {
  const isAdmin = profile.role === "super_admin" || profile.role === "financial_admin"
  const isAuditor = profile.role === "auditor"

  const reports = [
    {
      id: "monthly_summary",
      title: "Monthly Financial Summary",
      description: "Comprehensive overview of monthly spending, budget utilization, and key metrics",
      icon: Calendar,
      category: "Summary",
      frequency: "Monthly",
      lastGenerated: "2024-11-01",
      size: "2.3 MB",
      access: ["super_admin", "financial_admin", "department_head"],
    },
    {
      id: "budget_variance",
      title: "Budget vs Actual Variance Report",
      description: "Detailed analysis of budget variances across all departments and categories",
      icon: TrendingUp,
      category: "Analysis",
      frequency: "Quarterly",
      lastGenerated: "2024-10-31",
      size: "1.8 MB",
      access: ["super_admin", "financial_admin", "auditor"],
    },
    {
      id: "fund_utilization",
      title: "Fund Source Utilization",
      description: "Track utilization rates and remaining balances across all funding sources",
      icon: PieChart,
      category: "Funding",
      frequency: "Monthly",
      lastGenerated: "2024-11-05",
      size: "1.2 MB",
      access: ["super_admin", "financial_admin"],
    },
    {
      id: "department_performance",
      title: "Department Performance Dashboard",
      description: "Individual department spending patterns, efficiency metrics, and comparisons",
      icon: BarChart3,
      category: "Performance",
      frequency: "Monthly",
      lastGenerated: "2024-11-03",
      size: "3.1 MB",
      access: ["super_admin", "financial_admin", "department_head"],
    },
    {
      id: "compliance_audit",
      title: "Financial Compliance Audit",
      description: "Comprehensive audit report covering compliance, anomalies, and recommendations",
      icon: AlertTriangle,
      category: "Compliance",
      frequency: "Quarterly",
      lastGenerated: "2024-10-15",
      size: "4.2 MB",
      access: ["super_admin", "financial_admin", "auditor"],
    },
    {
      id: "transparency_report",
      title: "Public Transparency Report",
      description: "Public-facing financial transparency report for stakeholders and community",
      icon: FileText,
      category: "Public",
      frequency: "Quarterly",
      lastGenerated: "2024-10-30",
      size: "2.7 MB",
      access: ["super_admin", "financial_admin", "public"],
    },
  ]

  const accessibleReports = reports.filter(
    (report) => report.access.includes(profile.role) || report.access.includes("public"),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Summary":
        return "bg-blue-100 text-blue-800"
      case "Analysis":
        return "bg-green-100 text-green-800"
      case "Funding":
        return "bg-purple-100 text-purple-800"
      case "Performance":
        return "bg-orange-100 text-orange-800"
      case "Compliance":
        return "bg-red-100 text-red-800"
      case "Public":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (reportId: string) => {
    // Simulate download
    alert(`Downloading ${reports.find((r) => r.id === reportId)?.title}...`)
  }

  const handlePreview = (reportId: string) => {
    // Simulate preview
    alert(`Opening preview for ${reports.find((r) => r.id === reportId)?.title}...`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Pre-built Reports</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Access standardized financial reports generated automatically based on your role and permissions
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accessibleReports.map((report) => {
            const Icon = report.icon
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <Badge className={getCategoryColor(report.category)}>{report.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span>{report.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Generated:</span>
                      <span>{new Date(report.lastGenerated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span>{report.size}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handlePreview(report.id)} className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" onClick={() => handleDownload(report.id)} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {accessibleReports.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No reports available for your current role</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
