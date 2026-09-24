# Rivya — Premium Beauty Marketplace

Rivya is a luxury beauty marketplace connecting customers with verified independent beauty professionals — makeup artists, salons, mehendi artists, hairstylists, nail artists, and skincare experts. Think Airbnb + Pinterest, for the beauty industry.

Built with **Next.js 15, React 18, TailwindCSS, shadcn/ui, Framer Motion, MongoDB**.

## Features
- Luxury landing page with hero, large search, floating trust cards
- 10 beauty categories (Bridal, Party, Hair, Nails, Mehendi, Salon, Spa, Facial, Skincare, Hair Styling)
- Pinterest-style trending artist cards with Verified badges
- Full masonry portfolio gallery (tap any image → opens artist profile)
- Artist profile modal — about, services & pricing, portfolio, sticky booking sidebar
- Multi-step booking flow — Service → Date → Time → Address → Payment → Confirmation
- Premium salon listings
- Real MongoDB-backed bookings API

## Tech stack
- Next.js 15.5 (App Router)
- React 18
- TailwindCSS 3
- shadcn/ui components
- Framer Motion (animations)
- Lucide icons
- MongoDB (bookings persistence)
- Playfair Display (serif headings) + Inter (sans body)

## Brand
- **Burgundy** `#5B0E2D` (primary)
- **Rose Pink** `#F47CA8` (secondary)
- **Gold** `#D4AF37` (accent)
- **Blush** `#FFF7F9` (background)

## Getting started

```bash
# 1. install
yarn install

# 2. environment
cp .env.example .env
# edit .env and set MONGO_URL (local mongo or Atlas URI)

# 3. dev
yarn dev

# open http://localhost:3000
```

## Project structure
```
app/
  layout.js              # root layout + fonts + hydration-safe script
  page.js                # main marketplace (all sections + modals)
  globals.css            # brand tokens + utilities (glass, gradient, masonry)
  api/[[...path]]/route.js  # catch-all API — /categories /artists /salons /portfolio /bookings
components/ui/           # shadcn primitives
lib/utils.js
tailwind.config.js       # brand colors + serif/sans fonts
```

## API endpoints
- `GET  /api/categories` — 10 beauty categories
- `GET  /api/artists` — trending artists list
- `GET  /api/artists/:id` — artist detail
- `GET  /api/salons` — curated salons
- `GET  /api/portfolio` — masonry gallery feed
- `POST /api/bookings` — create booking (persists to MongoDB)
- `GET  /api/bookings` — list recent bookings

## Deploy
Any Next.js host works (Vercel, Netlify, Emergent, Railway). Set env vars:
- `MONGO_URL`
- `DB_NAME`
- `NEXT_PUBLIC_BASE_URL`

---
Crafted with love in India 🌸
