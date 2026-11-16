# TASKS — Serba 99ribu Development Backlog

## Completed Tasks

### TASK-001: Initialize Astro + Tailwind Project Architecture
- **Primary requirement:** REQ-006
- **Status:** COMPLETED
- **Done when:** `npm run build` succeeds and produces a clean static distribution without errors.
- **Evidence:** Astro 5.4.1 + Tailwind CSS 3.4.17 installed, building `dist/` in 1.94s with zero errors.

### TASK-002: Implement Typed Catalog Data Layer & Content Collections
- **Primary requirement:** REQ-003
- **Status:** COMPLETED
- **Done when:** Unit verification test or script loads all products, groups them by valid categories, and confirms 100% data integrity with zero unhandled items.
- **Evidence:** `src/types/catalog.ts` and `src/utils/catalog.ts` successfully group 42 clean products across 6 curated department lookbooks.

### TASK-003: Build Luxury Ambient Video Hero Component
- **Primary requirement:** REQ-001
- **Status:** COMPLETED
- **Done when:** Browser inspection confirms autoplay without audio, poster display before load, and responsive scaling across 360px, 768px, and 1440px viewports.
- **Evidence:** `HeroVideo.astro` renders full-bleed 1080p video with Cormorant Garamond typography and accessible play/pause media toggle.

### TASK-004: Build Category Navigation & Quick-Jump Pills
- **Primary requirement:** REQ-002
- **Status:** COMPLETED
- **Done when:** Clicking a category pill triggers smooth scroll to the target anchor, and active state highlights dynamically.
- **Evidence:** `CategoryNav.astro` and `Header.astro` render sticky floating navbar and horizontal pill tags.

### TASK-005: Build Curated Department Lookbook & Product Cards
- **Primary requirement:** REQ-003
- **Status:** COMPLETED
- **Done when:** All department products render cleanly with proper aspect ratio and outbound `rel="noopener noreferrer sponsored"` affiliate links.
- **Evidence:** `ProductCard.astro` features 1:1 packshot stage, touch target $\ge 30px$, and verified outbound links.

### TASK-006: Build Scenario Buying Guides Section
- **Primary requirement:** REQ-004
- **Status:** COMPLETED
- **Done when:** 3 editorial guide cards render with imagery, narrative summary, and anchor links into target departments.
- **Evidence:** `BuyingGuides.astro` renders 3-column lifestyle stories linking directly to department collections.

### TASK-007: End-to-End Build & Vercel Deployment Verification
- **Primary requirement:** REQ-005
- **Quality constraint:** REQ-006
- **Status:** COMPLETED
- **Done when:** `serba99ribu.com` answers HTTP 200 with complete video hero, navigation, and zero visual fails.
- **Evidence:** Production deployment `serba99ribu-4ahbzbdyj-tholabie.vercel.app` aliased to `https://serba99ribu.com` and `https://www.serba99ribu.com`. HTTP/2 200 OK verified via curl, and `dotuiux check https://serba99ribu.com` returned 0 fail, 33 pass.
