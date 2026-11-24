import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildWhatsAppLink, site } from "@/lib/site";

export function FinalCtaBanner() {
  const whatsappUrl = buildWhatsAppLink(
    `Hello ${site.brandName}! I would like to discuss a Sri Lanka trip.`
  );

  return (
    <section
      className="relative py-20 sm:py-28 bg-[var(--ocean-dark)] text-white overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <Image
        src="/images/destinations/mirissa.jpg"
        alt="Palm-lined beach on the southern coast of Sri Lanka at sunset"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)] via-[var(--ocean-dark)]/70 to-[var(--ocean-dark)]/80" />

      <Container size="narrow" className="relative z-10 text-center space-y-5">
        <p className="text-[14px] font-semibold text-[var(--gold)]">
          Ready when you are
        </p>

        <h2 id="final-cta-heading" className="font-serif text-white">
          Let us plan your Sri Lanka trip together.
        </h2>

        <p className="text-[17px] sm:text-[18px] text-white/90 mx-auto">
          Share your rough dates and interests with our team in {site.city}. We reply {site.responseTime} with a clear route and price guide, with no obligation to book.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
          <Link
            href="/plan-your-trip"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] transition-colors"
          >
            Plan my trip
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full text-[16px] font-semibold text-white border-2 border-white/60 hover:bg-white hover:text-[var(--ocean-dark)] transition-colors"
          >
            Message on WhatsApp
          </a>
        </div>

        <p className="text-[14px] text-white/80 pt-2">
          Call or WhatsApp <strong className="text-white">{site.phoneDisplay}</strong> · {site.hours}
        </p>
      </Container>
    </section>
  );
}
