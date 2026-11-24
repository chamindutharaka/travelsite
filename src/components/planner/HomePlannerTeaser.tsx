"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PLANNER_INTERESTS, PLANNER_MONTHS } from "@/lib/schemas";

export function HomePlannerTeaser() {
  const router = useRouter();
  const [month, setMonth] = useState("flexible");
  const [interest, setInterest] = useState("Culture");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("month", month);
    params.set("interest", interest);
    router.push(`/plan-your-trip?${params.toString()}`);
  };

  return (
    <section
      id="trip-planner"
      className="py-16 sm:py-20 bg-[var(--sand)] text-[var(--ink)] scroll-mt-20"
      aria-labelledby="planner-teaser-heading"
    >
      <Container size="default">
        <div className="rounded-2xl bg-[var(--sand-deep)] border border-[var(--line)] p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Free 5-step trip planner
            </p>
            <h2 id="planner-teaser-heading" className="font-serif text-[var(--ink)]">
              Get a custom Sri Lanka route in minutes.
            </h2>
            <p className="text-[var(--ink-muted)]">
              Pick a rough month and your main interest to start. No payment or commitment needed.
            </p>
          </div>

          <form
            onSubmit={handleStart}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-4">
              <label
                htmlFor="teaser-month"
                className="block text-[14px] font-semibold text-[var(--ink)] mb-1.5"
              >
                When are you thinking of going?
              </label>
              <select
                id="teaser-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[16px] text-[var(--ink)]"
              >
                <option value="flexible">I&apos;m flexible</option>
                {PLANNER_MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor="teaser-interest"
                className="block text-[14px] font-semibold text-[var(--ink)] mb-1.5"
              >
                Main interest
              </label>
              <select
                id="teaser-interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[16px] text-[var(--ink)]"
              >
                {PLANNER_INTERESTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white text-[16px] font-semibold transition-colors"
              >
                <span>Start my trip plan</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
