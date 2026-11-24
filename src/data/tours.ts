import { Tour, TourCategory, ComfortLevel } from "@/lib/types";
import { tours as legacyTours } from "@/data/existingTours";

const ALL_YEAR_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SOUTH_WEST_MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const EAST_COAST_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep"];
const CULTURAL_MONTHS = ["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Sep"];

interface LegacyEnrichment {
  categories: TourCategory[];
  comfortLevel: ComfortLevel;
  bestMonths: string[];
  suitableFor: string[];
  gallery: string[];
  popularRank: number;
}

const legacyEnrichments: Record<string, LegacyEnrichment> = {
  "grand-ceylon-heritage": {
    categories: ["Culture", "Wildlife", "Beach"],
    comfortLevel: "Comfortable",
    bestMonths: ALL_YEAR_MONTHS,
    suitableFor: ["First-timers", "Couples", "Culture lovers"],
    gallery: [
      "/images/tours/grand-ceylon-heritage.jpg",
      "/images/destinations/sigiriya.jpg",
      "/images/destinations/galle.jpg",
    ],
    popularRank: 1,
  },
  "wild-ceylon-safari": {
    categories: ["Wildlife", "Adventure"],
    comfortLevel: "Comfortable",
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Jul", "Aug", "Sep"],
    suitableFor: ["Wildlife lovers", "Photographers", "Families"],
    gallery: [
      "/images/tours/wild-ceylon-safari.jpg",
      "/images/destinations/yala.jpg",
      "/images/experiences/elephant-gathering-minneriya.jpg",
    ],
    popularRank: 2,
  },
  "serendipity-honeymoon": {
    categories: ["Honeymoon", "Luxury", "Beach"],
    comfortLevel: "Luxury",
    bestMonths: SOUTH_WEST_MONTHS,
    suitableFor: ["Honeymooners", "Couples"],
    gallery: [
      "/images/tours/serendipity-honeymoon.jpg",
      "/images/destinations/mirissa.jpg",
      "/images/destinations/ella.jpg",
    ],
    popularRank: 3,
  },
  "southern-coast-surf-solitude": {
    categories: ["Beach", "Adventure"],
    comfortLevel: "Comfortable",
    bestMonths: SOUTH_WEST_MONTHS,
    suitableFor: ["Beach lovers", "Surfers", "Couples"],
    gallery: [
      "/images/tours/southern-coast-surf-solitude.jpg",
      "/images/destinations/unawatuna.jpg",
      "/images/destinations/galle.jpg",
    ],
    popularRank: 5,
  },
  "highland-tea-trails-peaks": {
    categories: ["Adventure", "Culture"],
    comfortLevel: "Comfortable",
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Jul", "Aug", "Sep"],
    suitableFor: ["Hikers", "Train lovers", "Couples"],
    gallery: [
      "/images/tours/highland-tea-trails-peaks.jpg",
      "/images/destinations/nuwara-eliya.jpg",
      "/images/destinations/ella.jpg",
    ],
    popularRank: 6,
  },
  "island-family-expedition": {
    categories: ["Family", "Wildlife", "Beach"],
    comfortLevel: "Comfortable",
    bestMonths: ALL_YEAR_MONTHS,
    suitableFor: ["Families with kids", "Multi-generation groups"],
    gallery: [
      "/images/tours/island-family-expedition.jpg",
      "/images/experiences/elephant-gathering-minneriya.jpg",
      "/images/destinations/unawatuna.jpg",
    ],
    popularRank: 7,
  },
  "royal-ceylon-luxury-sanctuary": {
    categories: ["Luxury", "Culture", "Beach"],
    comfortLevel: "Luxury",
    bestMonths: SOUTH_WEST_MONTHS,
    suitableFor: ["Luxury travellers", "Couples", "Anniversaries"],
    gallery: [
      "/images/tours/royal-ceylon-luxury-sanctuary.jpg",
      "/images/destinations/galle.jpg",
      "/images/hero/hero-tea-country.jpg",
    ],
    popularRank: 8,
  },
  "cultural-triangle-sigiriya": {
    categories: ["Culture"],
    comfortLevel: "Comfortable",
    bestMonths: CULTURAL_MONTHS,
    suitableFor: ["History buffs", "Short breaks", "Couples"],
    gallery: [
      "/images/tours/cultural-triangle-sigiriya.jpg",
      "/images/destinations/sigiriya.jpg",
      "/images/destinations/anuradhapura.jpg",
    ],
    popularRank: 9,
  },
};

const enrichedLegacyTours: Tour[] = legacyTours.map((tour) => {
  const extra = legacyEnrichments[tour.slug];
  return {
    ...tour,
    categories: extra?.categories ?? [tour.category],
    comfortLevel: extra?.comfortLevel ?? "Comfortable",
    bestMonths: extra?.bestMonths ?? ALL_YEAR_MONTHS,
    suitableFor: extra?.suitableFor ?? ["Couples", "Private groups"],
    gallery: extra?.gallery ?? [tour.heroImage],
    popularRank: extra?.popularRank ?? 10,
    isDayExperience: false,
  };
});

