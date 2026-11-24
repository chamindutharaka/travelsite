import React from "react";
import { MapPin, Car, Sliders, MessageSquare, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

export function TrustBar() {
  const items = [
    {
      icon: MapPin,
      label: `Based in ${site.city}, ${site.country}`,
    },
    {
      icon: Car,
      label: "Private air-conditioned vehicle & driver",
    },
    {
      icon: Sliders,
      label: "Ready-made or fully custom routes",
    },
    {
      icon: MessageSquare,
      label: `Replies ${site.responseTime}`,
    },
    ...(site.sltdaNumber
      ? [{ icon: ShieldCheck, label: `SLTDA: ${site.sltdaNumber}` }]
      : []),
  ];

  return (
    <section
      aria-label="Key service facts"
      className="bg-[var(--sand-deep)] border-b border-[var(--line)] py-4"
    >
      <Container size="wide">
        <ul className="flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-3 text-[15px] font-medium text-[var(--ink)]">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon
                className="w-4 h-4 text-[var(--ocean)] shrink-0"
                aria-hidden="true"
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
