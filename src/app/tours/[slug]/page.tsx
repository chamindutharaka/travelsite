import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TourPriceBox } from "@/components/tours/TourPriceBox";
import { tours } from "@/data/tours";
import { faqs } from "@/content/faqs";
import { site } from "@/lib/site";
import { getTouristTripSchema, getBreadcrumbSchema } from "@/lib/seo";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return { title: "Tour Not Found" };

  const durationText = tour.durationLabel || `${tour.durationDays} Days`;

  return {
    title: `${tour.title} (${durationText})`,
    description: tour.overview,
    alternates: {
      canonical: `${site.siteUrl}/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.title} | ${site.brandName}`,
      description: tour.tagline,
      images: [tour.heroImage],
    },
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  const durationLabel =
    tour.durationLabel ||
    `${tour.durationDays} days / ${tour.durationNights} nights`;

  const touristTripJsonLd = getTouristTripSchema(tour);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
    { name: tour.title, url: `/tours/${tour.slug}` },
  ]);

  const relatedTours = tours
    .filter((t) => t.slug !== tour.slug)
    .sort((a, b) => {
      const aMatch = a.category === tour.category ? 0 : 1;
      const bMatch = b.category === tour.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 3);

  const displayCats = tour.categories ?? [tour.category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-[var(--sand)] text-[var(--ink)] pb-24 lg:pb-16">
        {/* Tour Hero */}
        <div className="relative min-h-[420px] sm:min-h-[500px] flex items-end bg-[var(--ocean-dark)] text-white overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--ocean-dark)]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/95 via-[var(--ocean-dark)]/45 to-[var(--ocean-dark)]/65" />

          <Container size="wide" className="relative z-10 pt-28 pb-10 sm:pb-14">
            <nav
              className="flex flex-wrap items-center gap-2 text-[14px] text-white/80 mb-4"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white hover:underline">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/tours" className="hover:text-white hover:underline">
                Tours
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--gold)] font-medium">{tour.title}</span>
            </nav>

            <div className="max-w-3xl space-y-3.5">
              <div className="flex flex-wrap gap-2">
                {displayCats.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[13px] font-semibold text-white"
                  >
                    {cat}
                  </span>
                ))}
                {tour.comfortLevel && (
                  <span className="px-3 py-1 rounded-full bg-[var(--gold)] text-[var(--ocean-dark)] text-[13px] font-semibold">
                    {tour.comfortLevel}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-white font-semibold">
                {tour.title}
              </h1>

              <p className="text-[17px] sm:text-[18px] text-white/90 leading-relaxed">
                {tour.tagline}
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5 text-[14px] font-medium text-white">
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--ocean-dark)]/80 border border-white/25">
                  {durationLabel}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--ocean-dark)]/80 border border-white/25">
                  Activity level: {tour.fitnessLevel}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--ocean-dark)]/80 border border-white/25">
                  Best time: {tour.bestSeasons}
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Best-Time Strip */}
        <div className="bg-[var(--sand-deep)] border-b border-[var(--line)] py-4">
          <Container size="wide">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[15px]">
              <p className="font-semibold text-[var(--ink)]">
                Best months:{" "}
                <span className="font-normal text-[var(--ink-muted)]">
                  {(tour.bestMonths ?? []).join(", ") || tour.bestSeasons}
                </span>
              </p>
              {tour.suitableFor && tour.suitableFor.length > 0 && (
                <p className="text-[14px] text-[var(--ink-muted)]">
                  Great for: <strong className="text-[var(--ink)]">{tour.suitableFor.join(" · ")}</strong>
                </p>
              )}
            </div>
          </Container>
        </div>

        {/* Main Content + Sticky Enquiry Box */}
        <Container size="wide" className="mt-10 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Overview */}
              <section className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--line)] space-y-4">
                <h2 className="font-serif text-[var(--ink)]">Overview</h2>
                <p className="text-[var(--ink-muted)]">{tour.overview}</p>

                <div className="pt-4 border-t border-[var(--line)]">
                  <p className="text-[14px] font-semibold text-[var(--ink)] mb-2.5">
                    Route
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-[var(--ink)]">
                    {tour.routeSummary.map((stop, i) => (
                      <React.Fragment key={`${stop}-${i}`}>
                        <span className="px-3 py-1 rounded-lg bg-[var(--sand-deep)] border border-[var(--line)]">
                          {stop}
                        </span>
                        {i < tour.routeSummary.length - 1 && (
                          <span className="text-[var(--ocean)]" aria-hidden="true">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>

              {/* Highlights */}
              <section className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--line)] space-y-4">
                <h2 className="font-serif text-[var(--ink)]">Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[var(--sand)] border border-[var(--line)] text-[15px] text-[var(--ink)]"
                    >
                      <span className="text-[var(--leaf)] font-bold shrink-0" aria-hidden="true">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Day-by-Day Accordion */}
              <section className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--line)] space-y-5">
                <div className="border-b border-[var(--line)] pb-4">
                  <h2 className="font-serif text-[var(--ink)]">
                    Day-by-day plan
                  </h2>
                  <p className="text-[15px] text-[var(--ink-muted)] mt-1">
                    Every stop, hotel, and timing can be adjusted before you book.
                  </p>
                </div>

                <div className="space-y-3">
                  {tour.itinerary.map((day) => (
                    <details
                      key={day.day}
                      className="group rounded-xl border border-[var(--line)] bg-[var(--sand)] open:bg-[var(--surface)] transition-colors"
                      open={day.day === 1}
                    >
                      <summary className="flex items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer list-none min-h-[56px]">
                        <div className="flex items-center gap-3.5">
                          <span className="w-9 h-9 rounded-full bg-[var(--ocean)] text-white font-semibold text-[14px] flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <span className="text-[13px] font-semibold text-[var(--ocean)] block">
                              {day.location}
                            </span>
                            <span className="font-serif text-lg font-semibold text-[var(--ink)]">
                              {day.title}
                            </span>
                          </div>
                        </div>
                        <span
                          className="text-xl font-semibold text-[var(--ink)] group-open:rotate-45 transition-transform shrink-0"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>

                      <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[var(--line)] space-y-3 text-[16px] text-[var(--ink-muted)]">
                        <p>{day.description}</p>

                        <ul className="flex flex-wrap gap-2">
                          {day.highlights.map((item, idx) => (
                            <li
                              key={idx}
                              className="px-3 py-1 rounded-full bg-[var(--sand-deep)] text-[13px] font-medium text-[var(--ink)]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 flex flex-wrap gap-x-6 gap-y-1 text-[14px] border-t border-[var(--line)]">
                          <span>
                            Meals: <strong className="text-[var(--ink)]">{day.meals}</strong>
                          </span>
                          <span>
                            Stay: <strong className="text-[var(--ink)]">{day.accommodationType}</strong>
                          </span>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Inclusions & Exclusions (2 Columns) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-3.5">
                  <h3 className="font-serif text-[var(--ink)] border-b border-[var(--line)] pb-2.5">
                    What is included
                  </h3>
                  <ul className="space-y-2 text-[15px] text-[var(--ink-muted)]">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--leaf)] font-bold shrink-0" aria-hidden="true">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line)] space-y-3.5">
                  <h3 className="font-serif text-[var(--ink)] border-b border-[var(--line)] pb-2.5">
                    Not included
                  </h3>
                  <ul className="space-y-2 text-[15px] text-[var(--ink-muted)]">
                    {tour.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--cinnamon)] font-bold shrink-0" aria-hidden="true">
                          ×
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--line)] space-y-4">
                <h2 className="font-serif text-[var(--ink)]">Common questions</h2>
                <div className="space-y-3">
                  {faqs.slice(0, 4).map((f, i) => (
                    <details
                      key={i}
                      className="rounded-xl bg-[var(--sand)] border border-[var(--line)] p-4"
                    >
                      <summary className="font-semibold text-[16px] text-[var(--ink)] cursor-pointer">
                        {f.question}
                      </summary>
                      <p className="text-[15px] text-[var(--ink-muted)] mt-2">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Price & Enquiry Card */}
            <div className="lg:col-span-4">
              <TourPriceBox
                tourSlug={tour.slug}
                tourTitle={tour.title}
                durationLabel={durationLabel}
                fromPriceUsd={tour.fromPriceUsd}
                isDayExperience={tour.isDayExperience}
              />
            </div>
          </div>

          {/* Related Tours */}
          <section className="mt-16 pt-12 border-t border-[var(--line)]">
            <h2 className="font-serif text-[var(--ink)] mb-6">
              Similar trips you might like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((rel) => (
                <article
                  key={rel.slug}
                  className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex flex-col justify-between"
                >
                  <Link
                    href={`/tours/${rel.slug}`}
                    className="block relative aspect-[16/10] bg-[var(--sand-deep)]"
                  >
                    <Image
                      src={rel.heroImage}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-5 space-y-2">
                    <p className="text-[13px] font-semibold text-[var(--ocean)]">
                      {rel.durationLabel || `${rel.durationDays} days`} · {rel.category}
                    </p>
                    <h3 className="font-serif text-[var(--ink)]">
                      <Link href={`/tours/${rel.slug}`} className="hover:text-[var(--ocean)]">
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="text-[14px] text-[var(--ink-muted)] line-clamp-2">
                      {rel.tagline}
                    </p>
                    <div className="pt-3 flex items-center justify-between text-[15px]">
                      <span className="font-semibold text-[var(--ink)]">
                        From ${rel.fromPriceUsd.toLocaleString("en-US")}
                      </span>
                      <Link
                        href={`/tours/${rel.slug}`}
                        className="font-semibold text-[var(--cinnamon)] hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
