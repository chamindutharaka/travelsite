"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const whatsappUrl = buildWhatsAppLink(
    "Hello Ceylon Holidays! I would like to plan a trip to Sri Lanka."
  );

  // Tour detail pages render their own mobile sticky bar with price & customise CTA
  const isTourDetail =
    pathname.startsWith("/tours/") && pathname !== "/tours";
  const isPlanner = pathname === "/plan-your-trip";

  return (
    <>
      {/* Desktop Floating WhatsApp Pill */}
      <div
        className="hidden lg:block fixed bottom-6 right-6 z-40"
        role="region"
        aria-label="WhatsApp quick contact"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Ceylon Holidays on WhatsApp"
          className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-3 rounded-full bg-[var(--leaf)] hover:bg-[var(--ocean-dark)] text-white text-[15px] font-semibold shadow-lg border border-white/20 transition-colors"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>WhatsApp Galle</span>
        </a>
      </div>

      {/* Sticky Mobile Bottom Bar ("Plan my trip" + WhatsApp) */}
      {!isTourDetail && !isPlanner && (
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--sand)]/95 backdrop-blur-md border-t border-[var(--line)] px-4 py-2.5 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
          role="region"
          aria-label="Quick trip actions"
        >
          <div className="flex items-center gap-2.5 max-w-lg mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 rounded-full bg-[var(--leaf)] text-white text-[15px] font-semibold shrink-0"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/plan-your-trip"
              className="flex-1 inline-flex items-center justify-center min-h-[46px] px-5 rounded-full bg-[var(--cinnamon)] text-white text-[16px] font-semibold"
            >
              Plan my trip
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
