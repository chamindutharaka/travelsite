import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
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
    <div className="py-12 sm:py-20 bg-beige-50">
      <Container size="default" className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 block mb-2">
          Start Your Custom Route
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-950">
          Design Your Sri Lanka Holiday
        </h1>
        <p className="mt-4 text-base sm:text-lg text-navy-700 max-w-xl mx-auto font-light leading-relaxed">
          Complete these 7 intuitive steps to share your travel style and preferences. Our team in Galle will formulate a personal itinerary for you.
        </p>
      </Container>

      <MultiStepPlanner />
    </div>
  );
}
