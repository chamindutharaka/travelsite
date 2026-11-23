"use client";

import React from "react";
import { motion } from "framer-motion";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
    >
      {children}
    </motion.div>
  );
}
