"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Building } from "lucide-react";
export default function DepartmentBreakdownPublic() {
  type DepartmentType = {
    name: string;
    code: string;
    type: string;
    description: string;
    allocated: number;
    spent: number;
  };
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: departmentData } = await supabase
        .from("budget_allocations")
        .select(`allocated_amount, spent_amount, departments!inner(name, code, type, description)`)
        .eq("fiscal_year", 2024);
      // Group by department
      const departmentTotals: Record<string, DepartmentType> = (departmentData || []).reduce(
        (acc, item) => {
          let dept;
          if (Array.isArray(item.departments)) {
            dept = item.departments[0];
          } else {
            dept = item.departments;
          }
          if (!dept || typeof dept !== 'object' || !('name' in dept)) return acc;
          const key = dept.name;
          if (!acc[key]) {
            acc[key] = {
              name: dept.name,
              code: dept.code,
              type: dept.type,
              description: dept.description,
              allocated: 0,
              spent: 0,
            };
          }
          acc[key].allocated += Number(item.allocated_amount);
          acc[key].spent += Number(item.spent_amount);
          return acc;
        },
        {} as Record<string, DepartmentType>
      );
      setDepartments(Object.values(departmentTotals || {}).sort((a, b) => (a as DepartmentType).allocated - (b as DepartmentType).allocated));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading department breakdown...</div>;
  const academicDepartments = departments.filter((dept) => dept.type === "academic");
  const supportUnits = departments.filter((dept) => dept.type === "support");
  const totalAcademic = academicDepartments.reduce((sum, dept) => sum + dept.allocated, 0);
  const totalSupport = supportUnits.reduce((sum, dept) => sum + dept.allocated, 0);
  const grandTotal = totalAcademic + totalSupport;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-blue-900">Academic Programs</CardTitle>
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">₹{totalAcademic.toLocaleString()}</div>
            <p className="text-sm text-blue-700 mt-2">
              {((totalAcademic / grandTotal) * 100).toFixed(1)}% of total budget
            </p>
            <p className="text-xs text-blue-600 mt-1">{academicDepartments.length} departments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-green-900">Support Services</CardTitle>
            <Building className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">₹{totalSupport.toLocaleString()}</div>
            <p className="text-sm text-green-700 mt-2">
              {((totalSupport / grandTotal) * 100).toFixed(1)}% of total budget
            </p>
            <p className="text-xs text-green-600 mt-1">{supportUnits.length} support units</p>
          </CardContent>
        </Card>
      </div>
      {/* Academic Departments */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
          Academic Departments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicDepartments.map((dept) => {
            const utilizationRate = dept.allocated > 0 ? (dept.spent / dept.allocated) * 100 : 0;
            return (
              <Card key={dept.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {dept.code}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{dept.allocated.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Budget</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Invested:</span>
                      <span className="font-medium">₹{dept.spent.toLocaleString()}</span>
                    </div>
                    <Progress value={utilizationRate} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">
                      {utilizationRate.toFixed(1)}% utilized
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Support Units */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Building className="h-6 w-6 mr-2 text-green-600" />
          Support Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportUnits.map((dept) => {
            const utilizationRate = dept.allocated > 0 ? (dept.spent / dept.allocated) * 100 : 0;
            return (
              <Card key={dept.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {dept.code}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{dept.allocated.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Budget</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Invested:</span>
                      <span className="font-medium">₹{dept.spent.toLocaleString()}</span>
                    </div>
                    <Progress value={utilizationRate} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">
                      {utilizationRate.toFixed(1)}% utilized
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
