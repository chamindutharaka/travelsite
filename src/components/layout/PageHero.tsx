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
    <section className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[500px] flex items-end bg-[var(--ocean-dark)] text-white overflow-hidden">
      <motion.div
        initial={{ scale: 1.05, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EDITORIAL_EASE }}
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
        {/* High-contrast dark ocean overlay for WCAG AA text legibility */}
        <div className="absolute inset-0 bg-[var(--ocean-dark)]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/95 via-[var(--ocean-dark)]/45 to-[var(--ocean-dark)]/70" />
      </motion.div>

      <Container
        size="wide"
        className="relative z-10 pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pb-16"
      >
        <div className="max-w-3xl space-y-3.5">
          <p className="text-[14px] font-semibold text-[var(--gold)]">
            {eyebrow}
          </p>

          <h1 className="font-serif text-white font-semibold">{title}</h1>

          <p className="text-[17px] sm:text-[18px] text-white/90 leading-relaxed max-w-[60ch]">
            {subtitle}
          </p>

          {children && <div className="pt-2">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
