import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { blogPosts } from "@/content/blog";

export function LatestBlog() {
  return (
    <section
      className="py-16 sm:py-24 bg-[var(--sand-deep)] text-[var(--ink)] border-y border-[var(--line)]"
      aria-labelledby="blog-heading"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-[14px] font-semibold text-[var(--ocean)]">
              Local travel guide
            </p>
            <h2 id="blog-heading" className="font-serif text-[var(--ink)]">
              Practical tips from our Galle team.
            </h2>
            <p className="text-[var(--ink-muted)]">
              Clear advice on monsoon seasons, booking the Kandy-to-Ella train, and picking the right wildlife park.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center min-h-[44px] text-[16px] font-semibold text-[var(--ocean)] hover:underline shrink-0"
          >
            Read all guides →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between bg-[var(--surface)] rounded-2xl border border-[var(--line)] overflow-hidden"
            >
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative aspect-[16/10] bg-[var(--sand)] overflow-hidden"
                >
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-5 sm:p-6 space-y-2.5">
                  <p className="text-[13px] font-semibold text-[var(--ocean)]">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="font-serif text-[var(--ink)] leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[var(--ocean)]">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-[var(--ink-muted)] line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 border-t border-[var(--line)] flex items-center justify-between text-[14px]">
                <span className="text-[var(--ink-muted)]">{post.publishedAt}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-[var(--cinnamon)] hover:underline"
                >
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
