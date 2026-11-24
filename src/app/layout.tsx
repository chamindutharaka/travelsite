import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { company } from "@/content/company";
import { getTravelAgencySchema } from "@/lib/seo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.canonicalUrl),
  title: {
    default: `${company.name} | Private, Tailor-Made Journeys Across Sri Lanka`,
    template: `%s | ${company.name}`,
  },
  description:
    "Private, tailor-made luxury and boutique tours across Sri Lanka crafted by local travel designers in Galle. Dedicated chauffeur-guides, no fixed packages, obligation-free planning.",
  keywords: [
    "Sri Lanka private tours",
    "Tailor-made Sri Lanka holiday",
    "Sri Lanka luxury travel",
    "Galle tour company",
    "Private driver Sri Lanka",
    "Sri Lanka wildlife safari",
    "Ceylon tea country tours",
    "Bespoke Sri Lanka itineraries",
  ],
  authors: [{ name: company.name, url: company.canonicalUrl }],
  creator: company.name,
  publisher: company.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: company.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: company.canonicalUrl,
    title: `${company.name} | Private, Tailor-Made Journeys Across Sri Lanka`,
    description: company.shortDescription,
    siteName: company.name,
    images: [
      {
        url: "/images/hero/hero-sigiriya.jpg",
        width: 1200,
        height: 630,
        alt: "Ceylon Holidays — Tailor-made luxury journeys in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Private Journeys Across Sri Lanka`,
    description: company.shortDescription,
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
  themeColor: "#1A1A1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const travelAgencyJsonLd = getTravelAgencySchema();

  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencyJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBFAF8] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#FBFAF8] font-sans antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
