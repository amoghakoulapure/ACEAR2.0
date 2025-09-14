
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, Building } from "lucide-react";

interface TransparencyStatsProps {
  searchTerm?: string;
  departmentFilter?: string;
  vendorFilter?: string;
}

export default function TransparencyStats({ searchTerm = '', departmentFilter = '', vendorFilter = '' }: TransparencyStatsProps) {
  const [stats, setStats] = useState({ totalAllocated: 0, totalSpent: 0, departmentsCount: 0, fundSourcesCount: 0 });
  const [loading, setLoading] = useState(true);
  // Demo random stats for hackathon
  useEffect(() => {
    // Demo: filter stats based on search/filter props
    let filteredStats = {
      totalAllocated: 12000000,
      totalSpent: 9500000,
      departmentsCount: 6,
      fundSourcesCount: 5,
    };
    if (searchTerm || departmentFilter || vendorFilter) {
      // For demo, just reduce numbers if any filter is applied
      filteredStats = {
        totalAllocated: 8000000,
        totalSpent: 6000000,
        departmentsCount: 3,
        fundSourcesCount: 2,
      };
    }
    setTimeout(() => {
      setStats(filteredStats);
      setLoading(false);
    }, 500);
  }, [searchTerm, departmentFilter, vendorFilter]);
  const utilizationRate = stats.totalAllocated > 0 ? (stats.totalSpent / stats.totalAllocated) * 100 : 0;
  if (loading) return <div>Loading statistics...</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Budget FY 2025</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">₹{stats.totalAllocated.toLocaleString()}</div>
          <p className="text-xs text-blue-700">Allocated across all programs</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">Budget Utilization</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{utilizationRate.toFixed(1)}%</div>
          <p className="text-xs text-green-700">₹{stats.totalSpent.toLocaleString()} invested</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-900">Academic Departments</CardTitle>
          <Building className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{stats.departmentsCount}</div>
          <p className="text-xs text-purple-700">Active departments & units</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-900">Funding Sources</CardTitle>
          <Users className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{stats.fundSourcesCount}</div>
          <p className="text-xs text-orange-700">Diverse funding streams</p>
        </CardContent>
      </Card>
    </div>
  );
}
