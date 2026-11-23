"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { X, Play, Clock, Film } from "lucide-react";
import { travelVideos, TravelVideo } from "@/content/videos";
import {
  EDITORIAL_EASE,
  EditorialReveal,
} from "@/components/motion/MotionPrimitives";

interface GalleryItem {
  id: string;
  title: string;
  category: "Culture" | "Wildlife" | "Highlands" | "Coast";
  location: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  { id: "1", title: "Sigiriya Lion Rock at Dawn", category: "Culture", location: "Cultural Triangle", image: "/images/hero/hero-sigiriya.jpg" },
  { id: "2", title: "Misty Highland Tea Terraces", category: "Highlands", location: "Nuwara Eliya", image: "/images/hero/hero-tea-country.jpg" },
  { id: "3", title: "Galle Fort Sunset Ramparts", category: "Coast", location: "Galle Fort", image: "/images/hero/hero-galle-coast.jpg" },
  { id: "4", title: "Nine Arches Railway Viaduct", category: "Highlands", location: "Ella", image: "/images/destinations/ella.jpg" },
  { id: "5", title: "Wild Asian Elephant Gathering", category: "Wildlife", location: "Minneriya", image: "/images/experiences/elephant-gathering-minneriya.jpg" },
  { id: "6", title: "Leopard Lounging in the Canopy", category: "Wildlife", location: "Yala National Park", image: "/images/experiences/leopard-safari-yala.jpg" },
  { id: "7", title: "Blue Whales off Dondra Trench", category: "Coast", location: "Mirissa", image: "/images/experiences/blue-whale-expedition.jpg" },
  { id: "8", title: "Temple of the Sacred Tooth Relic", category: "Culture", location: "Kandy", image: "/images/destinations/kandy.jpg" },
  { id: "9", title: "Colonial High Country Blue Train", category: "Highlands", location: "Ella & Demodara", image: "/images/experiences/scenic-blue-train.jpg" },
  { id: "10", title: "Secluded Coral Lagoon Swimming", category: "Coast", location: "Unawatuna & Thalpe", image: "/images/destinations/unawatuna.jpg" },
  { id: "11", title: "Ancient Ruwanwelisaya White Stupa", category: "Culture", location: "Anuradhapura", image: "/images/destinations/anuradhapura.jpg" },
  { id: "12", title: "Arugam Bay Surf Point Break", category: "Coast", location: "Arugam Bay", image: "/images/destinations/arugam-bay.jpg" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<TravelVideo | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (!activeItem && !activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem, activeVideo]);

  return (
    <div className="bg-[#FDFBF7] text-[#122334]">
      <PageHero
        image="/images/hero/hero-galle-coast.jpg"
        imageAlt="Galle Fort ramparts and ocean swells in Sri Lanka"
        eyebrow="Visual Catalog · 12 Photographs & 6 4K Films"
        title="Sri Lanka in Frames & Motion"
        subtitle="Real photographs and 4K aerial films from across Sri Lanka's cultural triangle, misty highland tea valleys, wild national parks, and southern coastline."
      />

      {/* Filter & Photo Grid */}
      <section className="py-14 sm:py-20">
        <Container size="wide">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {["All", "Culture", "Wildlife", "Highlands", "Coast"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-colors duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#122334] text-[#FDFBF7]"
                    : "bg-white text-[#4E5A65] border border-[#122334]/12 hover:border-[#122334] hover:text-[#122334]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                  onClick={() => setActiveItem(item)}
                  className="group text-left relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#122334]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1724]/85 via-[#0B1724]/15 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4622A]">
                      {item.category} · {item.location}
                    </span>
                    <span className="font-serif text-lg font-normal text-white mt-0.5">
                      {item.title}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Real 4K Travel Videos Section */}
      <section
        id="videos"
        className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#122334]/10 scroll-mt-20"
      >
        <Container size="wide">
          <EditorialReveal className="max-w-2xl space-y-3 mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4622A]">
              <Film className="w-3.5 h-3.5" />
              Real 4K Travel &amp; Drone Footage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#122334]">
              Sri Lanka in Motion
            </h2>
            <p className="text-[15px] text-[#4E5A65] leading-[1.7]">
              Watch real footage captured across Sri Lanka&apos;s cultural triangle, misty highland railway, wildlife parks, and southern coastline.
            </p>
          </EditorialReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {travelVideos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video)}
                className="group text-left rounded-2xl overflow-hidden bg-white border border-[#122334]/10 hover:shadow-[0_16px_40px_rgba(18,35,52,0.08)] transition-shadow duration-500 flex flex-col"
              >
                <div className="relative aspect-video w-full bg-[#0B1724] overflow-hidden">
                  <Image
                    src={video.posterImage}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-[#0B1724]/35 group-hover:bg-[#0B1724]/20 transition-colors flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-[#FDFBF7] group-hover:bg-[#D4622A] text-[#122334] group-hover:text-white flex items-center justify-center shadow-xl transition-colors duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B1724]/80 text-white text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-[#D4622A]" />
                    {video.duration}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4622A]">
                      {video.category} · {video.location}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-[#122334] mt-1 group-hover:text-[#D4622A] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-[14px] text-[#4E5A65] mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#4E5A65]/70 pt-2 block">
                    Film by {video.creator}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
              className="relative max-w-4xl w-full bg-[#0B1724] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-black/65 text-white/85 hover:text-white"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#0B1724] text-white flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4622A]">
                    {activeItem.category} · {activeItem.location}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal mt-0.5">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white"
                >
                  Close [Esc]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
              className="relative max-w-5xl w-full bg-[#0B1724] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-black/70 text-white/85 hover:text-white"
                aria-label="Close video preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="p-5 sm:p-6 bg-[#0B1724] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4622A]">
                    {activeVideo.category} · {activeVideo.location} · {activeVideo.duration}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal mt-0.5">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white self-start sm:self-center"
                >
                  Close [Esc]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
