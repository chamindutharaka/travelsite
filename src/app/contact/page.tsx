"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";

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
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setStatus("success");
        setFeedback(
          `Thank you! Our team in ${site.city} has your message and typically replies ${site.responseTime}.`
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
        setFeedback(data.error || "Something went wrong. Please message us on WhatsApp.");
      }
    } catch {
      setStatus("error");
      setFeedback("Could not send right now. Please message us directly on WhatsApp.");
    }
  };

  return (
    <div className="bg-[var(--sand)] text-[var(--ink)]">
      <PageHero
        image="/images/destinations/mirissa.jpg"
        imageAlt="Palm-lined coastline of southern Sri Lanka near Galle"
        eyebrow={`Based in ${site.city}, ${site.country}`}
        title="Contact our Galle team"
        subtitle={`Ask a quick question, request a custom quote, or chat on WhatsApp. We typically reply ${site.responseTime}.`}
      />

      <section className="py-14 sm:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Direct Contact Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-[var(--sand-deep)] border border-[var(--line)] space-y-6">
                <h2 className="font-serif text-[var(--ink)] border-b border-[var(--line)] pb-3">
                  Direct contact
                </h2>

                <ul className="space-y-4 text-[15px] text-[var(--ink-muted)]">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[var(--ocean)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="block text-[var(--ink)]">Location</strong>
                      <span>
                        {site.streetAddress || `${site.city}, ${site.region}, ${site.country}`}
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[var(--ocean)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="block text-[var(--ink)]">Phone &amp; WhatsApp</strong>
                      <a
                        href={`tel:${site.phone}`}
                        className="text-[var(--ocean)] font-semibold hover:underline"
                      >
                        {site.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[var(--ocean)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="block text-[var(--ink)]">Email</strong>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-[var(--ocean)] font-semibold hover:underline"
                      >
                        {site.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[var(--ocean)] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="block text-[var(--ink)]">Hours</strong>
                      <span>{site.hours}</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-[var(--line)] space-y-3">
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--leaf)] hover:bg-[var(--ocean-dark)] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <Link
                    href="/plan-your-trip"
                    className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full text-[16px] font-semibold text-[var(--ocean)] bg-[var(--surface)] border-2 border-[var(--ocean)] hover:bg-[var(--ocean)] hover:text-white transition-colors"
                  >
                    Use 5-step trip planner
                  </Link>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--line)] space-y-6">
                <div className="border-b border-[var(--line)] pb-4 space-y-1">
                  <h2 className="font-serif text-[var(--ink)]">Send a message</h2>
                  <p className="text-[15px] text-[var(--ink-muted)]">
                    Tell us what you have in mind. No deposit or commitment needed.
                  </p>
                </div>

                {status === "success" ? (
                  <div
                    className="p-6 rounded-xl bg-[var(--sand)] border border-[var(--line)] text-center space-y-3"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-[var(--leaf)] text-white flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-[var(--ink)]">Message sent</h3>
                    <p className="text-[15px] text-[var(--ink-muted)] mx-auto">
                      {feedback}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-honeypot">Leave blank</label>
                      <input
                        id="contact-honeypot"
                        type="text"
                        tabIndex={-1}
                        value={formData.honeypot}
                        onChange={(e) =>
                          setFormData({ ...formData, honeypot: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                      >
                        Your full name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          Email address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          WhatsApp / phone *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-dates"
                        className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                      >
                        Approximate dates or month (optional)
                      </label>
                      <input
                        id="contact-dates"
                        type="text"
                        placeholder="e.g. February, 10 days"
                        value={formData.travelDates}
                        onChange={(e) =>
                          setFormData({ ...formData, travelDates: e.target.value })
                        }
                        className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                      >
                        How can we help? *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                      />
                    </div>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="p-3.5 rounded-xl bg-[var(--sand-deep)] border border-[var(--cinnamon)] text-[15px] text-[var(--ink)]"
                      >
                        {feedback}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full text-[16px] font-semibold text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] transition-colors disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending..." : "Send message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
