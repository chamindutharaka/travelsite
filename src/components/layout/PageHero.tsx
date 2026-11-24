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
    <section className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] flex items-end bg-[#141414] text-white overflow-hidden">
      <motion.div
        initial={{ scale: 1.06, opacity: 0.65 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EDITORIAL_EASE }}
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
        <div className="absolute inset-0 bg-[#141414]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/88 via-[#141414]/55 to-[#141414]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/92 via-[#141414]/30 to-[#141414]/65" />
      </motion.div>

      <Container
        size="wide"
        className="relative z-10 pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pb-16"
      >
        <div className="max-w-3xl space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="w-7 h-[1px] bg-[#EF6427]" />
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/95">
              {eyebrow}
            </p>
          </div>

          <h1 className="font-serif text-white font-normal">{title}</h1>

          <p className="text-[16px] sm:text-[17px] text-white/90 leading-[1.68] max-w-[56ch]">
            {subtitle}
          </p>

          {children && <div className="pt-2">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
