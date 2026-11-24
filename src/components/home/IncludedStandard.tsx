import React from "react";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

export function IncludedStandard() {
  const inclusions = [
    {
      title: "Airport pickup and drop-off",
      description:
        "We meet you at Colombo Bandaranaike Airport (CMB) at any hour and drive you back in good time for your flight home.",
    },
    {
      title: "Private vehicle and driver",
      description:
        "Your own air-conditioned car or van for the full trip, including fuel, highway tolls, parking fees, and driver accommodation.",
    },
    {
      title: "Support from our Galle desk",
      description: `One local contact on WhatsApp before and during your holiday. We usually reply ${site.responseTime}.`,
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-[var(--ocean)] text-white"
      aria-labelledby="included-heading"
    >
      <Container size="wide">
        <div className="max-w-2xl space-y-2.5 mb-10">
          <p className="text-[14px] font-semibold text-[var(--gold)]">
            Included as standard
          </p>
          <h2 id="included-heading" className="font-serif text-white">
            What comes with every multi-day trip.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inclusions.map((item) => (
            <li
              key={item.title}
              className="pt-5 border-t border-white/25 space-y-2"
            >
              <h3 className="font-serif text-white">{item.title}</h3>
              <p className="text-[16px] text-white/85 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
