import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { tours } from "@/content/tours";
import { faqs } from "@/content/faqs";
import { company } from "@/content/company";
import { getTouristTripSchema, getBreadcrumbSchema } from "@/lib/seo";
import { generateWhatsAppLink } from "@/lib/utils";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return { title: "Tour Not Found" };

  return {
    title: `${tour.title} (${tour.durationDays} Days)`,
    description: tour.overview,
    alternates: {
      canonical: `${company.canonicalUrl}/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.title} | Ceylon Holidays`,
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

  const touristTripJsonLd = getTouristTripSchema(tour);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
    { name: tour.title, url: `/tours/${tour.slug}` },
  ]);

  const relatedTours = tours.filter((t) => t.slug !== tour.slug).slice(0, 2);

  const whatsappMessage = `Hello Ceylon Holidays! I am interested in customising the "${tour.title}" (${tour.durationDays} Days, from $${tour.fromPriceUsd}/person). Could we discuss tailoring this for my travel dates?`;
  const whatsappUrl = generateWhatsAppLink(whatsappMessage);

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

      <div className="bg-beige-50 pb-24">
        {/* Tour Hero */}
        <div className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end bg-navy-950 text-white overflow-hidden py-16">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />

          <Container size="wide" className="relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs text-beige-200 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/tours" className="hover:text-white">Tours</Link>
              <span>/</span>
              <span className="text-orange-400 font-medium truncate">{tour.title}</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-navy-900/90 border border-teal-700/60 text-[11px] font-bold tracking-wider uppercase text-orange-400 backdrop-blur-sm">
                {tour.category} Private Journey
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {tour.title}
              </h1>

              <p className="text-sm sm:text-lg text-beige-100 leading-relaxed font-light">
                {tour.tagline}
              </p>

              {/* Quick Meta Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-beige-100">
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  {tour.durationDays} Days / {tour.durationNights} Nights
                </span>
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  Fitness: {tour.fitnessLevel}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  Best Seasons: {tour.bestSeasons}
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Main Content & Sticky Inquiry Box */}
        <Container size="wide" className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (Col 1-8) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  Journey Overview
                </h2>
                <p className="text-sm sm:text-base text-navy-950/70 leading-relaxed font-light">
                  {tour.overview}
                </p>

                {/* Route Overview */}
                <div className="pt-4 border-t border-beige-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-950/60 block mb-2">
                    Private Route Summary:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-navy-900">
                    {tour.routeSummary.map((stop, i) => (
                      <React.Fragment key={stop}>
                        <span className="px-3 py-1.5 rounded-lg bg-beige-100 border border-beige-200">
                          {stop}
                        </span>
                        {i < tour.routeSummary.length - 1 && (
                          <span className="text-teal-700">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>

              {/* Highlights */}
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  Signature Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-beige-50 border border-beige-100 text-xs sm:text-sm text-navy-900 font-light">
                      <span className="text-orange-500 font-bold shrink-0">—</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Day-by-Day Itinerary Accordion */}
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-6">
                <div className="border-b border-beige-200 pb-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                    Day-by-Day Itinerary
                  </h2>
                  <p className="text-xs text-navy-950/60 mt-1 font-light">
                    Fully flexible: timings, meals, and accommodations can be modified for you.
                  </p>
                </div>

                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <details
                      key={day.day}
                      className="group rounded-2xl border border-beige-200 bg-beige-50/50 open:bg-white open:shadow-sm transition-all duration-300"
                      open={day.day === 1}
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-navy-900 text-orange-400 font-bold text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                              {day.location}
                            </span>
                            <span className="font-serif text-lg font-bold text-navy-900">
                              {day.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-navy-900 group-open:rotate-45 transition-transform duration-300">
                          +
                        </span>
                      </summary>

                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-navy-950/70 space-y-4 border-t border-beige-100 font-light">
                        <p className="leading-relaxed">{day.description}</p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {day.highlights.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md bg-beige-100 text-[11px] font-medium text-navy-900"
                            >
                              • {item}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-xs text-navy-950/60 border-t border-beige-100">
                          <span>Meals: <strong className="text-navy-900 font-medium">{day.meals}</strong></span>
                          <span>Stay: <strong className="text-navy-900 font-medium">{day.accommodationType}</strong></span>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Inclusions & Exclusions */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-7 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                  <h3 className="font-serif text-xl font-bold text-navy-900 border-b border-beige-100 pb-2">
                    Included as Standard
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-navy-950/75 font-light">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-700 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-7 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                  <h3 className="font-serif text-xl font-bold text-navy-900 border-b border-beige-100 pb-2">
                    Excluded
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-navy-950/75 font-light">
                    {tour.excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Tour FAQs */}
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl font-bold text-navy-900">
                  Frequently Asked Questions About This Tour
                </h2>
                <div className="space-y-3">
                  {faqs.slice(0, 3).map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-beige-50 border border-beige-100">
                      <h4 className="font-bold text-sm text-navy-900 mb-1.5">{f.question}</h4>
                      <p className="text-xs text-navy-950/70 leading-relaxed font-light">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Inquiry Form (Col 9-12) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-8 rounded-3xl border border-beige-200 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-navy-950/50 block">
                    Indicative Price
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-serif font-bold text-navy-900">
                      From ${tour.fromPriceUsd.toLocaleString()}
                    </span>
                    <span className="text-xs text-navy-950/50">/ person</span>
                  </div>
                  <p className="text-[11px] text-navy-950/60 mt-1 font-light">
                    Based on 2 guests in boutique accommodations. All private transport included.
                  </p>
                </div>

                <div className="pt-4 border-t border-beige-200 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-teal-700 hover:bg-teal-800 shadow-sm transition-all duration-300 text-sm"
                  >
                    <span>Discuss on WhatsApp →</span>
                  </a>

                  <Link
                    href={`/plan-your-trip?tour=${tour.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-navy-950 bg-orange-500 hover:bg-orange-400 shadow-sm transition-all duration-300 text-sm"
                  >
                    <span>Customise This Journey →</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-beige-100 space-y-2.5 text-xs text-navy-950/70 font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>No deposit required to explore ideas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Dedicated private chauffeur-guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Local 24/7 concierge support in Galle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-20 pt-12 border-t border-beige-200">
            <h3 className="font-serif text-3xl font-bold text-navy-900 mb-8">
              Other Journeys You May Love
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedTours.map((rel) => (
                <div
                  key={rel.slug}
                  className="rounded-3xl bg-white border border-beige-200 p-6 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative w-full sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden bg-navy-950 shrink-0">
                    <Image
                      src={rel.heroImage}
                      alt={rel.title}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                        {rel.category} • {rel.durationDays} Days
                      </span>
                      <h4 className="font-serif text-xl font-bold text-navy-900 mt-1 group-hover:text-teal-700 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-navy-950/70 mt-2 line-clamp-2 font-light">
                        {rel.tagline}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-beige-100 flex items-center justify-between">
                      <span className="font-bold text-navy-900 text-sm">
                        From ${rel.fromPriceUsd.toLocaleString()}
                      </span>
                      <Link
                        href={`/tours/${rel.slug}`}
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                      >
                        Explore Tour →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
