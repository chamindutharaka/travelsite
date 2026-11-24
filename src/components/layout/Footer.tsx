"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage("Thanks for joining. We will send seasonal travel tips only.");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.error || "Could not subscribe. Please try again.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer
      className="bg-[var(--ocean-dark)] text-white border-t border-white/15 pb-20 lg:pb-0"
      role="contentinfo"
    >
      <div className="py-14 sm:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                  {site.brandName}
                </span>
                <span className="block text-[13px] font-medium text-white/80 mt-0.5">
                  {site.city}, {site.country}
                </span>
              </Link>

              <p className="text-[15px] text-white/85 leading-relaxed">
                Private Sri Lanka journeys planned from Galle. Pick a ready-made route or change every stop, hotel, and pace to fit your trip.
              </p>

              {site.sltdaNumber && (
                <p className="text-[14px] text-white/80 border-t border-white/15 pt-3">
                  SLTDA Registration: {site.sltdaNumber}
                </p>
              )}
            </div>

            {/* Explore */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--gold)]">
                Explore
              </h3>
              <ul className="space-y-2 text-[15px] text-white/85">
                <li><Link href="/tours" className="hover:text-white hover:underline">Tours &amp; Day Trips</Link></li>
                <li><Link href="/destinations" className="hover:text-white hover:underline">Destinations</Link></li>
                <li><Link href="/experiences" className="hover:text-white hover:underline">Experiences</Link></li>
                <li><Link href="/plan-your-trip" className="hover:text-[var(--gold)] font-medium">Plan Your Trip</Link></li>
                <li><Link href="/gallery" className="hover:text-white hover:underline">Photos &amp; Videos</Link></li>
                <li><Link href="/blog" className="hover:text-white hover:underline">Travel Guide</Link></li>
                <li><Link href="/about" className="hover:text-white hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white hover:underline">Contact</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--gold)]">
                Popular Places
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-white/85">
                <li><Link href="/destinations/galle" className="hover:text-white hover:underline">Galle</Link></li>
                <li><Link href="/destinations/sigiriya" className="hover:text-white hover:underline">Sigiriya</Link></li>
                <li><Link href="/destinations/ella" className="hover:text-white hover:underline">Ella</Link></li>
                <li><Link href="/destinations/yala" className="hover:text-white hover:underline">Yala</Link></li>
                <li><Link href="/destinations/kandy" className="hover:text-white hover:underline">Kandy</Link></li>
                <li><Link href="/destinations/mirissa" className="hover:text-white hover:underline">Mirissa</Link></li>
                <li><Link href="/destinations/nuwara-eliya" className="hover:text-white hover:underline">Nuwara Eliya</Link></li>
                <li><Link href="/destinations/arugam-bay" className="hover:text-white hover:underline">Arugam Bay</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3">
              <h3 className="font-sans text-[14px] font-semibold text-[var(--gold)]">
                Talk to Our Galle Team
              </h3>
              <ul className="space-y-2 text-[15px] text-white/85">
                <li>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-[var(--gold)]"
                  >
                    WhatsApp: {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
                    {site.email}
                  </a>
                </li>
                {site.streetAddress && (
                  <li className="text-[14px] text-white/80">{site.streetAddress}</li>
                )}
                <li className="text-[14px] text-white/75">{site.hours}</li>
                <li className="text-[14px] text-white/80">
                  Typical reply: {site.responseTime}
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-10 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                Seasonal Sri Lanka travel tips
              </h4>
              <p className="text-[15px] text-white/80">
                Short notes on weather, wildlife seasons, and quiet beaches. Sent occasionally, never spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 min-h-[48px] px-4 py-3 text-[16px] rounded-full bg-white text-[var(--ink)] placeholder-[var(--ink-muted)]"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="min-h-[48px] px-7 py-3 text-[16px] font-semibold rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors shrink-0 disabled:opacity-60"
                >
                  Subscribe
                </button>
              </form>
              {newsletterStatus === "success" && (
                <p className="text-[14px] text-[var(--gold)] mt-2" role="status">
                  {newsletterMessage}
                </p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-[14px] text-rose-200 mt-2" role="alert">
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal */}
      <div className="py-5 border-t border-white/15 text-[14px] text-white/75">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {site.facebookUrl && (
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Facebook
                </a>
              )}
              {site.instagramUrl && (
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Instagram
                </a>
              )}
              {site.tripAdvisorUrl && (
                <a href={site.tripAdvisorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  TripAdvisor
                </a>
              )}
              {site.googleReviewsUrl && (
                <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Google Reviews
                </a>
              )}
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
