import { MetadataRoute } from "next";
import { company } from "@/content/company";
import { tours } from "@/content/tours";
import { destinations } from "@/content/destinations";
import { experiences } from "@/content/experiences";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = company.canonicalUrl;
  const now = new Date();

  // Static Pages
  const staticRoutes = [
    "",
    "/about",
    "/destinations",
    "/tours",
    "/experiences",
    "/gallery",
    "/blog",
    "/contact",
    "/plan-your-trip",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Tours
  const tourRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Destinations
  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic Experiences
  const experienceRoutes = experiences.map((exp) => ({
    url: `${baseUrl}/experiences/${exp.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Blog Posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...tourRoutes,
    ...destinationRoutes,
    ...experienceRoutes,
    ...blogRoutes,
  ];
}
