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
            ? "bg-[#FBFAF8]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 py-3 sm:py-3.5 text-[#1A1A1A]"
            : "bg-gradient-to-b from-[#141414]/65 via-[#141414]/25 to-transparent py-4 sm:py-5 text-white"
        }`}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Lockup */}
            <Link
              href="/"
              className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-[#EF6427] rounded-sm"
            >
              <span
                className={`font-serif text-[1.25rem] sm:text-2xl font-medium tracking-[-0.02em] leading-none transition-colors duration-300 ${
                  useLightBar
                    ? "text-[#1A1A1A] group-hover:text-[#EF6427]"
                    : "text-white group-hover:text-white/85"
                }`}
              >
                Ceylon Holidays
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.22em] mt-1 transition-colors duration-300 ${
                  useLightBar ? "text-[#5C5852]" : "text-white/75"
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

            {/* Desktop Right CTA */}
            <div className="hidden sm:flex items-center">
              <Link
                href="/plan-your-trip"
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  useLightBar
                    ? "bg-[#1A1A1A] text-[#FBFAF8] hover:bg-[#EF6427]"
                    : "bg-[#FBFAF8] text-[#1A1A1A] hover:bg-[#EF6427] hover:text-white"
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
                    ? "bg-[#1A1A1A] text-[#FBFAF8]"
                    : "bg-[#FBFAF8] text-[#1A1A1A]"
                }`}
              >
                Plan Trip
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  useLightBar
                    ? "text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
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
