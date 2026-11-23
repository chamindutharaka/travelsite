"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function EditorialInterlude() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 bg-[#0C1F33] text-white overflow-hidden"
      aria-labelledby="interlude-heading"
    >
      <Image
        src="/images/destinations/anuradhapura.jpg"
        alt="First light striking the ancient white Ruwanwelisaya stupa in Anuradhapura"
        fill
        sizes="100vw"
        className="object-cover opacity-40 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F33] via-[#0C1F33]/60 to-[#0C1F33]/75" />

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          <EditorialReveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#E5A952] block mb-3.5">
              Sri Lanka Through Our Eyes
            </span>

            <h2
              id="interlude-heading"
              className="font-serif text-[2.1rem] sm:text-5xl lg:text-[3.5rem] font-normal text-white leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Sri Lanka is not just a destination.</LineRise>
              <LineRise delay={0.1}>
                <span className="italic font-light text-[#F6E3C5]">
                  It is a feeling.
                </span>
              </LineRise>
            </h2>
          </EditorialReveal>

          <EditorialReveal delay={0.14}>
            <p className="text-[15px] sm:text-lg text-white/80 leading-[1.72] max-w-[54ch] mx-auto">
              It is the crisp air at 1,900 metres after a week on the southern coast. It is a tracker switching the engine off and pointing, without a word, at a leopard in the scrub. It is being handed a warm plate in a Galle family kitchen. The famous landmarks are worth seeing—the quiet moments in between are why people return.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.22} className="pt-2">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium text-[#153250] bg-[#FDFBF7] hover:bg-[#E5A952] transition-colors duration-300"
            >
              See the Gallery &amp; Films
            </Link>
          </EditorialReveal>
        </div>
      </Container>
    </section>
  );
}
