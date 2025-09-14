"use client"

import { useTransparencyData } from "./transparency-data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign } from "lucide-react"

// Use shared context type
import { useCurrency } from "./currency-context"

export function FundSourcesPublic({ currency = 'INR', conversionRate = 0.012, searchTerm = '', departmentFilter = '', vendorFilter = '' }) {
  let currencyCtx;
  try {
    currencyCtx = useCurrency();
  } catch {
    currencyCtx = undefined;
  }
  const effectiveCurrency = currency ?? currencyCtx?.currency ?? 'INR';
  const effectiveConversionRate = conversionRate ?? currencyCtx?.conversionRate ?? 0.012;
  const { fundingSources, setFundingSources } = useTransparencyData() || {};
  const loading = !fundingSources;

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading fund sources...</div>;
  }

  // Filter fundingSources by searchTerm, departmentFilter, vendorFilter
  const filteredFundingSources = (fundingSources || []).filter(fund => {
    const searchLower = (searchTerm || '').toLowerCase();
    const deptLower = (departmentFilter || '').toLowerCase();
    const vendorLower = (vendorFilter || '').toLowerCase();
    return (
      (!searchLower || fund.name.toLowerCase().includes(searchLower)) &&
      (!deptLower || fund.name.toLowerCase().includes(deptLower)) &&
      (!vendorLower || fund.name.toLowerCase().includes(vendorLower))
    );
  });

  const getFundTypeColor = (type: string) => {
    switch (type) {
      case "government_grants":
        return "bg-blue-100 text-blue-800";
      case "tuition_fees":
        return "bg-green-100 text-green-800";
      case "donations":
        return "bg-purple-100 text-purple-800";
      case "research_grants":
        return "bg-orange-100 text-orange-800";
      case "endowment":
        return "bg-yellow-100 text-yellow-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading fund sources...</div>;
  }
  // Editable UI for staff-dash (example: add/edit/delete)
  // Only show edit controls if setFundingSources is available (i.e. in staff-dash)
  // Example: Add new fund source
  // ...existing code for rendering...

  const conversion = effectiveCurrency === 'USD' ? effectiveConversionRate : 1;
  const totalFunding = (filteredFundingSources || []).reduce((sum: number, fund: any) => sum + Number(fund.total_amount) * conversion, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Total Funding Portfolio</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {effectiveCurrency === 'USD' ? `$${totalFunding.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `₹${totalFunding.toLocaleString()}`}
          </div>
          <p className="text-gray-600 mt-2">
            Diversified funding from {fundingSources.length} sources supporting education, research, and operations
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {filteredFundingSources.map((fund) => {
          const utilizationRate =
            Number(fund.total_amount) > 0
              ? ((Number(fund.total_amount) - Number(fund.available_amount)) / Number(fund.total_amount)) * 100
              : 0

          return (
            <Card key={fund.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{fund.name}</CardTitle>
                    <Badge className={getFundTypeColor(fund.type)}>{fund.type.replace("_", " ").toUpperCase()}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {effectiveCurrency === 'USD'
                        ? `$${(Number(fund.total_amount) * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                        : `₹${Number(fund.total_amount).toLocaleString()}`}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{fund.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilized:</span>
                      <span className="font-medium">
                        {effectiveCurrency === 'USD'
                          ? `$${((Number(fund.total_amount) - Number(fund.available_amount)) * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                          : `₹${(Number(fund.total_amount) - Number(fund.available_amount)).toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Available:</span>
                      <span className="font-medium text-green-600">
                        {effectiveCurrency === 'USD'
                          ? `$${(Number(fund.available_amount) * conversion).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                          : `₹${Number(fund.available_amount).toLocaleString()}`}
                      </span>
                    </div>
                    <Progress value={utilizationRate} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">
                      {utilizationRate.toFixed(1)}% utilized
                    </div>
                  </div>

                  {fund.grant_period_start && fund.grant_period_end && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(fund.grant_period_start).toLocaleDateString()} -{" "}
                      {new Date(fund.grant_period_end).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
