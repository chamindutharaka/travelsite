import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3 focus:bg-[var(--ocean-dark)] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
}
