"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { tours } from "@/data/tours";
import { ComfortLevel, TourCategory } from "@/lib/types";
import { PLANNER_MONTHS } from "@/lib/schemas";
import { useCurrency } from "@/components/providers/CurrencyProvider";

const CATEGORIES: ("All" | TourCategory)[] = [
  "All",
  "Culture",
  "Wildlife",
  "Beach",
  "Adventure",
  "Honeymoon",
  "Family",
  "Luxury",
  "Wellness",
];

const DURATIONS = [
  { id: "all", label: "Any length" },
  { id: "1", label: "1 day / half day" },
  { id: "2-4", label: "2–4 days" },
  { id: "5-7", label: "5–7 days" },
  { id: "8-12", label: "8–12 days" },
  { id: "13+", label: "13+ days" },
] as const;

const COMFORT_LEVELS: ("All" | ComfortLevel)[] = [
  "All",
  "Budget",
  "Comfortable",
  "Luxury",
];

const PRICE_RANGES = [
  { id: "all", label: "Any price" },
  { id: "under-500", label: "Under $500" },
  { id: "500-1000", label: "$500 – $1,000" },
  { id: "1000-2000", label: "$1,000 – $2,000" },
  { id: "2000+", label: "$2,000+" },
] as const;

const SORT_OPTIONS = [
  { id: "popular", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "duration-asc", label: "Duration: short to long" },
] as const;

