import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0C1F33] focus:text-[#E5A952] focus:font-medium focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      Skip to main content
    </a>
  );
}
