# DESIGN.md — Serba 99ribu Design System

## Direction
Picked-by: owner 2026-11-10 (Direction: Louis Vuitton Luxury Editorial Anatomy)
Surface/job: Curated affiliate lifestyle storefront for serba99ribu.com (≤ Rp 99.000).
References: https://id.louisvuitton.com/eng-id/homepage (Full-bleed ambient video hero, bottom-anchored typography, floating nav, and quiet commerce lookbook).

Sections (in order, each with its one job):
1. Floating Header: Transparent-to-blur navigation with centered wordmark, left hamburger menu drawer trigger, and search trigger.
2. Full-Bleed Ambient Hero Video: 100vh cinematic video with subtle gradient overlay, bottom-anchored serif headline, sub-headline, and video pause/play toggle.
3. Category Quick-Jump Strip: Minimalist horizontal pill strip for instant 1-tap department navigation.
4. Curated Department Lookbooks ("Explore of Selection"): Dedicated department sections with editorial kickers, Cormorant Garamond headings, and 4-col product grids.
5. Scenario Buying Guides: 3-column editorial features highlighting everyday lifestyle solutions under Rp 99.000.
6. Understated Luxury Footer: Brand philosophy, multi-column directory, and transparent affiliate provenance note.

Feel: Calm, luxurious, curated, editorial.
Photo style: High-resolution packshots, neutral warm studio staging (#f6f5f3), 1:1 square ratio.
Motion profile: Subtle (150ms ease-out transitions, 300ms image hover scale, prefers-reduced-motion respected).

Three won't do:
1. No aggressive flashing badges, fake countdown timers, or intrusive modal popups.
2. No dense unformatted product dumps or noisy e-commerce discount stickers.
3. No nested card-in-card visual soup or artificial bento clutter.

### Composition contract
C1: Floating header is fixed at top; transparent over hero video, transitioning to white-cream with backdrop-filter blur on scroll.
C2: Wordmark "SERBA 99RIBU" is centered horizontally with wide letter-spacing (+0.25em).
C3: Hero video is 100vh full-bleed with headline anchored in the bottom third (64px from bottom).
C4: Category sections open with kicker "EXPLORE OF SELECTION SERBA 99RIBU" followed by refined serif department title.
C5: Product cards use 1:1 square packshots on neutral background (#f6f5f3), with category, 2-line title, and flat price tag (≤ Rp 99.000).
C6: Navigation drawer slides in from the left on menu click with full department listing and editorial links.

## Tokens

### Colour
- Canvas Base (Page): `#fafaf9` (Warm Stone Cream)
- Card Surface: `#ffffff` (Pure White)
- Surface Neutral: `#f6f5f3` (Warm Studio Packshot Background)
- Text Main: `#18181b` (High-contrast Charcoal)
- Text Muted: `#71717a` (Neutral Slate)
- Text Subtle: `#a1a1aa` (Light Slate Hairline)
- Accent Warm: `#c2410c` (Refined Terracotta for curated pricing)
- Accent Dark: `#09090b` (Deep Onyx)
- Border Subtle: `rgba(0, 0, 0, 0.08)`

### Typography
- Primary Display: 'Cormorant Garamond', Georgia, serif (Editorial Luxury)
- Primary Body / Sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Scale:
  - Kicker / Label: 11px - 12px (All Caps, tracking +0.12em)
  - Navigation / Meta: 13px - 14px (Inter Medium)
  - Body: 14px - 16px (Inter Regular, line-height 1.6)
  - Card Heading: 15px - 16px (Inter Medium, line-height 1.4)
  - Section Heading: 28px - 36px (Cormorant Garamond SemiBold)
  - Hero Headline: 36px - 52px (Cormorant Garamond SemiBold, leading tight)

### Radius & Elevation
- Cards: 14px
- Packshot Stage: 12px
- Buttons & Pills: 9999px (full pill)
- Elevation: Flat or atmospheric float (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`)

### Spacing
- Scale: 8px base (8px, 16px, 24px, 32px, 48px, 64px, 96px).
- Container Max Width: 1280px with 20px mobile / 32px desktop padding.

## Allow
allow: duplicate-href — Category navigation and department cards link to matching curated categories for intuitive discovery.
allow: primary-actions — Each curated product and department card offers a direct discovery action.
allow: first-viewport-words — Hero section with brand headline and editorial proposition.
