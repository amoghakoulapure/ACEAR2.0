import React, { createContext, useContext, useState } from "react";

export type CurrencyType = "INR" | "USD";

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  conversionRate: number;
  setConversionRate: (r: number) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>("INR");
  const [conversionRate, setConversionRate] = useState<number>(0.012); // Default INR to USD

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, conversionRate, setConversionRate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}
