"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CURRENCIES, CurrencyCode, site } from "@/lib/site";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Travel Guide" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const CURRENCY_CODES: CurrencyCode[] = ["USD", "EUR", "GBP", "LKR"];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const prevPathname = React.useRef(pathname);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
          className="fixed inset-0 z-50 lg:hidden bg-[var(--ocean-dark)] text-white flex flex-col justify-between px-5 py-5 pb-safe overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <span className="font-serif text-xl font-semibold text-white">
                  {site.brandName}
                </span>
                <p className="text-[13px] text-white/80">
                  {site.city}, {site.country}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center text-white rounded-full border border-white/25 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-4" aria-label="Mobile navigation links">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between min-h-[48px] py-2.5 border-b border-white/10 font-serif text-xl font-medium transition-colors ${
                      isActive ? "text-[var(--gold)]" : "text-white hover:text-[var(--gold)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            {/* Currency Toggle */}
            <div className="mt-6">
              <p className="text-[13px] font-medium text-white/80 mb-2">
                Approximate currency
              </p>
              <div className="grid grid-cols-4 gap-2">
                {CURRENCY_CODES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={`min-h-[44px] rounded-lg text-[14px] font-semibold border transition-colors ${
                      currency === code
                        ? "bg-white text-[var(--ocean-dark)] border-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {CURRENCIES[code].code}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/plan-your-trip"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full font-semibold text-[16px] text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] transition-colors"
              >
                Plan your trip
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/15 space-y-1.5 text-[14px] text-white/85">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-white hover:text-[var(--gold)]"
            >
              WhatsApp: {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="block hover:text-white">
              {site.email}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
