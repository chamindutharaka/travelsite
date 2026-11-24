"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { travelVideos, TravelVideo } from "@/content/videos";

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
      className="py-16 sm:py-24 bg-[var(--sand)] text-[var(--ink)]"
      aria-labelledby="video-showcase-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Real 4K Sri Lanka films
            </p>
            <h2 id="video-showcase-heading" className="font-serif text-[var(--ink)]">
              See Sri Lanka before you fly.
            </h2>
            <p className="text-[var(--ink-muted)]">
              Videos load only when you click play, keeping this page fast on mobile.
            </p>
          </div>

          <Link
            href="/gallery#videos"
            className="inline-flex items-center min-h-[44px] text-[16px] font-semibold text-[var(--ocean)] hover:underline shrink-0"
          >
            View all photos &amp; videos →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Lite YouTube Player */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[var(--ocean-dark)] border border-[var(--line)]">
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
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/90 via-[var(--ocean-dark)]/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--cinnamon)] group-hover:bg-[var(--cinnamon-dark)] text-white flex items-center justify-center shadow-xl transition-colors">
                      <Play className="w-7 h-7 fill-current ml-1" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
                    <p className="text-[13px] font-semibold text-[var(--gold)]">
                      {activeVideo.location} · {activeVideo.duration}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mt-0.5">
                      {activeVideo.title}
                    </h3>
                  </div>
                </button>
              )}
            </div>

            <p className="text-[15px] text-[var(--ink-muted)]">
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
                  className={`w-full text-left p-3 rounded-xl border-2 flex items-center gap-3.5 transition-colors ${
                    selected
                      ? "bg-[var(--sand-deep)] border-[var(--ocean)]"
                      : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--ocean)]"
                  }`}
                >
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-[var(--ocean-dark)]">
                    <Image
                      src={video.posterImage}
                      alt={video.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-[var(--ocean)] block truncate">
                      {video.location}
                    </span>
                    <span className="font-serif text-[15px] font-semibold text-[var(--ink)] line-clamp-2 block leading-snug">
                      {video.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[13px] text-[var(--ink-muted)] mt-0.5">
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
