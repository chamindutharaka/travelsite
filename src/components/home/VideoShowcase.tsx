"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos, TravelVideo } from "@/content/videos";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function VideoShowcase() {
  const featuredVideos = travelVideos.slice(0, 4);
  const [activeVideo, setActiveVideo] = useState<TravelVideo>(featuredVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectVideo = (video: TravelVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[#141414] text-[#FBFAF8]"
      aria-labelledby="video-showcase-heading"
    >
      <Container size="wide">
        <EditorialReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[1px] bg-[#EF6427]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#FBFAF8]/65">
                Real 4K Sri Lanka films
              </p>
            </div>
            <h2 id="video-showcase-heading" className="font-serif text-[#FBFAF8]">
              <LineRise>See Sri Lanka</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light text-[#FBFAF8]/85">
                  before you fly.
                </span>
              </LineRise>
            </h2>
            <p className="text-[#FBFAF8]/75">
              Videos load only when you click play, keeping this page fast on mobile.
            </p>
          </div>

          <Link
            href="/gallery#videos"
            className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-[#FBFAF8] hover:text-[#EF6427] transition-colors shrink-0"
          >
            View all photos &amp; videos →
          </Link>
        </EditorialReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lite YouTube Player */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15">
              {isPlaying ? (
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group relative w-full h-full text-left"
                  aria-label={`Play video: ${activeVideo.title}`}
                >
                  <Image
                    src={activeVideo.posterImage}
                    alt={activeVideo.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/25 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FBFAF8]/95 group-hover:bg-[#EF6427] text-[#141414] group-hover:text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-105">
                      <Play className="w-7 h-7 fill-current ml-1" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-[#FBFAF8]">
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#EF6427]">
                      {activeVideo.location} · {activeVideo.duration}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#FBFAF8] mt-1">
                      {activeVideo.title}
                    </h3>
                  </div>
                </button>
              )}
            </div>

            <p className="text-[15px] text-[#FBFAF8]/75">
              {activeVideo.description}
            </p>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-4 space-y-3">
            {featuredVideos.map((video) => {
              const selected = video.id === activeVideo.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelectVideo(video)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3.5 transition-all duration-300 ${
                    selected
                      ? "bg-white/10 border-[#EF6427]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                    <Image
                      src={video.posterImage}
                      alt={video.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-[#EF6427] block truncate">
                      {video.location}
                    </span>
                    <span className="font-serif text-[15px] font-medium text-[#FBFAF8] line-clamp-2 block leading-snug mt-0.5">
                      {video.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[12.5px] text-[#FBFAF8]/60 mt-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {video.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
