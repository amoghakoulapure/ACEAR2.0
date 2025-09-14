"use client";

import { useEffect, useState } from "react";
import { useCurrency } from "./currency-context";

// --- Mock Implementations for Demonstration ---

// Mock UI components
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`border rounded-lg shadow-sm bg-white ${className}`}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h3 className={`text-lg font-medium tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-0">{children}</div>;
const Progress = ({ value, className }: { value: number, className?: string }) => (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div className="h-full bg-blue-600" style={{ width: `${value}%` }}></div>
    </div>
);
const Badge = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border ${className}`}>{children}</span>;

// Mock Icon components
const GraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.1.9 2 2 2h8a2 2 0 002-2v-5"></path>
  </svg>
);
const Building = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path>
  </svg>
);

// Mock data hook
const useTransparencyData = () => {
    const [departments, setDepartments] = useState<any[] | null>(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setDepartments([
                { name: 'Computer Science', code: 'CSE', type: 'academic', allocated: 500000, spent: 450000, description: 'Cutting-edge research and education in computing.' },
                { name: 'Mechanical Engineering', code: 'ME', type: 'academic', allocated: 450000, spent: 400000, description: 'Focus on mechanics, thermodynamics, and robotics.' },
                { name: 'Admissions Office', code: 'ADM', type: 'support', allocated: 150000, spent: 140000, description: 'Manages student applications and enrollment.' },
                { name: 'Library Services', code: 'LIB', type: 'support', allocated: 200000, spent: 180000, description: 'Provides access to books, journals, and digital resources.' },
                { name: 'Physics Department', code: 'PHY', type: 'academic', allocated: 300000, spent: 310000, description: 'Exploring the fundamental principles of the universe.' },
                { name: 'Campus Maintenance', code: 'MAINT', type: 'support', allocated: 250000, spent: 225000, description: 'Ensures campus facilities are safe and operational.' }
            ]);
        }, 1000);
    }, []);

    return { departments };
};


// --- The Corrected Component ---

// Remove duplicate default export
export default function DepartmentBreakdownPublic({ currency = 'INR', conversionRate = 0.012, searchTerm = '', departmentFilter = '', vendorFilter = '' }) {
        let currencyCtx;
        try {
            currencyCtx = useCurrency();
        } catch {
            currencyCtx = undefined;
        }
        const effectiveCurrency = currency ?? currencyCtx?.currency ?? 'INR';
        const effectiveConversionRate = conversionRate ?? currencyCtx?.conversionRate ?? 0.012;
            const { departments } = useTransparencyData() || {};
            const loading = !departments;
            // Filter demo data by search/filter
            const filteredDepartments = (departments || []).filter(dept => {
                const searchLower = searchTerm.toLowerCase();
                const deptLower = departmentFilter.toLowerCase();
                const vendorLower = vendorFilter.toLowerCase();
                return (
                    (!searchLower || dept.name?.toLowerCase().includes(searchLower)) &&
                    (!deptLower || dept.name?.toLowerCase().includes(deptLower)) &&
                    (!vendorLower || dept.name?.toLowerCase().includes(vendorLower))
                );
            });
        const conversion = effectiveCurrency === 'USD' ? effectiveConversionRate : 1;

  if (loading) {
    return <div className="min-h-96 flex items-center justify-center text-gray-500">Loading department breakdown...</div>;
  }

    const academicDepartments = filteredDepartments.filter((dept) => dept.type === "academic");
    const supportUnits = filteredDepartments.filter((dept) => dept.type === "support");
    const totalAcademic = academicDepartments.reduce((sum, dept) => sum + dept.allocated * conversion, 0);
    const totalSupport = supportUnits.reduce((sum, dept) => sum + dept.allocated * conversion, 0);
    const grandTotal = totalAcademic + totalSupport;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium text-blue-900">Academic Programs</CardTitle>
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                                                <div className="text-3xl font-bold text-blue-900">
                                                    {effectiveCurrency === 'USD' ? `$${totalAcademic.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${totalAcademic.toLocaleString()}`}
                                                </div>
                        <p className="text-sm text-blue-700 mt-2">
                            {grandTotal > 0 ? ((totalAcademic / grandTotal) * 100).toFixed(1) : 0}% of total budget
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
                                                <div className="text-3xl font-bold text-green-900">
                                                    {effectiveCurrency === 'USD' ? `$${totalSupport.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${totalSupport.toLocaleString()}`}
                                                </div>
                        <p className="text-sm text-green-700 mt-2">
                           {grandTotal > 0 ? ((totalSupport / grandTotal) * 100).toFixed(1) : 0}% of total budget
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
                                                                                        <div className="text-xl font-bold">
                                                                                            {effectiveCurrency === 'USD' ? `$${(dept.allocated * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${dept.allocated.toLocaleString()}`}
                                                                                        </div>
                                                                                        <div className="text-xl font-bold">
                                                                                            {effectiveCurrency === 'USD' ? `$${(dept.spent * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${dept.spent.toLocaleString()}`}
                                                                                        </div>
                                            <div className="text-sm text-gray-500">Budget</div>
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
                                        <div className="text-xs text-gray-500 text-center">
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
                                                                                        <div className="text-xl font-bold">
                                                                                            {effectiveCurrency === 'USD' ? `$${(dept.allocated * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${dept.allocated.toLocaleString()}`}
                                                                                        </div>
                                            <div className="text-sm text-gray-500">Budget</div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Invested:</span>
                                                                                        <span className="font-medium">
                                                                                            {effectiveCurrency === 'USD' ? `$${(dept.spent * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${dept.spent.toLocaleString()}`}
                                                                                        </span>
                                        </div>
                                        <Progress value={utilizationRate} className="h-2" />
                                        <div className="text-xs text-gray-500 text-center">
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
    </div>
  );
}
