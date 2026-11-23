import React from "react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { IncludedStandard } from "@/components/home/IncludedStandard";
import { MultiStepPlanner } from "@/components/planner/MultiStepPlanner";
import { InteractiveMap } from "@/components/home/InteractiveMap";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { EditorialInterlude } from "@/components/home/EditorialInterlude";
import { SignatureMoments } from "@/components/home/SignatureMoments";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { SeasonalJourneys } from "@/components/home/SeasonalJourneys";
import { LatestBlog } from "@/components/home/LatestBlog";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { FinalCtaBanner } from "@/components/home/FinalCtaBanner";

export default function HomePage() {
  return (
    <>
      {/* 1. Full-Viewport Editorial Hero Slider with 4K Film Trigger */}
      <HeroSlider />

      {/* 2. Welcome Story & Staggered Dual Photography */}
      <WelcomeSection />

      {/* 3. Why Ceylon Holidays: 6 Hairline Principles & Island Facts */}
      <WhyUsSection />

      {/* 4. Included as Standard Dark Strip */}
      <IncludedStandard />

      {/* 5. Multi-Step Trip Planner (7 Steps + WhatsApp Instant Link) */}
      <MultiStepPlanner />

      {/* 6. Interactive Sri Lanka SVG Map with 13 Pins & Info Drawer */}
      <InteractiveMap />

      {/* 7. Featured Sample Journeys with Animated Category Filters */}
      <FeaturedTours />

      {/* 8. Full-Bleed Editorial Interlude ("Sri Lanka Through Our Eyes") */}
      <EditorialInterlude />

      {/* 9. Signature Moments Numbered Horizontal Rail */}
      <SignatureMoments />

      {/* 10. Real 4K Sri Lanka Video Showcase */}
      <VideoShowcase />

      {/* 11. Seasonal Journeys Matrix */}
      <SeasonalJourneys />

      {/* 12. Stories from Sri Lanka (Blog) */}
      <LatestBlog />

      {/* 13. Guest Reviews (Hidden when reviews.ts is empty) */}
      <ReviewsCarousel />

      {/* 14. Full-Bleed Final Call to Action Banner */}
      <FinalCtaBanner />
    </>
  );
}
