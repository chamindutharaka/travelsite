import React from "react";
import { Container } from "@/components/layout/Container";
import { faqs } from "@/content/faqs";
import { getFAQSchema } from "@/lib/seo";

export function FaqSection() {
  const faqJsonLd = getFAQSchema(faqs);

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-[var(--sand)] text-[var(--ink)]"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Container size="narrow">
        <div className="space-y-2.5 mb-10">
          <p className="text-[14px] font-semibold text-[var(--ocean)]">
            Practical travel answers
          </p>
          <h2 id="faq-heading" className="font-serif text-[var(--ink)]">
            Frequently asked questions
          </h2>
          <p className="text-[var(--ink-muted)]">
            Quick, honest answers on visas, weather, tipping, safety, and booking.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-[var(--surface)] border border-[var(--line)] open:border-[var(--ocean)] transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none min-h-[56px]">
                <span className="font-serif text-lg sm:text-xl font-semibold text-[var(--ink)]">
                  {faq.question}
                </span>
                <span
                  className="text-xl font-semibold text-[var(--ocean)] group-open:rotate-45 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 pt-2 border-t border-[var(--line)] text-[16px] text-[var(--ink-muted)] leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
