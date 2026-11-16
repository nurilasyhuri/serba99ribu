# PRD — Serba 99ribu Affiliate Storefront

## 1. Executive Summary & Goals
Serba 99ribu (`serba99ribu.com`) is a curated lifestyle and affiliate e-commerce storefront delivering an elevated, luxury editorial discovery experience for quality products priced at or under Rp 99.000. Unlike noisy, low-trust discount marketplaces, Serba 99ribu pairs high-aesthetic editorial art direction (inspired by Louis Vuitton and Shopify Metro) with rigorously curated lifestyle goods across Fashion, Beauty, Living, Kitchen, and Automotive.

### Target Goals:
- **Visual Distinction:** Elevate budget shopping into an aspirational editorial experience.
- **Conversion Efficiency:** Drive outbound affiliate clicks to vetted official partner stores without deceptive practices.
- **Performance & SEO:** Fast page loads (< 1.5s LCP), zero unnecessary client-side JavaScript, perfect Lighthouse score, and rich structured metadata for organic discovery.

### Non-Goals:
- Internal payment gateways, cart management, or fulfillment logistics (fulfilled entirely by merchant partners).
- Spammy discount popups, artificial countdown timers, or flash sale tickers.
- Raw, uncurated bulk product catalogs without department categorization.

---

## 2. Target Audience & Journey
- **Audience:** Value-conscious Indonesian consumers seeking stylish, well-made lifestyle essentials who reject cheap-looking marketplace interfaces.
- **First-Use Journey:**
  1. Visitor arrives on `serba99ribu.com` and is greeted by a calm, ambient lifestyle video hero and clear value proposition.
  2. Visitor explores departments via horizontal quick-jump pill tags or scrolls into curated department lookbooks.
  3. Visitor discovers a vetted product (e.g., perfume, bag, kitchen utility) with a clean price tag (≤ Rp 99.000).
  4. Visitor clicks "Lihat Koleksi" / "Beli di Mitra Resmi" and is routed smoothly to the partner's checkout or product page.

---

## 3. Product Requirements (EARS Format)

### REQ-001: Luxury Ambient Hero Section
- **Description:** The homepage must open with a full-bleed ambient lifestyle video hero and luxury editorial typography.
- **Priority:** Must Have
- **Acceptance Criteria (Given/When/Then):**
  - **Given** a user opens the homepage on desktop or mobile,
  - **When** the viewport finishes initial rendering,
  - **Then** the ambient video plays automatically (muted, loop, playsinline) with a fallback poster, anchored headline ("Curated Essentials for the Modern Lifestyle"), and a discreet video pause/play toggle.

### REQ-002: Category Quick-Jump Navigation
- **Description:** The storefront must provide an intuitive horizontal pill navigation for all lifestyle categories.
- **Priority:** Must Have
- **Acceptance Criteria:**
  - **Given** the homepage is loaded,
  - **When** a user clicks any category pill (e.g., Fashion Pria, Kecantikan, Rumah Tangga),
  - **Then** the page smoothly scrolls to that category's curated collection section.

### REQ-003: Curated Department Lookbook Grids
- **Description:** Products must be organized strictly by department with uniform editorial presentation.
- **Priority:** Must Have
- **Acceptance Criteria:**
  - **Given** the user views a department collection,
  - **When** the cards render,
  - **Then** each item displays high-resolution packshots, verified title, formatted price (≤ Rp 99.000), and an outbound affiliate exploration link without misleading UI.

### REQ-004: Scenario-Based Editorial Buying Guides
- **Description:** The storefront must offer editorial lifestyle articles linking multiple products into curated scenarios.
- **Priority:** Should Have
- **Acceptance Criteria:**
  - **Given** a visitor reads a lifestyle buying guide (e.g., "Living Room Refresh Under 99K"),
  - **When** they click recommended items within the guide,
  - **Then** they are guided directly to the relevant curated products or partner merchant pages.

### REQ-005: Clean Affiliate Routing & Outbound Handling
- **Description:** Outbound affiliate links must be transparent, secure, and SEO-compliant.
- **Priority:** Must Have
- **Acceptance Criteria:**
  - **Given** a user clicks an outbound product action,
  - **When** the new tab opens,
  - **Then** the link uses `rel="noopener noreferrer sponsored"` or clean redirects to preserve security and search engine integrity.

### REQ-006: Responsive Performance & Accessibility
- **Description:** The platform must load under 1.5s on mobile 4G and adhere to WCAG AA contrast.
- **Priority:** Must Have
- **Acceptance Criteria:**
  - **Given** a user on a mobile device,
  - **When** the page is analyzed via Lighthouse,
  - **Then** Performance score is ≥ 95, Cumulative Layout Shift is < 0.05, and contrast ratios meet 4.5:1 for text.

---

## 4. Technical Stack & Architecture
- **Framework:** Astro 5.x (Content-driven, Static Site Generation, zero runtime JS baseline).
- **Styling:** Tailwind CSS 3.4+ configured with tokens from `DESIGN.md`.
- **Data Source:** Static JSON feeds (`categories_99ribu.json`, `products_99ribu.json`) typed via TypeScript interfaces and Astro Content Collections.
- **Hosting & CDN:** Vercel with edge caching and asset optimization.
- **Asset Pipeline:** WebP image optimization and compressed MP4 hero video.
