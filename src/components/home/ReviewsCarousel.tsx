import React from "react";
import { reviews } from "@/content/reviews";
import { Container } from "@/components/layout/Container";

/**
 * Guest Reviews Carousel
 * 
 * Strict positioning rule:
 * Reads from `/content/reviews.ts`. If reviews.length === 0,
 * this component returns null and completely removes itself from DOM.
 * Never displays fake reviews, placeholder names or invented stats.
 */
export function ReviewsCarousel() {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]" aria-labelledby="reviews-heading">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D4622A] block">
            Verified Guest Reflections
          </span>
          <h2 id="reviews-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#153250]">
            What Our Travellers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-white border border-[#153250]/12 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#D4622A] mb-4 text-sm tracking-widest" aria-label={`${rev.rating} out of 5 stars`}>
                  {"★".repeat(rev.rating)}
                </div>

                <p className="text-sm text-[#4E5A65] italic leading-relaxed mb-6 font-light">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#153250]/12">
                <span className="font-bold text-[#153250] text-sm block">
                  {rev.author}
                </span>
                <span className="text-xs font-mono text-[#4E5A65]">
                  {rev.country} • {rev.tourTaken}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
