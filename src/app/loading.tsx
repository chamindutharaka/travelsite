import React from "react";
import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center bg-[var(--sand)] text-[var(--ink)] py-24"
      role="status"
      aria-live="polite"
    >
      <Container size="narrow" className="text-center space-y-4">
        <div
          className="w-10 h-10 mx-auto rounded-full border-4 border-[var(--line)] border-t-[var(--ocean)] animate-spin"
          aria-hidden="true"
        />
        <p className="text-[16px] font-medium text-[var(--ink-muted)]">
          Loading Sri Lanka travel details...
        </p>
      </Container>
    </div>
  );
}
