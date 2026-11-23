import { company } from "@/content/company";
import { Tour, BlogPost, FAQ } from "@/lib/types";

export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${company.canonicalUrl}/#travelagency`,
    name: company.name,
    legalName: company.name,
    description: company.shortDescription,
    url: company.canonicalUrl,
    telephone: company.phoneDisplay,
    email: company.email,
    priceRange: "$$$",
    currenciesAccepted: "USD, EUR, GBP, AUD, LKR",
    paymentAccepted: "Credit Card, Bank Wire Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Light House Street, Galle Fort",
      addressLocality: "Galle",
      addressRegion: "Southern Province",
      postalCode: "80000",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.0270",
      longitude: "80.2170",
    },
    sameAs: [company.facebookUrl, company.instagramUrl],
  };
}

export function getTouristTripSchema(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.overview,
    touristType: tour.category,
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
      validFrom: "2026-01-01",
    },
    provider: {
      "@type": "TravelAgency",
      name: company.name,
      url: company.canonicalUrl,
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
      item: `${company.canonicalUrl}${item.url}`,
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${company.canonicalUrl}${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: `${company.canonicalUrl}/images/hero/hero-sigiriya.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${company.canonicalUrl}/blog/${post.slug}`,
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
