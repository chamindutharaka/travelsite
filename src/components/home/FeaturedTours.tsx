"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { tours } from "@/data/tours";
import { TourCategory } from "@/lib/types";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

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
      className="py-16 sm:py-24 lg:py-28 bg-[var(--sand)] text-[var(--ink)]"
      aria-labelledby="featured-tours-heading"
    >
      <Container size="wide">
        <EditorialReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[1px] bg-[var(--cinnamon)]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                Ready-made &amp; customisable trips
              </p>
            </div>
            <h2 id="featured-tours-heading" className="font-serif text-[var(--ink)]">
              <LineRise>Popular Sri Lanka</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">journeys.</span>
              </LineRise>
            </h2>
            <p className="text-[var(--ink-muted)]">
              Use any itinerary below as your starting point. We can shorten, extend, or adjust every stop for your group.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline shrink-0"
          >
            View all {tours.length} tours &amp; day trips →
          </Link>
        </EditorialReveal>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-10 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 min-h-[44px] px-5 py-2 rounded-full text-[14px] font-medium border transition-colors duration-300 ${
                  active
                    ? "bg-[var(--ink)] text-[var(--sand)] border-[var(--ink)]"
                    : "bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
          {visibleTours.map((tour) => (
            <article
              key={tour.slug}
              className="group flex flex-col justify-between bg-[var(--surface)] rounded-2xl border border-[var(--line)] overflow-hidden transition-all duration-500 hover:border-[var(--ink)]/25 hover:shadow-[0_18px_40px_rgba(20,20,20,0.06)]"
            >
              <div>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="block relative aspect-[16/10] overflow-hidden bg-[var(--ocean-dark)]"
                >
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="absolute bottom-3 left-3 px-3.5 py-1 rounded-full text-[12px] font-medium tracking-wide bg-[#141414]/85 backdrop-blur-sm text-[#FBFAF8]">
                    {tour.durationLabel || `${tour.durationDays} days`}
                  </span>
                </Link>

                <div className="p-6 space-y-2.5">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--cinnamon)]">
                    {(tour.categories ?? [tour.category]).slice(0, 2).join(" · ")}
                  </p>
                  <h3 className="font-serif text-[var(--ink)] leading-snug">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="hover:text-[var(--cinnamon)] transition-colors"
                    >
                      {tour.title}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                    {tour.tagline}
                  </p>
                  <p className="pt-3 border-t border-[var(--line)] text-[13.5px] text-[var(--ink-muted)] truncate">
                    {tour.routeSummary.join(" → ")}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--line)] bg-[var(--sand)]/70 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[12px] text-[var(--ink-muted)]">
                    Indicative from {currency !== "USD" ? "(approx.)" : ""}
                  </span>
                  <span className="font-serif text-xl font-medium text-[var(--ink)]">
                    {formatPrice(tour.fromPriceUsd)}
                  </span>
                  <span className="text-[13px] text-[var(--ink-muted)]"> / person</span>
                </div>

                <Link
                  href={`/tours/${tour.slug}`}
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full bg-[var(--ink)] hover:bg-[var(--cinnamon)] text-[var(--sand)] text-[14px] font-medium transition-colors duration-300 shrink-0"
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
