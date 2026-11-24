import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { blogPosts } from "@/content/blog";
import { company } from "@/content/company";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Ceylon Holidays Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `${company.canonicalUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = getArticleSchema(post);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Parse simple markdown headings and paragraphs
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((para, idx) => {
      if (para.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-serif text-2xl font-bold text-[var(--ink)] mt-8 mb-4">
            {para.replace("### ", "")}
          </h3>
        );
      }
      if (para.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-serif text-3xl font-bold text-[var(--ink)] mt-10 mb-4">
            {para.replace("## ", "")}
          </h2>
        );
      }
      if (para.startsWith("- ")) {
        const items = para.split("\n- ").map((item) => item.replace("- ", ""));
        return (
          <ul key={idx} className="space-y-2 my-4 list-disc pl-5 text-[var(--ink-muted)] font-light">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-[var(--ink)]'>$1</strong>") }} />
            ))}
          </ul>
        );
      }
      if (para.startsWith("1. ")) {
        const items = para.split(/\n\d+\.\s/).filter(Boolean);
        return (
          <ol key={idx} className="space-y-2 my-4 list-decimal pl-5 text-[var(--ink-muted)] font-light">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-[var(--ink)]'>$1</strong>") }} />
            ))}
          </ol>
        );
      }
      return (
        <p
          key={idx}
          className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed mb-6 font-light"
          dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-[var(--ink)]'>$1</strong>") }}
        />
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="bg-[var(--sand)] py-12 sm:py-20">
        <Container size="narrow">
          {/* Back link & breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--ink-muted)] hover:text-[var(--cinnamon)] mb-6 transition-colors"
          >
            <span>← Back to all guides</span>
          </Link>

          {/* Title Header */}
          <header className="space-y-4 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--cinnamon)] block">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--ink)] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-[var(--ink-muted)] border-y border-[var(--line)] py-3">
              <span>By {post.author.name} ({post.author.role})</span>
              <span>•</span>
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span className="text-[var(--ocean)] font-semibold">{post.readTime}</span>
            </div>
          </header>

          {/* Hero Feature Image */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-12 bg-[var(--ocean-dark)] shadow-md">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[var(--line)] shadow-sm leading-relaxed">
            {renderFormattedContent(post.content)}
          </div>

          {/* Author Box & CTA */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[var(--ocean-dark)] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold)] block mb-1">
                Field Intelligence from Galle Fort
              </span>
              <h4 className="font-serif text-2xl font-bold">
                Planning a trip to Sri Lanka?
              </h4>
              <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-md font-light">
                Chat with our local travel designers to incorporate these tips into an unhurried, private custom itinerary.
              </p>
            </div>
            <Link
              href="/plan-your-trip"
              className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] shrink-0 transition-colors duration-200 shadow-md"
            >
              Start Planning →
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[var(--line)]">
              <h3 className="font-serif text-2xl font-bold text-[var(--ink)] mb-6">
                More Travel Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="p-6 rounded-2xl bg-white border border-[var(--line)] hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-[var(--cinnamon)] block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[var(--ink)] group-hover:text-[var(--ocean)] transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--cinnamon)] inline-flex items-center gap-1 transition-colors">
                      <span>Read guide</span>
                      <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
    </>
  );
}
