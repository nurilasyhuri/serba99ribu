# DESIGN.md

## Direction
Surface/job: Curated affiliate catalog and shoppable guide connecting shoppers to verified products under Rp 99.000.
References: design/refs/99ribu.com — omnibox search, category pills, high-density product grid, mobile bottom bar.
Sections (in order, each with its one job):
1. Store Header & Omnibox: Quick search and brand navigation.
2. Category Pill Bar: One-tap category switching.
3. Value Hero Banner: Establish the <= Rp 99.000 price promise and affiliate curation premise.
4. Curated Product Grid: High-density product discovery with outbound merchant links.
5. Shoppable Guides & Articles: Value-add editorial listicles highlighting 99ribu affiliate products.
6. Store Footer: Affiliate disclosure, category directory, and search shortcuts.

Feel: Fast, utilitarian, transparent.
Photo style: Clean white or soft neutral product packshots, 1:1 square ratio, uncompressed webp.
Motion profile: Subtle (150ms transitions on hover and tap only).
Three won't do:
1. No internal cart/checkout or fake discount countdowns.
2. No popups, spinners, or blocking modals.
3. No decorative AI-slop sparkles or unverified rating numbers.

### Composition contract
C1: Omnibox header sits at the top with brand wordmark and search field; search remains accessible across all viewports.
C2: Category pills bar is horizontally scrollable with smooth touch scrolling and sticky or compact placement below header.
C3: Hero card uses tinted soft-violet surface (`#efe9fd`) with deep violet typography (`#2f2466`) stating the Rp99.000 price ceiling.
C4: Product grid maintains 2 columns at 360px mobile, 4 columns at 768px tablet, and 5-6 columns at 1440px desktop.
C5: Shoppable articles section displays 3 editorial guide cards with reading time and tagged product count.
C6: Mobile bottom navigation provides instant access to Katalog, Kategori, Artikel, and Cari.

## Tokens

### Colour
- Primary Accent: `#5b35d5`
- Primary Dark: `#2f2466`
- Surface Tint: `#efe9fd`
- Neutral 900 (Text): `#121212`
- Neutral 600 (Muted): `#595959`
- Neutral 200 (Borders): `#e5e7eb`
- Neutral 50 (Background): `#f8f9fa`
- White (Cards/Surfaces): `#ffffff`
- Badge Accent: `#d97706` (solid amber star/badge, WCAG compliant)

### Type
- Primary Font: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Scale: 12px (label/caption), 14px (body/compact), 16px (base/price), 20px (card title), 28px (h2 section), 36px (h1 hero)

### Radius
- Cards & Frames: 12px
- Omnibox Input: 10px
- Pills & Buttons: 9999px

### Spacing
- Base unit: 4px. Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px. Container max-width: 1280px.

### Motion
- Durations: 150ms hover/tap state transitions (`ease-out`).
- Reduced motion: all animations suppressed when `prefers-reduced-motion: reduce`.

## Allow
allow: duplicate-href — Category pills and footer links deliberately repeat target categories for navigation ergonomics.
allow: primary-actions — Multiple product cards each feature a direct outbound affiliate CTA button.
allow: first-viewport-words — Hero banner with value proposition and search omnibox in the first viewport.
allow: marker-count — Catalog product cards display verified price ceiling indicators.

