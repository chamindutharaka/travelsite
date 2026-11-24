"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildWhatsAppLink, site } from "@/lib/site";
import {
  EditorialReveal,
  LineRise,
} from "@/components/motion/MotionPrimitives";

export function FinalCtaBanner() {
  const whatsappUrl = buildWhatsAppLink(
    `Hello ${site.brandName}! I would like to discuss a Sri Lanka trip.`
  );

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-32 bg-[#141414] text-[#FBFAF8] overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Image
        src="/images/destinations/mirissa.jpg"
        alt="Palm-lined beach on the southern coast of Sri Lanka at sunset"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/65 to-[#141414]/75" />

      <Container size="narrow" className="relative z-10 text-center space-y-6">
        <EditorialReveal className="space-y-4">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="w-7 h-[1px] bg-[#EF6427]" />
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#FBFAF8]/75">
              Ready when you are
            </p>
            <span className="w-7 h-[1px] bg-[#EF6427]" />
          </div>

          <h2 id="final-cta-heading" className="font-serif text-[#FBFAF8]">
            <LineRise>Let us plan your Sri Lanka trip</LineRise>
            <LineRise delay={0.08}>
              <span className="italic font-light text-[#FBFAF8]/90">together.</span>
            </LineRise>
          </h2>

          <p className="text-[17px] sm:text-[18px] text-[#FBFAF8]/85 mx-auto">
            Share your rough dates and interests with our team in {site.city}. We reply {site.responseTime} with a clear route and price guide, with no obligation to book.
          </p>
        </EditorialReveal>

        <EditorialReveal
          delay={0.14}
          className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5"
        >
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center min-h-[50px] px-8 py-3 rounded-full text-[15px] font-medium bg-[#FBFAF8] text-[#141414] hover:bg-[#EF6427] hover:text-white transition-colors duration-300"
          >
            Plan my trip
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[50px] px-8 py-3 rounded-full text-[15px] font-medium text-[#FBFAF8] border border-white/40 hover:border-white hover:bg-white/10 transition-colors duration-300"
          >
            Message on WhatsApp
          </a>
        </EditorialReveal>

        <p className="text-[14px] text-[#FBFAF8]/70 pt-1">
          Call or WhatsApp <strong className="text-[#FBFAF8] font-medium">{site.phoneDisplay}</strong> · {site.hours}
        </p>
      </Container>
    </section>
  );
}
