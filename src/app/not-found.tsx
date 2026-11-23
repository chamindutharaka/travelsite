import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FDFBF7] py-20">
      <Container size="default" className="text-center space-y-6">
        <span className="font-mono text-6xl sm:text-7xl font-light text-[#D4622A] tracking-tight block mb-2">
          404
        </span>

        <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D4622A] block">
          Path Not Found — Sri Lanka Archipelago
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#153250]">
          This Path Seems Uncharted
        </h1>

        <p className="text-sm sm:text-base text-[#4E5A65] max-w-md mx-auto leading-relaxed font-light">
          The page or itinerary you are seeking might have been moved or updated. Let us guide you back to our curated journeys.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0C1F33] hover:bg-[#153250] transition-colors shadow-sm"
          >
            <span>Return to Homepage</span>
            <span>→</span>
          </Link>

          <Link
            href="/tours"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#D4622A] hover:bg-[#B84F1D] transition-colors shadow-sm"
          >
            <span>Explore Tours</span>
            <span>→</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
