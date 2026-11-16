# ARCHITECTURE.md — Serba 99ribu System Architecture

## 1. System Overview
Serba 99ribu (`serba99ribu.com`) is architected as a high-performance, content-driven static web application built with Astro and styled using Tailwind CSS. The system prioritizes instant load times, zero client-side JavaScript overhead for content, and an editorial art direction inspired by high-end luxury lookbooks.

```
                  +-----------------------------------+
                  |           Static Feeds            |
                  |  categories_99ribu.json           |
                  |  products_99ribu.json             |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |      Astro Build Pipeline         |
                  |  - TypeScript schema validation   |
                  |  - Content normalization          |
                  |  - Tailwind token injection       |
                  |  - HTML & Asset minification      |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |     Static Distribution (SSG)     |
                  |  - Zero runtime JS for layout     |
                  |  - Full-bleed ambient video hero  |
                  |  - Curated department lookbooks   |
                  |  - Optimized WebP assets          |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  |       Vercel Edge Global CDN      |
                  |  Custom Domain: serba99ribu.com   |
                  +-----------------------------------+
```

---

## 2. Technology Stack & Decision Matrix
| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Astro 5.x | Pure HTML output by default; exceptional Core Web Vitals; no client-side runtime hydration needed for static catalogs. |
| **Styling** | Tailwind CSS 3.4+ | Direct mapping of design tokens from `DESIGN.md`; purge unused utility classes; strict responsive utilities. |
| **Type Safety** | TypeScript 5.x | Type checking for static catalogs, props, and category lookups. |
| **Video & Media** | HTML5 Video & WebP | Self-hosted compressed MP4 video with poster fallback; CDN-hosted or local WebP product packshots. |
| **Deployment** | Vercel Edge Network | Instant SSG edge propagation, zero-config domain routing, and automated SSL termination. |

---

## 3. Component Hierarchy & Composition
```
src/
├── components/
│   ├── Header.astro           # Airy sticky navigation with wordmark and mobile drawer
│   ├── HeroVideo.astro        # Full-bleed ambient video hero with serif typography
│   ├── CategoryNav.astro      # Horizontal quick-jump pill tags for departments
│   ├── DepartmentSection.astro# Grouped department lookbook with editorial heading
│   ├── ProductCard.astro      # Clean product card with aspect-ratio packshot & action
│   ├── BuyingGuides.astro     # Scenario-based editorial shopping articles
│   └── Footer.astro           # Understated footer with links and affiliate disclosure
├── layouts/
│   └── BaseLayout.astro       # Root HTML document, SEO meta tags, Google Fonts
├── pages/
│   └── index.astro            # Homepage composing all sections in accepted reading order
├── types/
│   └── catalog.ts             # TypeScript interfaces for Category, Product, and Article
└── utils/
    └── catalog.ts             # Feed normalization and grouping utilities
```

---

## 4. Design Token Integration
All Tailwind theme extensions map 1:1 to tokens established in `DESIGN.md`:
- **Font Families:**
  - `font-serif`: `'Cormorant Garamond', Georgia, serif`
  - `font-sans`: `'Inter', -apple-system, sans-serif`
- **Color Scale:**
  - `canvas`: `#fafaf9`
  - `surface`: `#ffffff`
  - `tint`: `#f5f4f0`
  - `charcoal`: `#18181b`
  - `terracotta`: `#c2410c`
- **Borders & Radii:**
  - `radius-card`: `14px`
  - `radius-pill`: `9999px`

---

## 5. Deployment & Edge Configuration
- Static HTML files are pre-rendered at build time.
- Vercel routes `/` and static assets with aggressive `Cache-Control: public, max-age=31536000, immutable` for static hashes and `s-maxage=86400, stale-while-revalidate` for HTML documents.
- Domain `serba99ribu.com` routes directly to the production deployment.
