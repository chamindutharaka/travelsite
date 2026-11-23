"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { experiences } from "@/content/experiences";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function SignatureMoments() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#0B1724] text-white overflow-hidden"
      aria-labelledby="signature-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#E5A952]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
                Signature Moments
              </span>
            </div>
            <h2
              id="signature-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-white leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>The ten things guests describe</LineRise>
              <LineRise delay={0.08}>first when they get home.</LineRise>
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-base text-white/70 max-w-[52ch] leading-[1.7]">
              Not a checklist. These are the individual mornings and afternoons that tend to become the story of the trip, and they slot naturally into any private itinerary.
            </p>
          </EditorialReveal>

          <EditorialReveal
            delay={0.12}
            className="flex items-center justify-between lg:justify-end gap-5"
          >
            <Link
              href="/plan-your-trip"
              className="text-xs sm:text-sm font-medium text-white/85 hover:text-[#E5A952] transition-colors hover-underline"
            >
              Build a trip around these →
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Scroll experiences left"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#E5A952] hover:bg-[#E5A952] hover:text-[#122334] text-white flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Scroll experiences right"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#E5A952] hover:bg-[#E5A952] hover:text-[#122334] text-white flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </EditorialReveal>
        </div>

        {/* Horizontal Swipe Rail (bleeds cleanly on mobile) */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-1 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          aria-label="Signature experiences carousel"
        >
          {experiences.map((exp, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={exp.slug}
                href={`/experiences/${exp.slug}`}
                className="group relative w-[82vw] max-w-[330px] sm:w-[340px] shrink-0 snap-start rounded-2xl overflow-hidden bg-[#122334] border border-white/10 hover:border-[#E5A952]/60 transition-colors duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1724]">
                  <Image
                    src={exp.heroImage}
                    alt={exp.title}
                    fill
                    sizes="340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1724]/85 via-[#0B1724]/15 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-[#0B1724]/75 backdrop-blur-sm text-[#E5A952] font-medium">
                      {num}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#0B1724]/65 backdrop-blur-sm text-white/90">
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-white/50 block mb-2">
                      {exp.duration} · {exp.bestSeason}
                    </span>
                    <h3 className="font-serif text-xl sm:text-[1.4rem] font-normal text-white group-hover:text-[#E5A952] transition-colors duration-300 leading-snug">
                      {exp.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-white/70 line-clamp-3 leading-[1.68]">
                      {exp.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/80 group-hover:text-[#E5A952] transition-colors">
                    <span>Read story</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-white/45">
          <span>Swipe to explore</span>
          <span>{experiences.length} moments</span>
        </div>
      </Container>
    </section>
  );
}
