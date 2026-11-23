"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";
import {
  EditorialReveal,
  ImageWipeReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function WelcomeSection() {
  const foundationFacts = [
    { label: "Based in", value: "Galle, Sri Lanka" },
    { label: "Registered", value: company.sltdaRegistration },
    { label: "Planning", value: "No obligation" },
    { label: "Travel style", value: "100% Private" },
  ];

  return (
    <section
      id="welcome"
      className="py-16 sm:py-24 lg:py-28 bg-[#FDFBF7] text-[#122334] scroll-mt-16"
      aria-labelledby="welcome-heading"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <EditorialReveal>
              <div className="flex items-center gap-3 mb-3.5">
                <span className="w-7 h-[1px] bg-[#D4622A]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                  Welcome to Ceylon Holidays
                </span>
              </div>

              <h2
                id="welcome-heading"
                className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#122334] leading-[1.12] tracking-[-0.02em]"
              >
                <LineRise>Your journey through</LineRise>
                <LineRise delay={0.08}>Sri Lanka begins here.</LineRise>
              </h2>
            </EditorialReveal>

            <EditorialReveal
              delay={0.1}
              className="space-y-4 text-[#4E5A65] text-[15px] sm:text-base leading-[1.72] max-w-[58ch]"
            >
              <p className="text-[17px] sm:text-lg text-[#122334] leading-[1.6]">
                A Sri Lankan destination management company based in Galle, run by people who live on the island and travel it constantly.
              </p>

              <p>
                Every route, boutique bungalow, and chauffeur-guide we put in front of you is one that our team knows personally. That is the whole basis of Ceylon Holidays—and why we will gladly tell you when a famous stop is not worth your morning.
              </p>

              <p>
                We do not sell fixed packages. Each itinerary is drafted from an open conversation about how you actually like to travel—how early you want to start, how far you want to drive, and whether you would rather see three regions properly or eight briefly—and revised until it is genuinely yours.
              </p>
            </EditorialReveal>

            {/* 4 Hairline Facts */}
            <EditorialReveal delay={0.16}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 pt-6 border-t border-[#122334]/12">
                {foundationFacts.map((fact) => (
                  <div key={fact.label}>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-[#4E5A65] mb-1">
                      {fact.label}
                    </span>
                    <span className="font-serif text-[15px] sm:text-base font-medium text-[#122334]">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </EditorialReveal>

            {/* Actions */}
            <EditorialReveal
              delay={0.22}
              className="pt-2 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-medium bg-[#122334] text-[#FDFBF7] hover:bg-[#D4622A] transition-colors duration-300"
              >
                Discover Ceylon Holidays
              </Link>
              <Link
                href="#trip-planner"
                className="text-sm font-medium text-[#122334] hover:text-[#D4622A] transition-colors hover-underline"
              >
                Start planning →
              </Link>
            </EditorialReveal>
          </div>

          {/* Staggered Photo Pair */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-5 items-end">
              <ImageWipeReveal className="col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#122334]">
                <Image
                  src="/images/destinations/galle.jpg"
                  alt="Galle Fort lighthouse and coral ramparts overlooking the Indian Ocean"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </ImageWipeReveal>

              <ImageWipeReveal
                delay={0.12}
                className="col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#122334] mb-6 sm:mb-10"
              >
                <Image
                  src="/images/experiences/scenic-blue-train.jpg"
                  alt="The blue hill country train crossing the Nine Arches Bridge in Ella"
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </ImageWipeReveal>
            </div>

            <EditorialReveal delay={0.18}>
              <p className="text-xs sm:text-[13px] text-[#4E5A65] leading-relaxed border-l-2 border-[#D4622A] pl-3.5 max-w-[56ch]">
                Our home base along the 17th-century ramparts of Galle Fort, and the iconic hill-country rail line winding through Ella&apos;s cloud forests.
              </p>
            </EditorialReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
