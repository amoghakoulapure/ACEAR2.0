import { PublicHeader } from "@/components/public/public-header"
import { BudgetOverviewPublic } from "@/components/public/budget-overview-public"
import { FundSourcesPublic } from "@/components/public/fund-sources-public"
import { SpendingTrendsPublic } from "@/components/public/spending-trends-public"
import { DepartmentBreakdownPublic } from "@/components/public/department-breakdown-public"
import { TransparencyStats } from "@/components/public/transparency-stats"
import { ContactSection } from "@/components/public/contact-section"

export default function PublicTransparencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Transparency Portal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ACEAR Institute is committed to complete financial transparency. Explore our budget allocations, spending
            patterns, and fund sources to understand how we invest in education and research.
          </p>
        </div>

        {/* Key Statistics */}
        <TransparencyStats />

        {/* Budget Overview */}
        <section id="budget-overview" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Budget Overview</h2>
          <BudgetOverviewPublic />
        </section>

        {/* Fund Sources */}
        <section id="fund-sources" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Funding Sources</h2>
          <FundSourcesPublic />
        </section>

        {/* Spending Trends */}
        <section id="spending-trends" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Spending Trends</h2>
          <SpendingTrendsPublic />
        </section>

        {/* Department Breakdown */}
        <section id="departments" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Department Investments</h2>
          <DepartmentBreakdownPublic />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-12">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 ACEAR Institute. All rights reserved.</p>
            <p className="mt-2">Last updated: {new Date().toLocaleDateString()} | Data reflects Fiscal Year 2024</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
