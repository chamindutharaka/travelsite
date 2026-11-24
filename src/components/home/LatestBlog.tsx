"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { blogPosts } from "@/content/blog";
import {
  EditorialReveal,
  LineRise,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export function LatestBlog() {
  return (
    <section
      className="py-16 sm:py-24 lg:py-28 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="blog-heading"
    >
      <Container size="wide">
        <EditorialReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-[1px] bg-[var(--cinnamon)]" />
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                Local travel guide
              </p>
            </div>
            <h2 id="blog-heading" className="font-serif text-[var(--ink)]">
              <LineRise>Practical tips from</LineRise>
              <LineRise delay={0.08}>
                <span className="italic font-light">our Galle team.</span>
              </LineRise>
            </h2>
            <p className="text-[var(--ink-muted)]">
              Clear advice on monsoon seasons, booking the Kandy-to-Ella train, and picking the right wildlife park.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center min-h-[44px] text-[15px] font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline shrink-0"
          >
            Read all guides →
          </Link>
        </EditorialReveal>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <StaggerItem
              key={post.slug}
              className="group flex flex-col justify-between bg-[var(--surface)] rounded-2xl border border-[var(--line)] overflow-hidden transition-all duration-500 hover:border-[var(--ink)]/25 hover:shadow-[0_18px_40px_rgba(20,20,20,0.06)]"
            >
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative aspect-[16/10] bg-[var(--ocean-dark)] overflow-hidden"
                >
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </Link>

                <div className="p-6 space-y-2.5">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--cinnamon)]">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="font-serif text-[var(--ink)] leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[var(--cinnamon)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-[var(--ink-muted)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[var(--line)] flex items-center justify-between text-[14px]">
                <span className="text-[var(--ink-muted)]">{post.publishedAt}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-[var(--ink)] hover:text-[var(--cinnamon)] transition-colors hover-underline"
                >
                  Read guide →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
