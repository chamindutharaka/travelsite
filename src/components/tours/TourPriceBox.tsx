"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { buildWhatsAppLink, site } from "@/lib/site";

interface TourPriceBoxProps {
  tourSlug: string;
  tourTitle: string;
  durationLabel: string;
  fromPriceUsd: number;
  isDayExperience?: boolean;
}

export function TourPriceBox({
  tourSlug,
  tourTitle,
  durationLabel,
  fromPriceUsd,
  isDayExperience = false,
}: TourPriceBoxProps) {
  const { formatPrice, currency } = useCurrency();
  const formatted = formatPrice(fromPriceUsd);

  const whatsappUrl = buildWhatsAppLink(
    `Hello ${site.brandName}! I would like to ask about "${tourTitle}" (${durationLabel}, indicative from $${fromPriceUsd} USD per person).`
  );

  return (
    <>
      {/* Desktop Sticky Enquiry Card */}
      <aside
        aria-label="Tour price and enquiry"
        className="sticky top-28 rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-6 sm:p-7 shadow-sm space-y-5"
      >
        <div>
          <p className="text-[13px] font-semibold text-[var(--ink-muted)]">
            Indicative from {currency !== "USD" ? "(approx.)" : ""}
          </p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-serif text-3xl font-semibold text-[var(--ink)]">
              {formatted}
            </span>
            <span className="text-[15px] text-[var(--ink-muted)]">
              / person
            </span>
          </div>
          <p className="text-[14px] text-[var(--ink-muted)] mt-1.5 leading-snug">
            {isDayExperience
              ? "Private day experience from Galle. Final rate depends on group size."
              : "Based on 2 travellers sharing. Hotels and stops can be adjusted."}
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--line)] space-y-3">
          <Link
            href={`/plan-your-trip?tour=${tourSlug}`}
            className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] transition-colors"
          >
            Customise this tour
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--leaf)] hover:bg-[var(--ocean-dark)] transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        <ul className="pt-4 border-t border-[var(--line)] space-y-2 text-[14px] text-[var(--ink-muted)]">
          <li>✓ Free quote with no deposit needed</li>
          <li>✓ Private vehicle &amp; local driver</li>
          <li>✓ Typical reply from Galle: {site.responseTime}</li>
        </ul>
      </aside>

      {/* Mobile Sticky Bottom Bar */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--sand)]/95 backdrop-blur-md border-t border-[var(--line)] px-4 py-2.5 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
        role="region"
        aria-label="Tour quick booking bar"
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <span className="block text-[12px] text-[var(--ink-muted)] leading-none">
              Indicative from
            </span>
            <span className="font-serif text-xl font-semibold text-[var(--ink)]">
              {formatted}
            </span>
          </div>

          <Link
            href={`/plan-your-trip?tour=${tourSlug}`}
            className="inline-flex items-center justify-center min-h-[46px] px-5 rounded-full bg-[var(--cinnamon)] text-white text-[15px] font-semibold shrink-0"
          >
            Customise this tour
          </Link>
        </div>
      </div>
    </>
  );
}
