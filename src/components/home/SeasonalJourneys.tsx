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
      className="py-16 sm:py-24 lg:py-28 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="seasons-heading"
    >
      <Container size="wide">
        <EditorialReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[1px] bg-[var(--cinnamon)]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                When to visit
              </p>
            </div>
            <h2 id="seasons-heading" className="font-serif text-[var(--ink)]">
              <LineRise>Follow the dry weather</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">across Sri Lanka.</span>
              </LineRise>
            </h2>
            <p className="text-[var(--ink-muted)]">
              Two opposite monsoons mean one coast is sunny almost every month of the year. We match your beaches and parks to your travel dates.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline shrink-0"
          >
            Browse tours by month →
          </Link>
        </EditorialReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {seasons.map((season, index) => (
            <StaggerItem
              key={season.id}
              className="p-7 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between space-y-6 transition-all duration-500 hover:border-[var(--ink)]/25"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--cinnamon)]">
                    {season.months}
                  </p>
                  <span className="text-[12px] font-medium tracking-[0.18em] text-[var(--ink-muted)]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-[var(--ink)]">{season.name}</h3>

                <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                  {season.weatherHighlights}
                </p>

                <div className="pt-4 border-t border-[var(--line)]">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--ink-muted)] mb-2.5">
                    Best areas
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {season.keyRegions.map((region) => (
                      <li
                        key={region}
                        className="px-3 py-1 rounded-full bg-[var(--sand)] border border-[var(--line)] text-[13px] font-medium text-[var(--ink)]"
                      >
                        {region}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[var(--sand)] border border-[var(--line)] text-[14px]">
                  <strong className="text-[var(--leaf)] font-semibold block mb-0.5">
                    Wildlife highlight
                  </strong>
                  <span className="text-[var(--ink-muted)]">
                    {season.wildlifeSpecial}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <Link
                  href={`/plan-your-trip?month=${season.months.slice(0, 3)}`}
                  className="inline-flex items-center min-h-[44px] text-[14.5px] font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline"
                >
                  Plan for {season.months.split(" ")[0]} →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
