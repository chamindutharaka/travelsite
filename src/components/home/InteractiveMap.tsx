"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { destinations } from "@/content/destinations";
import { Destination } from "@/lib/types";
import { MapInfoPanel } from "./MapInfoPanel";
import {
  EDITORIAL_EASE,
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

// Fine-tuned cartographic coordinates on our 560x780 bespoke Sri Lanka artwork
const pinPositions: Record<string, { x: number; y: number; align: "left" | "right" }> = {
  jaffna: { x: 222, y: 84, align: "right" },
  anuradhapura: { x: 242, y: 248, align: "left" },
  trincomalee: { x: 344, y: 256, align: "right" },
  sigiriya: { x: 276, y: 318, align: "right" },
  kandy: { x: 256, y: 422, align: "left" },
  colombo: { x: 146, y: 476, align: "left" },
  "nuwara-eliya": { x: 274, y: 486, align: "left" },
  ella: { x: 312, y: 520, align: "right" },
  "arugam-bay": { x: 418, y: 536, align: "right" },
  yala: { x: 368, y: 618, align: "right" },
  galle: { x: 186, y: 658, align: "left" },
  unawatuna: { x: 204, y: 676, align: "left" },
  mirissa: { x: 246, y: 690, align: "right" },
};

export function InteractiveMap() {
  const [activeDestination, setActiveDestination] = useState<Destination | null>(
    destinations.find((d) => d.slug === "galle") || destinations[0]
  );

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#F5EFE6] text-[#153250] border-y border-[#153250]/10"
      aria-labelledby="interactive-map-heading"
    >
      <Container size="wide">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#D4622A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                Explore Sri Lanka
              </span>
            </div>
            <h2
              id="interactive-map-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#153250] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>One island. Six climates.</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">Four hours from anywhere.</span>
              </LineRise>
            </h2>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <p className="text-[15px] text-[#4E5A65] leading-[1.7] max-w-[40ch]">
              Point to any region on our illustrated island chart to see its landscape, highlights, and best travel months.
            </p>
          </EditorialReveal>
        </div>

        {/* Mobile/Quick Region Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-6 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {destinations.map((dest) => {
            const isSelected = activeDestination?.slug === dest.slug;
            return (
              <button
                key={dest.slug}
                type="button"
                onClick={() => setActiveDestination(dest)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isSelected
                    ? "bg-[#153250] text-[#FDFBF7]"
                    : "bg-[#FDFBF7] text-[#4E5A65] border border-[#153250]/12 hover:border-[#153250] hover:text-[#153250]"
                }`}
              >
                {dest.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Bespoke Fine-Art Cartographic Map Canvas */}
          <EditorialReveal className="lg:col-span-7 relative bg-[#F6F1E7] p-4 sm:p-7 rounded-2xl border border-[#153250]/12 shadow-[inset_0_0_60px_rgba(92,88,82,0.08)] flex items-center justify-center overflow-hidden">
            {/* Fine Framed Inner Cartographic Border */}
            <div className="absolute inset-3 sm:inset-4 rounded-xl border border-[#153250]/10 pointer-events-none" />

            <div className="relative w-full max-w-[520px] aspect-[560/780] select-none">
              <svg
                viewBox="0 0 560 780"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Illustrated cartographic map of Sri Lanka with 13 interactive destinations"
              >
                <defs>
                  {/* Warm Sunlit Parchment Land Gradient */}
                  <linearGradient id="ceylonLand" x1="15%" y1="5%" x2="85%" y2="95%">
                    <stop offset="0%" stopColor="#ECE3D2" />
                    <stop offset="48%" stopColor="#E4D7C0" />
                    <stop offset="100%" stopColor="#D9C7A9" />
                  </linearGradient>

                  {/* Highland Moss / Tea Country Relief Shading */}
                  <radialGradient id="highlandRelief" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8E9B7F" stopOpacity="0.62" />
                    <stop offset="55%" stopColor="#A9B399" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#D9C7A9" stopOpacity="0" />
                  </radialGradient>

                  {/* Soft Coastal Shadow */}
                  <filter id="islandShadow" x="-12%" y="-8%" width="124%" height="120%">
                    <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#153250" floodOpacity="0.14" />
                  </filter>

                  {/* Subtle Paper Grain Pattern */}
                  <pattern id="seaStipple" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 4 12 Q 8 10 12 12 T 20 12" fill="none" stroke="#8C8373" strokeWidth="0.55" opacity="0.22" />
                  </pattern>
                </defs>

                {/* Subtle Ocean Texture */}
                <rect x="0" y="0" width="560" height="780" fill="url(#seaStipple)" />

                {/* Fine Cartographic Graticule (Latitude / Longitude Hairlines) */}
                <g stroke="#153250" strokeOpacity="0.07" strokeWidth="0.75" strokeDasharray="3 5">
                  <line x1="20" y1="145" x2="540" y2="145" />
                  <line x1="20" y1="315" x2="540" y2="315" />
                  <line x1="20" y1="485" x2="540" y2="485" />
                  <line x1="20" y1="655" x2="540" y2="655" />
                  <line x1="150" y1="20" x2="150" y2="760" />
                  <line x1="280" y1="20" x2="280" y2="760" />
                  <line x1="410" y1="20" x2="410" y2="760" />
                </g>

                {/* Coordinate Labels */}
                <g fill="#4E5A65" opacity="0.55" fontSize="8.5" fontFamily="monospace">
                  <text x="24" y="140">9°N</text>
                  <text x="24" y="310">8°N</text>
                  <text x="24" y="480">7°N</text>
                  <text x="24" y="650">6°N</text>
                  <text x="154" y="32">80°E</text>
                  <text x="284" y="32">81°E</text>
                  <text x="414" y="32">82°E</text>
                </g>

                {/* Bathymetric Ocean Contour Ripples around the Island */}
                <g fill="none" stroke="#8C8373" strokeLinecap="round">
                  <path
                    d="M 215 36 C 248 34, 278 58, 286 98 C 296 140, 344 185, 378 242 C 414 304, 446 392, 464 475 C 476 534, 456 602, 412 654 C 362 710, 294 742, 234 734 C 176 726, 128 672, 108 606 C 90 546, 98 470, 110 398 C 122 330, 134 256, 152 192 C 166 140, 166 76, 194 48 C 201 40, 208 36, 215 36 Z"
                    strokeWidth="0.9"
                    strokeOpacity="0.22"
                    strokeDasharray="6 6"
                  />
                  <path
                    d="M 218 52 C 245 50, 270 72, 276 108 C 284 148, 332 194, 364 250 C 398 310, 428 394, 444 472 C 454 524, 438 588, 398 638 C 354 690, 290 720, 236 712 C 184 706, 142 656, 124 596 C 108 542, 114 470, 126 402 C 136 336, 148 264, 164 202 C 176 154, 178 92, 202 64 C 207 57, 212 53, 218 52 Z"
                    strokeWidth="0.8"
                    strokeOpacity="0.32"
                  />
                </g>

                {/* Adam's Bridge / Mannar Coral Shoals */}
                <g fill="#D9C7A9" stroke="#4E5A65" strokeOpacity="0.4" strokeWidth="0.8">
                  <ellipse cx="144" cy="186" rx="14" ry="4.5" transform="rotate(-14 144 186)" />
                  <circle cx="122" cy="181" r="2.8" />
                  <circle cx="111" cy="177" r="2.2" />
                  <circle cx="101" cy="173" r="1.8" />
                </g>

                {/* Accurate Artistic Sri Lanka Island Silhouette */}
                <path
                  d="M 216 68
                     C 234 64, 254 70, 260 84
                     C 264 94, 248 106, 244 116
                     C 242 122, 256 128, 266 138
                     C 284 156, 304 184, 326 212
                     C 340 230, 354 242, 350 258
                     C 346 270, 362 280, 372 296
                     C 392 330, 412 374, 424 418
                     C 436 462, 440 508, 428 548
                     C 418 582, 398 614, 374 638
                     C 344 668, 304 692, 262 698
                     C 226 704, 190 690, 166 664
                     C 144 640, 134 602, 132 562
                     C 130 520, 134 476, 138 432
                     C 142 388, 138 346, 146 306
                     C 150 284, 160 264, 164 242
                     C 168 220, 162 198, 176 184
                     C 188 172, 196 154, 194 132
                     C 192 114, 184 102, 192 86
                     C 198 74, 208 70, 216 68 Z"
                  fill="url(#ceylonLand)"
                  stroke="#4E5A65"
                  strokeWidth="1.5"
                  filter="url(#islandShadow)"
                />

                {/* Inner Delicate Coastline Ink Line */}
                <path
                  d="M 218 76
                     C 232 74, 248 78, 252 88
                     C 254 96, 242 106, 238 116
                     C 236 124, 250 132, 260 142
                     C 278 160, 296 188, 318 216
                     C 332 232, 342 246, 340 258
                     C 338 270, 354 282, 364 298
                     C 382 330, 402 374, 414 416
                     C 426 458, 428 504, 418 544
                     C 408 576, 390 606, 366 630
                     C 338 658, 300 682, 260 688
                     C 228 692, 194 680, 172 656
                     C 152 634, 144 598, 142 560
                     C 140 520, 144 476, 148 432
                     C 152 390, 148 348, 156 310
                     C 160 288, 170 268, 174 246
                     C 178 224, 172 204, 184 190
                     C 196 178, 204 158, 202 136
                     C 200 118, 194 106, 200 92
                     C 205 82, 212 78, 218 76 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />

                {/* Central Highlands Topographic Relief & Contours */}
                <ellipse cx="272" cy="488" rx="92" ry="112" fill="url(#highlandRelief)" />
                <g fill="none" stroke="#4E5A65" strokeOpacity="0.22" strokeWidth="0.9">
                  <path d="M 224 446 C 246 418, 294 418, 318 450 C 340 480, 336 534, 306 558 C 276 582, 230 572, 214 536 C 200 506, 206 468, 224 446 Z" />
                  <path d="M 244 464 C 260 446, 290 448, 304 470 C 318 492, 312 526, 292 540 C 272 554, 244 544, 236 520 C 228 498, 232 478, 244 464 Z" />
                  <path d="M 260 482 C 272 472, 286 476, 292 490 C 298 504, 290 520, 276 522 C 262 524, 250 512, 252 498 C 254 490, 256 485, 260 482 Z" />
                </g>

                {/* Delicate River Threads (Mahaweli & Kelani) */}
                <g fill="none" stroke="#6E8782" strokeOpacity="0.38" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M 268 470 C 262 444, 268 416, 284 390 C 304 358, 330 326, 344 268" />
                  <path d="M 250 486 C 222 484, 192 480, 152 476" />
                </g>

                {/* Artistic Micro-Illustrations (Highland Peaks, Sigiriya Monolith, Galle Lighthouse) */}
                <g stroke="#4E5A65" strokeOpacity="0.45" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  {/* Mountain Peak Glyphs in Hill Country */}
                  <path d="M 260 462 L 268 450 L 276 462" />
                  <path d="M 278 468 L 285 458 L 292 468" />
                  {/* Tiny Sigiriya Table Rock */}
                  <path d="M 266 306 L 270 296 L 282 296 L 286 306" />
                  {/* Tiny Ocean Waves */}
                  <path d="M 64 568 Q 72 563 80 568 T 96 568" strokeOpacity="0.35" />
                  <path d="M 454 330 Q 462 325 470 330 T 486 330" strokeOpacity="0.35" />
                  <path d="M 442 664 Q 450 659 458 664 T 474 664" strokeOpacity="0.35" />
                </g>

                {/* Ornate Cartographic Compass Rose */}
                <g transform="translate(82, 110)">
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#153250" strokeOpacity="0.16" strokeWidth="0.9" />
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#153250" strokeOpacity="0.1" strokeWidth="0.7" strokeDasharray="2 3" />
                  {/* Diagonal Points */}
                  <path d="M -14 -14 L 0 -4 L 14 -14 L 4 0 L 14 14 L 0 4 L -14 14 L -4 0 Z" fill="#4E5A65" opacity="0.22" />
                  {/* Cardinal Points */}
                  <path d="M 0 -24 L 4.5 0 L 0 24 L -4.5 0 Z" fill="#153250" opacity="0.82" />
                  <path d="M 0 -24 L 4.5 0 L 0 0 Z" fill="#D4622A" />
                  <path d="M -24 0 L 0 -4.5 L 24 0 L 0 4.5 Z" fill="#153250" opacity="0.55" />
                  <circle cx="0" cy="0" r="2.5" fill="#F6F1E7" stroke="#153250" strokeWidth="0.9" />
                  <text x="0" y="-34" fontSize="9.5" fill="#153250" fontWeight="600" letterSpacing="1" textAnchor="middle">N</text>
                </g>

                {/* Elegant Cartographic Typography */}
                <g fill="#4E5A65" fontFamily="serif" fontStyle="italic">
                  <text x="44" y="618" fontSize="13" opacity="0.65" letterSpacing="3">INDIAN OCEAN</text>
                  <text x="386" y="186" fontSize="12" opacity="0.65" letterSpacing="2.5">BAY OF</text>
                  <text x="386" y="202" fontSize="12" opacity="0.65" letterSpacing="2.5">BENGAL</text>
                </g>

                {/* Vintage Scale Bar & Title Cartouche */}
                <g transform="translate(366, 722)">
                  <text x="0" y="-12" fontSize="8.5" fill="#4E5A65" letterSpacing="2.2" fontFamily="sans-serif">CEYLON · SERENDIB</text>
                  <line x1="0" y1="0" x2="120" y2="0" stroke="#153250" strokeOpacity="0.45" strokeWidth="1" />
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="#153250" strokeOpacity="0.45" strokeWidth="1" />
                  <line x1="60" y1="-3" x2="60" y2="3" stroke="#153250" strokeOpacity="0.45" strokeWidth="1" />
                  <line x1="120" y1="-4" x2="120" y2="4" stroke="#153250" strokeOpacity="0.45" strokeWidth="1" />
                  <text x="0" y="13" fontSize="8" fill="#4E5A65" fontFamily="monospace">0</text>
                  <text x="54" y="13" fontSize="8" fill="#4E5A65" fontFamily="monospace">50</text>
                  <text x="108" y="13" fontSize="8" fill="#4E5A65" fontFamily="monospace">100 km</text>
                </g>

                {/* Subtle Dotted Journey Thread connecting iconic stops */}
                <path
                  d="M 146 476 Q 210 385, 276 318 Q 268 370, 256 422 Q 266 456, 274 486 Q 294 504, 312 520 Q 346 570, 368 618 Q 308 666, 246 690 Q 216 678, 186 658"
                  fill="none"
                  stroke="#D4622A"
                  strokeOpacity="0.45"
                  strokeWidth="1.25"
                  strokeDasharray="3 4"
                />

                {/* 13 Interactive Cartographic Pins */}
                {destinations.map((dest) => {
                  const isSelected = activeDestination?.slug === dest.slug;
                  const pos = pinPositions[dest.slug] || {
                    x: (dest.coordinates.x / 100) * 560,
                    y: (dest.coordinates.y / 100) * 780,
                    align: "right" as const,
                  };
                  const labelX = pos.align === "right" ? 13 : -13;
                  const anchor = pos.align === "right" ? "start" : "end";

                  return (
                    <g
                      key={dest.slug}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setActiveDestination(dest)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveDestination(dest);
                        }
                      }}
                      className="cursor-pointer group focus:outline-none"
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${dest.name}`}
                    >
                      {/* Generous invisible hit area for mobile & desktop */}
                      <circle cx="0" cy="0" r="18" fill="transparent" />

                      {/* Active Halo */}
                      {isSelected && (
                        <motion.circle
                          cx="0"
                          cy="0"
                          r="15"
                          fill="#D4622A"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.2 }}
                          transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? "7.5" : "4.8"}
                        fill={isSelected ? "#D4622A" : "#FDFBF7"}
                        stroke="#153250"
                        strokeWidth={isSelected ? "2" : "1.5"}
                        className="transition-all duration-300 group-hover:fill-[#D4622A]"
                      />

                      {/* Inner Core */}
                      {isSelected && <circle cx="0" cy="0" r="2.2" fill="#FDFBF7" />}

                      {/* Crisp Cartographic Label */}
                      <text
                        x={labelX}
                        y="4"
                        fontSize={isSelected ? "12.5" : "10.5"}
                        fontWeight={isSelected ? "700" : "500"}
                        fill={isSelected ? "#153250" : "#3A3834"}
                        stroke="#F6F1E7"
                        strokeWidth="3.5"
                        paintOrder="stroke fill"
                        textAnchor={anchor}
                        className="select-none transition-colors duration-200 group-hover:fill-[#D4622A]"
                      >
                        {dest.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </EditorialReveal>

          {/* Info Side Panel */}
          <div className="lg:col-span-5 lg:min-h-[580px]">
            <MapInfoPanel
              destination={activeDestination}
              onClose={() => setActiveDestination(null)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
