import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ToursCatalog } from "@/components/tours/ToursCatalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sri Lanka Tours & Galle Day Experiences",
  description:
    "Browse 20 ready-made Sri Lanka multi-day tours and half-day or full-day experiences from Galle. Every itinerary can be fully customised.",
  alternates: {
    canonical: `${site.siteUrl}/tours`,
  },
};

export default function ToursPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--ink)]">
      <PageHero
        image="/images/hero/hero-tea-country.jpg"
        imageAlt="Green Ceylon tea plantations across the central hills of Sri Lanka"
        eyebrow="Ready-made & customisable"
        title="Sri Lanka tours & Galle day trips"
        subtitle="Filter by interest, trip length, comfort level, or season. Every tour below is private and can be adjusted to fit your dates and pace."
      />

      <Suspense
        fallback={
          <div className="py-16 text-center text-[var(--ink-muted)]">
            Loading tours...
          </div>
        }
      >
        <ToursCatalog />
      </Suspense>
    </div>
  );
}
