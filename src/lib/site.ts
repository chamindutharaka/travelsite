export type CurrencyCode = "USD" | "EUR" | "GBP" | "LKR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Approximate static rate relative to 1 USD */
  rateFromUsd: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", label: "USD ($)", rateFromUsd: 1 },
  EUR: { code: "EUR", symbol: "€", label: "EUR (€)", rateFromUsd: 0.92 },
  GBP: { code: "GBP", symbol: "£", label: "GBP (£)", rateFromUsd: 0.79 },
  LKR: { code: "LKR", symbol: "Rs ", label: "LKR (Rs)", rateFromUsd: 295 },
};

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://travel.chamindu.com";

export const site = {
  brandName: "Ceylon Holidays",
  tagline: "Private Sri Lanka trips, planned from Galle",
  description:
    "Private, flexible Sri Lanka journeys planned by our local team in Galle. Choose a ready-made route or adjust every stop, hotel, and pace to suit you.",
  siteUrl: rawSiteUrl,
  domain: rawSiteUrl.replace(/^https?:\/\//, ""),
  city: "Galle",
  region: "Southern Province",
  country: "Sri Lanka",

  // Contact — fill in exact values when ready; empty strings are hidden in the UI
  phone: "+94702156828",
  phoneDisplay: "+94 70 215 6828",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "") || "94702156828",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  email: "hello@travel.chamindu.com", // TODO(confirm): replace with your preferred business email
  hours: "Mon–Sat, 8:30 AM – 6:00 PM (Sri Lanka time, GMT+5:30)",
  responseTime: "within 12 hours",

  // Optional verified details — leave blank until confirmed so the UI never shows placeholders
  streetAddress: "", // TODO(confirm): add verified street address in Galle
  sltdaNumber: "", // TODO(confirm): add official SLTDA registration number once issued
  foundedYear: "", // TODO(confirm): add founding year if you want it displayed
  insuranceNote: "", // TODO(confirm): add verified passenger transit insurance details if applicable

  // External profiles — leave blank if not yet active
  facebookUrl: "", // TODO(confirm): add official Facebook page URL
  instagramUrl: "", // TODO(confirm): add official Instagram profile URL
  tripAdvisorUrl: "", // TODO(confirm): add TripAdvisor profile URL when live
  googleReviewsUrl: "", // TODO(confirm): add Google Business Profile reviews link when live

  // Optional analytics (configured via environment variables)
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
} as const;

export function formatApproxPrice(
  usdAmount: number,
  currency: CurrencyCode
): string {
  const cfg = CURRENCIES[currency];
  const converted = usdAmount * cfg.rateFromUsd;
  const rounded =
    currency === "LKR"
      ? Math.round(converted / 500) * 500
      : Math.round(converted);
  return `${cfg.symbol}${rounded.toLocaleString("en-US")}`;
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
