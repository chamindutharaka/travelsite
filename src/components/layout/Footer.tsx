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
      className="bg-[#141414] text-[#FBFAF8] border-t border-white/10 pb-20 lg:pb-0"
      role="contentinfo"
    >
      <div className="py-16 sm:py-22">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#FBFAF8]">
                  {site.brandName}
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-[#FBFAF8]/60 mt-1">
                  {site.city} · {site.country}
                </span>
              </Link>

              <p className="text-[15px] text-[#FBFAF8]/75 leading-relaxed">
                Private Sri Lanka journeys planned from Galle. Pick a ready-made route or change every stop, hotel, and pace to fit your trip.
              </p>

              {site.sltdaNumber && (
                <p className="text-[13.5px] text-[#FBFAF8]/65 border-t border-white/10 pt-3">
                  SLTDA Registration: {site.sltdaNumber}
                </p>
              )}
            </div>

            {/* Explore */}
            <div className="lg:col-span-2 space-y-3.5">
              <h3 className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-[#EF6427]">
                Explore
              </h3>
              <ul className="space-y-2.5 text-[14.5px] text-[#FBFAF8]/75">
                <li><Link href="/tours" className="hover:text-white transition-colors">Tours &amp; Day Trips</Link></li>
                <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
                <li><Link href="/plan-your-trip" className="text-[#FBFAF8] hover:text-[#EF6427] font-medium transition-colors">Plan Your Trip</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Photos &amp; Videos</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Travel Guide</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-[#EF6427]">
                Popular Places
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14.5px] text-[#FBFAF8]/75">
                <li><Link href="/destinations/galle" className="hover:text-white transition-colors">Galle</Link></li>
                <li><Link href="/destinations/sigiriya" className="hover:text-white transition-colors">Sigiriya</Link></li>
                <li><Link href="/destinations/ella" className="hover:text-white transition-colors">Ella</Link></li>
                <li><Link href="/destinations/yala" className="hover:text-white transition-colors">Yala</Link></li>
                <li><Link href="/destinations/kandy" className="hover:text-white transition-colors">Kandy</Link></li>
                <li><Link href="/destinations/mirissa" className="hover:text-white transition-colors">Mirissa</Link></li>
                <li><Link href="/destinations/nuwara-eliya" className="hover:text-white transition-colors">Nuwara Eliya</Link></li>
                <li><Link href="/destinations/arugam-bay" className="hover:text-white transition-colors">Arugam Bay</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3.5">
              <h3 className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-[#EF6427]">
                Talk to Our Galle Team
              </h3>
              <ul className="space-y-2.5 text-[14.5px] text-[#FBFAF8]/75">
                <li>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#FBFAF8] hover:text-[#EF6427] transition-colors"
                  >
                    WhatsApp: {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                    {site.email}
                  </a>
                </li>
                {site.streetAddress && (
                  <li className="text-[14px] text-[#FBFAF8]/70">{site.streetAddress}</li>
                )}
                <li className="text-[13.5px] text-[#FBFAF8]/60">{site.hours}</li>
                <li className="text-[13.5px] text-[#FBFAF8]/70">
                  Typical reply: {site.responseTime}
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#FBFAF8]">
                Seasonal Sri Lanka travel tips
              </h4>
              <p className="text-[15px] text-[#FBFAF8]/70">
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
                  className="flex-1 min-h-[48px] px-5 py-3 text-[15px] rounded-full bg-white/10 border border-white/20 text-[#FBFAF8] placeholder-[#FBFAF8]/50 focus:bg-white focus:text-[#1A1A1A] focus:placeholder-[#5C5852] transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="min-h-[48px] px-7 py-3 text-[15px] font-medium rounded-full bg-[#FBFAF8] text-[#141414] hover:bg-[#EF6427] hover:text-white transition-colors duration-300 shrink-0 disabled:opacity-60"
                >
                  Subscribe
                </button>
              </form>
              {newsletterStatus === "success" && (
                <p className="text-[14px] text-[#EF6427] mt-2" role="status">
                  {newsletterMessage}
                </p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-[14px] text-rose-300 mt-2" role="alert">
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal */}
      <div className="py-5 border-t border-white/10 text-[13.5px] text-[#FBFAF8]/60">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {site.brandName}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {site.facebookUrl && (
                <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Facebook
                </a>
              )}
              {site.instagramUrl && (
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              )}
              {site.tripAdvisorUrl && (
                <a href={site.tripAdvisorUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TripAdvisor
                </a>
              )}
              {site.googleReviewsUrl && (
                <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Google Reviews
                </a>
              )}
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
