import React, { createContext, useContext, useState } from "react";

// Demo data for hackathon
const initialFundingSources = [
  {
    id: "1",
    name: "Government Grant",
    type: "government_grants",
    total_amount: 7000000,
    available_amount: 3500000,
    description: "Central government grant for infrastructure and research.",
    grant_period_start: "2024-01-01",
    grant_period_end: "2024-12-31",
  },
  {
    id: "2",
    name: "Tuition Fees",
    type: "tuition_fees",
    total_amount: 5000000,
    available_amount: 2000000,
    description: "Annual tuition fees collected from students.",
  },
  {
    id: "3",
    name: "Alumni Donations",
    type: "donations",
    total_amount: 1000000,
    available_amount: 800000,
    description: "Donations from alumni for scholarships.",
  },
  {
    id: "4",
    name: "Corporate Sponsorships",
    type: "endowment",
    total_amount: 800000,
    available_amount: 600000,
    description: "Corporate sponsorship for events and research.",
  },
  {
    id: "5",
    name: "Research Grants",
    type: "research_grants",
    total_amount: 500000,
    available_amount: 300000,
    description: "Grants for faculty research projects.",
  },
];

const initialSpendingTrends = [
  { month: "Jan 2024", spending: 1200000, cumulative: 1200000 },
  { month: "Feb 2024", spending: 900000, cumulative: 2100000 },
  { month: "Mar 2024", spending: 1100000, cumulative: 3200000 },
  { month: "Apr 2024", spending: 800000, cumulative: 4000000 },
  { month: "May 2024", spending: 950000, cumulative: 4950000 },
  { month: "Jun 2024", spending: 700000, cumulative: 5650000 },
  { month: "Jul 2024", spending: 850000, cumulative: 6500000 },
  { month: "Aug 2024", spending: 600000, cumulative: 7100000 },
  { month: "Sep 2024", spending: 750000, cumulative: 7850000 },
  { month: "Oct 2024", spending: 900000, cumulative: 8750000 },
  { month: "Nov 2024", spending: 650000, cumulative: 9400000 },
  { month: "Dec 2024", spending: 800000, cumulative: 10200000 },
];

const initialDepartments = [
  {
    name: "Computer Science",
    code: "CS",
    type: "academic",
    description: "Department of Computer Science and Engineering.",
    allocated: 2000000,
    spent: 1500000,
  },
  {
    name: "Mechanical Engineering",
    code: "ME",
    type: "academic",
    description: "Department of Mechanical Engineering.",
    allocated: 1800000,
    spent: 1200000,
  },
  {
    name: "Library",
    code: "LIB",
    type: "support",
    description: "Central Library and digital resources.",
    allocated: 1000000,
    spent: 800000,
  },
  {
    name: "Sports",
    code: "SPT",
    type: "support",
    description: "Sports and recreation facilities.",
    allocated: 800000,
    spent: 600000,
  },
  {
    name: "Electrical Engineering",
    code: "EE",
    type: "academic",
    description: "Department of Electrical Engineering.",
    allocated: 1600000,
    spent: 1100000,
  },
  {
    name: "Administration",
    code: "ADM",
    type: "support",
    description: "Administrative and support services.",
    allocated: 1200000,
    spent: 900000,
  },
];


interface FundingSource {
  id: string;
  name: string;
  type: string;
  total_amount: number;
  available_amount: number;
  description: string;
  grant_period_start?: string;
  grant_period_end?: string;
}

interface SpendingTrend {
  month: string;
  spending: number;
  cumulative: number;
}

interface Department {
  name: string;
  code: string;
  type: string;
  description: string;
  allocated: number;
  spent: number;
}

interface TransparencyDataContextType {
  fundingSources: FundingSource[];
  setFundingSources: React.Dispatch<React.SetStateAction<FundingSource[]>>;
  spendingTrends: SpendingTrend[];
  setSpendingTrends: React.Dispatch<React.SetStateAction<SpendingTrend[]>>;
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

const TransparencyDataContext = createContext<TransparencyDataContextType | undefined>(undefined);

export function useTransparencyData() {
  return useContext(TransparencyDataContext);
}

import { ReactNode } from "react";
export function TransparencyDataProvider({ children }: { children: ReactNode }) {
  const [fundingSources, setFundingSources] = useState<FundingSource[]>(initialFundingSources);
  const [spendingTrends, setSpendingTrends] = useState<SpendingTrend[]>(initialSpendingTrends);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  return (
    <TransparencyDataContext.Provider value={{
      fundingSources, setFundingSources,
      spendingTrends, setSpendingTrends,
      departments, setDepartments,
    }}>
      {children}
    </TransparencyDataContext.Provider>
  );
}