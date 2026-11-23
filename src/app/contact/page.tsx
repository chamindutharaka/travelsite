"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { company } from "@/content/company";
import { EditorialReveal } from "@/components/motion/MotionPrimitives";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelDates: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFeedback(
          "Thank you — your message has been received by our Galle team. We will reply personally within 12 hours."
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          travelDates: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please reach out via WhatsApp.");
      }
    } catch {
      setStatus("error");
      setFeedback("Failed to send message. Please contact us directly on WhatsApp.");
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#153250]">
      <PageHero
        image="/images/destinations/mirissa.jpg"
        imageAlt="Palm-lined coastline of southern Sri Lanka near Galle"
        eyebrow="Based in Galle, Sri Lanka"
        title="Let’s Talk About Sri Lanka"
        subtitle="Whether you have a clear route in mind or only a rough month and a few ideas, write to our team in Galle. Real people answer every enquiry."
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Galle Office & Direct Channels */}
            <EditorialReveal className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#153250]/10 space-y-6">
                <div className="border-b border-[#153250]/10 pb-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4622A] block mb-1">
                    Direct Contact
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#153250]">
                    Galle Headquarters
                  </h2>
                </div>

                <ul className="space-y-5 text-sm text-[#4E5A65]">
                  <li className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-[#D4622A] shrink-0 mt-1" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#153250] mb-0.5">
                        Office Address
                      </span>
                      <span className="leading-relaxed">{company.address}</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[#D4622A] shrink-0 mt-1" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#153250] mb-0.5">
                        Hotline &amp; WhatsApp
                      </span>
                      <a
                        href={`tel:${company.phone}`}
                        className="text-[#153250] hover:text-[#D4622A] font-medium transition-colors"
                      >
                        {company.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <Mail className="w-4 h-4 text-[#D4622A] shrink-0 mt-1" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#153250] mb-0.5">
                        Email
                      </span>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-[#153250] hover:text-[#D4622A] font-medium transition-colors"
                      >
                        {company.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <Clock className="w-4 h-4 text-[#D4622A] shrink-0 mt-1" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#153250] mb-0.5">
                        Operating Hours
                      </span>
                      <span>{company.hours}</span>
                    </div>
                  </li>
                </ul>

                {/* Primary WhatsApp Action */}
                <div className="pt-5 border-t border-[#153250]/10 space-y-3">
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium text-[#FDFBF7] bg-[#153250] hover:bg-[#D4622A] transition-colors duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <Link
                    href="/plan-your-trip"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[#153250] bg-[#FDFBF7] border border-[#153250]/15 hover:border-[#153250] transition-colors duration-300"
                  >
                    <span>Use 7-Step Trip Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <p className="text-xs text-[#4E5A65] leading-relaxed px-1">
                SLTDA Registered Operator ({company.sltdaRegistration}). Typical response time under 12 hours, 7 days a week.
              </p>
            </EditorialReveal>

            {/* Right Column: Clean Editorial Enquiry Form */}
            <EditorialReveal delay={0.1} className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#153250]/10 shadow-[0_14px_40px_rgba(21,50,80,0.05)] space-y-6">
                <div className="space-y-1.5 border-b border-[#153250]/10 pb-5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4622A] block">
                    Write to Us
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#153250]">
                    Send an Enquiry
                  </h2>
                  <p className="text-sm text-[#4E5A65] leading-relaxed">
                    Share your dates, party size, or questions—no commitment required.
                  </p>
                </div>

                {status === "success" ? (
                  <div className="p-8 rounded-2xl bg-[#F5EFE6] border border-[#153250]/10 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#153250] text-[#FDFBF7] flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-[#153250]">
                      Message Received
                    </h3>
                    <p className="text-sm text-[#4E5A65] max-w-md mx-auto leading-[1.7]">
                      {feedback}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-medium text-[#153250] border border-[#153250]/20 hover:border-[#153250] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        value={formData.honeypot}
                        onChange={(e) =>
                          setFormData({ ...formData, honeypot: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Thomas Wright"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#153250]/15 bg-[#FDFBF7] text-sm text-[#153250] placeholder-[#4E5A65]/55 focus:outline-none focus:border-[#D4622A] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="thomas@example.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#153250]/15 bg-[#FDFBF7] text-sm text-[#153250] placeholder-[#4E5A65]/55 focus:outline-none focus:border-[#D4622A] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] mb-1.5">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+44 7123 456789"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#153250]/15 bg-[#FDFBF7] text-sm text-[#153250] placeholder-[#4E5A65]/55 focus:outline-none focus:border-[#D4622A] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] mb-1.5">
                        Approximate Travel Dates or Month
                      </label>
                      <input
                        type="text"
                        value={formData.travelDates}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            travelDates: e.target.value,
                          })
                        }
                        placeholder="e.g. February 2027 (12 days)"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#153250]/15 bg-[#FDFBF7] text-sm text-[#153250] placeholder-[#4E5A65]/55 focus:outline-none focus:border-[#D4622A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E5A65] mb-1.5">
                        How can we help? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your group, preferred pace, wildlife or coastal interests, or any questions..."
                        className="w-full px-4 py-3.5 rounded-xl border border-[#153250]/15 bg-[#FDFBF7] text-sm text-[#153250] placeholder-[#4E5A65]/55 focus:outline-none focus:border-[#D4622A] transition-colors"
                      />
                    </div>

                    {status === "error" && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                        {feedback}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-[#FDFBF7] bg-[#153250] hover:bg-[#D4622A] transition-colors duration-300 disabled:opacity-50"
                      >
                        <span>
                          {status === "loading"
                            ? "Sending Message..."
                            : "Send Message to Galle Office"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </EditorialReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
