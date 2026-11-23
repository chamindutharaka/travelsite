import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and personal data protection principles of Ceylon Holidays.",
  alternates: {
    canonical: `${company.canonicalUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#FDFBF7]">
      <Container size="narrow" className="bg-white p-8 sm:p-14 rounded-3xl border border-[#153250]/12 shadow-sm space-y-8 text-[#4E5A65] text-sm sm:text-base leading-relaxed font-light">
        <header className="space-y-2 border-b border-[#153250]/12 pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D4622A] block">
            Legal & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153250]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#4E5A65]">
            Last Updated: November 2026 • Ceylon Holidays, Galle, Sri Lanka
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#153250]">
            1. Our Commitment to Your Privacy
          </h2>
          <p>
            Ceylon Holidays (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to safeguarding the privacy and personal data of our travellers. This Privacy Policy details how we collect, use, and protect your information when you browse our website ({company.productionDomain}) or submit travel enquiries via our multi-step planner, contact forms, or direct WhatsApp communications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#153250]">
            2. Personal Data We Collect
          </h2>
          <p>
            When you request an itinerary or enquire about our bespoke services, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong className="font-semibold text-[#153250]">Contact Identification</strong>: Full name, email address, telephone/WhatsApp number, and country of residence.</li>
            <li><strong className="font-semibold text-[#153250]">Travel Preferences</strong>: Desired dates, party composition (adults/children), dietary requirements, accommodation styles, and destinations of interest.</li>
            <li><strong className="font-semibold text-[#153250]">Booking Essentials</strong>: Passport details (only collected once an itinerary is confirmed to secure official Sri Lanka national park permits and train reservations).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#153250]">
            3. How We Use Your Information
          </h2>
          <p>
            Your information is used strictly to design, quote, coordinate, and execute your private Sri Lanka itinerary. We never sell, rent, or trade your personal information to third-party marketing companies. Data is shared solely with trusted service providers essential to your trip (such as boutique hotels, licensed safari jeeps, and the Sri Lanka Railways booking authority).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#153250]">
            4. Security and Retention
          </h2>
          <p>
            All data transmitted through our web forms is encrypted using Transport Layer Security (TLS). We store your contact records securely and retain them only as long as necessary to fulfill travel services and comply with Sri Lankan regulatory reporting.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-[#153250]">
            5. Contact Our Privacy Officer
          </h2>
          <p>
            If you wish to request access, correction, or deletion of your personal records, please email our Galle headquarters at <a href={`mailto:${company.email}`} className="text-[#D4622A] hover:text-[#D4622A] underline font-medium">{company.email}</a> or write to Light House Street, Galle Fort, Galle 80000, Sri Lanka.
          </p>
        </section>
      </Container>
    </div>
  );
}
