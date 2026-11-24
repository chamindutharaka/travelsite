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
          className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-3 rounded-full bg-[#141414] hover:bg-[#EF6427] text-[#FBFAF8] text-[14px] font-medium shadow-[0_12px_32px_rgba(20,20,20,0.22)] border border-white/15 transition-colors duration-300"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>WhatsApp Galle</span>
        </a>
      </div>

      {/* Sticky Mobile Bottom Bar ("Plan my trip" + WhatsApp) */}
      {!isTourDetail && !isPlanner && (
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FBFAF8]/95 backdrop-blur-md border-t border-[var(--line)] px-4 py-2.5 pb-safe shadow-[0_-4px_20px_rgba(20,20,20,0.08)]"
          role="region"
          aria-label="Quick trip actions"
        >
          <div className="flex items-center gap-2.5 max-w-lg mx-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] text-[14.5px] font-medium shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[var(--leaf)]" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/plan-your-trip"
              className="flex-1 inline-flex items-center justify-center min-h-[46px] px-5 rounded-full bg-[#1A1A1A] hover:bg-[#EF6427] text-[#FBFAF8] text-[15px] font-medium transition-colors"
            >
              Plan my trip
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
