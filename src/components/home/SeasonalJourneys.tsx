import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { seasons } from "@/content/seasons";

export function SeasonalJourneys() {
  return (
    <section
      className="py-16 sm:py-24 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="seasons-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              When to visit
            </p>
            <h2 id="seasons-heading" className="font-serif text-[var(--ink)]">
              Follow the dry weather across Sri Lanka.
            </h2>
            <p className="text-[var(--ink-muted)]">
              Two opposite monsoons mean one coast is sunny almost every month of the year. We match your beaches and parks to your travel dates.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center min-h-[44px] text-[16px] font-semibold text-[var(--ocean)] hover:underline shrink-0"
          >
            Browse tours by month →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasons.map((season) => (
            <article
              key={season.id}
              className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <p className="text-[14px] font-semibold text-[var(--cinnamon)]">
                  {season.months}
                </p>

                <h3 className="font-serif text-[var(--ink)]">{season.name}</h3>

                <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                  {season.weatherHighlights}
                </p>

                <div className="pt-3 border-t border-[var(--line)]">
                  <p className="text-[13px] font-semibold text-[var(--ink)] mb-2">
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

                <div className="p-3.5 rounded-xl bg-[var(--sand)] border border-[var(--line)] text-[14px]">
                  <strong className="text-[var(--leaf)] block mb-0.5">
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
                  className="inline-flex items-center min-h-[44px] text-[15px] font-semibold text-[var(--ocean)] hover:underline"
                >
                  Plan for {season.months.split(" ")[0]} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
