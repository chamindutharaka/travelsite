"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { tours } from "@/content/tours";
import { TourCategory } from "@/lib/types";
import {
  EDITORIAL_EASE,
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

const categories: ("All" | TourCategory)[] = [
  "All",
  "Culture",
  "Beach",
  "Adventure",
  "Honeymoon",
  "Wildlife",
  "Family",
  "Luxury",
];

export function FeaturedTours() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | TourCategory>("All");

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((t) => t.category === selectedCategory);

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#FDFBF7] text-[#122334]"
      aria-labelledby="featured-tours-heading"
    >
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#D4622A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                Featured Journeys
              </span>
            </div>
            <h2
              id="featured-tours-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#122334] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Journeys made for you.</LineRise>
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-base text-[#4E5A65] leading-[1.7] max-w-[54ch]">
              Routes we return to again and again. Treat each one as a starting draft—every itinerary we send is rewritten around the people travelling it.
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

        {/* Touch-friendly single-row scrollable filters on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-[#122334]/10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-colors duration-300 ${
                    active
                      ? "bg-[#122334] text-[#FDFBF7]"
                      : "bg-white/70 text-[#4E5A65] border border-[#122334]/12 hover:border-[#122334] hover:text-[#122334]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#4E5A65] shrink-0">
            0{filteredTours.length} {filteredTours.length === 1 ? "journey" : "journeys"}
          </span>
        </div>

        {/* Animated Tours Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => (
              <motion.article
                key={tour.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[#122334]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(18,35,52,0.08)] transition-shadow duration-500"
              >
                <div>
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-[#122334]"
                  >
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1724]/45 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#FDFBF7]/95 text-[#122334]">
                      {tour.durationDays} days
                    </span>
                    <span className="absolute top-3 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#0B1724]/75 text-[#FDFBF7] backdrop-blur-sm">
                      {tour.category}
                    </span>
                  </Link>

                  <div className="p-5 sm:p-6 space-y-2.5">
                    <h3 className="font-serif text-xl sm:text-[1.45rem] font-normal text-[#122334] group-hover:text-[#D4622A] transition-colors duration-300 leading-snug">
                      <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
                    </h3>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4E5A65] line-clamp-2 leading-[1.65]">
                      {tour.tagline}
                    </p>

                    <div className="pt-3 border-t border-[#122334]/8 text-xs text-[#4E5A65] truncate">
                      {tour.routeSummary.join(" · ")}
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-4 border-t border-[#122334]/8 flex items-center justify-between bg-[#FDFBF7]/55">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#4E5A65] block">
                      Indicative from
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-medium text-[#122334]">
                      ${tour.fromPriceUsd.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#4E5A65]"> / person</span>
                  </div>

                  <Link
                    href={`/tours/${tour.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#122334] group-hover:text-[#D4622A] transition-colors"
                  >
                    <span>View Tour</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
