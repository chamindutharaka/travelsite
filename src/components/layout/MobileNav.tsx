"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { company } from "@/content/company";
import { EDITORIAL_EASE } from "@/components/motion/MotionPrimitives";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { num: "01", href: "/", label: "Home" },
  { num: "02", href: "/about", label: "About Us" },
  { num: "03", href: "/destinations", label: "Destinations" },
  { num: "04", href: "/tours", label: "Tours" },
  { num: "05", href: "/experiences", label: "Experiences" },
  { num: "06", href: "/gallery", label: "Gallery & Films" },
  { num: "07", href: "/blog", label: "Journal" },
  { num: "08", href: "/contact", label: "Contact" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const prevPathname = React.useRef(pathname);

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
          transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
          className="fixed inset-0 z-50 lg:hidden bg-[#141414] text-[#FBFAF8] flex flex-col justify-between px-6 py-6 pb-safe overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <span className="font-serif text-xl font-medium tracking-tight text-white">
                  Ceylon Holidays
                </span>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50 mt-0.5">
                  Galle · Sri Lanka
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white rounded-full border border-white/15"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="mt-6">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.03 * idx,
                      ease: EDITORIAL_EASE,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`group flex items-baseline gap-4 py-3 border-b border-white/8 transition-colors ${
                        isActive
                          ? "text-[#EF6427]"
                          : "text-white/90 hover:text-[#EF6427]"
                      }`}
                    >
                      <span className="text-[11px] font-mono text-white/40">
                        {link.num}
                      </span>
                      <span className="font-serif text-[1.45rem] font-normal leading-snug">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-7">
              <Link
                href="/plan-your-trip"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full font-medium text-sm text-[#1A1A1A] bg-[#FBFAF8] hover:bg-[#EF6427] transition-colors"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 space-y-1.5 text-xs text-white/60">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium"
              >
                {company.phoneDisplay}
              </a>
              <span>·</span>
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </div>
            <p className="text-white/45">
              {company.baseCity}, {company.region}, {company.country}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
