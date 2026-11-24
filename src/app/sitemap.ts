import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tours } from "@/data/tours";
import { destinations } from "@/content/destinations";
import { experiences } from "@/content/experiences";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/plan-your-trip`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/experiences`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((exp) => ({
    url: `${baseUrl}/experiences/${exp.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
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
