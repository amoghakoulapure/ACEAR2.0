"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileText, BarChart3, PieChart } from "lucide-react"

interface Profile {
  id: string
  role: string
  department_id?: string
}

interface ReportGeneratorProps {
  profile: Profile
}

export function ReportGenerator({ profile }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    { value: "budget_summary", label: "Budget Summary Report", icon: PieChart },
    { value: "spending_analysis", label: "Spending Analysis", icon: BarChart3 },
    { value: "department_performance", label: "Department Performance", icon: FileText },
    { value: "fund_utilization", label: "Fund Utilization Report", icon: BarChart3 },
    { value: "compliance_audit", label: "Compliance Audit Report", icon: FileText },
    { value: "variance_analysis", label: "Budget Variance Analysis", icon: BarChart3 },
  ]

  const categories = [
    "salaries_benefits",
    "research_development",
    "infrastructure_maintenance",
    "student_services",
    "administrative_costs",
    "equipment_supplies",
    "utilities",
    "other",
  ]

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // In a real app, this would trigger the actual report generation
    alert(`${reportType} report generated successfully!`)
  }

  const isAdmin = profile.role === "super_admin" || profile.role === "financial_admin"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Custom Report Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Configuration */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Budget Categories</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category.replace("_", " ").toUpperCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {isAdmin && (
              <div>
                <Label className="text-base font-medium">Department Filter</Label>
                <p className="text-sm text-muted-foreground mb-2">Leave empty to include all departments</p>
                <Input placeholder="Enter department codes (e.g., CS, MATH, PHYS)" />
              </div>
            )}

            <div className="pt-4">
              <Button
                onClick={handleGenerateReport}
                disabled={!reportType || isGenerating}
                className="w-full"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating Report..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </div>

        {/* Selected Filters Summary */}
        {(selectedCategories.length > 0 || reportType) && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Report Configuration Summary:</h4>
            <div className="flex flex-wrap gap-2">
              {reportType && (
                <Badge variant="outline">Type: {reportTypes.find((t) => t.value === reportType)?.label}</Badge>
              )}
              {dateRange.from && <Badge variant="outline">From: {format(dateRange.from, "MMM dd, yyyy")}</Badge>}
              {dateRange.to && <Badge variant="outline">To: {format(dateRange.to, "MMM dd, yyyy")}</Badge>}
              <Badge variant="outline">Format: {format.toUpperCase()}</Badge>
              {selectedCategories.length > 0 && (
                <Badge variant="outline">{selectedCategories.length} categories selected</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
