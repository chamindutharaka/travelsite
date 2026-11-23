import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { company } from "@/content/company";
import {
  EditorialReveal,
  ImageWipeReveal,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "About Us | Our Story & Galle Heritage",
  description:
    "Learn about Ceylon Holidays. Based in historic Galle Fort, our team crafts private, tailor-made journeys across Sri Lanka with licensed chauffeur-guides and genuine local insight.",
  alternates: {
    canonical: `${company.canonicalUrl}/about`,
  },
};

export default function AboutPage() {
  const values = [
    {
      num: "01",
      title: "Honesty Above All",
      description:
        "We tell you which coast has clear skies and which national parks have peak wildlife sightings during your exact dates. We never promise the impossible.",
    },
    {
      num: "02",
      title: "Bespoke Detail",
      description:
        "No two travellers are alike. Whether you love photography, birdwatching, colonial architecture, or quiet beaches, every itinerary is written individually.",
    },
    {
      num: "03",
      title: "Licensed & Ethical",
      description:
        "We practice strictly ethical wildlife tourism, employ SLTDA-licensed chauffeur-guides, and support local artisan workshops and family kitchens.",
    },
  ];

  const teamMembers = [
    {
      name: "Chamindu Wickramathunga [Replace with Founder/Director Name]",
      role: "Managing Director & Lead Travel Designer",
      bio: "Born in the Southern Province with deep roots in private bespoke travel, dedicated to sharing Sri Lanka's cultural and wildlife treasures.",
      image: "/images/placeholder.svg",
    },
    {
      name: "[Travel Designer Name Placeholder]",
      role: "Senior Itinerary Specialist (Cultural Triangle & Highlands)",
      bio: "Specializes in tailor-making multi-week routes, high-altitude tea trails, and private archaeological visits.",
      image: "/images/placeholder.svg",
    },
    {
      name: "[Lead Chauffeur-Guide Name Placeholder]",
      role: "Head of Chauffeur Services & Wilderness Tracker",
      bio: "Senior SLTDA-licensed chauffeur-guide and naturalist with defensive driving certification and deep wildlife tracking expertise.",
      image: "/images/placeholder.svg",
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#122334]">
      <PageHero
        image="/images/destinations/galle.jpg"
        imageAlt="Galle Fort lighthouse and coral ramparts overlooking the Indian Ocean"
        eyebrow="Our Galle Roots"
        title="Private Travel Shaped by Local Knowledge."
        subtitle="Ceylon Holidays was founded in Galle with a simple conviction: the most memorable journeys are handcrafted through real conversation—never mass-produced on a tour bus."
      />

      {/* Story & Galle Photo */}
      <section className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <ImageWipeReveal className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#122334]">
              <Image
                src="/images/hero/hero-galle-coast.jpg"
                alt="Historic Galle Fort Ramparts overlooking the southern coastline"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ImageWipeReveal>

            <EditorialReveal delay={0.1} className="lg:col-span-6 space-y-5 text-[#4E5A65] text-[15px] sm:text-base leading-[1.72]">
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4622A] block">
                Why Our Base in Galle Matters
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#122334] leading-[1.15]">
                Grounded on the Southern Coast, Connected Across the Island.
              </h2>
              <p>
                Operating from Galle gives us an authentic pulse on the island. We know when the morning swells off Mirissa are calm for blue whales, which restored tea planter bungalows in the hills have quiet gardens, and which rural kitchens serve unforgettable clay-pot curries.
              </p>
              <p>
                When you travel with Ceylon Holidays, your private chauffeur-guide acts as host, cultural bridge, and guardian on the road—backed every hour by our operations desk in Galle.
              </p>
              <p className="text-sm font-medium text-[#122334] pt-2 border-t border-[#122334]/10">
                {company.address}
              </p>
            </EditorialReveal>
          </div>
        </Container>
      </section>

      {/* Guiding Values */}
      <section className="py-16 sm:py-24 bg-[#F5EFE6] border-y border-[#122334]/10">
        <Container size="wide">
          <EditorialReveal className="max-w-2xl mb-12">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4622A] block mb-2.5">
              Ethics &amp; Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#122334]">
              Our Guiding Values
            </h2>
          </EditorialReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <StaggerItem
                key={v.num}
                className="pt-6 border-t border-[#122334]/15 space-y-3"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-[#D4622A] block">
                  {v.num}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#122334]">
                  {v.title}
                </h3>
                <p className="text-[14.5px] text-[#4E5A65] leading-[1.7]">
                  {v.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24">
        <Container size="wide">
          <EditorialReveal className="max-w-2xl mb-12">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4622A] block mb-2.5">
              People Behind Your Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#122334]">
              Meet Our Travel Designers &amp; Guides
            </h2>
            <p className="text-sm text-[#4E5A65] mt-2">
              Real people based in Sri Lanka who craft and steward your journey.
            </p>
          </EditorialReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <StaggerItem
                key={i}
                className="rounded-2xl bg-white border border-[#122334]/10 p-6 sm:p-7 text-center"
              >
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-[#122334] mb-4 border border-[#122334]/15">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#122334]">
                  {member.name}
                </h3>
                <p className="text-[11px] font-medium text-[#D4622A] uppercase tracking-[0.16em] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-[14px] text-[#4E5A65] leading-[1.68]">
                  {member.bio}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Official Accreditation */}
      <section className="pb-16 sm:pb-24">
        <Container size="default">
          <EditorialReveal className="rounded-2xl bg-[#122334] text-white p-8 sm:p-12 text-center space-y-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#D4622A] block">
              Accreditation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Official SLTDA Registration &amp; Licensing
            </h3>
            <p className="text-sm text-white/75 max-w-xl mx-auto leading-[1.7]">
              Ceylon Holidays is an accredited Sri Lankan tour operator registered with the Sri Lanka Tourism Development Authority (SLTDA).
            </p>
            <div className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#D4622A] tracking-wider">
              Registration No: {company.sltdaRegistration}
            </div>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium bg-[#FDFBF7] text-[#122334] hover:bg-[#D4622A] hover:text-white transition-colors"
              >
                Speak With Our Galle Team →
              </Link>
            </div>
          </EditorialReveal>
        </Container>
      </section>
    </div>
  );
}
