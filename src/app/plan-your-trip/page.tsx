import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MultiStepPlanner } from "@/components/planner/MultiStepPlanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan Your Sri Lanka Trip",
  description: `Plan a private Sri Lanka holiday in 5 short steps. Free, no-obligation route planning from our local team in ${site.city}.`,
  alternates: {
    canonical: `${site.siteUrl}/plan-your-trip`,
  },
};

export default function PlanYourTripPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--ink)]">
      <PageHero
        image="/images/tours/serendipity-honeymoon.jpg"
        imageAlt="Golden sunset over palm-lined southern coastline in Sri Lanka"
        eyebrow="5-step trip planner"
        title="Plan your Sri Lanka trip"
        subtitle={`Share your dates, travel style, and interests. Our team in ${site.city} will reply ${site.responseTime} with a custom route and clear price guide.`}
      />

      <Suspense
        fallback={
          <div className="py-16 text-center text-[var(--ink-muted)]">
            Loading trip planner...
          </div>
        }
      >
        <MultiStepPlanner />
      </Suspense>
    </div>
  );
}
