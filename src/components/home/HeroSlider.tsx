"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos } from "@/content/videos";
import { site } from "@/lib/site";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

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
      className="relative min-h-[100svh] flex flex-col justify-between bg-[#141414] text-white overflow-hidden"
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
        <div className="absolute inset-0 bg-[#141414]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/82 via-[#141414]/45 to-[#141414]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/88 via-transparent to-[#141414]/45" />
      </div>

      {/* Top Spacer for Fixed Header */}
      <div className="h-20 sm:h-24 shrink-0 relative z-10" />

      {/* Main Left-Aligned Editorial Content */}
      <Container size="wide" className="relative z-20 my-auto py-10 sm:py-16">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.04, ease: EDITORIAL_EASE }}
            className="flex items-center gap-3"
          >
            <span className="w-7 h-[1px] bg-[#EF6427]" />
            <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/90">
              Based in {site.city} · {site.country}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.08, ease: EDITORIAL_EASE }}
              className="font-serif font-normal text-white"
            >
              Private Sri Lanka trips,{" "}
              <span className="italic font-light text-white/90">
                planned by locals in Galle.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EDITORIAL_EASE }}
            className="text-[16px] sm:text-[17px] text-white/85 max-w-[54ch] leading-[1.68]"
          >
            Explore ancient rock forts, misty tea hills, wildlife parks, and warm southern beaches with your own car and driver. Pick a ready-made route or adjust every stop to fit your dates and pace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: EDITORIAL_EASE }}
            className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
          >
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[15px] font-medium text-[#1A1A1A] bg-[#FBFAF8] hover:bg-[#EF6427] hover:text-white transition-colors duration-300"
            >
              Plan your trip
            </Link>

            <Link
              href="/tours"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[15px] font-medium text-white border border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-colors duration-300"
            >
              Browse tours &amp; day trips
            </Link>

            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="group inline-flex items-center justify-center sm:justify-start gap-2.5 min-h-[48px] px-3 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-white/35 group-hover:border-[#EF6427] group-hover:bg-[#EF6427] flex items-center justify-center transition-all duration-300 shrink-0">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span className="hover-underline">
                Watch 4K film ({featuredFilm.duration})
              </span>
            </button>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Editorial Bar with Animated Scroll Cue */}
      <div className="relative z-20 border-t border-white/15 bg-black/25 backdrop-blur-[2px]">
        <Container size="wide" className="py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[13px] text-white/75">
              Private car &amp; driver · Ready-made or custom routes · Replies {site.responseTime}
            </p>

            <a
              href="#welcome"
              className="hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/75 hover:text-white transition-colors shrink-0"
            >
              <span>Scroll</span>
              <span className="relative block w-[1px] h-7 bg-white/25 overflow-hidden">
                <span className="absolute inset-0 bg-[#EF6427] animate-scroll-cue" />
              </span>
            </a>
          </div>
        </Container>
      </div>

      {/* Lite YouTube Lightbox — loads iframe ONLY on click */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={featuredFilm.title}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#141414] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
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

            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white border-t border-white/10">
              <div>
                <p className="text-[12px] font-mono uppercase tracking-wider text-[#EF6427]">
                  {featuredFilm.location} · {featuredFilm.duration}
                </p>
                <h2 className="font-serif text-xl font-normal mt-0.5">
                  {featuredFilm.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="min-h-[44px] px-4 text-[13px] font-mono uppercase tracking-wider text-white/70 hover:text-white self-start sm:self-center"
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
