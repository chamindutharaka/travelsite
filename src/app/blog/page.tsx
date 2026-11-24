import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { blogPosts } from "@/content/blog";
import { company } from "@/content/company";
import { StaggerGrid, StaggerItem } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Sri Lanka Travel Journal & Field Notes",
  description:
    "Field-tested travel advice from our team in Galle: Sri Lanka monsoon guides, the scenic Kandy to Ella train booking secrets, and safari comparisons.",
  alternates: {
    canonical: `${company.canonicalUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div className="bg-[#FBFAF8] text-[#1A1A1A]">
      <PageHero
        image="/images/blog/the-kandy-to-ella-train-guide.jpg"
        imageAlt="Sri Lankan highland train winding through green tea hills"
        eyebrow="Field Notes from Galle"
        title="Sri Lanka Travel Journal"
        subtitle="Honest, locally informed guidance on monsoons, highland train bookings, wildlife safaris, and cultural etiquette from our travel designers."
      />

      <section className="py-16 sm:py-24">
        <Container size="wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="group h-full flex flex-col justify-between bg-white rounded-2xl border border-[#1A1A1A]/10 overflow-hidden hover:shadow-[0_16px_40px_rgba(26,26,26,0.08)] transition-shadow duration-500">
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]"
                    >
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#141414]/80 text-[#FBFAF8] backdrop-blur-sm">
                        {post.category}
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#5C5852]">
                        <span>{post.publishedAt}</span>
                        <span>·</span>
                        <span className="text-[#EF6427] font-medium">
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl font-normal text-[#1A1A1A] group-hover:text-[#EF6427] transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-[14px] text-[#5C5852] line-clamp-3 leading-[1.68]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 border-t border-[#1A1A1A]/8 bg-[#FBFAF8]/60 flex items-center justify-between text-xs">
                    <span className="text-[#5C5852] font-mono">
                      By {post.author.name}
                    </span>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#EF6427] transition-colors"
                    >
                      <span>Read</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </div>
  );
}
