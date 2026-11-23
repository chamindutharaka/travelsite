import React from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MultiStepPlanner } from "@/components/planner/MultiStepPlanner";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Plan Your Tailor-Made Sri Lanka Journey",
  description:
    "Design your custom Sri Lanka holiday in 7 steps. Dates, destinations, boutique stays, and wildlife safaris. Obligation-free planning with our team in Galle.",
  alternates: {
    canonical: `${company.canonicalUrl}/plan-your-trip`,
  },
};

export default function PlanYourTripPage() {
  return (
    <div className="bg-[#FDFBF7] text-[#153250]">
      <PageHero
        image="/images/tours/serendipity-honeymoon.jpg"
        imageAlt="Golden sunset over palm-lined southern coastline in Sri Lanka"
        eyebrow="Start Your Custom Route"
        title="Design Your Sri Lanka Holiday"
        subtitle="Seven short steps, no payment, and nothing binding. Share your travel style and our team in Galle will craft a personal itinerary for you."
      />

      <MultiStepPlanner hideHeader compact />
    </div>
  );
}
