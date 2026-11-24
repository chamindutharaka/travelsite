import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--sand)] text-[var(--ink)] py-20">
      <Container size="narrow" className="text-center space-y-5">
        <p className="text-[14px] font-semibold text-[var(--ocean)]">
          Error 404
        </p>

        <h1 className="font-serif text-[var(--ink)]">
          We could not find that page.
        </h1>

        <p className="text-[var(--ink-muted)] mx-auto">
          The page you are looking for may have moved. You can head back to the home page, browse our Sri Lanka tours, or start planning a custom route.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold bg-[var(--ocean)] hover:bg-[var(--ocean-dark)] text-white transition-colors"
          >
            Back to Home
          </Link>

          <Link
            href="/tours"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full text-[16px] font-semibold bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </Container>
    </div>
  );
}
