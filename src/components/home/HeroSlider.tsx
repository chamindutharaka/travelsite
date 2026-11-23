"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos } from "@/content/videos";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

interface HeroSlide {
  id: string;
  video: string;
  poster: string;
  eyebrow: string;
  title: string;
  tagline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const slides: HeroSlide[] = [
  {
    id: "sigiriya",
    video: "/videos/hero-1.mp4",
    poster: "/images/hero/hero-sigiriya.jpg",
    eyebrow: "Sri Lanka · Cultural Triangle",
    title: "Discover Sri Lanka",
    tagline: "Where every road leads to a story.",
    subtitle:
      "Ancient sky citadels, emerald highlands, wild leopards, warm southern seas, and the unhurried local welcome that turns a holiday into something you keep.",
    primaryCtaText: "Explore Tours",
    primaryCtaLink: "/tours",
    secondaryCtaText: "Plan Your Trip",
    secondaryCtaLink: "#trip-planner",
  },
  {
    id: "highlands",
    video: "/videos/hero-2.mp4",
    poster: "/images/hero/hero-tea-country.jpg",
    eyebrow: "The Island · Misty Highlands",
    title: "The Island of Wonder",
    tagline: "From misty mountain spires to golden shores.",
    subtitle:
      "Eight UNESCO World Heritage sites, two monsoons, twenty-six national parks, and cloud-draped hill country—all within four hours of each other.",
    primaryCtaText: "Discover Experiences",
    primaryCtaLink: "/experiences",
    secondaryCtaText: "Explore Destinations",
    secondaryCtaLink: "/destinations",
  },
  {
    id: "tailor-made",
    video: "/videos/hero-3.mp4",
    poster: "/images/destinations/colombo.jpg",
    eyebrow: "Tailor-Made · Colombo to Galle",
    title: "Travel Your Way",
    tagline: "Your journey. Your pace. Your Sri Lanka.",
    subtitle:
      "We do not sell fixed packages. From Colombo's vibrant nights to quiet colonial ramparts in Galle, we build one private itinerary at a time around you.",
    primaryCtaText: "Plan Your Trip",
    primaryCtaLink: "#trip-planner",
    secondaryCtaText: "Discover Destinations",
    secondaryCtaLink: "/destinations/colombo",
  },
  {
    id: "ella",
    video: "/videos/hero-4.mp4",
    poster: "/images/destinations/ella.jpg",
    eyebrow: "Beyond the Ordinary · Ella",
    title: "Beyond the Ordinary",
    tagline: "The island most itineraries drive past.",
    subtitle:
      "The blue highland train gliding over Nine Arches Bridge, an empty fort rampart at dawn, and a local tracker who knows every trail.",
    primaryCtaText: "Why Ceylon Holidays",
    primaryCtaLink: "/about",
    secondaryCtaText: "View the Gallery",
    secondaryCtaLink: "/gallery",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const featuredFilm = travelVideos[0];
  const slide = slides[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused || isVideoOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, isVideoOpen, nextSlide]);

  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlide && !isVideoOpen) {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, [currentSlide, isVideoOpen]);

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
      className="relative min-h-[100svh] flex flex-col justify-between bg-[#0B1724] text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Video Carousel"
    >
      {/* Full-Bleed Background Video Layers */}
      {slides.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={s.video}
              poster={s.poster}
              autoPlay={index === 0}
              muted
              loop
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              className={`w-full h-full object-cover transition-transform duration-[9000ms] ease-out ${
                isActive ? "scale-100" : "scale-105"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1724]/82 via-[#0B1724]/45 to-[#0B1724]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1724]/85 via-transparent to-[#0B1724]/45" />
          </div>
        );
      })}

      {/* Top Spacer for Fixed Header */}
      <div className="h-20 sm:h-24 shrink-0 relative z-10" />

      {/* Main Left-Aligned Editorial Content */}
      <Container size="wide" className="relative z-20 my-auto py-8 sm:py-14">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04, ease: EDITORIAL_EASE }}
                className="flex items-center gap-3"
              >
                <span className="w-7 h-[1px] bg-[#E5A952]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/85">
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.08, ease: EDITORIAL_EASE }}
                  className="font-serif text-[2.4rem] sm:text-6xl lg:text-[4.5rem] font-normal tracking-[-0.025em] text-white leading-[1.06]"
                >
                  {slide.title}
                </motion.h1>
              </div>

              {/* Italic Editorial Tagline */}
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.16, ease: EDITORIAL_EASE }}
                  className="font-serif italic text-lg sm:text-2xl lg:text-[1.75rem] text-[#F6E3C5] font-light leading-snug"
                >
                  {slide.tagline}
                </motion.p>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.24, ease: EDITORIAL_EASE }}
                className="text-[14.5px] sm:text-base text-white/80 max-w-[52ch] leading-[1.68]"
              >
                {slide.subtitle}
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.32, ease: EDITORIAL_EASE }}
                className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
              >
                <Link
                  href={slide.primaryCtaLink}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium text-[#122334] bg-[#FDFBF7] hover:bg-[#E5A952] transition-colors duration-300"
                >
                  {slide.primaryCtaText}
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/35 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-colors duration-300"
                >
                  {slide.secondaryCtaText}
                </Link>

                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="group inline-flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  <span className="w-9 h-9 rounded-full border border-white/35 group-hover:border-[#E5A952] group-hover:bg-[#E5A952] group-hover:text-[#122334] flex items-center justify-center transition-all duration-300">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </span>
                  <span className="hover-underline">Watch Full 4K Film</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Bottom Control Bar */}
      <div className="relative z-20 border-t border-white/15 bg-[#0B1724]/35 backdrop-blur-[2px]">
        <Container size="wide" className="py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex items-baseline gap-1 font-mono text-xs tracking-widest">
                <span className="text-white text-sm font-medium">
                  0{currentSlide + 1}
                </span>
                <span className="text-white/40">/</span>
                <span className="text-white/50">0{slides.length}</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to video ${idx + 1}: ${s.title}`}
                    className="relative h-[2px] w-7 sm:w-12 bg-white/25 overflow-hidden rounded-full cursor-pointer"
                  >
                    {idx === currentSlide && (
                      <span
                        key={`${s.id}-${currentSlide}`}
                        style={{ animationDuration: "8.5s" }}
                        className={`absolute inset-0 bg-[#E5A952] ${
                          isPaused || isVideoOpen ? "" : "animate-hero-progress"
                        }`}
                      />
                    )}
                    {idx < currentSlide && (
                      <span className="absolute inset-0 bg-white/70" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous video slide"
                  className="w-10 h-10 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next video slide"
                  className="w-10 h-10 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <a
                href="#welcome"
                className="hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white transition-colors"
              >
                <span>Scroll</span>
                <span className="relative block w-[1px] h-7 bg-white/20 overflow-hidden">
                  <span className="absolute inset-0 bg-[#E5A952] animate-scroll-cue" />
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Full 4K Film Lightbox Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={featuredFilm.title}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              className="relative max-w-5xl w-full bg-[#0B1724] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2.5 rounded-full bg-black/70 text-white/85 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${featuredFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={featuredFilm.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="p-4 sm:p-6 bg-[#0B1724] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E5A952]">
                    {featuredFilm.location} · {featuredFilm.duration}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-normal mt-0.5">
                    {featuredFilm.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white self-start sm:self-center"
                >
                  Close [Esc]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
