import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.brandName} | Local Tour Team in ${site.city}`,
  description: `Learn about ${site.brandName}. Based in ${site.city}, we plan private multi-day tours and day trips across Sri Lanka.`,
  alternates: {
    canonical: `${site.siteUrl}/about`,
  },
};

export default function AboutPage() {
  const principles = [
    {
      title: "Clear, honest advice",
      description:
        "We tell you which coast has clear weather for your dates and how long each drive really takes. No rushed schedules.",
    },
    {
      title: "Flexible routes",
      description:
        "Start with one of our ready-made itineraries or build a route from scratch. Swap hotels, add rest days, or change stops any time before booking.",
    },
    {
      title: "Responsible local travel",
      description:
        "We work with local drivers, family-run guesthouses, boutique hotels, and respectful wildlife trackers across the island.",
    },
  ];

  return (
    <div className="bg-[var(--sand)] text-[var(--ink)]">
      <PageHero
        image="/images/destinations/galle.jpg"
        imageAlt="Galle Fort lighthouse and coral ramparts overlooking the ocean in Sri Lanka"
        eyebrow={`Based in ${site.city}, ${site.country}`}
        title={`About ${site.brandName}`}
        subtitle="We are a local Sri Lankan travel team in Galle. We plan private multi-day journeys and south-coast day trips built around how you like to travel."
      />

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-[var(--sand)]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--sand-deep)]">
              <Image
                src="/images/hero/hero-galle-coast.jpg"
                alt="Stone ramparts of Galle Fort along the southern coast of Sri Lanka"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <p className="text-[14px] font-semibold text-[var(--ocean)]">
                Why Galle
              </p>
              <h2 className="font-serif text-[var(--ink)]">
                Local planning, right from the south coast.
              </h2>
              <p className="text-[var(--ink-muted)]">
                Living in Galle means we see the seasons change first-hand. We know when the sea in Mirissa is calm for whale watching, when the hill country train is clearest, and which national parks are quietest.
              </p>
              <p className="text-[var(--ink-muted)]">
                When you book with us, you travel with your own private driver and have a direct WhatsApp line to our team in Galle throughout your trip.
              </p>

              <ul className="space-y-2 pt-2 border-t border-[var(--line)] text-[15px] text-[var(--ink)]">
                <li>
                  <strong>Base:</strong> {site.city}, {site.region}, {site.country}
                </li>
                {site.streetAddress && (
                  <li>
                    <strong>Office:</strong> {site.streetAddress}
                  </li>
                )}
                {site.foundedYear && (
                  <li>
                    <strong>Established:</strong> {site.foundedYear}
                  </li>
                )}
                {site.sltdaNumber && (
                  <li>
                    <strong>SLTDA Registration:</strong> {site.sltdaNumber}
                  </li>
                )}
                {site.insuranceNote && (
                  <li>
                    <strong>Insurance:</strong> {site.insuranceNote}
                  </li>
                )}
                <li>
                  <strong>Typical response time:</strong> {site.responseTime}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 sm:py-24 bg-[var(--sand-deep)] border-y border-[var(--line)]">
        <Container size="wide">
          <div className="max-w-2xl mb-10 space-y-2.5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Our values
            </p>
            <h2 className="font-serif text-[var(--ink)]">
              How we plan every trip.
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <li
                key={p.title}
                className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-2.5"
              >
                <h3 className="font-serif text-[var(--ink)]">{p.title}</h3>
                <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
                  {p.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[var(--sand)]">
        <Container size="default">
          <div className="rounded-2xl bg-[var(--ocean)] text-white p-8 sm:p-12 text-center space-y-4">
            <h2 className="font-serif text-white">
              Ready to talk about your Sri Lanka trip?
            </h2>
            <p className="text-white/85 mx-auto">
              Tell us your rough dates and interests. We will reply {site.responseTime} with a clear route and price guide.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/plan-your-trip"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors"
              >
                Plan your trip
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold border-2 border-white/60 text-white hover:bg-white hover:text-[var(--ocean-dark)] transition-colors"
              >
                Contact our Galle desk
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
