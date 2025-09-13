"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface ReportFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function ReportFilters({ onFiltersChange }: ReportFiltersProps) {
  const [filters, setFilters] = useState({
    dateRange: "",
    department: "",
    category: "",
    status: "",
    amountRange: { min: "", max: "" },
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)

    // Update active filters
    const active = Object.entries(newFilters)
      .filter(([_, v]) => {
        if (typeof v === "object" && v !== null) {
          return Object.values(v).some((val) => val !== "")
        }
        return v !== ""
      })
      .map(([k, _]) => k)

    setActiveFilters(active)
  }

  const clearFilter = (key: string) => {
    const newFilters = { ...filters }
    if (key === "amountRange") {
      newFilters[key] = { min: "", max: "" }
    } else {
      newFilters[key] = ""
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
    setActiveFilters(activeFilters.filter((f) => f !== key))
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: "",
      department: "",
      category: "",
      status: "",
      amountRange: { min: "", max: "" },
    }
    setFilters(clearedFilters)
    setActiveFilters([])
    onFiltersChange(clearedFilters)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Report Filters</span>
          </CardTitle>
          {activeFilters.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date-range">Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_quarter">Last Quarter</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
                <SelectItem value="current_fy">Current FY</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CS">Computer Science</SelectItem>
                <SelectItem value="MATH">Mathematics</SelectItem>
                <SelectItem value="PHYS">Physics</SelectItem>
                <SelectItem value="BUS">Business</SelectItem>
                <SelectItem value="LIB">Library</SelectItem>
                <SelectItem value="IT">IT Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaries_benefits">Salaries & Benefits</SelectItem>
                <SelectItem value="research_development">Research & Development</SelectItem>
                <SelectItem value="equipment_supplies">Equipment & Supplies</SelectItem>
                <SelectItem value="infrastructure_maintenance">Infrastructure</SelectItem>
                <SelectItem value="student_services">Student Services</SelectItem>
                <SelectItem value="administrative_costs">Administrative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Transaction Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount-min">Min Amount</Label>
            <Input
              id="amount-min"
              type="number"
              placeholder="$0"
              value={filters.amountRange.min}
              onChange={(e) => handleFilterChange("amountRange", { ...filters.amountRange, min: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="amount-max">Max Amount</Label>
            <Input
              id="amount-max"
              type="number"
              placeholder="No limit"
              value={filters.amountRange.max}
              onChange={(e) => handleFilterChange("amountRange", { ...filters.amountRange, max: e.target.value })}
            />
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                  <span>{filter.replace("_", " ").toUpperCase()}</span>
                  <button onClick={() => clearFilter(filter)} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
