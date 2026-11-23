"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { seasons } from "@/content/seasons";
import {
  EditorialReveal,
  LineRise,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export function SeasonalJourneys() {
  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#F5EFE6] text-[#122334] border-y border-[#122334]/10"
      aria-labelledby="seasons-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#D4622A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                Seasonal Journeys
              </span>
            </div>
            <h2
              id="seasons-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#122334] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Travelling at a particular time,</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">or following the sun?</span>
              </LineRise>
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-base text-[#4E5A65] leading-[1.7] max-w-[54ch]">
              Sri Lanka enjoys sunshine all year—two opposite monsoons mean one coastline is always calm and clear. We shape your route around the exact month you travel.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#122334] hover:text-[#D4622A] transition-colors hover-underline"
            >
              <span>All journeys</span>
              <span>→</span>
            </Link>
          </EditorialReveal>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {seasons.map((season) => (
            <StaggerItem
              key={season.id}
              className="group p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] border border-[#122334]/10 hover:border-[#D4622A]/60 transition-colors duration-500 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] text-[#D4622A] mb-2.5">
                  {season.months}
                </span>

                <h3 className="font-serif text-2xl sm:text-[1.65rem] font-normal text-[#122334] mb-1.5 leading-snug">
                  {season.name}
                </h3>

                <p className="font-serif italic text-[15px] text-[#4E5A65] mb-4">
                  {season.tagline}
                </p>

                <p className="text-[14.5px] text-[#4E5A65] leading-[1.7] mb-6">
                  {season.weatherHighlights}
                </p>

                <div className="pt-4 border-t border-[#122334]/10 space-y-2.5 mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] block">
                    Prime Regions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {season.keyRegions.map((region) => (
                      <span
                        key={region}
                        className="px-2.5 py-1 rounded-full bg-white border border-[#122334]/10 text-[11px] text-[#122334] font-medium"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F5EFE6] text-xs text-[#122334] leading-relaxed">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#D4622A] block mb-1">
                    Wildlife Highlight
                  </span>
                  <span className="text-[#4E5A65]">{season.wildlifeSpecial}</span>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-[#122334]/10">
                <Link
                  href="/plan-your-trip"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#122334] group-hover:text-[#D4622A] transition-colors"
                >
                  <span>Plan for {season.months.split(" ")[0]}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