export function ToursCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatPrice, currency } = useCurrency();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const category = (searchParams.get("category") || "All") as "All" | TourCategory;
  const duration = searchParams.get("duration") || "all";
  const comfort = (searchParams.get("comfort") || "All") as "All" | ComfortLevel;
  const month = searchParams.get("month") || "all";
  const price = searchParams.get("price") || "all";
  const sort = searchParams.get("sort") || "popular";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || value === "All" || (key === "sort" && value === "popular")) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `/tours?${qs}` : "/tours", { scroll: false });
  };

  const clearAll = () => {
    router.replace("/tours", { scroll: false });
  };

  const activeFilterCount = [
    category !== "All",
    duration !== "all",
    comfort !== "All",
    month !== "all",
    price !== "all",
  ].filter(Boolean).length;

  const filteredTours = useMemo(() => {
    const list = tours.filter((tour) => {
      const tourCats = tour.categories ?? [tour.category];
      if (category !== "All" && !tourCats.includes(category)) return false;

      if (duration === "1" && tour.durationDays !== 1) return false;
      if (duration === "2-4" && (tour.durationDays < 2 || tour.durationDays > 4)) return false;
      if (duration === "5-7" && (tour.durationDays < 5 || tour.durationDays > 7)) return false;
      if (duration === "8-12" && (tour.durationDays < 8 || tour.durationDays > 12)) return false;
      if (duration === "13+" && tour.durationDays < 13) return false;

      if (comfort !== "All" && (tour.comfortLevel ?? "Comfortable") !== comfort) {
        return false;
      }

      if (month !== "all" && !(tour.bestMonths ?? []).includes(month)) {
        return false;
      }

      if (price === "under-500" && tour.fromPriceUsd >= 500) return false;
      if (price === "500-1000" && (tour.fromPriceUsd < 500 || tour.fromPriceUsd > 1000)) return false;
      if (price === "1000-2000" && (tour.fromPriceUsd < 1000 || tour.fromPriceUsd > 2000)) return false;
      if (price === "2000+" && tour.fromPriceUsd <= 2000) return false;

      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.fromPriceUsd - b.fromPriceUsd);
    else if (sort === "price-desc") sorted.sort((a, b) => b.fromPriceUsd - a.fromPriceUsd);
    else if (sort === "duration-asc") sorted.sort((a, b) => a.durationDays - b.durationDays);
    else sorted.sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99));

    return sorted;
  }, [category, duration, comfort, month, price, sort]);

  const filterSelects = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <div>
        <label htmlFor="filter-duration" className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
          Duration
        </label>
        <select
          id="filter-duration"
          value={duration}
          onChange={(e) => updateParam("duration", e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[15px] text-[var(--ink)]"
        >
          {DURATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-comfort" className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
          Comfort level
        </label>
        <select
          id="filter-comfort"
          value={comfort}
          onChange={(e) => updateParam("comfort", e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[15px] text-[var(--ink)]"
        >
          {COMFORT_LEVELS.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "Any comfort" : c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-month" className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
          Best month
        </label>
        <select
          id="filter-month"
          value={month}
          onChange={(e) => updateParam("month", e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[15px] text-[var(--ink)]"
        >
          <option value="all">Any month</option>
          {PLANNER_MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-price" className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
          Price range (USD)
        </label>
        <select
          id="filter-price"
          value={price}
          onChange={(e) => updateParam("price", e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[15px] text-[var(--ink)]"
        >
          {PRICE_RANGES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-sort" className="block text-[13px] font-semibold text-[var(--ink)] mb-1">
          Sort by
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[15px] text-[var(--ink)]"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 bg-[var(--sand)] text-[var(--ink)]">
      <Container size="wide">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-5 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam("category", cat)}
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

        {/* Desktop Filter Bar */}
        <div className="hidden lg:block p-5 rounded-2xl bg-[var(--sand-deep)] border border-[var(--line)] mb-8">
          {filterSelects}
        </div>

        {/* Mobile Filter Trigger + Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-[var(--ocean)] text-white text-[15px] font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>
                Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </span>
            </button>

            <p className="text-[15px] font-medium text-[var(--ink-muted)]" aria-live="polite">
              Showing <strong className="text-[var(--ink)]">{filteredTours.length}</strong> of{" "}
              {tours.length} tours &amp; day trips
            </p>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="min-h-[44px] px-4 py-2 rounded-full text-[14px] font-semibold text-[var(--cinnamon)] hover:underline"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Tours Grid or Empty State */}
        {filteredTours.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[var(--sand-deep)] border border-[var(--line)] text-center space-y-4">
            <h2 className="font-serif text-[var(--ink)]">
              No trips match those exact filters.
            </h2>
            <p className="text-[var(--ink-muted)] mx-auto">
              Every route we offer can be adjusted to your dates and budget. Clear your filters or ask our Galle team to build a custom trip.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="min-h-[48px] px-6 py-3 rounded-full bg-[var(--ocean)] text-white text-[16px] font-semibold"
              >
                Clear all filters
              </button>
              <Link
                href="/plan-your-trip"
                className="min-h-[48px] px-6 py-3 rounded-full bg-[var(--cinnamon)] text-white text-[16px] font-semibold inline-flex items-center justify-center"
              >
                Plan a custom trip
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTours.map((tour) => {
              const durationBadge =
                tour.durationLabel || `${tour.durationDays} days`;
              const displayCats = (tour.categories ?? [tour.category]).slice(0, 2);

              return (
                <article
                  key={tour.slug}
                  className="flex flex-col justify-between rounded-2xl bg-[var(--surface)] border border-[var(--line)] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="block relative aspect-[16/10] bg-[var(--sand-deep)] overflow-hidden"
                    >
                      <Image
                        src={tour.heroImage}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[13px] font-semibold bg-[var(--ocean-dark)]/90 text-white">
                        {durationBadge}
                      </span>
                      {tour.comfortLevel && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[13px] font-semibold bg-[var(--sand)]/95 text-[var(--ink)]">
                          {tour.comfortLevel}
                        </span>
                      )}
                    </Link>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {displayCats.map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-0.5 rounded-full text-[13px] font-medium bg-[var(--sand-deep)] text-[var(--ocean)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-serif text-[1.35rem] font-semibold text-[var(--ink)] leading-snug">
                        <Link
                          href={`/tours/${tour.slug}`}
                          className="hover:text-[var(--ocean)] transition-colors"
                        >
                          {tour.title}
                        </Link>
                      </h2>

                      <p className="text-[15px] text-[var(--ink-muted)] line-clamp-2">
                        {tour.tagline}
                      </p>

                      <p className="text-[14px] text-[var(--ink-muted)] pt-2 border-t border-[var(--line)] truncate">
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
                      <span className="text-[13px] text-[var(--ink-muted)]">
                        {" "}
                        / person
                      </span>
                    </div>

                    <Link
                      href={`/plan-your-trip?tour=${tour.slug}`}
                      className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white text-[15px] font-semibold transition-colors shrink-0"
                    >
                      Enquire
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>

      {/* Mobile Filter Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Filter tours"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-full sm:max-w-md bg-[var(--sand)] rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <h2 className="font-serif text-xl font-semibold text-[var(--ink)]">
                Filter tours
              </h2>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--ink)] hover:bg-[var(--sand-deep)]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {filterSelects}

            <div className="pt-3 flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="min-h-[46px] px-5 rounded-full border border-[var(--line)] text-[15px] font-semibold text-[var(--ink)]"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 min-h-[46px] px-5 rounded-full bg-[var(--cinnamon)] text-white text-[16px] font-semibold"
              >
                Show {filteredTours.length} trips
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
