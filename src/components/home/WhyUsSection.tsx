"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import {
  EditorialReveal,
  LineRise,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export function WhyUsSection() {
  const values = [
    {
      index: "01",
      title: "Local Expertise",
      description:
        "We live and work in Galle. Every route, boutique property, and naturalist guide in our itineraries has been vetted personally by our team.",
    },
    {
      index: "02",
      title: "Tailor-Made Journeys",
      description:
        "Nothing we offer is fixed. Itineraries are drafted from a conversation and revised until the pace and character of the trip are genuinely yours.",
    },
    {
      index: "03",
      title: "Authentic Experiences",
      description:
        "Family clay-pot kitchens rather than tour-bus buffets, working tea estates rather than staged stops, and guides who share the deeper story.",
    },
    {
      index: "04",
      title: "Licensed & Protected",
      description:
        "SLTDA-registered operations, English-fluent licensed chauffeur-guides, full passenger insurance, and one named coordinator in Galle throughout.",
    },
    {
      index: "05",
      title: "Honest Seasonality",
      description:
        "Sri Lanka has two opposite monsoons. We steer you to the exact coast in sunshine and tell you honestly when a park or bay is out of season.",
    },
    {
      index: "06",
      title: "Flexible Travel",
      description:
        "Plans evolve on the road. Your private vehicle and driver absorb slow mornings, spontaneous roadside stops, or an extra hour on the beach.",
    },
  ];

  const islandHighlights = [
    { metric: "8", label: "UNESCO World Heritage sites across the island" },
    { metric: "26", label: "National parks and protected wildlife reserves" },
    { metric: "2", label: "Opposite monsoons — sunshine somewhere all year" },
    { metric: "100%", label: "Private, tailor-made itineraries with zero group buses" },
  ];

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#F5EFE6] text-[#122334] border-y border-[#122334]/10"
      aria-labelledby="why-us-heading"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 sm:mb-16">
          <EditorialReveal className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#D4622A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                Why Ceylon Holidays
              </span>
            </div>
            <h2
              id="why-us-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#122334] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>More than a tour.</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">It is your story.</span>
              </LineRise>
            </h2>
          </EditorialReveal>

          <EditorialReveal delay={0.1} className="lg:col-span-5">
            <p className="text-[15px] sm:text-base text-[#4E5A65] leading-[1.7] max-w-[44ch] lg:ml-auto">
              Six principles that decide whether a Sri Lankan journey feels genuinely memorable or merely completed. None of them appear on a generic price list.
            </p>
          </EditorialReveal>
        </div>

        {/* 6 Editorial Hairline Grid Items */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 sm:gap-y-12">
          {values.map((val) => (
            <StaggerItem
              key={val.index}
              className="group pt-6 border-t border-[#122334]/15 hover:border-[#D4622A] transition-colors duration-500"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-[#D4622A] block mb-3">
                {val.index}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#122334] mb-2.5 group-hover:text-[#D4622A] transition-colors duration-300">
                {val.title}
              </h3>
              <p className="text-[14.5px] sm:text-[15px] text-[#4E5A65] leading-[1.7] max-w-[42ch]">
                {val.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Island Facts Strip */}
        <StaggerGrid
          stagger={0.06}
          className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-[#122334]/12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8"
        >
          {islandHighlights.map((item) => (
            <StaggerItem key={item.label}>
              <span className="font-serif text-3xl sm:text-5xl font-normal text-[#122334] block leading-none">
                {item.metric}
              </span>
              <p className="mt-2.5 text-xs sm:text-sm text-[#4E5A65] leading-[1.6] max-w-[22ch]">
                {item.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
