import React from "react";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

export function WhyUsSection() {
  const reasons = [
    {
      title: "Local knowledge from Galle",
      description:
        "We live on the south coast and drive these roads ourselves. We know realistic travel times, quiet viewpoints, and good local places to eat.",
    },
    {
      title: "Ready-made or fully custom",
      description:
        "Pick one of our tested routes to save time, or swap hotels, add beach days, and change the pace before you confirm.",
    },
    {
      title: "Honest weather advice",
      description:
        "Sri Lanka has two monsoon seasons on opposite coasts. We plan your beaches and safaris around the months that actually have clear skies.",
    },
    {
      title: "Private transport throughout",
      description:
        "You travel in your own air-conditioned car or van with one dedicated English-speaking driver. No crowded tour buses.",
    },
    {
      title: "No obligation to enquire",
      description:
        "Ask for a route and price estimate without paying a deposit. We refine the plan until you are happy with every detail.",
    },
    {
      title: "Direct WhatsApp support",
      description: `Reach our Galle desk directly before and during your trip. We typically reply ${site.responseTime}.`,
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="why-us-heading"
    >
      <Container size="wide">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-[14px] font-semibold text-[var(--ocean)]">
            How we work
          </p>
          <h2 id="why-us-heading" className="font-serif text-[var(--ink)]">
            Simple, honest trip planning with a local team.
          </h2>
          <p className="text-[var(--ink-muted)]">
            Everything we focus on is designed to make your holiday smooth, relaxed, and easy to plan.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <li
              key={item.title}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-2.5"
            >
              <h3 className="font-serif text-[var(--ink)]">{item.title}</h3>
              <p className="text-[16px] text-[var(--ink-muted)] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
