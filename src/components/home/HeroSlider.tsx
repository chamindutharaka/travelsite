"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos } from "@/content/videos";
import { site } from "@/lib/site";

interface NavigatorConnection {
  saveData?: boolean;
}

export function HeroSlider() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const featuredFilm = travelVideos[0];

  // Poster-only on mobile (<768px), prefers-reduced-motion, or Data Saver mode
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nav = navigator as Navigator & { connection?: NavigatorConnection };
    const saveData = Boolean(nav.connection?.saveData);

    if (isDesktop && !prefersReducedMotion && !saveData) {
      setCanPlayVideo(true);
    }
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoOpen]);

  return (
    <section
      className="relative min-h-[82vh] sm:min-h-[88vh] flex items-end bg-[var(--ocean-dark)] text-white overflow-hidden"
      aria-label="Welcome to Ceylon Holidays"
    >
      {/* Background: single optimized video on desktop, crisp poster image on mobile/reduced-motion/save-data */}
      <div className="absolute inset-0 z-0">
        {canPlayVideo ? (
          <video
            src="/videos/hero-1.mp4"
            poster="/images/hero/hero-sigiriya.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src="/images/hero/hero-sigiriya.jpg"
            alt="Sigiriya rock fortress rising above green forests in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[var(--ocean-dark)]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ocean-dark)]/92 via-[var(--ocean-dark)]/60 to-[var(--ocean-dark)]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/95 via-transparent to-[var(--ocean-dark)]/55" />
      </div>

      {/* Main Content */}
      <Container
        size="wide"
        className="relative z-10 pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pb-24"
      >
        <div className="max-w-2xl space-y-5">
          <p className="text-[14px] font-semibold text-[var(--gold)]">
            Based in {site.city}, {site.country}
          </p>

          <h1 className="font-serif font-semibold text-white">
            Private Sri Lanka trips, planned by locals in Galle.
          </h1>

          <p className="text-[17px] sm:text-[18px] text-white/90 leading-relaxed max-w-[56ch]">
            Explore ancient rock forts, misty tea hills, wildlife parks, and warm southern beaches with your own car and driver. Pick a ready-made route or adjust every stop to fit your dates and pace.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] transition-colors"
            >
              Plan your trip
            </Link>

            <Link
              href="/tours"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold text-white border-2 border-white/60 hover:bg-white hover:text-[var(--ocean-dark)] transition-colors"
            >
              Browse tours &amp; day trips
            </Link>

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center justify-center sm:justify-start gap-2.5 min-h-[48px] px-3 text-[16px] font-medium text-white hover:text-[var(--gold)] transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-white/15 border border-white/40 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span>Watch 4K film ({featuredFilm.duration})</span>
            </button>
          </div>
        </div>
      </Container>

      {/* Lite YouTube Lightbox — loads iframe ONLY on click */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={featuredFilm.title}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[var(--ocean-dark)] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-black"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${featuredFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={featuredFilm.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <div>
                <p className="text-[13px] font-medium text-[var(--gold)]">
                  {featuredFilm.location} · {featuredFilm.duration}
                </p>
                <h2 className="font-serif text-xl font-semibold mt-0.5">
                  {featuredFilm.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="min-h-[44px] px-4 text-[14px] font-medium text-white/85 hover:text-white self-start sm:self-center"
              >
                Close [Esc]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
