"use client";

import React from "react";
import { motion } from "framer-motion";

export const EDITORIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const WIPE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Smooth editorial fade-up on scroll into view */
export function EditorialReveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.8, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Masked headline line-rise animation matching reference editorial titles */
export function LineRise({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.9, delay, ease: EDITORIAL_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Curtain wipe-in + subtle settle scale for editorial photography */
export function ImageWipeReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(8% 0% 0% 0%)", opacity: 0, scale: 1.04 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 1.0, delay, ease: WIPE_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container & item for editorial grids */
export function StaggerGrid({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: EDITORIAL_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
