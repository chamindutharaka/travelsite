import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { experiences } from "@/content/experiences";
import { company } from "@/content/company";
import { getBreadcrumbSchema } from "@/lib/seo";
import { generateWhatsAppLink } from "@/lib/utils";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return { title: "Experience Not Found" };

  return {
    title: `${exp.title} | Sri Lanka Experience`,
    description: exp.shortDescription,
    alternates: {
      canonical: `${company.canonicalUrl}/experiences/${exp.slug}`,
    },
    openGraph: {
      title: `${exp.title} | Ceylon Holidays`,
      description: exp.shortDescription,
      images: [exp.heroImage],
    },
  };
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);

  if (!exp) {
    notFound();
  }

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Experiences", url: "/experiences" },
    { name: exp.title, url: `/experiences/${exp.slug}` },
  ]);

  const whatsappMessage = `Hello Ceylon Holidays! I want to include the experience "${exp.title}" in my custom Sri Lanka journey. Can you advise how to fit this in?`;
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
            src={exp.heroImage}
            alt={exp.title}
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
              <Link href="/experiences" className="hover:text-white">Experiences</Link>
              <span>/</span>
              <span className="text-orange-400 font-medium truncate">{exp.title}</span>
            </nav>

            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                {exp.category} Experience
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {exp.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-beige-100 pt-2">
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  Duration: {exp.duration}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  Location: {exp.location}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-navy-700">
                  Best Season: {exp.bestSeason}
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* Story Content */}
        <Container size="wide" className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-beige-200 shadow-sm space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                  The Experience Story
                </h2>
                <div className="text-sm sm:text-base text-navy-950/75 leading-relaxed font-light space-y-4">
                  <p>{exp.fullStory}</p>
                </div>
              </section>

              {/* Highlights */}
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-beige-200 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-bold text-navy-900">
                  Signature Highlights Included
                </h3>
                <div className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-beige-50 border border-beige-100 text-xs sm:text-sm text-navy-900 font-light">
                      <span className="text-orange-500 font-bold shrink-0">—</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-8 rounded-3xl border border-beige-200 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-navy-950/50 block">
                    Bespoke Inclusion
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-navy-900 mt-1">
                    Add This to Your Trip
                  </h4>
                  <p className="text-xs text-navy-950/70 mt-2 leading-relaxed font-light">
                    We incorporate this experience into your custom journey with all reserved tickets and private transfers taken care of.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-teal-700 hover:bg-teal-800 shadow-sm transition-all duration-300 text-sm"
                  >
                    <span>Inquire via WhatsApp →</span>
                  </a>

                  <Link
                    href={`/plan-your-trip?experience=${exp.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-navy-950 bg-orange-500 hover:bg-orange-400 shadow-sm transition-all duration-300 text-sm"
                  >
                    <span>Design My Trip →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
