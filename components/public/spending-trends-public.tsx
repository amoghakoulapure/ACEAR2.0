"use client"

import { useTransparencyData } from "./transparency-data-context"
import { useCurrency } from "./currency-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface TrendData {
  month: string;
  spending: number;
  cumulative: number;
}

export function SpendingTrendsPublic({ currency = 'INR', conversionRate = 0.012, searchTerm = '', departmentFilter = '', vendorFilter = '' }) {
  // Use currency from context if not provided as prop
  let currencyCtx;
  try {
    currencyCtx = useCurrency();
  } catch {
    currencyCtx = undefined;
  }
  const effectiveCurrency = currency ?? currencyCtx?.currency ?? 'INR';
  const effectiveConversionRate = conversionRate ?? currencyCtx?.conversionRate ?? 0.012;
  const { spendingTrends, setSpendingTrends } = useTransparencyData() || {};
  const loading = !spendingTrends;
  const filteredData = (spendingTrends || []).filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const deptLower = departmentFilter.toLowerCase();
    const vendorLower = vendorFilter.toLowerCase();
    return (
      (!searchLower || item.month?.toLowerCase().includes(searchLower)) &&
      (!deptLower || item.month?.toLowerCase().includes(deptLower)) &&
      (!vendorLower || item.month?.toLowerCase().includes(vendorLower))
    );
  });
  const conversion = effectiveCurrency === 'USD' ? effectiveConversionRate : 1;

  if (loading) {
    return <div className="h-96 flex items-center justify-center">Loading spending trends...</div>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Patterns (FY 2024)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track how ACEAR Institute invests funds throughout the fiscal year
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) =>
                effectiveCurrency === 'USD'
                  ? `$${((value * conversion) / 1000).toFixed(0)}K`
                  : `₹${(value / 1000).toFixed(0)}K`
              } />
              <Tooltip
                formatter={(value: number, name: string) => [
                  effectiveCurrency === 'USD'
                    ? `$${(value * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                    : `₹${value.toLocaleString()}`,
                  name === "spending" ? "Monthly Spending" : "Cumulative Spending",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Monthly Spending"
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#10b981"
                strokeWidth={3}
                name="Cumulative Spending"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
