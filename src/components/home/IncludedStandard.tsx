"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import {
  EditorialReveal,
  LineRise,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export function IncludedStandard() {
  const inclusions = [
    {
      num: "01",
      title: "Airport pickup and drop-off",
      description:
        "We meet you at Colombo Bandaranaike Airport (CMB) at any hour and drive you back in good time for your flight home.",
    },
    {
      num: "02",
      title: "Private vehicle and driver",
      description:
        "Your own air-conditioned car or van for the full trip, including fuel, highway tolls, parking fees, and driver accommodation.",
    },
    {
      num: "03",
      title: "Support from our Galle desk",
      description: `One local contact on WhatsApp before and during your holiday. We usually reply ${site.responseTime}.`,
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 bg-[#141414] text-[#FBFAF8]"
      aria-labelledby="included-heading"
    >
      <Container size="wide">
        <EditorialReveal className="max-w-2xl space-y-3 mb-12">
          <div className="flex items-center gap-3">
            <span className="w-7 h-[1px] bg-[#EF6427]" />
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#FBFAF8]/65">
              Included as standard
            </p>
          </div>
          <h2 id="included-heading" className="font-serif text-[#FBFAF8]">
            <LineRise>What comes with</LineRise>
            <LineRise delay={0.08}>
              <span className="italic font-light text-[#FBFAF8]/85">
                every multi-day trip.
              </span>
            </LineRise>
          </h2>
        </EditorialReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {inclusions.map((item) => (
            <StaggerItem
              key={item.title}
              className="pt-6 border-t border-white/15 space-y-3"
            >
              <span className="block text-[12px] font-medium tracking-[0.2em] text-[#EF6427]">
                {item.num}
              </span>
              <h3 className="font-serif text-[#FBFAF8] font-medium">
                {item.title}
              </h3>
              <p className="text-[15.5px] text-[#FBFAF8]/75 leading-relaxed">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
