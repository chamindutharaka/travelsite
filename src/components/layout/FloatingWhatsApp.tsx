"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { company } from "@/content/company";

export function FloatingWhatsApp() {
  const defaultGreeting = encodeURIComponent(
    "Hello Ceylon Holidays! I would like to plan a private journey in Sri Lanka."
  );
  const whatsappUrl = `${company.whatsappUrl}?text=${defaultGreeting}`;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pb-safe"
      role="region"
      aria-label="WhatsApp quick contact"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with Ceylon Holidays on WhatsApp"
        className="inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3 rounded-full bg-[#122334] hover:bg-[#D4622A] text-[#FDFBF7] text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_8px_24px_rgba(11,23,36,0.28)] border border-white/15 transition-colors duration-300"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>Talk to Galle</span>
      </a>
    </div>
  );
}
