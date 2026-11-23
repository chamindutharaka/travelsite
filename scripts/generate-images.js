const fs = require('fs');
const path = require('path');

const images = [
  // Hero
  { file: 'public/images/hero/hero-sigiriya.svg', title: 'Sigiriya Rock Fortress at Dawn', subtitle: 'Cultural Triangle • 5th Century Citadel', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/hero/hero-tea-country.svg', title: 'Highland Ceylon Tea Terraces', subtitle: 'Nuwara Eliya & Hatton • Misty Valleys', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/hero/hero-galle-coast.svg', title: 'Galle Fort Ramparts & Lighthouse', subtitle: 'Southern Province • Ocean Bastions', color1: '#0B131A', color2: '#EA9527' },
  
  // Destinations
  { file: 'public/images/destinations/galle.svg', title: 'Galle Fort', subtitle: 'UNESCO World Heritage • Cobblestone Lanes', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/destinations/sigiriya.svg', title: 'Sigiriya', subtitle: 'King Kasyapa’s Sky Palace', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/destinations/anuradhapura.svg', title: 'Anuradhapura', subtitle: 'Sacred Ancient Capital • Colossal Stupas', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/destinations/kandy.svg', title: 'Kandy', subtitle: 'Temple of the Sacred Tooth Relic', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/destinations/nuwara-eliya.svg', title: 'Nuwara Eliya', subtitle: 'Alpine Tea Hills & Colonial Bungalows', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/destinations/ella.svg', title: 'Ella', subtitle: 'Nine Arches Bridge & Mountain Peaks', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/destinations/yala.svg', title: 'Yala National Park', subtitle: 'Leopards, Elephants & Coastal Lagoons', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/destinations/mirissa.svg', title: 'Mirissa', subtitle: 'Blue Whales & Coconut Tree Hill', color1: '#307082', color2: '#6CA3A2' },
  { file: 'public/images/destinations/unawatuna.svg', title: 'Unawatuna', subtitle: 'Coral Lagoon & Jungle Beach', color1: '#307082', color2: '#ECE7DC' },
  { file: 'public/images/destinations/colombo.svg', title: 'Colombo', subtitle: 'Bawa Architecture & Oceanfront Dining', color1: '#0B131A', color2: '#307082' },
  { file: 'public/images/destinations/trincomalee.svg', title: 'Trincomalee', subtitle: 'Turquoise Coral Bays & Swami Rock', color1: '#307082', color2: '#6CA3A2' },
  { file: 'public/images/destinations/arugam-bay.svg', title: 'Arugam Bay', subtitle: 'World-Class Point Break Surf', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/destinations/jaffna.svg', title: 'Jaffna', subtitle: 'Nallur Kovil & Palmyrah Landscapes', color1: '#12212E', color2: '#307082' },

  // Tours
  { file: 'public/images/tours/grand-ceylon-heritage.svg', title: 'The Grand Ceylon Heritage', subtitle: '12 Days • Sigiriya, Tea Valleys & Galle', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/tours/wild-ceylon-safari.svg', title: 'Wild Ceylon Safari', subtitle: '9 Days • Yala Leopards & Mirissa Whales', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/tours/serendipity-honeymoon.svg', title: 'Serendipity Honeymoon', subtitle: '11 Days • Private Pool Villas & Tea Trails', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/tours/southern-coast-surf-solitude.svg', title: 'Southern Coast Surf & Solitude', subtitle: '8 Days • Galle to Hiriketiya', color1: '#307082', color2: '#6CA3A2' },
  { file: 'public/images/tours/highland-tea-trails-peaks.svg', title: 'Highland Odyssey', subtitle: '10 Days • Knuckles, Horton Plains & Ella', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/tours/island-family-expedition.svg', title: 'Island Family Expedition', subtitle: '12 Days • Elephants, Castles & Calm Bays', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/tours/royal-ceylon-luxury-sanctuary.svg', title: 'Royal Ceylon Luxury', subtitle: '14 Days • Relais & Châteaux & Private Villas', color1: '#0B131A', color2: '#EA9527' },
  { file: 'public/images/tours/cultural-triangle-sigiriya.svg', title: 'Cultural Triangle & Sacred Kingdoms', subtitle: '7 Days • UNESCO World Heritage Journey', color1: '#12212E', color2: '#307082' },

  // Experiences
  { file: 'public/images/experiences/scenic-blue-train.svg', title: 'Iconic Blue Highland Train', subtitle: 'Tea Gardens & Viaducts', color1: '#307082', color2: '#6CA3A2' },
  { file: 'public/images/experiences/leopard-safari-yala.svg', title: 'Dawn Leopard Safari', subtitle: 'Yala National Park', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/experiences/sigiriya-sunrise.svg', title: 'Dawn Ascent of Lion Rock', subtitle: 'Sigiriya Citadel', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/experiences/galle-fort-ramparts.svg', title: 'Sunset Ramparts Walk', subtitle: 'Galle Fort Heritage', color1: '#0B131A', color2: '#EA9527' },
  { file: 'public/images/experiences/blue-whale-expedition.svg', title: 'Ethical Blue Whale Safari', subtitle: 'Mirissa Marine Trench', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/experiences/tea-plucking-highlands.svg', title: 'Artisanal Tea Masterclass', subtitle: 'Highland Ceylon Estates', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/experiences/elephant-gathering-minneriya.svg', title: 'The Great Elephant Gathering', subtitle: 'Minneriya Reservoir', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/experiences/ayurveda-wellness-retreat.svg', title: 'Authentic Ayurveda & Herbal Care', subtitle: 'Traditional Healing', color1: '#307082', color2: '#ECE7DC' },
  { file: 'public/images/experiences/galle-curry-culinary-masterclass.svg', title: 'Southern Seafood & Claypot Cooking', subtitle: 'Galle Village Kitchens', color1: '#12212E', color2: '#EA9527' },
  { file: 'public/images/experiences/arugam-bay-surf-coastal.svg', title: 'Point Break Surfing & Lagoons', subtitle: 'Arugam Bay East Coast', color1: '#12212E', color2: '#307082' },

  // Blog
  { file: 'public/images/blog/when-to-visit-sri-lanka-monsoon-guide.svg', title: 'When to Visit Sri Lanka', subtitle: 'Honest Monsoon, Seasons & Wildlife Guide', color1: '#12212E', color2: '#307082' },
  { file: 'public/images/blog/the-kandy-to-ella-train-guide.svg', title: 'Kandy to Ella Train Guide', subtitle: 'Carriages, Booking & Scenic Views', color1: '#12212E', color2: '#6CA3A2' },
  { file: 'public/images/blog/sri-lanka-safari-comparison-yala-wilpattu-minneriya.svg', title: 'Sri Lanka Safari Comparison', subtitle: 'Yala, Wilpattu, Udawalawe & Minneriya', color1: '#12212E', color2: '#EA9527' },

  // General placeholder
  { file: 'public/images/placeholder.svg', title: 'Ceylon Holidays', subtitle: 'Private Tailor-Made Journeys', color1: '#12212E', color2: '#EA9527' },
];

function generateSvg(title, subtitle, color1, color2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="65%" stop-color="#12212E" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <radialGradient id="sun" cx="75%" cy="25%" r="55%">
      <stop offset="0%" stop-color="${color2}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${color1}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Clean Architectural Fill -->
  <rect width="1200" height="800" fill="url(#grad)" />
  <rect width="1200" height="800" fill="url(#sun)" />

  <!-- Natural Topographic Lines -->
  <path d="M 0 660 Q 350 540, 700 630 T 1200 600 L 1200 800 L 0 800 Z" fill="rgba(11,19,26,0.4)" />
  <path d="M 0 720 Q 450 650, 850 710 T 1200 680 L 1200 800 L 0 800 Z" fill="rgba(11,19,26,0.6)" />

  <!-- Clean Editorial Label -->
  <text x="600" y="325" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="5" fill="#EA9527" text-anchor="middle">CEYLON HOLIDAYS • GALLE</text>

  <!-- Title -->
  <text x="600" y="405" font-family="'Cormorant Garamond', Georgia, serif" font-size="46" font-weight="600" fill="#FFFFFF" text-anchor="middle">${title}</text>

  <!-- Subtitle -->
  <text x="600" y="455" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="17" font-weight="400" fill="#ECE7DC" text-anchor="middle">${subtitle}</text>

  <!-- Minimal Hairline Accent -->
  <line x1="560" y1="485" x2="640" y2="485" stroke="#EA9527" stroke-width="1.5" />
</svg>`;
}

images.forEach(({ file, title, subtitle, color1, color2 }) => {
  const fullPath = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, generateSvg(title, subtitle, color1, color2), 'utf8');
});

console.log(`Regenerated ${images.length} SVGs with new brand palette.`);
