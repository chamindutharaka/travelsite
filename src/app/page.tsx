import React from "react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TrustBar } from "@/components/home/TrustBar";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { HomePlannerTeaser } from "@/components/planner/HomePlannerTeaser";
import { InteractiveMap } from "@/components/home/InteractiveMap";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { IncludedStandard } from "@/components/home/IncludedStandard";
import { SeasonalJourneys } from "@/components/home/SeasonalJourneys";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { LatestBlog } from "@/components/home/LatestBlog";
import { FaqSection } from "@/components/home/FaqSection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";

export default function HomePage() {
  return (
    <>
      {/* Hero with single performance-aware video (poster on mobile/reduced-motion/save-data) */}
      <HeroSlider />

      {/* Truthful Trust Bar */}
      <TrustBar />

      {/* Welcome (sand) */}
      <WelcomeSection />

      {/* How We Work (sand-deep) */}
      <WhyUsSection />

      {/* Compact Trip Planner Teaser (sand) */}
      <HomePlannerTeaser />

      {/* Interactive Sri Lanka Map (sand-deep) */}
      <InteractiveMap />

      {/* Popular Ready-Made & Customisable Tours (sand) */}
      <FeaturedTours />

      {/* Included as Standard — single dark ocean contrast section */}
      <IncludedStandard />

      {/* Seasonal Journeys (sand-deep) */}
      <SeasonalJourneys />

      {/* Real 4K Sri Lanka Video Showcase (sand) */}
      <VideoShowcase />

      {/* Travel Guide / Blog (sand-deep) */}
      <LatestBlog />

      {/* FAQ + FAQPage JSON-LD (sand) */}
      <FaqSection />

      {/* Guest Reviews (hidden automatically when /src/data/reviews.ts is empty) */}
      <ReviewsCarousel />

      {/* Final Call to Action Banner */}
      <FinalCtaBanner />
    </>
  );
}
