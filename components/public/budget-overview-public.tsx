"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Mock UI components for demonstration
const Card = ({ children }: { children: React.ReactNode }) => <div className="border rounded-lg shadow-sm bg-white">{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="p-6">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold tracking-tight">{children}</h3>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-0">{children}</div>;
const Progress = ({ value, className }: { value: number, className?: string }) => (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div className="h-full bg-blue-600" style={{ width: `${value}%` }}></div>
    </div>
);


interface BudgetData {
  category: string;
  allocated: number;
  spent: number;
  percentage: number;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];


interface BudgetOverviewPublicProps {
    currency?: 'INR' | 'USD';
    conversionRate?: number;
    searchTerm?: string;
    departmentFilter?: string;
    vendorFilter?: string;
}

export default function BudgetOverviewPublic({ currency = 'INR', conversionRate = 0.012, searchTerm = '', departmentFilter = '', vendorFilter = '' }: BudgetOverviewPublicProps) {
  const [data, setData] = useState<BudgetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [anomalies, setAnomalies] = useState<string[]>([]);
    const selectedCurrency = currency;
    const conversion = selectedCurrency === 'USD' ? conversionRate : 1;

            // Demo random data for demonstration
                                useEffect(() => {
                        const randomCategories = [
                            "Research", "Infrastructure", "Faculty", "Student Activities", "Library", "Sports"
                        ];
                        let chartData = randomCategories.map((cat, idx) => {
                            const allocated = Math.floor(Math.random() * 1000000 + 500000);
                            // Introduce a chance for overspending for the anomaly detection
                            const spent = Math.floor(allocated * (0.5 + Math.random() * 0.7)); 
                            return {
                                category: cat,
                                allocated,
                                spent,
                                percentage: 0, // will be calculated below
                            };
                        });
                        // Make one item an anomaly for sure
                        if (chartData.length > 0) {
                            chartData[0].spent = chartData[0].allocated * 1.15;
                        }
                        // Filter by searchTerm, departmentFilter, vendorFilter
                                    chartData = chartData.filter(item => {
                                        const searchLower = (searchTerm || '').toLowerCase();
                                        const deptLower = (departmentFilter || '').toLowerCase();
                                        const vendorLower = (vendorFilter || '').toLowerCase();
                                        return (
                                            (!searchLower || item.category.toLowerCase().includes(searchLower)) &&
                                            (!deptLower || item.category.toLowerCase().includes(deptLower)) &&
                                            (!vendorLower || item.category.toLowerCase().includes(vendorLower))
                                        );
                                    });
                        const totalAllocated = chartData.reduce((sum, item) => sum + item.allocated, 0);
                        chartData.forEach(item => {
                            item.percentage = totalAllocated > 0 ? (item.allocated / totalAllocated) * 100 : 0;
                        });
                        setData(chartData);
                        // Demo anomaly detection
                        const detected = chartData
                            .filter(cat => cat.spent > cat.allocated)
                            .map(cat => `${cat.category}: Spent ${selectedCurrency === 'USD' ? `$${(cat.spent * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${cat.spent.toLocaleString()}`} > Allocated ${selectedCurrency === 'USD' ? `$${(cat.allocated * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${cat.allocated.toLocaleString()}`}`);
                        setAnomalies(detected);
                        setLoading(false);
                                }, [currency, conversionRate, searchTerm, departmentFilter, vendorFilter]);

    if (loading) {
        return <div className="min-h-96 flex items-center justify-center text-gray-500">Loading budget data...</div>;
    }
    if (data.length === 0) {
        return (
            <div className="min-h-96 flex flex-col items-center justify-center text-gray-500">
                <div className="text-lg mb-4">No categories match your search or filter.</div>
                <div className="w-full max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Budget FY 2025</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{selectedCurrency === 'USD' ? '$0.00' : '₹0'}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Currency is now controlled globally from the dropdown in the public transparency page */}
                                {/* Update original card for currency logic */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Total Budget FY 2025</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">
                                            {selectedCurrency === 'USD'
                                                ? `$${(data.reduce((sum, item) => sum + item.allocated, 0) * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                                : `₹${data.reduce((sum, item) => sum + item.allocated, 0).toLocaleString()}`}
                                        </div>
                                    </CardContent>
                                </Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {anomalies.length > 0 && (
                <div className="lg:col-span-2">
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
                        <p className="font-bold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Anomaly Alert
                        </p>
                        <ul className="list-disc ml-8 mt-2 space-y-1">
                            {anomalies.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Card>
                <CardHeader>
                    <CardTitle>Budget Allocation by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(props: any) => `${(props.percentage ?? 0).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="allocated"
                                    nameKey="category"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => [
                                    selectedCurrency === 'USD'
                                        ? `$${(value * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                        : `₹${value.toLocaleString()}`,
                                    'Allocated',
                                ]} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Spending Progress by Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 max-h-[25rem] overflow-y-auto pr-2">
                        {data.map((category) => {
                            const utilizationRate = category.allocated > 0 ? (category.spent / category.allocated) * 100 : 0;
                            const isOverspent = utilizationRate > 100;

                            return (
                                <div key={category.category} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className={`font-medium ${isOverspent ? 'text-red-600' : ''}`}>{category.category}</h4>
                                            <p className="text-sm text-gray-500">
                                                {selectedCurrency === 'USD'
                                                    ? `$${(category.spent * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })} of $${(category.allocated * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                                    : `₹${category.spent.toLocaleString()} of ₹${category.allocated.toLocaleString()}`}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-semibold ${isOverspent ? 'text-red-600' : ''}`}>{utilizationRate.toFixed(1)}%</div>
                                            <div className="text-sm text-gray-500">utilized</div>
                                        </div>
                                    </div>
                                    <div className={`h-3 w-full overflow-hidden rounded-full bg-gray-200`}>
                                        <div className={`h-full ${isOverspent ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${Math.min(utilizationRate, 100)}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

