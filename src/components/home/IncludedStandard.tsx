"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { StaggerGrid, StaggerItem } from "@/components/motion/MotionPrimitives";

export function IncludedStandard() {
  const inclusions = [
    {
      index: "01",
      title: "Airport pickup & drop-off",
      description:
        "Included both ways at Bandaranaike International (CMB), whatever hour you land—with chilled towels and king coconut welcome.",
    },
    {
      index: "02",
      title: "Private vehicle & chauffeur-guide",
      description:
        "Your own air-conditioned vehicle and licensed English-fluent chauffeur-guide for the entire trip, with fuel, tolls, and driver lodging covered.",
    },
    {
      index: "03",
      title: "24/7 support in Sri Lanka",
      description:
        "One named coordinator at our Galle desk on WhatsApp throughout your journey for seamless timing, dining tables, or spontaneous changes.",
    },
  ];

  return (
    <section
      className="py-14 sm:py-20 bg-[#122334] text-[#FDFBF7]"
      aria-labelledby="included-heading"
    >
      <Container size="wide">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#E5A952] block mb-2">
              Included as Standard
            </span>
            <h2
              id="included-heading"
              className="font-serif text-2xl sm:text-3xl font-normal text-white leading-snug"
            >
              Quietly handled from arrival to departure.
            </h2>
          </div>
          <p className="text-sm text-white/65 max-w-[40ch] leading-relaxed">
            No surprise fuel surcharges, no taxi haggling, and no handoffs to call centres.
          </p>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {inclusions.map((item) => (
            <StaggerItem
              key={item.title}
              className="pt-5 border-t border-white/15 space-y-2"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#E5A952]">{item.index}</span>
                <h3 className="font-serif text-xl sm:text-[1.35rem] font-normal text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-[14.5px] text-white/70 leading-[1.7] max-w-[42ch]">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
