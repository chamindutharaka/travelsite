import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { experiences } from "@/content/experiences";
import { company } from "@/content/company";
import { StaggerGrid, StaggerItem } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Signature Sri Lanka Experiences & Moments",
  description:
    "Curated Sri Lankan travel moments: the scenic blue highland train, dawn leopard tracking in Yala, Sigiriya sunrise climbs, tea plucking masterclasses, and ethical whale safaris.",
  alternates: {
    canonical: `${company.canonicalUrl}/experiences`,
  },
};

export default function ExperiencesPage() {
  return (
    <div className="bg-[var(--sand)] text-[var(--ink)]">
      <PageHero
        image="/images/experiences/scenic-blue-train.jpg"
        imageAlt="The iconic blue highland train crossing Nine Arches Bridge in Ella"
        eyebrow="Signature Travel Moments"
        title="Unforgettable Sri Lankan Experiences"
        subtitle="Beyond standard sightseeing, we weave intimate, field-tested moments into your private itinerary—from dawn leopard tracking to single-estate tea tastings."
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {experiences.map((exp, idx) => (
              <StaggerItem key={exp.slug}>
                <article className="group h-full rounded-2xl bg-white border border-[var(--ink)]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(26,26,26,0.08)] transition-shadow duration-500 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/experiences/${exp.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-[var(--ink)]"
                    >
                      <Image
                        src={exp.heroImage}
                        alt={exp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/45 via-transparent to-transparent" />
                      <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--ocean-dark)]/80 text-[var(--cinnamon)] backdrop-blur-sm">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-medium tracking-wider bg-[var(--ocean-dark)]/75 text-white backdrop-blur-sm">
                        {exp.category}
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="text-xs text-[var(--ink-muted)]">
                        {exp.duration} · {exp.location}
                      </div>

                      <h2 className="font-serif text-2xl font-normal text-[var(--ink)] group-hover:text-[var(--cinnamon)] transition-colors leading-snug">
                        <Link href={`/experiences/${exp.slug}`}>
                          {exp.title}
                        </Link>
                      </h2>

                      <p className="text-[14px] text-[var(--ink-muted)] line-clamp-3 leading-[1.68]">
                        {exp.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 border-t border-[var(--ink)]/8 bg-[var(--sand)]/60 flex items-center justify-between">
                    <span className="text-xs text-[var(--cinnamon)] font-medium">
                      {exp.bestSeason}
                    </span>

                    <Link
                      href={`/experiences/${exp.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] group-hover:text-[var(--cinnamon)] transition-colors"
                    >
                      <span>Read Story</span>
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
