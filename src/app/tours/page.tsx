import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { tours } from "@/content/tours";
import { company } from "@/content/company";
import { StaggerGrid, StaggerItem } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Private Sri Lanka Tours & Tailor-Made Itineraries",
  description:
    "Explore our 8 signature tailor-made Sri Lanka journeys. Culture, wildlife safaris, hill country tea trails, and private coastal escapes with dedicated chauffeur-guides.",
  alternates: {
    canonical: `${company.canonicalUrl}/tours`,
  },
};

export default function ToursPage() {
  return (
    <div className="bg-[#FDFBF7] text-[#153250]">
      <PageHero
        image="/images/hero/hero-tea-country.jpg"
        imageAlt="Misty Ceylon tea country hills in Sri Lanka"
        eyebrow="Bespoke Routes & Private Journeys"
        title="Tailor-Made Sample Itineraries"
        subtitle="Every route below is a starting blueprint. Because we do not operate fixed bus tours, your private journey is shaped around your pace, stays, and interests."
      >
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white backdrop-blur-sm">
            Private Chauffeur-Guide Included
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white backdrop-blur-sm">
            100% Flexible Planning
          </span>
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {tours.map((tour) => (
              <StaggerItem key={tour.slug}>
                <article className="group h-full rounded-2xl bg-white border border-[#153250]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(21,50,80,0.08)] transition-shadow duration-500 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-[#153250]"
                    >
                      <Image
                        src={tour.heroImage}
                        alt={tour.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F33]/45 via-transparent to-transparent" />
                      <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-medium tracking-wider bg-[#0C1F33]/80 text-white backdrop-blur-sm">
                        {tour.category}
                      </span>
                      <span className="absolute bottom-3 left-3.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#FDFBF7]/95 text-[#153250]">
                        {tour.durationDays} days · {tour.durationNights} nights
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6 space-y-3">
                      <h2 className="font-serif text-2xl font-normal text-[#153250] group-hover:text-[#D4622A] transition-colors leading-snug">
                        <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
                      </h2>

                      <p className="text-[14px] text-[#4E5A65] leading-[1.68] line-clamp-2">
                        {tour.tagline}
                      </p>

                      <div className="pt-3 border-t border-[#153250]/8 text-xs text-[#4E5A65] truncate">
                        {tour.routeSummary.join(" · ")}
                      </div>

                      <ul className="space-y-1.5 text-xs text-[#4E5A65] pt-1">
                        {tour.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#D4622A]">—</span>
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 border-t border-[#153250]/8 bg-[#FDFBF7]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-[#4E5A65] block">
                        Indicative from
                      </span>
                      <span className="font-serif text-xl font-medium text-[#153250]">
                        ${tour.fromPriceUsd.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#4E5A65]"> / person</span>
                    </div>

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#153250] group-hover:text-[#D4622A] transition-colors"
                    >
                      <span>View Tour</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </div>
  );
}
