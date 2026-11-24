import React from "react";
import { Container } from "@/components/layout/Container";
import { reviews } from "@/data/reviews";
import { site } from "@/lib/site";

export function ReviewsCarousel() {
  const verifiedReviews = reviews.filter((r) => r.verified);

  // Hide completely until real, verified reviews are added to /src/data/reviews.ts
  if (verifiedReviews.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 sm:py-24 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="reviews-heading"
    >
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Guest reviews
            </p>
            <h2 id="reviews-heading" className="font-serif text-[var(--ink)]">
              What recent travellers say.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {site.tripAdvisorUrl && (
              <a
                href={site.tripAdvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--ocean)] hover:border-[var(--ocean)]"
              >
                Read on TripAdvisor ↗
              </a>
            )}
            {site.googleReviewsUrl && (
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--ocean)] hover:border-[var(--ocean)]"
              >
                Read on Google ↗
              </a>
            )}
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedReviews.map((rev) => (
            <li
              key={rev.id}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between space-y-4"
            >
              <div>
                <p
                  className="text-[var(--gold)] text-lg tracking-wider mb-3"
                  aria-label={`${rev.rating} out of 5 stars`}
                >
                  {"★".repeat(Math.min(5, Math.max(1, rev.rating)))}
                </p>
                <blockquote className="text-[16px] text-[var(--ink)] leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-[var(--line)] text-[14px]">
                <p className="font-semibold text-[var(--ink)]">
                  {rev.author} · {rev.country}
                </p>
                <p className="text-[var(--ink-muted)]">
                  {rev.tourTaken} · {rev.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
