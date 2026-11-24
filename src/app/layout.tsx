import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { getTravelAgencySchema } from "@/lib/seo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { Analytics } from "@/components/analytics/Analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.brandName} | ${site.tagline}`,
    template: `%s | ${site.brandName}`,
  },
  description: site.description,
  keywords: [
    "Sri Lanka private tours",
    "Custom Sri Lanka holiday",
    "Galle tour operator",
    "Private driver Sri Lanka",
    "Sri Lanka wildlife safari",
    "Sri Lanka hill country train tour",
    "Sri Lanka day trips from Galle",
  ],
  authors: [{ name: site.brandName, url: site.siteUrl }],
  creator: site.brandName,
  publisher: site.brandName,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: site.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.siteUrl,
    title: `${site.brandName} | ${site.tagline}`,
    description: site.description,
    siteName: site.brandName,
    images: [
      {
        url: "/images/hero/hero-sigiriya.jpg",
        width: 1200,
        height: 630,
        alt: "Sigiriya rock fortress surrounded by green forest in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} | ${site.tagline}`,
    description: site.description,
    images: ["/images/hero/hero-sigiriya.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E5A63",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const travelAgencyJsonLd = getTravelAgencySchema();

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencyJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--sand)] text-[var(--ink)] font-sans antialiased">
        <CurrencyProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
