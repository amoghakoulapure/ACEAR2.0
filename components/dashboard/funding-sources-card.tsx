"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const fundingSources = [
  { name: "Government Grant", amount: 7000000, percentage: 49, color: "bg-blue-500" },
  { name: "Tuition Fees", amount: 5000000, percentage: 35, color: "bg-green-500" },
  { name: "Alumni Donations", amount: 1000000, percentage: 7, color: "bg-purple-500" },
  { name: "Corporate Sponsorships", amount: 800000, percentage: 6, color: "bg-orange-500" },
  { name: "Research Grants", amount: 500000, percentage: 3, color: "bg-pink-500" },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function FundingSourcesCard() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Funding Sources</CardTitle>
        <p className="text-sm text-gray-600">Revenue breakdown by source</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {fundingSources.map((source, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                <span className="text-sm font-medium text-gray-900">{source.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{formatCurrency(source.amount)}</div>
                <div className="text-xs text-gray-600">{source.percentage}%</div>
              </div>
            </div>
            <Progress value={source.percentage} className={`h-2 [&>div]:${source.color}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
