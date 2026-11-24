"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import {
  EditorialReveal,
  LineRise,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export function WhyUsSection() {
  const reasons = [
    {
      num: "01",
      title: "Local knowledge from Galle",
      description:
        "We live on the south coast and drive these roads ourselves. We know realistic travel times, quiet viewpoints, and good local places to eat.",
    },
    {
      num: "02",
      title: "Ready-made or fully custom",
      description:
        "Pick one of our tested routes to save time, or swap hotels, add beach days, and change the pace before you confirm.",
    },
    {
      num: "03",
      title: "Honest weather advice",
      description:
        "Sri Lanka has two monsoon seasons on opposite coasts. We plan your beaches and safaris around the months that actually have clear skies.",
    },
    {
      num: "04",
      title: "Private transport throughout",
      description:
        "You travel in your own air-conditioned car or van with one dedicated English-speaking driver. No crowded tour buses.",
    },
    {
      num: "05",
      title: "No obligation to enquire",
      description:
        "Ask for a route and price estimate without paying a deposit. We refine the plan until you are happy with every detail.",
    },
    {
      num: "06",
      title: "Direct WhatsApp support",
      description: `Reach our Galle desk directly before and during your trip. We typically reply ${site.responseTime}.`,
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="why-us-heading"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <EditorialReveal className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[var(--cinnamon)]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                How we work
              </p>
            </div>
            <h2 id="why-us-heading" className="font-serif text-[var(--ink)]">
              <LineRise>Simple, honest trip planning</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">with a local team.</span>
              </LineRise>
            </h2>
          </EditorialReveal>

          <EditorialReveal delay={0.1} className="lg:col-span-5">
            <p className="text-[var(--ink-muted)] lg:ml-auto">
              Everything we focus on is designed to make your holiday smooth, relaxed, and easy to plan.
            </p>
          </EditorialReveal>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 sm:gap-y-12">
          {reasons.map((item) => (
            <StaggerItem
              key={item.num}
              className="group pt-6 border-t border-black/15 hover:border-[var(--cinnamon)] transition-colors duration-500"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-[var(--cinnamon)] block mb-3">
                {item.num}
              </span>
              <h3 className="font-serif text-[var(--ink)] mb-2.5 group-hover:text-[var(--cinnamon)] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[15px] text-[var(--ink-muted)] leading-[1.7]">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
