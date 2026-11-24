"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES, CurrencyCode, site } from "@/lib/site";

const HERO_ROUTES = new Set([
  "/",
  "/about",
  "/destinations",
  "/tours",
  "/experiences",
  "/gallery",
  "/blog",
  "/contact",
  "/plan-your-trip",
]);

const CURRENCY_CODES: CurrencyCode[] = ["USD", "EUR", "GBP", "LKR"];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const hasFullBleedHero = HERO_ROUTES.has(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Guide" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Transparent over photo/video hero, smoothly transitioning to frosted warm ivory on scroll
  const useLightBar = !hasFullBleedHero || isScrolled;

  return (
    <>
      <header
        className={`${
          hasFullBleedHero ? "fixed" : "sticky"
        } top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          useLightBar
            ? "bg-[#FBFAF8]/95 backdrop-blur-md border-b border-black/10 py-3 text-[#1A1A1A]"
            : "bg-gradient-to-b from-[#141414]/65 via-[#141414]/25 to-transparent py-4 text-white"
        }`}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Lockup */}
            <Link
              href="/"
              className="group flex flex-col justify-center min-h-[44px] rounded-sm"
            >
              <span
                className={`font-serif text-[1.25rem] sm:text-2xl font-medium tracking-[-0.02em] leading-none transition-colors duration-300 ${
                  useLightBar
                    ? "text-[#1A1A1A] group-hover:text-[#EF6427]"
                    : "text-white group-hover:text-white/85"
                }`}
              >
                {site.brandName}
              </span>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.22em] mt-1 transition-colors duration-300 ${
                  useLightBar ? "text-[#5C5852]" : "text-white/75"
                }`}
              >
                {site.city} · {site.country}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 min-h-[44px] inline-flex items-center text-[14px] font-medium tracking-[-0.005em] transition-colors duration-300 hover-underline ${
                      useLightBar
                        ? isActive
                          ? "text-[#EF6427]"
                          : "text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                        : isActive
                        ? "text-[#EF6427]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Currency + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <label htmlFor="desktop-currency" className="sr-only">
                Display currency (approximate)
              </label>
              <select
                id="desktop-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                title="Approximate currency conversion"
                className={`min-h-[40px] px-2.5 py-1.5 rounded-full text-[13px] font-medium border transition-colors cursor-pointer ${
                  useLightBar
                    ? "bg-transparent border-black/15 text-[#1A1A1A]"
                    : "bg-white/10 border-white/25 text-white backdrop-blur-sm"
                }`}
              >
                {CURRENCY_CODES.map((code) => (
                  <option
                    key={code}
                    value={code}
                    className="bg-[#141414] text-white"
                  >
                    {CURRENCIES[code].code}
                  </option>
                ))}
              </select>

              <Link
                href="/plan-your-trip"
                className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full text-[14px] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  useLightBar
                    ? "bg-[#1A1A1A] text-[#FBFAF8] hover:bg-[#EF6427]"
                    : "bg-[#FBFAF8] text-[#1A1A1A] hover:bg-[#EF6427] hover:text-white"
                }`}
              >
                Plan your trip
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/plan-your-trip"
                className={`inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                  useLightBar
                    ? "bg-[#1A1A1A] text-[#FBFAF8]"
                    : "bg-[#FBFAF8] text-[#1A1A1A]"
                }`}
              >
                Plan trip
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
                  useLightBar
                    ? "text-[#1A1A1A] hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
