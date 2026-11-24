import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Booking Terms & Conditions",
  description: "Booking terms, payment schedules, cancellation guidelines, and private tour conditions of Ceylon Holidays.",
  alternates: {
    canonical: `${company.canonicalUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-beige-50">
      <Container size="narrow" className="bg-white p-8 sm:p-14 rounded-3xl border border-beige-200 shadow-sm space-y-8 text-navy-700 text-sm sm:text-base leading-relaxed font-light">
        <header className="space-y-2 border-b border-beige-200 pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 block">
            Booking Agreement
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-navy-500">
            Official Booking Conditions • Ceylon Holidays (SLTDA Registered)
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-navy-950">
            1. The Booking Contract
          </h2>
          <p>
            Enquiries and route consultations with Ceylon Holidays are completely free of charge and carry zero obligation. A binding contract is established only once you approve a final detailed itinerary and invoice, and your initial deposit has been received.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-navy-950">
            2. Deposits & Final Payments
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong className="font-semibold text-navy-950">Deposit</strong>: A 25% deposit is required upon itinerary confirmation to secure hotel rooms and private transport allocations.</li>
            <li><strong className="font-semibold text-navy-950">Balance</strong>: The remaining 75% balance is payable 30 days prior to your arrival date in Sri Lanka. For bookings made within 30 days of arrival, full payment is required upon confirmation.</li>
            <li><strong className="font-semibold text-navy-950">Payment Methods</strong>: We accept major international credit cards and direct international bank wire transfers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-navy-950">
            3. Cancellations & Refunds
          </h2>
          <p>
            If you need to cancel your trip, notice must be received in writing via email. Cancellation fees apply as follows:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong className="font-semibold text-navy-950">45+ days prior to arrival</strong>: Full refund minus a $100 administrative and non-recoverable hotel deposit fee.</li>
            <li><strong className="font-semibold text-navy-950">30–44 days prior to arrival</strong>: 75% refund of total trip cost.</li>
            <li><strong className="font-semibold text-navy-950">15–29 days prior to arrival</strong>: 50% refund of total trip cost.</li>
            <li><strong className="font-semibold text-navy-950">Under 14 days prior to arrival</strong>: Non-refundable due to boutique hotel commitments.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-navy-950">
            4. Chauffeur-Guide & Vehicle Service
          </h2>
          <p>
            Your private chauffeur-guide is assigned exclusively to your party. All fuel, highway tolls, parking tickets, and driver meals and accommodation are included in your quote. Driving hours are governed by Sri Lanka road safety standards (typically up to 8–10 hours per day).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-bold text-navy-950">
            5. Travel Insurance
          </h2>
          <p>
            All travellers are required to hold comprehensive travel insurance covering international medical emergencies, trip cancellations, and personal baggage before travelling to Sri Lanka.
          </p>
        </section>
      </Container>
    </div>
  );
}
