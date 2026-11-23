export interface SeasonGuide {
  id: string;
  name: string;
  tagline: string;
  months: string;
  keyRegions: string[];
  weatherHighlights: string;
  recommendedTours: string[];
  wildlifeSpecial: string;
}

export const seasons: SeasonGuide[] = [
  {
    id: "south-west-season",
    name: "The Classic Season (South & West Coasts)",
    tagline: "Golden beaches, calm sapphire seas & clear hill country days",
    months: "December – April",
    keyRegions: ["Galle & Unawatuna", "Mirissa & Weligama", "Colombo", "Bentota", "Cultural Triangle", "Ella & Nuwara Eliya"],
    weatherHighlights:
      "Sunny, dry and warm along the south and west coasts. Ocean waters are calm and ideal for swimming, snorkeling, and boat safaris. Hill country mornings are crisp and misty.",
    recommendedTours: ["grand-ceylon-heritage", "southern-solitude-luxury", "hill-country-odyssey"],
    wildlifeSpecial: "Prime blue whale and sperm whale watching season off Mirissa and Dondra Head.",
  },
  {
    id: "east-coast-season",
    name: "The Sunlit East Season",
    tagline: "Pristine white sand bays, world-class surf & elephant congregations",
    months: "May – September",
    keyRegions: ["Trincomalee & Nilaveli", "Pasikudah", "Arugam Bay", "Cultural Triangle", "Jaffna"],
    weatherHighlights:
      "While the southwest experiences monsoon showers, the entire East Coast basks in radiant sunshine and crystal-calm turquoise waters, perfect for diving and quiet beach getaways.",
    recommendedTours: ["wild-ceylon-safari", "cultural-triangle-sigiriya", "island-wide-discovery"],
    wildlifeSpecial: "The Great Elephant Gathering at Minneriya National Park peaks between August and September.",
  },
  {
    id: "shoulder-transition",
    name: "The Inter-Monsoon & Verdant Greens",
    tagline: "Lush tea carpets, quieter ancient temples & private sanctuaries",
    months: "October – November",
    keyRegions: ["Cultural Triangle", "Tea Country", "Kandy", "Yala National Park"],
    weatherHighlights:
      "Afternoon tropical downpours refresh the island's rainforests and waterfalls. Rivers flow in full majesty, tourist numbers are at their lowest, and boutique heritage villas offer ultimate tranquility.",
    recommendedTours: ["tea-trails-wellness", "cultural-triangle-sigiriya"],
    wildlifeSpecial: "Migratory birds arrive in flocks at Bundala and wetlands across the south.",
  },
];
