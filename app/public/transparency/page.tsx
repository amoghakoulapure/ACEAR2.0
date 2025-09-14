"use client";
import { CurrencyProvider, useCurrency } from "@/components/public/currency-context"
import { PublicHeader } from "@/components/public/public-header"
import BudgetOverviewPublic from "@/components/public/budget-overview-public"
import { FundSourcesPublic } from "@/components/public/fund-sources-public"
import { SpendingTrendsPublic } from "@/components/public/spending-trends-public"
import DepartmentBreakdownPublic from "@/components/public/department-breakdown-public"
import TransparencyStats from "@/components/public/transparency-stats"
import { ContactSection } from "@/components/public/contact-section"
import Chatbot from "@/components/chatbot/chatbot"

export default function PublicTransparencyPage() {
  // Ensure demo data is available to all public components
  const { TransparencyDataProvider } = require("@/components/public/transparency-data-context");
  return (
    <CurrencyProvider>
      <TransparencyDataProvider>
        <TransparencyPageContent />
      </TransparencyDataProvider>
    </CurrencyProvider>
  );
}

import { useState } from "react";

function TransparencyPageContent() {
  const { currency, setCurrency, conversionRate } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Currency Toggle */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 font-medium">💲 Currency:</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as 'INR' | 'USD')}
            className="border p-2 rounded"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Transparency Portal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ACEAR Institute is committed to complete financial transparency. Explore our budget allocations, spending
            patterns, and fund sources to understand how we invest in education and research.
          </p>
        </div>
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            className="border p-2 rounded w-full md:w-1/3"
            placeholder="🔎 Search by department or vendor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded w-full md:w-1/4"
            placeholder="Filter by department..."
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded w-full md:w-1/4"
            placeholder="Filter by vendor..."
            value={vendorFilter}
            onChange={e => setVendorFilter(e.target.value)}
          />
        </div>

        {/* Key Statistics */}
        <TransparencyStats searchTerm={searchTerm} departmentFilter={departmentFilter} vendorFilter={vendorFilter} />

        {/* Budget Overview */}
        <section id="budget-overview" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Budget Overview</h2>
          <BudgetOverviewPublic currency={currency} conversionRate={conversionRate} searchTerm={searchTerm} departmentFilter={departmentFilter} vendorFilter={vendorFilter} />
        </section>

        {/* Fund Sources */}
        <section id="fund-sources" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Funding Sources</h2>
          <FundSourcesPublic currency={currency} conversionRate={conversionRate} searchTerm={searchTerm} departmentFilter={departmentFilter} vendorFilter={vendorFilter} />
        </section>

        {/* Spending Trends */}
        <section id="spending-trends" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Spending Trends</h2>
          <SpendingTrendsPublic currency={currency} conversionRate={conversionRate} searchTerm={searchTerm} departmentFilter={departmentFilter} vendorFilter={vendorFilter} />
        </section>

        {/* Department Breakdown */}
        <section id="departments" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Department Investments</h2>
          <DepartmentBreakdownPublic currency={currency} conversionRate={conversionRate} searchTerm={searchTerm} departmentFilter={departmentFilter} vendorFilter={vendorFilter} />
        </section>

        {/* Community Feedback Button */}
        <section id="feedback" className="mb-12">
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
              onClick={() => {
                const feedback = prompt('💭 Leave your feedback or suggestion for a budget item:');
                if (feedback) {
                  alert('Thank you for your feedback!');
                  // TODO: Save feedback to Supabase or show in UI
                }
              }}
            >
              💭 Leave Feedback
            </button>
          </div>
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

      <Chatbot />
    </div>
  )
}
