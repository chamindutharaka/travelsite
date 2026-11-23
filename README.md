# Ceylon Holidays — Luxury & Bespoke Sri Lanka Private Journeys

Production-ready, high-performance website for **Ceylon Holidays**, a private tour company based in Galle, Sri Lanka. Built with Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, and Resend.

---

## 🌴 Brand & Business Overview
- **Company**: Ceylon Holidays
- **Operations Base**: Galle Fort, Southern Province, Sri Lanka
- **Hotline / WhatsApp**: `+94 70 215 6828` ([https://wa.me/94702156828](https://wa.me/94702156828))
- **Email**: `hello@ceylonholidays.com`
- **SLTDA Registration**: `SLTDA/SQA/TA/XXXXX` *(Clearly marked placeholder for official license)*
- **Positioning**: Private, tailor-made journeys across Sri Lanka. Every route is crafted after a consultation—never rigid group bus tours.
- **Accurate Seasonality**: South and west coasts Dec–Apr; East coast May–Sep; Minneriya elephant gathering Aug–Sep; Whale watching Nov–Apr.

---

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19 and TypeScript (Strict).
- **Styling**: Tailwind CSS with custom tropical-editorial design tokens (`forest`, `gold`, `sand`, `terracotta`, `charcoal`).
- **Typography**: `next/font/google` (*Cormorant Garamond* for serif editorial headlines; *Plus Jakarta Sans* for clean, modern interface and body text).
- **Motion**: Framer Motion respecting `prefers-reduced-motion`.
- **Forms & Validation**: React Hook Form + Zod validation with honeypot anti-spam fields and sliding window rate limiting.
- **Email**: Resend API route handlers (`/api/plan`, `/api/contact`, `/api/newsletter`).
- **SEO & Schema**: Native Metadata API, canonical URLs on the single production domain, Dynamic OpenGraph image (`/opengraph-image`), XML sitemap (`/sitemap.xml`), `robots.txt`, and rich JSON-LD schemas (`TravelAgency`, `TouristTrip`, `BreadcrumbList`, `Article`, `FAQPage`).

---

## 📁 Architecture & File Layout

```
├── .env.example                          # Environment variable template
├── .env.local                            # Local development configuration
├── public/
│   ├── images/                           # High-res SVG vector placeholders
│   │   ├── hero/                         # Hero slider background slides
│   │   ├── destinations/                 # 13 Sri Lanka destinations
│   │   ├── tours/                        # 8 sample tour packages
│   │   ├── experiences/                  # 10 signature experiences
│   │   └── blog/                         # Editorial cover images
└── src/
    ├── app/
    │   ├── layout.tsx                    # Root layout, Google Fonts, TravelAgency JSON-LD
    │   ├── page.tsx                      # Complete 15-section Home Page
    │   ├── not-found.tsx                 # Custom 404 page
    │   ├── sitemap.ts                    # Dynamic XML sitemap generator
    │   ├── robots.ts                     # Search engine crawler instructions
    │   ├── opengraph-image.tsx           # Dynamic Edge OpenGraph card generator
    │   ├── about/page.tsx                # Galle heritage, values, team & SLTDA license
    │   ├── destinations/
    │   │   ├── page.tsx                  # All 13 destinations with seasonal guide
    │   │   └── [slug]/page.tsx           # Deep dive destination guide & matching tours
    │   ├── tours/
    │   │   ├── page.tsx                  # 8 sample tours with category filter tabs
    │   │   └── [slug]/page.tsx           # Full day-by-day accordion, route, pricing & inquiry
    │   ├── experiences/
    │   │   ├── page.tsx                  # Signature moments catalog
    │   │   └── [slug]/page.tsx           # Story, duration, best season, highlights
    │   ├── gallery/page.tsx              # Filterable photo grid with Lightbox modal
    │   ├── blog/
    │   │   ├── page.tsx                  # Editorial blog index
    │   │   └── [slug]/page.tsx           # 600+ word starter guides with Article schema
    │   ├── contact/page.tsx              # Contact form, Galle headquarters, WhatsApp
    │   ├── plan-your-trip/page.tsx       # Dedicated 7-step interactive trip planner
    │   ├── privacy-policy/page.tsx       # Privacy policy (GDPR & Sri Lankan compliance)
    │   ├── terms/page.tsx                # Booking terms, deposits & cancellation rules
    │   └── api/
    │       ├── plan/route.ts             # 7-step planner submission + Resend email
    │       ├── contact/route.ts          # Contact form handler
    │       └── newsletter/route.ts       # Newsletter subscription handler
    ├── components/
    │   ├── layout/                       # Header, MobileNav, Footer, FloatingWhatsApp, SkipLink
    │   ├── home/                         # HeroSlider, WelcomeSection, WhyUs, IncludedStandard,
    │   │                                 # InteractiveMap, FeaturedTours, SignatureMoments,
    │   │                                 # SeasonalJourneys, LatestBlog, ReviewsCarousel, FinalCta
    │   └── planner/                      # MultiStepPlanner (7 steps + WhatsApp prefill)
    └── content/                          # Typed TypeScript content files
        ├── company.ts                    # Business info, phone, address, SLTDA
        ├── tours.ts                      # 8 original, rich sample tours
        ├── destinations.ts               # 13 destinations with SVG coordinates
        ├── experiences.ts                # 10 signature experiences
        ├── blog.ts                       # 3 original 600+ word guides
        ├── faqs.ts                       # Practical travel questions & answers
        ├── reviews.ts                    # Empty array (safely hides review section)
        └── seasons.ts                    # Monsoon & wildlife peak timing model
```

---

## 🗺️ Interactive Features
1. **Interactive Sri Lanka SVG Map**: Custom vector map of Sri Lanka with 13 clickable destination pins (Sigiriya, Anuradhapura, Kandy, Nuwara Eliya, Ella, Yala, Galle, Unawatuna, Mirissa, Colombo, Trincomalee, Arugam Bay, Jaffna). Pulsing radar indicators and an animated slide-in info card with best visiting months and direct guide links. Requires **zero external map API keys**.
2. **7-Step Trip Planner**: Covers travel dates/month, duration & party size, stay tiers, destination tags, signature experiences, preferences/dietary notes, and contact details with honeypot bot protection. Submits via `/api/plan` and generates an instant **"Continue on WhatsApp"** link with the full travel brief prefilled.
3. **Empty-Safe Reviews Component**: Strictly follows the positioning rule: reads `/content/reviews.ts`. If empty, the component returns `null` and removes itself from the DOM, guaranteeing zero fake reviews or fabricated testimonials.

---

## 🛠️ Local Development & Scripts

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your `RESEND_API_KEY` for live email dispatch. In local development without a key, emails are logged to the console safely.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Production Build & Linting
```bash
npm run lint
npm run build
npm start
```

---

## ☁️ Vercel Deployment Guide
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Set Environment Variables in Vercel:
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com` (your single canonical production domain)
   - `RESEND_API_KEY`: Your live production API key from Resend
   - `CONTACT_EMAIL_TO`: `hello@yourdomain.com`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`: `94702156828`
4. Click **Deploy**. Vercel will run `npm run build` and generate static pages with ISR for dynamic routes.

---

## 📝 What to Replace (Customisation Checklist)
1. **`src/content/company.ts`**:
   - `address`: Replace `"Light House Street, Galle Fort, Galle 80000, Sri Lanka [Replace with exact address]"` with your physical office address.
   - `sltdaRegistration`: Replace placeholder `"SLTDA/SQA/TA/XXXXX"` with your official Sri Lanka Tourism Development Authority registration number.
   - `email`: Set to your production domain email.
   - `facebookUrl` & `instagramUrl`: Add your official social media pages.
2. **`src/app/about/page.tsx`**:
   - Update team member names and bios under `teamMembers`.
3. **`/public/images/`**:
   - Replace the generated placeholder SVG graphics with your high-resolution travel photography (using WebP or AVIF format).
