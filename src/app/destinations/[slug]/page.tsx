import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { destinations } from "@/content/destinations";
import { tours } from "@/content/tours";
import { company } from "@/content/company";
import { getBreadcrumbSchema } from "@/lib/seo";
import { generateWhatsAppLink } from "@/lib/utils";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found" };

  return {
    title: `${dest.name} Travel Guide | Sri Lanka`,
    description: dest.overview,
    alternates: {
      canonical: `${company.canonicalUrl}/destinations/${dest.slug}`,
    },
    openGraph: {
      title: `${dest.name} Travel Guide | Ceylon Holidays`,
      description: dest.tagline,
      images: [dest.heroImage],
    },
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/destinations" },
    { name: dest.name, url: `/destinations/${dest.slug}` },
  ]);

  const matchingTours = tours.filter((t) =>
    t.routeSummary.some((r) => r.toLowerCase().includes(dest.name.toLowerCase()))
  );

  const whatsappMessage = `Hello Ceylon Holidays! I am interested in visiting ${dest.name} on a tailor-made journey. Could you advise on the best itinerary?`;
  const whatsappUrl = generateWhatsAppLink(whatsappMessage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-beige-50 pb-24">
        {/* Hero */}
        <div className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end bg-navy-950 text-white overflow-hidden py-16">
          <Image
            src={dest.heroImage}
            alt={dest.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />

          <Container size="wide" className="relative z-10">
            <nav className="flex items-center space-x-2 text-xs text-beige-200 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white">Destinations</Link>
              <span>/</span>
              <span className="text-orange-400 font-medium">{dest.name}</span>
            </nav>

            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                {dest.region}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
                {dest.name}
                {dest.sinhalaName && (
                  <span className="text-2xl font-normal text-beige-200 ml-3">({dest.sinhalaName})</span>
                )}
              </h1>
              <p className="text-base sm:text-xl text-beige-100 font-light">
                {dest.tagline}
              </p>
            </div>
          </Container>
        </div>

        {/* Content */}
        <Container size="wide" className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main (Col 1-8) */}
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  About {dest.name}
                </h2>
                <p className="text-sm sm:text-base text-navy-950/70 leading-relaxed font-light">
                  {dest.overview}
                </p>
              </section>

              {/* Highlights */}
              <section className="bg-white p-8 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  What Makes {dest.name} Special
                </h2>
                <div className="space-y-3">
                  {dest.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-beige-50 border border-beige-100 text-xs sm:text-sm text-navy-900 font-light">
                      <span className="text-orange-500 font-bold shrink-0">—</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Matching Tours */}
              {matchingTours.length > 0 && (
                <section className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-navy-900">
                    Sample Journeys That Include {dest.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {matchingTours.map((t) => (
                      <div key={t.slug} className="rounded-2xl bg-white border border-beige-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                          {t.category} • {t.durationDays} Days
                        </span>
                        <h4 className="font-serif text-xl font-bold text-navy-900 mb-2">
                          <Link href={`/tours/${t.slug}`} className="hover:text-teal-700 transition-colors">
                            {t.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-navy-950/70 line-clamp-2 mb-4 font-light">
                          {t.tagline}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-beige-100">
                          <span className="text-xs font-bold text-navy-900">
                            From ${t.fromPriceUsd.toLocaleString()}/person
                          </span>
                          <Link href={`/tours/${t.slug}`} className="text-xs font-semibold text-orange-600 hover:text-orange-700">
                            View Tour →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar (Col 9-12) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Climate & Seasonality Card */}
              <div className="bg-white p-7 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-navy-900 border-b border-beige-100 pb-2">
                  Climate & Best Months
                </h3>
                <p className="text-xs text-navy-950/70 leading-relaxed font-light">
                  {dest.climateSummary}
                </p>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-950/60 block mb-2">
                    Ideal Visiting Season:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.bestMonths.map((m) => (
                      <span key={m} className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-950 text-xs font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="bg-white p-7 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-navy-900 border-b border-beige-100 pb-2">
                  Nearby Places to Combine
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dest.nearbyPlaces.map((place) => (
                    <span key={place} className="px-3 py-1.5 rounded-lg bg-beige-100 text-xs font-medium text-navy-900">
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Inquiry */}
              <div className="bg-navy-900 text-white p-7 rounded-3xl space-y-4 border border-navy-800">
                <h4 className="font-serif text-xl font-bold">
                  Add {dest.name} to Your Trip
                </h4>
                <p className="text-xs text-beige-200 leading-relaxed font-light">
                  Tell our Galle team you&apos;d like to include {dest.name} in your private itinerary.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors duration-200"
                >
                  <span>Chat with Designer on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
