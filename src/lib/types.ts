export type TourCategory =
  | 'Culture'
  | 'Beach'
  | 'Adventure'
  | 'Honeymoon'
  | 'Wildlife'
  | 'Family'
  | 'Luxury';

export interface DayPlan {
  day: number;
  title: string;
  location: string;
  description: string;
  highlights: string[];
  meals: string;
  accommodationType: string;
}

export interface Tour {
  slug: string;
  title: string;
  tagline: string;
  category: TourCategory;
  durationDays: number;
  durationNights: number;
  fromPriceUsd: number; // Indicative "From $X per person"
  heroImage: string;
  overview: string;
  highlights: string[];
  routeSummary: string[];
  bestSeasons: string;
  fitnessLevel: 'Easy' | 'Moderate' | 'Active';
  included: string[];
  excluded: string[];
  itinerary: DayPlan[];
}

export interface Destination {
  slug: string;
  name: string;
  sinhalaName?: string;
  region: 'Cultural Triangle' | 'Hill Country' | 'Southern Coast' | 'East Coast' | 'Northern Peninsula' | 'Western Province';
  coordinates: { x: number; y: number }; // Relative percentage on SVG map
  tagline: string;
  shortDescription: string;
  overview: string;
  heroImage: string;
  bestMonths: string[];
  climateSummary: string;
  highlights: string[];
  nearbyPlaces: string[];
  recommendedNights: number;
}

export interface Experience {
  slug: string;
  title: string;
  category: 'Wildlife' | 'Heritage' | 'Scenic' | 'Coastal' | 'Culinary' | 'Wellness';
  duration: string;
  location: string;
  bestSeason: string;
  shortDescription: string;
  fullStory: string;
  heroImage: string;
  highlights: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  heroImage: string;
  content: string; // Markdown formatted rich article
}

export interface Review {
  id: string;
  author: string;
  country: string;
  tourTaken: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'Planning' | 'Private Guides' | 'Money & Visas' | 'Health & Safety';
}
