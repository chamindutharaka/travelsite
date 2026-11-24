"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import {
  EditorialReveal,
  ImageWipeReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

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
      className="py-16 sm:py-24 lg:py-28 bg-[var(--sand)] text-[var(--ink)] scroll-mt-20"
      aria-labelledby="welcome-heading"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <EditorialReveal>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="w-7 h-[1px] bg-[var(--cinnamon)]" />
                <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                  About {site.brandName}
                </p>
              </div>

              <h2 id="welcome-heading" className="font-serif text-[var(--ink)]">
                <LineRise>Easy, personal Sri Lanka trips</LineRise>
                <LineRise delay={0.08}>
                  <span className="italic font-light">planned on the island.</span>
                </LineRise>
              </h2>
            </EditorialReveal>

            <EditorialReveal delay={0.1} className="space-y-4 text-[var(--ink-muted)]">
              <p className="text-[17px] text-[var(--ink)]">
                We are a small local team based in Galle. We plan private multi-day tours across Sri Lanka as well as half-day and full-day experiences from the south coast.
              </p>

              <p>
                Start with one of our ready-made itineraries, or tell us your dates and interests. We adjust hotels, driving times, and stops until the route feels right for you.
              </p>

              <ul className="space-y-2.5 pt-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[15.5px] text-[var(--ink)]"
                  >
                    <span
                      className="text-[var(--cinnamon)] font-semibold shrink-0"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </EditorialReveal>

            <EditorialReveal delay={0.18} className="pt-2 flex flex-wrap items-center gap-5">
              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[15px] font-medium bg-[var(--ink)] text-[var(--sand)] hover:bg-[var(--cinnamon)] transition-colors duration-300"
              >
                Start planning
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline"
              >
                Meet our Galle team →
              </Link>
            </EditorialReveal>
          </div>

          <div className="lg:col-span-6 grid grid-cols-12 gap-4 sm:gap-5 items-end">
            <ImageWipeReveal className="col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--ocean-dark)]">
              <Image
                src="/images/destinations/galle.jpg"
                alt="Historic Galle Fort lighthouse and stone ramparts along the southern coast of Sri Lanka"
                fill
                sizes="(max-width: 1024px) 58vw, 28vw"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </ImageWipeReveal>

            <ImageWipeReveal
              delay={0.12}
              className="col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--ocean-dark)] mb-6 sm:mb-10"
            >
              <Image
                src="/images/experiences/scenic-blue-train.jpg"
                alt="Blue highland train crossing the Nine Arches stone railway bridge in Ella"
                fill
                sizes="(max-width: 1024px) 42vw, 22vw"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </ImageWipeReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
