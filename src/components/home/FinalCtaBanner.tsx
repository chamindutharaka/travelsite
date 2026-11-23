"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function FinalCtaBanner() {
  return (
    <section
      className="relative py-20 sm:py-28 lg:py-36 bg-[#141414] text-white overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Image
        src="/images/destinations/mirissa.jpg"
        alt="Evening light over the palm-lined southern coast of Sri Lanka"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/65 to-[#141414]/75" />

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          <EditorialReveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#EF6427] block mb-3.5">
              Start Here
            </span>

            <h2
              id="final-cta-heading"
              className="font-serif text-[2.2rem] sm:text-5xl lg:text-[3.5rem] font-normal text-white leading-[1.1] tracking-[-0.02em]"
            >
              <LineRise>Your Sri Lanka story</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light text-[#F5F2ED]">
                  starts here.
                </span>
              </LineRise>
            </h2>
          </EditorialReveal>

          <EditorialReveal delay={0.12}>
            <p className="text-[15px] sm:text-lg text-white/80 max-w-[50ch] mx-auto leading-[1.7]">
              Tell us what you imagine—even a rough sketch is plenty—and our team in Galle will turn it into a journey worth remembering. No obligation, no pressure, and a real person on the other end.
            </p>
          </EditorialReveal>

          <EditorialReveal
            delay={0.2}
            className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5"
          >
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-[#1A1A1A] bg-[#FBFAF8] hover:bg-[#EF6427] transition-colors duration-300"
            >
              Plan My Trip
            </Link>

            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium text-white border border-white/35 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-colors duration-300"
            >
              Talk to Ceylon Holidays on WhatsApp
            </a>
          </EditorialReveal>

          <EditorialReveal delay={0.26}>
            <p className="text-xs text-white/60 pt-2 leading-relaxed">
              Or call <strong className="text-white font-medium">{company.phoneDisplay}</strong> · Based in Galle, Sri Lanka ({company.hours})
            </p>
          </EditorialReveal>
        </div>
      </Container>
    </section>
  );
}
