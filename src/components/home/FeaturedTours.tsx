"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { tours } from "@/data/tours";
import { TourCategory } from "@/lib/types";
import { useCurrency } from "@/components/providers/CurrencyProvider";

const categories: ("All" | TourCategory)[] = [
  "All",
  "Culture",
  "Wildlife",
  "Beach",
  "Adventure",
  "Honeymoon",
  "Family",
  "Wellness",
];

export function FeaturedTours() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | TourCategory>("All");
  const { formatPrice, currency } = useCurrency();

  const visibleTours = (
    selectedCategory === "All"
      ? tours
      : tours.filter((t) => (t.categories ?? [t.category]).includes(selectedCategory))
  ).slice(0, 6);

  return (
    <section
      className="py-16 sm:py-24 bg-[var(--sand)] text-[var(--ink)]"
      aria-labelledby="featured-tours-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Ready-made &amp; customisable trips
            </p>
            <h2 id="featured-tours-heading" className="font-serif text-[var(--ink)]">
              Popular Sri Lanka journeys.
            </h2>
            <p className="text-[var(--ink-muted)]">
              Use any itinerary below as your starting point. We can shorten, extend, or adjust every stop for your group.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center min-h-[44px] text-[16px] font-semibold text-[var(--ocean)] hover:underline shrink-0"
          >
            View all {tours.length} tours &amp; day trips →
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 min-h-[44px] px-4 py-2 rounded-full text-[15px] font-semibold border transition-colors ${
                  active
                    ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                    : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleTours.map((tour) => (
            <article
              key={tour.slug}
              className="flex flex-col justify-between bg-[var(--surface)] rounded-2xl border border-[var(--line)] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-[var(--sand-deep)]"
                >
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[13px] font-semibold bg-[var(--ocean-dark)]/90 text-white">
                    {tour.durationLabel || `${tour.durationDays} days`}
                  </span>
                </Link>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <p className="text-[13px] font-semibold text-[var(--ocean)]">
                    {(tour.categories ?? [tour.category]).slice(0, 2).join(" · ")}
                  </p>
                  <h3 className="font-serif text-[var(--ink)] leading-snug">
                    <Link href={`/tours/${tour.slug}`} className="hover:text-[var(--ocean)]">
                      {tour.title}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-[var(--ink-muted)] line-clamp-2">
                    {tour.tagline}
                  </p>
                  <p className="pt-2 border-t border-[var(--line)] text-[14px] text-[var(--ink-muted)] truncate">
                    {tour.routeSummary.join(" → ")}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 border-t border-[var(--line)] bg-[var(--sand)]/60 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[13px] text-[var(--ink-muted)]">
                    Indicative from {currency !== "USD" ? "(approx.)" : ""}
                  </span>
                  <span className="font-serif text-xl font-semibold text-[var(--ink)]">
                    {formatPrice(tour.fromPriceUsd)}
                  </span>
                  <span className="text-[13px] text-[var(--ink-muted)]"> / person</span>
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white text-[15px] font-semibold transition-colors shrink-0"
                >
                  View tour
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
