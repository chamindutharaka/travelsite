"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
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
    { href: "/about", label: "About" },
    { href: "/destinations", label: "Destinations" },
    { href: "/tours", label: "Tours" },
    { href: "/experiences", label: "Experiences" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  const useLightBar = !hasFullBleedHero || isScrolled;

  return (
    <>
      <header
        className={`${
          hasFullBleedHero ? "fixed" : "sticky"
        } top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          useLightBar
            ? "bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#153250]/10 py-3 sm:py-3.5 text-[#153250]"
            : "bg-gradient-to-b from-[#0C1F33]/65 via-[#0C1F33]/25 to-transparent py-4 sm:py-5 text-white"
        }`}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Lockup */}
            <Link
              href="/"
              className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-[#D4622A] rounded-sm"
            >
              <span
                className={`font-serif text-[1.25rem] sm:text-2xl font-medium tracking-[-0.02em] leading-none transition-colors duration-300 ${
                  useLightBar
                    ? "text-[#153250] group-hover:text-[#D4622A]"
                    : "text-white group-hover:text-white/85"
                }`}
              >
                Ceylon Holidays
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.22em] mt-1 transition-colors duration-300 ${
                  useLightBar ? "text-[#4E5A65]" : "text-white/75"
                }`}
              >
                Galle · Sri Lanka
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
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
                    className={`px-3 py-1.5 text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-300 hover-underline ${
                      useLightBar
                        ? isActive
                          ? "text-[#D4622A]"
                          : "text-[#153250]/80 hover:text-[#153250]"
                        : isActive
                        ? "text-[#D4622A]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden sm:flex items-center">
              <Link
                href="/plan-your-trip"
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  useLightBar
                    ? "bg-[#153250] text-[#FDFBF7] hover:bg-[#D4622A]"
                    : "bg-[#FDFBF7] text-[#153250] hover:bg-[#D4622A] hover:text-white"
                }`}
              >
                Plan Your Trip
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/plan-your-trip"
                className={`px-3.5 py-2 text-xs font-medium rounded-full transition-colors ${
                  useLightBar
                    ? "bg-[#153250] text-[#FDFBF7]"
                    : "bg-[#FDFBF7] text-[#153250]"
                }`}
              >
                Plan Trip
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  useLightBar
                    ? "text-[#153250] hover:bg-[#153250]/5"
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
