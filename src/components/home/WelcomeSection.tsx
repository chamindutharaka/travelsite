import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

export function WelcomeSection() {
  const highlights = [
    "Ready-made routes that you can freely change before booking.",
    "One private vehicle and local driver for your whole trip.",
    "Clear advice on which coast has the best weather for your dates.",
    "Direct WhatsApp support from our team in Galle while you travel.",
  ];

  return (
    <section
      id="welcome"
      className="py-16 sm:py-24 bg-[var(--sand)] text-[var(--ink)] scroll-mt-20"
      aria-labelledby="welcome-heading"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              About {site.brandName}
            </p>

            <h2 id="welcome-heading" className="font-serif text-[var(--ink)]">
              Easy, personal Sri Lanka trips planned on the island.
            </h2>

            <p className="text-[var(--ink-muted)]">
              We are a small local team based in Galle. We plan private multi-day tours across Sri Lanka as well as half-day and full-day experiences from the south coast.
            </p>

            <p className="text-[var(--ink-muted)]">
              Start with one of our ready-made itineraries, or tell us your dates and interests. We adjust hotels, driving times, and stops until the route feels right for you.
            </p>

            <ul className="space-y-2.5 pt-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[16px] text-[var(--ink)]"
                >
                  <span
                    className="text-[var(--leaf)] font-bold shrink-0"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors"
              >
                Start planning
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center min-h-[44px] px-2 text-[16px] font-semibold text-[var(--ocean)] hover:underline"
              >
                Meet our Galle team →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end">
            <div className="col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--sand-deep)] border border-[var(--line)]">
              <Image
                src="/images/destinations/galle.jpg"
                alt="Historic Galle Fort lighthouse and stone ramparts along the southern coast of Sri Lanka"
                fill
                sizes="(max-width: 1024px) 58vw, 28vw"
                className="object-cover"
              />
            </div>

            <div className="col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--sand-deep)] border border-[var(--line)] mb-6">
              <Image
                src="/images/experiences/scenic-blue-train.jpg"
                alt="Blue highland train crossing the Nine Arches stone railway bridge in Ella"
                fill
                sizes="(max-width: 1024px) 42vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
