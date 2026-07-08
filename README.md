# Ember & Oak — Premium Café Landing Page

A luxury landing page for an artisan roastery & café, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui-style components, and Framer Motion.

## Design concept

The signature visual is an animated **roast curve** — the temperature-over-time
graph a coffee roaster actually tracks (Charge → First Crack → Development →
Drop). It appears large in the hero and again as a thin divider between
sections, tying the whole page back to the craft the café is built on.

- **Palette**: Reserve Green `#1F3D2F`, Espresso `#2B1D14`, Brass `#B8894F`, Ember `#A64B2A`, Stone `#EFE9DC`, Paper `#FBF8F1`
- **Type**: Fraunces (display/italic), Work Sans (body), IBM Plex Mono (prices, times, labels)

## Folder structure

```
cafe-landing/
├── app/
│   ├── layout.tsx        # Root layout, font loading, metadata
│   ├── page.tsx           # Composes all sections
│   └── globals.css        # Tailwind layers, base styles, reduced-motion support
├── components/
│   ├── ui/
│   │   ├── button.tsx      # shadcn-style Button (variants: default, brass, outline, ghost)
│   │   └── card.tsx        # shadcn-style Card
│   ├── navbar.tsx          # Sticky glassmorphism nav + mobile menu
│   ├── hero.tsx            # Hero with animated roast-curve graphic
│   ├── roast-curve.tsx     # Signature SVG component (hero graphic + divider)
│   ├── section-heading.tsx # Reusable eyebrow + title + description
│   ├── featured-dishes.tsx
│   ├── why-choose-us.tsx
│   ├── about.tsx
│   ├── reviews.tsx
│   ├── gallery.tsx
│   ├── hours.tsx
│   ├── contact.tsx
│   ├── map-placeholder.tsx
│   └── footer.tsx
├── lib/
│   └── utils.ts            # cn() class-merge helper
├── tailwind.config.ts       # Custom palette, fonts, shadows, keyframes
└── package.json
```

## Running locally

1. **Install Node.js 18.17+** if you don't have it already.

2. **Unzip the project** and move into it:
   ```bash
   cd cafe-landing
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the dev server**:
   ```bash
   npm run dev
   ```

5. Open **http://localhost:3000** in your browser.

6. **Build for production** when ready to deploy:
   ```bash
   npm run build
   npm run start
   ```

## Notes

- All photography currently points to Unsplash URLs as placeholders — swap the `src` values in `featured-dishes.tsx`, `about.tsx`, and `gallery.tsx` for your own images.
- The map in `map-placeholder.tsx` is a styled placeholder with instructions inline for dropping in a real Google Maps `<iframe>` embed URL.
- Motion respects `prefers-reduced-motion` globally (see `globals.css`).
- Fonts load via `next/font/google`, so an internet connection is required the first time you build.
