import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { destinations } from "@/content/destinations";
import { company } from "@/content/company";
import { StaggerGrid, StaggerItem } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Sri Lanka Destinations & Regional Travel Guide",
  description:
    "Explore Sri Lanka’s 13 iconic travel destinations from our base in Galle. Cultural Triangle ruins, misty hill country peaks, leopard safaris, and tranquil coastal bays.",
  alternates: {
    canonical: `${company.canonicalUrl}/destinations`,
  },
};

export default function DestinationsPage() {
  return (
    <div className="bg-[#FDFBF7] text-[#122334]">
      <PageHero
        image="/images/hero/hero-sigiriya.jpg"
        imageAlt="Sigiriya Rock Fortress overlooking lush Sri Lankan jungle"
        eyebrow="The Island Landscape"
        title="13 Iconic Destinations in Sri Lanka"
        subtitle="From the 5th-century granite citadel of Sigiriya to the coral ramparts of Galle Fort, explore the diverse climates and landscapes across our home island."
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {destinations.map((dest) => (
              <StaggerItem key={dest.slug}>
                <article className="group h-full rounded-2xl bg-white border border-[#122334]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(18,35,52,0.08)] transition-shadow duration-500 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-[#122334]"
                    >
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1724]/45 via-transparent to-transparent" />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] uppercase font-medium tracking-wider bg-[#0B1724]/80 text-[#FDFBF7] backdrop-blur-sm">
                        {dest.region}
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h2 className="font-serif text-2xl font-normal text-[#122334] group-hover:text-[#D4622A] transition-colors">
                          <Link href={`/destinations/${dest.slug}`}>
                            {dest.name}
                          </Link>
                        </h2>
                        {dest.sinhalaName && (
                          <span className="text-xs text-[#4E5A65]">
                            {dest.sinhalaName}
                          </span>
                        )}
                      </div>

                      <p className="font-serif italic text-[14.5px] text-[#4E5A65] line-clamp-2">
                        {dest.tagline}
                      </p>

                      <p className="text-[14px] text-[#4E5A65] line-clamp-3 leading-[1.68]">
                        {dest.shortDescription}
                      </p>

                      <div className="pt-3 border-t border-[#122334]/8 text-xs text-[#4E5A65]">
                        <span className="font-medium text-[#122334]">Best months: </span>
                        <span>{dest.bestMonths.slice(0, 4).join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 border-t border-[#122334]/8 bg-[#FDFBF7]/60 flex items-center justify-between">
                    <span className="text-xs text-[#4E5A65]">
                      Suggested: {dest.recommendedNights} nights
                    </span>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#122334] group-hover:text-[#D4622A] transition-colors"
                    >
                      <span>Explore</span>
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
