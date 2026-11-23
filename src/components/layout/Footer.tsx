"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { company } from "@/content/company";

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
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage("Thank you — you are on our seasonal Sri Lanka list.");
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer
      className="bg-[#0B1724] text-[#DCE3EA] border-t border-white/10"
      role="contentinfo"
    >
      <div className="py-14 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#E5A952] transition-colors">
                  Ceylon Holidays
                </span>
                <span className="block text-[10px] uppercase tracking-[0.24em] text-white/50 mt-1">
                  Galle · Sri Lanka
                </span>
              </Link>

              <p className="text-white/65 text-sm leading-[1.7] max-w-sm">
                A Sri Lankan destination management company building private, tailor-made journeys across the island. One itinerary at a time, shaped around how you like to travel.
              </p>

              <p className="text-xs text-white/45 border-t border-white/10 pt-4 max-w-sm leading-relaxed">
                Registered with the Sri Lanka Tourism Development Authority ({company.sltdaRegistration})
              </p>
            </div>

            {/* Navigate */}
            <div className="lg:col-span-2 space-y-3.5">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A952]">
                Navigate
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link href="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
                <li><Link href="/tours" className="hover:text-white transition-colors">Tours</Link></li>
                <li><Link href="/plan-your-trip" className="hover:text-[#E5A952] transition-colors">Plan Your Trip</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery &amp; Films</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A952]">
                Destinations
              </h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/75">
                <li><Link href="/destinations/sigiriya" className="hover:text-white transition-colors">Sigiriya</Link></li>
                <li><Link href="/destinations/ella" className="hover:text-white transition-colors">Ella</Link></li>
                <li><Link href="/destinations/galle" className="hover:text-white transition-colors">Galle</Link></li>
                <li><Link href="/destinations/yala" className="hover:text-white transition-colors">Yala</Link></li>
                <li><Link href="/destinations/kandy" className="hover:text-white transition-colors">Kandy</Link></li>
                <li><Link href="/destinations/mirissa" className="hover:text-white transition-colors">Mirissa</Link></li>
                <li><Link href="/destinations/nuwara-eliya" className="hover:text-white transition-colors">Nuwara Eliya</Link></li>
                <li><Link href="/destinations/unawatuna" className="hover:text-white transition-colors">Unawatuna</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="sm:col-span-2 lg:col-span-3 space-y-3.5">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E5A952]">
                Galle Office
              </h3>
              <ul className="space-y-2.5 text-sm text-white/75">
                <li>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#E5A952] font-medium transition-colors"
                  >
                    WhatsApp {company.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`} className="hover:text-white transition-colors">
                    {company.email}
                  </a>
                </li>
                <li className="text-white/55 text-xs leading-relaxed pt-1">
                  {company.address}
                  <span className="block mt-1">{company.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-1.5">
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-white">
                Seasonal letters from Galle.
              </h4>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-md">
                Occasional notes on monsoon timing, quiet coastlines, and places worth knowing. Never spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 text-sm rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E5A952] transition-colors"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-7 py-3 text-sm font-medium rounded-full bg-[#FDFBF7] text-[#122334] hover:bg-[#E5A952] transition-colors shrink-0 disabled:opacity-50"
                >
                  Subscribe
                </button>
              </form>
              {newsletterStatus === "success" && (
                <p className="text-xs text-emerald-300 mt-2">{newsletterMessage}</p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-xs text-rose-300 mt-2">{newsletterMessage}</p>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Legal */}
      <div className="py-6 pb-20 sm:pb-6 border-t border-white/10 text-xs text-white/45">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href={company.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
