"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrencyCode, formatApproxPrice } from "@/lib/site";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (next: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (usd) => formatApproxPrice(usd, "USD"),
});

const STORAGE_KEY = "ceylon-holidays-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved === "USD" || saved === "EUR" || saved === "GBP" || saved === "LKR") {
        setCurrencyState(saved);
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const setCurrency = (next: CurrencyCode) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage access restrictions
    }
  };

  const formatPrice = (usdAmount: number) => formatApproxPrice(usdAmount, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
