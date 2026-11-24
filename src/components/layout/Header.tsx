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

  const isSolid = !hasFullBleedHero || isScrolled;

  return (
    <>
      <header
        className={`${
          hasFullBleedHero ? "fixed" : "sticky"
        } top-0 left-0 right-0 z-40 w-full transition-colors duration-300 ${
          isSolid
            ? "bg-[var(--ocean)] text-white border-b border-white/15 py-2.5 shadow-sm"
            : "bg-gradient-to-b from-[var(--ocean-dark)]/85 via-[var(--ocean-dark)]/45 to-transparent text-white py-3.5"
        }`}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Lockup */}
            <Link
              href="/"
              className="group flex flex-col py-1 rounded-sm min-h-[44px] justify-center"
            >
              <span className="font-serif text-[1.25rem] sm:text-[1.4rem] font-semibold tracking-[-0.02em] leading-none text-white">
                {site.brandName}
              </span>
              <span className="text-[13px] font-medium text-white/85 leading-tight mt-0.5">
                {site.city}, {site.country}
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
                    className={`px-3 py-2.5 min-h-[44px] inline-flex items-center text-[15px] font-medium transition-colors rounded-md ${
                      isActive
                        ? "text-[var(--gold)]"
                        : "text-white/90 hover:text-white hover:bg-white/10"
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
                className="min-h-[44px] px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white text-[14px] font-medium focus:bg-[var(--ocean-dark)] cursor-pointer"
              >
                {CURRENCY_CODES.map((code) => (
                  <option
                    key={code}
                    value={code}
                    className="bg-[var(--ocean-dark)] text-white"
                  >
                    {CURRENCIES[code].code}
                  </option>
                ))}
              </select>

              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full text-[16px] font-semibold bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors"
              >
                Plan your trip
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-[15px] font-semibold rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors"
              >
                Plan trip
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
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
