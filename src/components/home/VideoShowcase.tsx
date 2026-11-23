"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, MapPin, Clock, Film } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos, TravelVideo } from "@/content/videos";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function VideoShowcase() {
  const featuredVideos = travelVideos.slice(0, 5);
  const [activeVideo, setActiveVideo] = useState<TravelVideo>(featuredVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (video: TravelVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#153250] text-white relative overflow-hidden border-t border-white/10"
      aria-labelledby="video-showcase-heading"
    >
      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#E5A952]" />
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
                <Film className="w-3.5 h-3.5 text-[#E5A952]" />
                Sri Lanka in Motion
              </span>
            </div>
            <h2
              id="video-showcase-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-white leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Experience the island</LineRise>
              <LineRise delay={0.08}>before you arrive.</LineRise>
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-base text-white/70 leading-[1.7] max-w-[54ch]">
              Real 4K footage from across Sri Lanka—from sunrise over Sigiriya and the misty Ella rail viaduct to wild leopards in Yala and our home ramparts in Galle Fort.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.12}>
            <Link
              href="/gallery#videos"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-[#E5A952] transition-colors hover-underline shrink-0"
            >
              <span>All photos &amp; 4K films</span>
              <span>→</span>
            </Link>
          </EditorialReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
          {/* Featured 16:9 Player */}
          <EditorialReveal className="lg:col-span-8 space-y-3.5">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              {isPlaying ? (
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group relative w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-[#D4622A]"
                  aria-label={`Play video: ${activeVideo.title}`}
                >
                  <Image
                    src={activeVideo.posterImage}
                    alt={activeVideo.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F33]/90 via-[#0C1F33]/30 to-[#0C1F33]/15" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FDFBF7] group-hover:bg-[#E5A952] text-[#153250] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-300">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#E5A952] font-medium">
                        <MapPin className="w-3 h-3" />
                        {activeVideo.location}
                      </span>
                      <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-normal text-white mt-0.5 leading-snug">
                        {activeVideo.title}
                      </h3>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C1F33]/80 border border-white/15 text-xs font-mono text-white/90 shrink-0 w-fit">
                      <Clock className="w-3.5 h-3.5 text-[#E5A952]" />
                      {activeVideo.duration}
                    </span>
                  </div>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-0.5">
              <p className="text-[14px] text-white/70 leading-[1.65] max-w-[60ch]">
                {activeVideo.description}
              </p>
              <a
                href={activeVideo.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/50 hover:text-[#E5A952] transition-colors shrink-0"
              >
                Film by {activeVideo.creator} ↗
              </a>
            </div>
          </EditorialReveal>

          {/* Chapter Selector */}
          <EditorialReveal delay={0.1} className="lg:col-span-4 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/50 pb-1">
              Select Chapter ({featuredVideos.length} Real Films)
            </div>

            {featuredVideos.map((video, idx) => {
              const isSelected = video.id === activeVideo.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelectVideo(video)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-colors duration-300 flex items-center gap-3.5 group ${
                    isSelected
                      ? "bg-[#1C3F63] border-[#E5A952]/80"
                      : "bg-[#0C1F33]/70 border-white/10 hover:border-white/30 hover:bg-[#183757]"
                  }`}
                >
                  <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                    <Image
                      src={video.posterImage}
                      alt={video.title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#E5A952] text-[#153250]"
                            : "bg-black/70 text-white group-hover:bg-[#E5A952] group-hover:text-[#153250]"
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#E5A952] truncate">
                        0{idx + 1} · {video.location}
                      </span>
                      <span className="text-[10px] font-mono text-white/45 shrink-0">
                        {video.duration}
                      </span>
                    </div>
                    <h4 className="font-serif text-[15px] sm:text-base font-normal text-white leading-snug mt-0.5 line-clamp-2">
                      {video.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </EditorialReveal>
        </div>
      </Container>
    </section>
  );
}
