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
      className="py-16 sm:py-24 lg:py-28 bg-[#FDFBF7] text-[#153250]"
      aria-labelledby="blog-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <EditorialReveal className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3.5">
              <span className="w-7 h-[1px] bg-[#D4622A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E5A65]">
                Field Notes &amp; Journal
              </span>
            </div>
            <h2
              id="blog-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#153250] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Stories from Sri Lanka.</LineRise>
            </h2>
            <p className="mt-3.5 text-[15px] sm:text-base text-[#4E5A65] max-w-[52ch] leading-[1.7]">
              Field notes from our Galle travel designers: where to go, when to travel, and the details we wish every visitor knew before arriving.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#153250] hover:text-[#D4622A] transition-colors hover-underline"
            >
              <span>All stories</span>
              <span>→</span>
            </Link>
          </EditorialReveal>
        </div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <article className="group h-full flex flex-col justify-between">
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#153250] mb-4 sm:mb-5"
                  >
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </Link>

                  <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-wider text-[#4E5A65] mb-2">
                    <span className="text-[#D4622A] font-medium">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-[1.45rem] font-normal text-[#153250] group-hover:text-[#D4622A] transition-colors duration-300 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mt-2.5 text-[14.5px] text-[#4E5A65] line-clamp-3 leading-[1.68]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#153250]/10 flex items-center justify-between text-xs text-[#4E5A65]">
                  <span>{post.publishedAt}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium text-[#153250] group-hover:text-[#D4622A] transition-colors"
                  >
                    Read guide →
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
