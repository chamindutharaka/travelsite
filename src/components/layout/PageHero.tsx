"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

interface PageHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  children,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[46vh] sm:min-h-[54vh] lg:min-h-[58vh] flex items-end bg-[#141414] text-white overflow-hidden">
      {/* Real Photograph Background with Smooth Settle Zoom */}
      <motion.div
        initial={{ scale: 1.07, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EDITORIAL_EASE }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Uniform dark transparency tint + directional scrim for crisp navbar & title visibility */}
        <div className="absolute inset-0 bg-[#141414]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/88 via-[#141414]/55 to-[#141414]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/92 via-[#141414]/30 to-[#141414]/65" />
      </motion.div>

      {/* Editorial Content */}
      <Container
        size="wide"
        className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pb-20"
      >
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: EDITORIAL_EASE }}
            className="flex items-center gap-3"
          >
            <span className="w-7 h-[1px] bg-[#EF6427]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              {eyebrow}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.12, ease: EDITORIAL_EASE }}
              className="font-serif text-[2.3rem] sm:text-5xl lg:text-[3.75rem] font-normal tracking-[-0.025em] text-white leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]"
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: EDITORIAL_EASE }}
            className="text-[15px] sm:text-lg text-white/90 leading-[1.68] max-w-[56ch] drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]"
          >
            {subtitle}
          </motion.p>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EDITORIAL_EASE }}
              className="pt-2"
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
