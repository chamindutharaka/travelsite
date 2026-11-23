"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Destination } from "@/lib/types";

interface MapInfoPanelProps {
  destination: Destination | null;
  onClose: () => void;
}

export function MapInfoPanel({ destination, onClose }: MapInfoPanelProps) {
  if (!destination) {
    return (
      <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-[#153250]/20 rounded-2xl bg-[#FDFBF7]">
        <span className="font-serif text-3xl text-[#D4622A] mb-2 font-normal">13</span>
        <h4 className="font-serif text-2xl font-normal text-[#153250] mb-2">
          Select a Region
        </h4>
        <p className="text-sm text-[#4E5A65] max-w-xs leading-relaxed">
          Tap any pin on the map or region pill above to inspect seasonal weather, highlights, and recommended stays.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-2xl bg-[#FDFBF7] border border-[#153250]/10 overflow-hidden flex flex-col transition-all duration-300">
      {/* Header Image */}
      <div className="relative aspect-[16/10] bg-[#153250] shrink-0">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F33]/90 via-[#0C1F33]/20 to-black/25" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0C1F33]/75 hover:bg-[#0C1F33] text-white flex items-center justify-center transition-colors"
          aria-label="Close destination details"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute bottom-3.5 left-4 right-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4622A]">
            {destination.region}
          </span>
          <h3 className="font-serif text-2xl font-normal text-white leading-snug">
            {destination.name}
            {destination.sinhalaName && (
              <span className="text-sm font-sans font-normal text-white/70 ml-2">
                {destination.sinhalaName}
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          <p className="font-serif italic text-[15px] text-[#153250] border-l-2 border-[#D4622A] pl-3.5 leading-relaxed">
            {destination.tagline}
          </p>

          <p className="text-[14px] text-[#4E5A65] leading-[1.68]">
            {destination.shortDescription}
          </p>

          <div className="pt-3 border-t border-[#153250]/10 text-xs space-y-1">
            <span className="uppercase tracking-[0.16em] text-[10px] font-semibold text-[#4E5A65] block">
              Best Travel Months
            </span>
            <span className="text-[#153250] font-medium text-[13px]">
              {destination.bestMonths.join(", ")}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] block mb-2">
              Highlights
            </span>
            <ul className="space-y-1.5 text-[13.5px] text-[#4E5A65] leading-relaxed">
              {destination.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4622A]">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#153250]/10">
          <Link
            href={`/destinations/${destination.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#153250] hover:bg-[#D4622A] text-[#FDFBF7] text-xs sm:text-[13px] font-medium transition-colors duration-300"
          >
            <span>Explore {destination.name}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
