import { site } from "@/lib/site";
import { Tour, BlogPost, FAQ } from "@/lib/types";

export function getTravelAgencySchema() {
  const sameAs = [
    site.facebookUrl,
    site.instagramUrl,
    site.tripAdvisorUrl,
    site.googleReviewsUrl,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${site.siteUrl}/#travelagency`,
    name: site.brandName,
    description: site.description,
    url: site.siteUrl,
    telephone: site.phoneDisplay,
    email: site.email,
    currenciesAccepted: "USD, EUR, GBP, LKR",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "LK",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getTouristTripSchema(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.overview,
    touristType: tour.categories ? tour.categories.join(", ") : tour.category,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: day.title,
          description: day.description,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.fromPriceUsd,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "TravelAgency",
      name: site.brandName,
      url: site.siteUrl,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.siteUrl}${item.url}`,
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${site.siteUrl}${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: site.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${site.siteUrl}/images/hero/hero-sigiriya.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.siteUrl}/blog/${post.slug}`,
    },
  };
}

export function getFAQSchema(faqsList: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