const newTours: Tour[] = [
  // 1. Galle & Southern Coast Escape (3 days)
  {
    slug: "galle-southern-coast-escape",
    title: "Galle & Southern Coast Escape",
    tagline: "Historic fort walls, calm swimming bays, and easy southern pace in three days.",
    category: "Beach",
    categories: ["Beach", "Culture"],
    comfortLevel: "Comfortable",
    durationDays: 3,
    durationNights: 2,
    fromPriceUsd: 520, // TODO(confirm price)
    heroImage: "/images/destinations/galle.jpg",
    gallery: [
      "/images/destinations/galle.jpg",
      "/images/destinations/unawatuna.jpg",
      "/images/destinations/mirissa.jpg",
    ],
    overview:
      "A relaxed three-day break based in Galle. Walk the 17th-century Dutch ramparts, swim in sheltered coral coves at Unawatuna, and visit a cinnamon estate near Koggala Lake.",
    highlights: [
      "Guided sunset walk along Galle Fort ramparts and lighthouse",
      "Calm reef swimming and snorkelling at Unawatuna and Thalpe",
      "Boat trip across Koggala Lake to a small cinnamon island",
      "Fresh southern seafood dinner inside a restored courtyard",
    ],
    routeSummary: ["Galle Fort", "Unawatuna", "Koggala Lake", "Mirissa"],
    bestSeasons: "November to April",
    bestMonths: SOUTH_WEST_MONTHS,
    suitableFor: ["Short breaks", "Couples", "Beach lovers"],
    popularRank: 4,
    fitnessLevel: "Easy",
    included: [
      "Private air-conditioned car and English-speaking driver",
      "2 nights in a handpicked Galle or coastal boutique hotel with breakfast",
      "Guided Galle Fort heritage walk and Koggala Lake boat trip",
      "Fuel, highway tolls, and parking fees",
    ],
    excluded: [
      "International flights and Sri Lanka ETA visa",
      "Lunches, dinners, and drinks unless stated",
      "Personal expenses and optional tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Galle & Fort Rampart Walk",
        location: "Galle Fort",
        description:
          "Transfer south along the expressway to Galle. Check in, rest after your journey, and join a local guide in the late afternoon to walk the Dutch fort walls at sunset.",
        highlights: ["Galle Lighthouse", "Flag Rock Bastion", "Old Dutch streets"],
        meals: "None",
        accommodationType: "Boutique Galle Fort hotel",
      },
      {
        day: 2,
        title: "Koggala Lake & Southern Coves",
        location: "Koggala & Unawatuna",
        description:
          "Take a morning wooden boat across Koggala Lake to see cinnamon peeling and quiet bird islands. Spend the afternoon swimming at Unawatuna or Dalawella reef.",
        highlights: ["Cinnamon island visit", "Coral reef swimming", "Sunset beach dinner"],
        meals: "Breakfast",
        accommodationType: "Boutique Galle Fort hotel",
      },
      {
        day: 3,
        title: "Mirissa Coast & Departure",
        location: "Mirissa / Colombo",
        description:
          "Enjoy a slow breakfast or an optional morning whale boat in season. Drive back to Colombo or your next Sri Lanka stop.",
        highlights: ["Coconut Tree Hill", "Southern coastal drive"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 2. Sigiriya, Kandy & Tea Country Express (5 days)
  {
    slug: "sigiriya-kandy-tea-country-express",
    title: "Sigiriya, Kandy & Tea Country Express",
    tagline: "Ancient rock fort, sacred temple, and green tea hills in five well-paced days.",
    category: "Culture",
    categories: ["Culture", "Adventure"],
    comfortLevel: "Comfortable",
    durationDays: 5,
    durationNights: 4,
    fromPriceUsd: 890, // TODO(confirm price)
    heroImage: "/images/hero/hero-sigiriya.jpg",
    gallery: [
      "/images/hero/hero-sigiriya.jpg",
      "/images/destinations/kandy.jpg",
      "/images/hero/hero-tea-country.jpg",
    ],
    overview:
      "Ideal if you have five days and want Sri Lanka's classic interior highlights without rushing. Climb Sigiriya at dawn, visit Dambulla's painted caves, explore Kandy's temple, and finish in cool tea country.",
    highlights: [
      "Early-morning climb up Sigiriya Lion Rock before midday heat",
      "UNESCO-listed Dambulla Cave Temple murals and statues",
      "Evening drumming ceremony at the Temple of the Tooth in Kandy",
      "Working Ceylon tea factory visit and tasting in Nuwara Eliya",
    ],
    routeSummary: ["Airport", "Sigiriya", "Dambulla", "Kandy", "Nuwara Eliya"],
    bestSeasons: "January to April & July to September",
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Jul", "Aug", "Sep"],
    suitableFor: ["First-timers", "Short breaks", "Couples"],
    popularRank: 11,
    fitnessLevel: "Moderate",
    included: [
      "Private air-conditioned car and English-speaking driver",
      "4 nights in comfortable 4-star hotels with daily breakfast",
      "Airport pickup and drop-off, fuel, tolls, and parking",
      "Working tea factory tour and tasting",
    ],
    excluded: [
      "International flights and visa",
      "Monument entrance tickets (can be added on request)",
      "Lunches, dinners, and personal tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Airport to Sigiriya",
        location: "Sigiriya",
        description:
          "Meet your driver at Colombo Airport and head northeast to the Cultural Triangle. Relax by the pool amidst forest views.",
        highlights: ["Private airport welcome", "Forest lodge check-in"],
        meals: "None",
        accommodationType: "Nature hotel near Sigiriya",
      },
      {
        day: 2,
        title: "Sigiriya Rock Fortress & Village Lunch",
        location: "Sigiriya",
        description:
          "Start early to climb Sigiriya Rock while temperatures are cool. Later, enjoy a home-cooked rice and curry lunch in a nearby village.",
        highlights: ["Sigiriya Lion Rock", "Water gardens", "Village clay-pot lunch"],
        meals: "Breakfast & Lunch",
        accommodationType: "Nature hotel near Sigiriya",
      },
      {
        day: 3,
        title: "Dambulla Cave Temple to Kandy",
        location: "Kandy",
        description:
          "Visit the golden rock caves of Dambulla en route to Kandy. In the evening, attend the sacred drumming service at the Temple of the Tooth.",
        highlights: ["Dambulla Cave Temple", "Kandy Lake", "Temple of the Tooth"],
        meals: "Breakfast",
        accommodationType: "Hillside Kandy hotel",
      },
      {
        day: 4,
        title: "Peradeniya Gardens & Nuwara Eliya Tea Hills",
        location: "Nuwara Eliya",
        description:
          "Walk through the Royal Botanical Gardens before climbing into the cool central highlands. Stop at a working tea factory for a guided tasting.",
        highlights: ["Botanical Gardens", "Ramboda Waterfall", "Tea estate tasting"],
        meals: "Breakfast",
        accommodationType: "Colonial highland hotel",
      },
      {
        day: 5,
        title: "Highland Morning & Return to Colombo",
        location: "Colombo / Airport",
        description:
          "Enjoy crisp mountain air before driving back down to Colombo or the airport for your onward flight.",
        highlights: ["Lake Gregory", "Scenic highland descent"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 3. Ella & Hill Country by Train (5 days)
  {
    slug: "ella-hill-country-by-train",
    title: "Ella & Hill Country by Train",
    tagline: "Scenic highland railway, misty viewpoints, waterfalls, and easy mountain walks.",
    category: "Adventure",
    categories: ["Adventure", "Culture"],
    comfortLevel: "Comfortable",
    durationDays: 5,
    durationNights: 4,
    fromPriceUsd: 950, // TODO(confirm price)
    heroImage: "/images/experiences/scenic-blue-train.jpg",
    gallery: [
      "/images/experiences/scenic-blue-train.jpg",
      "/images/destinations/ella.jpg",
      "/images/destinations/nuwara-eliya.jpg",
    ],
    overview:
      "Built around Sri Lanka's famous hill-country railway. Ride the scenic train from Nanu Oya to Ella while your driver carries your luggage by road, hike Little Adam's Peak, and explore Horton Plains.",
    highlights: [
      "Reserved-seat hill country train ride from Nanu Oya to Ella",
      "Sunrise walk to Little Adam's Peak and Nine Arches Bridge",
      "Guided hike across Horton Plains to World's End cliff",
      "Single-estate Ceylon tea tasting in Hatton or Nuwara Eliya",
    ],
    routeSummary: ["Kandy", "Nuwara Eliya", "Horton Plains", "Ella"],
    bestSeasons: "January to April & June to September",
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep"],
    suitableFor: ["Train lovers", "Hikers", "Couples", "Friends"],
    popularRank: 12,
    fitnessLevel: "Active",
    included: [
      "Private vehicle and driver (carries luggage while you ride the train)",
      "4 nights in boutique hill-country hotels with daily breakfast",
      "Reserved train tickets (subject to Sri Lanka Railways release)",
      "Fuel, tolls, parking, and airport transfers",
    ],
    excluded: [
      "International flights and visa",
      "Horton Plains park ticket (paid at gate or added on request)",
      "Lunches, dinners, and personal tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo to Kandy",
        location: "Kandy",
        description:
          "Travel into the lower hills to Kandy. Walk by the lake and visit the Temple of the Tooth in the evening.",
        highlights: ["Kandy Lake", "Temple of the Tooth"],
        meals: "None",
        accommodationType: "Boutique Kandy hotel",
      },
      {
        day: 2,
        title: "Tea Plantations of Nuwara Eliya",
        location: "Nuwara Eliya",
        description:
          "Drive through emerald tea slopes and waterfalls to Nuwara Eliya. Visit a working tea estate and enjoy fireside dining.",
        highlights: ["Tea factory visit", "Waterfalls", "Cool alpine climate"],
        meals: "Breakfast",
        accommodationType: "Highland bungalow or hotel",
      },
      {
        day: 3,
        title: "Horton Plains Dawn Walk",
        location: "Horton Plains",
        description:
          "Head out early with a picnic breakfast to walk the cloud-forest trail to World's End and Baker's Falls before mist rolls in.",
        highlights: ["World's End viewpoint", "Baker's Falls", "Sambar deer"],
        meals: "Breakfast",
        accommodationType: "Highland bungalow or hotel",
      },
      {
        day: 4,
        title: "Scenic Blue Train to Ella & Nine Arches Bridge",
        location: "Ella",
        description:
          "Board the famous blue train from Nanu Oya to Ella. Meet your driver at Ella station and walk down to Nine Arches Bridge in the afternoon.",
        highlights: ["Nanu Oya–Ella train ride", "Nine Arches Bridge", "Ella town cafes"],
        meals: "Breakfast",
        accommodationType: "Valley-view Ella lodge",
      },
      {
        day: 5,
        title: "Little Adam's Peak & Onward Transfer",
        location: "Ella / South Coast or Airport",
        description:
          "Take an easy morning hike up Little Adam's Peak for sweeping views across Ella Gap before continuing to the south coast or airport.",
        highlights: ["Little Adam's Peak", "Ravana Falls"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 4. Budget-Friendly Sri Lanka Round Trip (7 days)
  {
    slug: "budget-friendly-sri-lanka-round-trip",
    title: "Budget-Friendly Sri Lanka Round Trip",
    tagline: "Culture, hill country, wildlife safari, and beach stays at smart value.",
    category: "Culture",
    categories: ["Culture", "Wildlife", "Beach"],
    comfortLevel: "Budget",
    durationDays: 7,
    durationNights: 6,
    fromPriceUsd: 890, // TODO(confirm price)
    heroImage: "/images/tours/island-family-expedition.jpg",
    gallery: [
      "/images/tours/island-family-expedition.jpg",
      "/images/destinations/sigiriya.jpg",
      "/images/destinations/unawatuna.jpg",
    ],
    overview:
      "See Sri Lanka's highlights with a private driver while keeping costs sensible. We pick clean, friendly local guesthouses and 3-star hotels so your budget goes toward experiences rather than pricey resorts.",
    highlights: [
      "Private car and driver for the full 7-day loop",
      "Sigiriya Rock or Pidurangala sunrise viewpoint",
      "Scenic hill-country train leg and Ella waterfalls",
      "Half-day elephant safari in Udawalawe plus south-coast beach time",
    ],
    routeSummary: ["Sigiriya", "Kandy", "Ella", "Udawalawe", "Unawatuna"],
    bestSeasons: "December to April & July to August",
    bestMonths: ["Dec", "Jan", "Feb", "Mar", "Apr", "Jul", "Aug"],
    suitableFor: ["Value travellers", "Friends", "Solo travellers", "Couples"],
    popularRank: 13,
    fitnessLevel: "Moderate",
    included: [
      "Private air-conditioned car and English-speaking driver",
      "6 nights in clean, well-reviewed guesthouses & 3-star hotels with breakfast",
      "Airport transfers, fuel, tolls, and driver accommodation",
      "2nd-class reserved hill-country train tickets",
    ],
    excluded: [
      "International flights and visa",
      "Park jeeps and entrance fees (we advise exact local rates)",
      "Lunches, dinners, and tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Airport to Sigiriya",
        location: "Sigiriya",
        description: "Arrive in Colombo and drive to Sigiriya for a quiet first evening.",
        highlights: ["Airport pickup", "Countryside guesthouse"],
        meals: "None",
        accommodationType: "Local 3-star guesthouse",
      },
      {
        day: 2,
        title: "Pidurangala / Sigiriya & Dambulla",
        location: "Sigiriya & Dambulla",
        description:
          "Climb Pidurangala Rock for sunrise views of Sigiriya (or climb Sigiriya itself) and explore Dambulla Cave Temple.",
        highlights: ["Sunrise rock views", "Dambulla Caves"],
        meals: "Breakfast",
        accommodationType: "Local 3-star guesthouse",
      },
      {
        day: 3,
        title: "Kandy Cultural Highlights",
        location: "Kandy",
        description: "Travel to Kandy, stroll around the lake, and visit the Temple of the Tooth.",
        highlights: ["Kandy Lake", "Local market", "Temple of the Tooth"],
        meals: "Breakfast",
        accommodationType: "3-star Kandy hotel",
      },
      {
        day: 4,
        title: "Hill Country Train to Ella",
        location: "Ella",
        description:
          "Ride the scenic train through tea estates to Ella while your driver meets you at the station with your bags.",
        highlights: ["Highland train ride", "Nine Arches Bridge"],
        meals: "Breakfast",
        accommodationType: "Ella guesthouse",
      },
      {
        day: 5,
        title: "Udawalawe Elephant Safari",
        location: "Udawalawe",
        description:
          "Head south to Udawalawe National Park for an afternoon 4x4 safari known for reliable wild elephant sightings.",
        highlights: ["Wild elephants", "Water buffalo & eagles"],
        meals: "Breakfast",
        accommodationType: "Udawalawe eco-lodge",
      },
      {
        day: 6,
        title: "Galle Fort & Unawatuna Beach",
        location: "Unawatuna",
        description:
          "Drive to the south coast for a relaxing swim at Unawatuna and an evening walk in Galle Fort.",
        highlights: ["Unawatuna Bay", "Galle Fort sunset"],
        meals: "Breakfast",
        accommodationType: "Coastal 3-star hotel",
      },
      {
        day: 7,
        title: "Expressway Transfer to Airport",
        location: "Airport",
        description: "Direct expressway drive back to Colombo Airport for your flight home.",
        highlights: ["Southern Expressway transfer"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 5. Wildlife Weekend: Yala & Udawalawe (3 days)
  {
    slug: "wildlife-weekend-yala-udawalawe",
    title: "Wildlife Weekend: Yala & Udawalawe",
    tagline: "Three days dedicated to wild elephants, leopards, crocodiles, and birdlife.",
    category: "Wildlife",
    categories: ["Wildlife", "Adventure"],
    comfortLevel: "Comfortable",
    durationDays: 3,
    durationNights: 2,
    fromPriceUsd: 480, // TODO(confirm price)
    heroImage: "/images/destinations/yala.jpg",
    gallery: [
      "/images/destinations/yala.jpg",
      "/images/tours/wild-ceylon-safari.jpg",
      "/images/experiences/leopard-safari-yala.jpg",
    ],
    overview:
      "A focused three-day wildlife break pairing Sri Lanka's two best southern parks: Udawalawe for open-grassland elephant herds and Yala for leopards, sloth bears, and coastal lagoons.",
    highlights: [
      "Private 4x4 afternoon game drive in Udawalawe National Park",
      "Early-morning gate-open leopard safari in Yala National Park",
      "Experienced local safari driver-trackers",
      "Easy start or finish from Galle, Mirissa, or Colombo",
    ],
    routeSummary: ["Galle / Colombo", "Udawalawe", "Yala", "Galle / Colombo"],
    bestSeasons: "January to July & November to December",
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Nov", "Dec"],
    suitableFor: ["Wildlife lovers", "Photographers", "Weekend breaks"],
    popularRank: 14,
    fitnessLevel: "Easy",
    included: [
      "Private air-conditioned transfer car and driver",
      "2 nights in comfortable safari lodges with breakfast",
      "2 private 4x4 safari jeeps with local tracker (Udawalawe + Yala)",
      "All fuel, tolls, and parking",
    ],
    excluded: [
      "National park entry permits (can be pre-booked at official rates)",
      "Lunches, dinners, and drinks",
      "Optional tracker tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Drive to Udawalawe & Afternoon Safari",
        location: "Udawalawe",
        description:
          "Morning pickup from Galle or Colombo. Check into your lodge and set out in a private 4x4 jeep for an afternoon elephant safari.",
        highlights: ["Wild elephant herds", "Udawalawe Reservoir"],
        meals: "None",
        accommodationType: "Udawalawe safari lodge",
      },
      {
        day: 2,
        title: "Transfer to Yala & Afternoon Game Drive",
        location: "Yala",
        description:
          "Short scenic drive to Yala. Rest by the pool before entering Yala National Park for a late-afternoon wildlife drive.",
        highlights: ["Leopard habitat", "Painted storks & crocodiles"],
        meals: "Breakfast",
        accommodationType: "Yala safari hotel",
      },
      {
        day: 3,
        title: "Dawn Yala Safari & Return",
        location: "Yala / Galle or Airport",
        description:
          "Enter Yala at 6:00 AM when wildlife is most active. Return for brunch before driving back to Galle, Mirissa, or Colombo.",
        highlights: ["Gate-open dawn safari", "Coastal scrub wildlife"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 6. Ancient Kingdoms Short Break (4 days)
  {
    slug: "ancient-kingdoms-short-break",
    title: "Ancient Kingdoms Short Break",
    tagline: "Anuradhapura, Polonnaruwa, Sigiriya, and Dambulla in four cultural days.",
    category: "Culture",
    categories: ["Culture"],
    comfortLevel: "Comfortable",
    durationDays: 4,
    durationNights: 3,
    fromPriceUsd: 640, // TODO(confirm price)
    heroImage: "/images/destinations/anuradhapura.jpg",
    gallery: [
      "/images/destinations/anuradhapura.jpg",
      "/images/tours/grand-ceylon-heritage.jpg",
      "/images/destinations/sigiriya.jpg",
    ],
    overview:
      "A four-day deep dive into Sri Lanka's Cultural Triangle. Walk among 2,000-year-old white stupas in Anuradhapura, cycle past medieval stone carvings in Polonnaruwa, and climb Sigiriya at sunrise.",
    highlights: [
      "Sacred Jaya Sri Maha Bodhi and Ruwanwelisaya Stupa in Anuradhapura",
      "Guided cycling or car tour of Polonnaruwa's ancient ruins",
      "Sunrise ascent of Sigiriya Rock Fortress",
      "Painted Buddhist cave shrines at Dambulla",
    ],
    routeSummary: ["Anuradhapura", "Sigiriya", "Polonnaruwa", "Dambulla"],
    bestSeasons: "January to March & June to September",
    bestMonths: CULTURAL_MONTHS,
    suitableFor: ["History lovers", "Short breaks", "Solo & couples"],
    popularRank: 15,
    fitnessLevel: "Moderate",
    included: [
      "Private air-conditioned car and English-speaking driver",
      "3 nights in comfortable Cultural Triangle hotels with breakfast",
      "Bicycle rental option in Polonnaruwa",
      "Airport transfers, fuel, tolls, and parking",
    ],
    excluded: [
      "International flights and visa",
      "UNESCO heritage site entry tickets",
      "Lunches, dinners, and tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Airport to Anuradhapura",
        location: "Anuradhapura",
        description:
          "Travel north to Sri Lanka's first ancient capital. Visit the sacred Bodhi tree and Ruwanwelisaya stupa at sunset.",
        highlights: ["Jaya Sri Maha Bodhi", "Ruwanwelisaya Stupa"],
        meals: "None",
        accommodationType: "Anuradhapura heritage hotel",
      },
      {
        day: 2,
        title: "Mihintale & Transfer to Sigiriya",
        location: "Sigiriya",
        description:
          "Morning visit to Mihintale rock monastery before continuing to Sigiriya.",
        highlights: ["Mihintale hilltop steps", "Ancient monastic ponds"],
        meals: "Breakfast",
        accommodationType: "Sigiriya garden hotel",
      },
      {
        day: 3,
        title: "Sigiriya Sunrise & Polonnaruwa Ruins",
        location: "Sigiriya & Polonnaruwa",
        description:
          "Climb Sigiriya at first light. In the afternoon, explore Polonnaruwa's Gal Vihara stone Buddhas and royal palace ruins.",
        highlights: ["Sigiriya Lion Rock", "Polonnaruwa Gal Vihara"],
        meals: "Breakfast",
        accommodationType: "Sigiriya garden hotel",
      },
      {
        day: 4,
        title: "Dambulla Cave Temple & Return",
        location: "Dambulla / Colombo",
        description:
          "Visit the 2,000-year-old painted caves of Dambulla before driving back to Colombo or Kandy.",
        highlights: ["Dambulla Cave Temple"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 7. East Coast & Arugam Bay (9 days, best May-Sep)
  {
    slug: "east-coast-arugam-bay",
    title: "East Coast & Arugam Bay (May–Sep)",
    tagline: "Follow the dry summer sun to Trincomalee coral reefs, Pasikudah, and Arugam Bay surf.",
    category: "Beach",
    categories: ["Beach", "Adventure", "Wildlife"],
    comfortLevel: "Comfortable",
    durationDays: 9,
    durationNights: 8,
    fromPriceUsd: 1550, // TODO(confirm price)
    heroImage: "/images/destinations/arugam-bay.jpg",
    gallery: [
      "/images/destinations/arugam-bay.jpg",
      "/images/destinations/trincomalee.jpg",
      "/images/experiences/elephant-gathering-minneriya.jpg",
    ],
    overview:
      "While the southwest coast sees summer rain, Sri Lanka's east coast is sunny, dry, and calm. Combine Sigiriya and Minneriya elephants with Pigeon Island snorkelling in Trincomalee and surf breaks in Arugam Bay.",
    highlights: [
      "Snorkelling with reef sharks and turtles at Pigeon Island, Trincomalee",
      "Minneriya National Park elephant gathering (peak Jul–Sep)",
      "Surfing or relaxing along Arugam Bay's sunny point breaks",
      "Quiet Kumana National Park safari and Pottuvil Lagoon canoeing",
    ],
    routeSummary: ["Sigiriya", "Trincomalee", "Pasikudah", "Arugam Bay", "Ella"],
    bestSeasons: "May to September",
    bestMonths: EAST_COAST_MONTHS,
    suitableFor: ["Summer holidays", "Surfers", "Families", "Couples"],
    popularRank: 16,
    fitnessLevel: "Moderate",
    included: [
      "Private air-conditioned car and English-speaking driver",
      "8 nights in handpicked boutique & beachfront hotels with breakfast",
      "Airport pickup and drop-off, fuel, tolls, and parking",
      "Pottuvil Lagoon morning canoe trip",
    ],
    excluded: [
      "International flights and visa",
      "Park jeeps, Pigeon Island boat permit, and surf board rentals",
      "Lunches, dinners, and personal tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Airport to Sigiriya",
        location: "Sigiriya",
        description: "Arrive and transfer to the Cultural Triangle to rest.",
        highlights: ["Airport greeting", "Forest resort"],
        meals: "None",
        accommodationType: "Sigiriya boutique hotel",
      },
      {
        day: 2,
        title: "Sigiriya Rock & Minneriya Elephants",
        location: "Sigiriya & Minneriya",
        description:
          "Climb Sigiriya early and head into Minneriya National Park in the afternoon to see wild elephant herds gathering by the lake.",
        highlights: ["Sigiriya sunrise", "Minneriya elephant safari"],
        meals: "Breakfast",
        accommodationType: "Sigiriya boutique hotel",
      },
      {
        day: 3,
        title: "Drive to Trincomalee",
        location: "Trincomalee",
        description:
          "Reach the sunny northeast coast. Visit Koneswaram Temple perched above the harbour at sunset.",
        highlights: ["Nilaveli Beach", "Koneswaram cliff temple"],
        meals: "Breakfast",
        accommodationType: "Beachfront Trincomalee hotel",
      },
      {
        day: 4,
        title: "Pigeon Island Coral Reef Snorkelling",
        location: "Trincomalee",
        description:
          "Short boat ride to Pigeon Island Marine Park for calm-water snorkelling over coral reefs.",
        highlights: ["Pigeon Island", "Sea turtles & reef fish"],
        meals: "Breakfast",
        accommodationType: "Beachfront Trincomalee hotel",
      },
      {
        day: 5,
        title: "Coastal Drive to Arugam Bay",
        location: "Arugam Bay",
        description:
          "Follow the quiet east coast south past lagoons and palm groves to Arugam Bay.",
        highlights: ["East coast lagoons", "Arugam Bay sunset"],
        meals: "Breakfast",
        accommodationType: "Arugam Bay boutique beach stay",
      },
      {
        day: 6,
        title: "Surf Lessons & Lagoon Canoeing",
        location: "Arugam Bay",
        description:
          "Optional morning surf lesson at Baby Point or Peanut Farm, followed by a peaceful canoe trip on Pottuvil Lagoon.",
        highlights: ["Surfing", "Pottuvil Lagoon wildlife"],
        meals: "Breakfast",
        accommodationType: "Arugam Bay boutique beach stay",
      },
      {
        day: 7,
        title: "Kumana National Park Safari",
        location: "Arugam Bay & Kumana",
        description:
          "Explore uncrowded Kumana National Park, known for migratory waterbirds, elephants, and quiet leopard tracks.",
        highlights: ["Kumana wetlands", "Uncrowded wildlife trails"],
        meals: "Breakfast",
        accommodationType: "Arugam Bay boutique beach stay",
      },
      {
        day: 8,
        title: "Arugam Bay to Ella Hills",
        location: "Ella",
        description:
          "Leave the coast and climb into cool mountain air in Ella for your final night.",
        highlights: ["Nine Arches Bridge", "Mountain views"],
        meals: "Breakfast",
        accommodationType: "Ella hillside hotel",
      },
      {
        day: 9,
        title: "Ella to Airport",
        location: "Airport",
        description: "Scenic drive down to Colombo Airport for your departure.",
        highlights: ["Private airport transfer"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // 8. Ayurveda & Wellness Retreat (7 days)
  {
    slug: "ayurveda-wellness-retreat",
    title: "Ayurveda & Wellness Retreat",
    tagline: "Seven restorative days of traditional Sri Lankan Ayurveda, yoga, and calm ocean air.",
    category: "Wellness",
    categories: ["Wellness", "Luxury", "Beach"],
    comfortLevel: "Luxury",
    durationDays: 7,
    durationNights: 6,
    fromPriceUsd: 1350, // TODO(confirm price)
    heroImage: "/images/experiences/ayurveda-wellness-retreat.jpg",
    gallery: [
      "/images/experiences/ayurveda-wellness-retreat.jpg",
      "/images/destinations/unawatuna.jpg",
      "/images/destinations/galle.jpg",
    ],
    overview:
      "Slow down completely on Sri Lanka's southern coast. Stay at a quiet, accredited Ayurveda retreat near Galle or Bentota with daily doctor consultations, tailored herbal treatments, fresh dosha-balanced meals, and gentle yoga.",
    highlights: [
      "Personal consultation with a qualified Ayurvedic physician",
      "Daily herbal oil massages, steam baths, and restorative therapies",
      "Fresh, tailor-made Ayurvedic meals and herbal teas included",
      "Gentle morning yoga and an optional relaxed afternoon in Galle Fort",
    ],
    routeSummary: ["Airport", "Southern Coast Ayurveda Retreat", "Galle Fort"],
    bestSeasons: "Year-round (best Nov–Apr on the south coast)",
    bestMonths: ALL_YEAR_MONTHS,
    suitableFor: ["Solo travellers", "Couples", "Rest & recovery"],
    popularRank: 17,
    fitnessLevel: "Easy",
    included: [
      "Private airport transfers both ways",
      "6 nights at a vetted southern-coast Ayurveda retreat",
      "Full board Ayurvedic meals and herbal infusions",
      "Initial doctor consultation and daily personalised treatments",
    ],
    excluded: [
      "International flights and visa",
      "Optional off-site excursions beyond Galle Fort",
      "Personal expenses and tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Airport Pickup & Doctor Consultation",
        location: "South Coast Retreat",
        description:
          "Private transfer south to your coastal sanctuary. Meet the resident Ayurvedic doctor to shape your weekly treatment and meal plan.",
        highlights: ["Dosha consultation", "Herbal welcome drink"],
        meals: "Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 2,
        title: "Gentle Yoga & First Treatments",
        location: "South Coast Retreat",
        description:
          "Begin with morning breathwork and stretching, followed by warm herbal oil therapy and quiet reading by the pool.",
        highlights: ["Morning yoga", "Abhyanga oil therapy"],
        meals: "Breakfast, Lunch & Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 3,
        title: "Herbal Steam & Coastal Walks",
        location: "South Coast Retreat",
        description:
          "Continue your bespoke therapies with herbal steam baths and an unhurried sunset walk along the sand.",
        highlights: ["Herbal steam bath", "Beach sunset walk"],
        meals: "Breakfast, Lunch & Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 4,
        title: "Mid-Week Review & Cooking Demo",
        location: "South Coast Retreat",
        description:
          "Check in with your physician to fine-tune treatments and join an optional session on balancing spices at home.",
        highlights: ["Ayurvedic nutrition talk", "Restorative massage"],
        meals: "Breakfast, Lunch & Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 5,
        title: "Shirodhara & Galle Fort Stroll",
        location: "South Coast & Galle",
        description:
          "Experience calming warm-oil Shirodhara therapy in the morning, with an optional gentle evening visit to Galle Fort.",
        highlights: ["Shirodhara therapy", "Optional Galle Fort visit"],
        meals: "Breakfast, Lunch & Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 6,
        title: "Final Rejuvenation & Closing Consult",
        location: "South Coast Retreat",
        description:
          "Enjoy your final treatments and receive take-home lifestyle and nutrition notes from your doctor.",
        highlights: ["Closing consultation", "Herbal bath"],
        meals: "Breakfast, Lunch & Dinner",
        accommodationType: "Ayurveda coastal sanctuary",
      },
      {
        day: 7,
        title: "Relaxed Transfer to Airport",
        location: "Airport",
        description: "Private expressway transfer back to Colombo Airport.",
        highlights: ["Expressway airport drop-off"],
        meals: "Breakfast",
        accommodationType: "Departure",
      },
    ],
  },

  // --- DAY EXPERIENCES FROM GALLE (4) ---

  // 9. Galle Fort Heritage Walk (Half day)
  {
    slug: "galle-fort-heritage-walk",
    title: "Galle Fort Heritage Walk",
    tagline: "Walk 400 years of Portuguese, Dutch, and Sri Lankan history with a local Galle host.",
    category: "Culture",
    categories: ["Culture"],
    comfortLevel: "Comfortable",
    durationDays: 1,
    durationNights: 0,
    durationLabel: "Half day",
    isDayExperience: true,
    fromPriceUsd: 45, // TODO(confirm price)
    heroImage: "/images/experiences/galle-fort-ramparts.jpg",
    gallery: [
      "/images/experiences/galle-fort-ramparts.jpg",
      "/images/destinations/galle.jpg",
    ],
    overview:
      "Explore Galle Fort beyond the main streets with a knowledgeable local host. Hear stories of spice traders, maritime bastions, old courtyards, and daily life inside Sri Lanka's living UNESCO fort.",
    highlights: [
      "Private 3-hour walking tour timed for cooler morning or late-afternoon light",
      "Galle Lighthouse, Flag Rock, Dutch Reformed Church, and quiet back lanes",
      "King coconut or Ceylon tea stop at a local fort cafe",
      "Easy hotel pickup anywhere in Galle or Unawatuna",
    ],
    routeSummary: ["Galle Fort Clock Tower", "Dutch Reformed Church", "Lighthouse", "Flag Rock"],
    bestSeasons: "Year-round",
    bestMonths: ALL_YEAR_MONTHS,
    suitableFor: ["All ages", "Couples", "Families", "Solo travellers"],
    popularRank: 18,
    fitnessLevel: "Easy",
    included: [
      "Private English-speaking local heritage host",
      "Bottled water and a local tea or king coconut refreshment",
      "Pickup and drop-off within Galle or Unawatuna",
    ],
    excluded: [
      "Optional museum tickets",
      "Meals and personal shopping",
    ],
    itinerary: [
      {
        day: 1,
        title: "Guided Heritage Walk Inside Galle Fort",
        location: "Galle Fort",
        description:
          "Meet at the Clock Tower or your hotel. Spend three unhurried hours exploring bastions, historic churches, old mansions, and sunset viewpoints along the sea wall.",
        highlights: ["Clock Tower", "Lighthouse", "Maritime stories", "Sunset ramparts"],
        meals: "Refreshment included",
        accommodationType: "Day experience (no overnight)",
      },
    ],
  },

  // 10. Mirissa Whale Watching (Nov-Apr, Half day)
  {
    slug: "mirissa-whale-watching-day-trip",
    title: "Mirissa Whale Watching (Nov–Apr)",
    tagline: "Early-morning boat trip from Galle to spot blue whales and dolphins off Mirissa.",
    category: "Wildlife",
    categories: ["Wildlife", "Beach"],
    comfortLevel: "Comfortable",
    durationDays: 1,
    durationNights: 0,
    durationLabel: "Half day",
    isDayExperience: true,
    fromPriceUsd: 85, // TODO(confirm price)
    heroImage: "/images/experiences/blue-whale-expedition.jpg",
    gallery: [
      "/images/experiences/blue-whale-expedition.jpg",
      "/images/destinations/mirissa.jpg",
    ],
    overview:
      "Depart Galle early for Mirissa harbour to join a licensed, respectful whale-watching vessel. Between November and April, blue whales, sperm whales, and pods of spinner dolphins travel close to the southern shelf.",
    highlights: [
      "Private return transfer from Galle or Unawatuna to Mirissa harbour",
      "Licensed whale-watching boat following marine safety guidelines",
      "Light breakfast and drinking water on board",
      "Back in Galle by early afternoon with time for the beach",
    ],
    routeSummary: ["Galle", "Mirissa Harbour", "Southern Deep Trench", "Galle"],
    bestSeasons: "November to April",
    bestMonths: SOUTH_WEST_MONTHS,
    suitableFor: ["Wildlife lovers", "Families", "Couples"],
    popularRank: 19,
    fitnessLevel: "Easy",
    included: [
      "Private return car transfer from Galle / Unawatuna",
      "Boat ticket on a vetted, licensed Mirissa operator",
      "Light breakfast box and water on board",
    ],
    excluded: [
      "Personal motion-sickness medication",
      "Lunch and optional crew tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dawn Whale Watching off Mirissa",
        location: "Mirissa",
        description:
          "5:45 AM pickup from Galle to reach Mirissa harbour for the 6:30 AM sailing. Spend 3–4 hours offshore looking for blue whales and dolphins before returning to your hotel.",
        highlights: ["Blue whale sightings (seasonal)", "Spinner dolphins", "Ocean sunrise"],
        meals: "Light breakfast on board",
        accommodationType: "Day experience (no overnight)",
      },
    ],
  },

  // 11. Sinharaja Rainforest Day Trip (Full day)
  {
    slug: "sinharaja-rainforest-day-trip",
    title: "Sinharaja Rainforest Day Trip",
    tagline: "Guided forest walk in Sri Lanka's last primary UNESCO rainforest, departing Galle.",
    category: "Wildlife",
    categories: ["Wildlife", "Adventure"],
    comfortLevel: "Comfortable",
    durationDays: 1,
    durationNights: 0,
    durationLabel: "Full day",
    isDayExperience: true,
    fromPriceUsd: 110, // TODO(confirm price)
    heroImage: "/images/tours/highland-tea-trails-peaks.jpg",
    gallery: [
      "/images/tours/highland-tea-trails-peaks.jpg",
      "/images/destinations/ella.jpg",
    ],
    overview:
      "Drive inland from Galle into the lush, mist-draped canopy of Sinharaja Forest Reserve. Walk with a licensed forest naturalist to spot endemic birds, purple-faced langurs, giant squirrels, and clear jungle streams.",
    highlights: [
      "Private return transport from Galle or south-coast hotels",
      "Licensed rainforest naturalist guide inside Sinharaja UNESCO Reserve",
      "High chance to spot endemic birds, lizards, and monkeys",
      "Fresh home-style Sri Lankan rice and curry lunch near the forest edge",
    ],
    routeSummary: ["Galle", "Deniyaya / Kudawa Gate", "Sinharaja Rainforest", "Galle"],
    bestSeasons: "December to April & August to September",
    bestMonths: ["Dec", "Jan", "Feb", "Mar", "Apr", "Aug", "Sep"],
    suitableFor: ["Nature lovers", "Birdwatchers", "Active travellers"],
    popularRank: 20,
    fitnessLevel: "Moderate",
    included: [
      "Private air-conditioned car and driver from Galle",
      "Licensed Sinharaja rainforest guide and leech socks",
      "Traditional local lunch and bottled water",
    ],
    excluded: [
      "Forest reserve entry ticket (paid at gate or pre-arranged)",
      "Personal snacks and optional guide tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Full-Day Sinharaja Rainforest Walk",
        location: "Sinharaja Forest Reserve",
        description:
          "Early morning pickup from Galle (about 2 hours' drive). Spend 4 hours walking shaded forest trails with a naturalist, enjoy a village lunch, and return to Galle by late afternoon.",
        highlights: ["Endemic birds", "Rainforest waterfalls", "Village lunch"],
        meals: "Lunch included",
        accommodationType: "Day experience (no overnight)",
      },
    ],
  },

  // 12. Cooking Class & Spice Garden (Half day)
  {
    slug: "cooking-class-spice-garden-galle",
    title: "Cooking Class & Spice Garden",
    tagline: "Market visit, spice tour, and hands-on clay-pot Sri Lankan curry cooking in Galle.",
    category: "Culture",
    categories: ["Culture"],
    comfortLevel: "Comfortable",
    durationDays: 1,
    durationNights: 0,
    durationLabel: "Half day",
    isDayExperience: true,
    fromPriceUsd: 60, // TODO(confirm price)
    heroImage: "/images/experiences/galle-curry-culinary-masterclass.jpg",
    gallery: [
      "/images/experiences/galle-curry-culinary-masterclass.jpg",
      "/images/destinations/galle.jpg",
    ],
    overview:
      "Learn how Sri Lankan rice and curry really comes together. Visit Galle's colourful vegetable market, smell fresh cinnamon, cardamom, and curry leaves in a local garden, then cook 5–6 dishes in clay pots and sit down for lunch.",
    highlights: [
      "Guided visit to Galle's morning produce market",
      "Walk through a local spice and herb garden",
      "Hands-on cooking of 5–6 traditional curries and coconut sambol",
      "Full feast lunch plus printed recipes to cook at home",
    ],
    routeSummary: ["Galle Market", "Local Spice Garden", "Galle Home Kitchen"],
    bestSeasons: "Year-round",
    bestMonths: ALL_YEAR_MONTHS,
    suitableFor: ["Food lovers", "Families", "Couples", "Rainy-day activity"],
    popularRank: 21,
    fitnessLevel: "Easy",
    included: [
      "Return tuk-tuk or car transfer within Galle / Unawatuna",
      "Market tour, all fresh ingredients, and hands-on cooking class",
      "Full lunch, tea, and take-home recipe sheet",
    ],
    excluded: [
      "Alcoholic drinks and optional tips",
    ],
    itinerary: [
      {
        day: 1,
        title: "Market Tour, Spice Garden & Clay-Pot Cooking",
        location: "Galle",
        description:
          "Start at 9:30 AM with a lively market walk to pick fresh vegetables and spices. Head to our partner home kitchen to grate fresh coconut, roast curry spices, cook over clay pots, and enjoy lunch together.",
        highlights: ["Fresh market produce", "Coconut sambol", "Clay-pot curries"],
        meals: "Full lunch & Ceylon tea",
        accommodationType: "Day experience (no overnight)",
      },
    ],
  },
];

export const tours: Tour[] = [...enrichedLegacyTours, ...newTours];
