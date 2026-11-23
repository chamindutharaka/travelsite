export interface TravelVideo {
  id: string;
  youtubeId: string;
  title: string;
  location: string;
  category: "Overview" | "Culture" | "Highlands" | "Wildlife" | "Coast";
  duration: string;
  description: string;
  posterImage: string;
  creator: string;
  sourceUrl: string;
}

export const travelVideos: TravelVideo[] = [
  {
    id: "unforgettable-sri-lanka",
    youtubeId: "q0rMXhbEeX0",
    title: "Unforgettable Sri Lanka — 4K Cinematic Journey",
    location: "Island-Wide Highlights",
    category: "Overview",
    duration: "2:25",
    description:
      "A sweeping 4K visual introduction across Sri Lanka's ancient rock citadels, emerald tea hills, wild national parks, and palm-lined southern shores.",
    posterImage: "/images/hero/hero-sigiriya.jpg",
    creator: "Black eye captures",
    sourceUrl: "https://www.youtube.com/watch?v=q0rMXhbEeX0",
  },
  {
    id: "sigiriya-drone",
    youtubeId: "2ncMwa-zkUc",
    title: "Sigiriya Lion Rock Fortress From Above",
    location: "Cultural Triangle",
    category: "Culture",
    duration: "2:30",
    description:
      "Aerial 4K drone footage rising over King Kasyapa's 5th-century sky palace, royal water gardens, and the surrounding emerald jungle canopy.",
    posterImage: "/images/experiences/sigiriya-sunrise.jpg",
    creator: "Shehan Muthugala",
    sourceUrl: "https://www.youtube.com/watch?v=2ncMwa-zkUc",
  },
  {
    id: "nine-arch-bridge-ella",
    youtubeId: "MEF5iQg5_nM",
    title: "Nine Arches Bridge & Highland Blue Train",
    location: "Ella, Hill Country",
    category: "Highlands",
    duration: "1:47",
    description:
      "Watch the iconic hill-country train glide across the colonial stone viaduct nestled deep within Ella's misty tea estates and jungle valleys.",
    posterImage: "/images/experiences/scenic-blue-train.jpg",
    creator: "Martin Solhaugen",
    sourceUrl: "https://www.youtube.com/watch?v=MEF5iQg5_nM",
  },
  {
    id: "yala-wildlife-safari",
    youtubeId: "w2I3c1f-N0Q",
    title: "Yala National Park — Wild Leopard & Elephant Safari",
    location: "Yala, Southern Wilderness",
    category: "Wildlife",
    duration: "5:51",
    description:
      "Venture deep into Sri Lanka's premier coastal wilderness for real encounters with elusive Sri Lankan leopards, wild elephants, and vibrant birdlife.",
    posterImage: "/images/destinations/yala.jpg",
    creator: "Destination SRI LANKA",
    sourceUrl: "https://www.youtube.com/watch?v=w2I3c1f-N0Q",
  },
  {
    id: "galle-fort-aerial",
    youtubeId: "TAkNR87Qly8",
    title: "Historic Galle Dutch Fort & Southern Coastline",
    location: "Galle Fort, Southern Province",
    category: "Coast",
    duration: "3:40",
    description:
      "Soar above our home base in Galle Fort—17th-century coral ramparts, the iconic white lighthouse, colonial rooftops, and turquoise Indian Ocean swells.",
    posterImage: "/images/hero/hero-galle-coast.jpg",
    creator: "Yuval Dax",
    sourceUrl: "https://www.youtube.com/watch?v=TAkNR87Qly8",
  },
  {
    id: "scenic-sri-lanka-4k",
    youtubeId: "NGoCQ3HyxQs",
    title: "Sri Lanka 4K — Scenic Aerial Relaxation Film",
    location: "Highlands, Coast & Heritage",
    category: "Overview",
    duration: "60:46",
    description:
      "An unhurried 4K aerial voyage over Sri Lanka's waterfalls, misty mountain passes, golden southern coves, and tranquil ancient temples.",
    posterImage: "/images/hero/hero-tea-country.jpg",
    creator: "Scenic Relaxation",
    sourceUrl: "https://www.youtube.com/watch?v=NGoCQ3HyxQs",
  },
];
