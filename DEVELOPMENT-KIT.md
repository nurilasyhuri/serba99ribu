# Frontend Development Kit — Serba 99ribu (`serba99ribu.com`)

Panduan teknis dan operasional ini difokuskan **100% pada arsitektur Front End**, desain antarmuka, sistem komponen UI, tipografi, dan pengalaman pengguna (*user experience*) untuk storefront kurasi **Serba 99ribu**.

---

## 1. Frontend Principles & Identity
- **Prinsip Utama:** Pure Frontend Architecture — zero backend complexity, zero database, zero server runtime dependencies.
- **Tampilan:** *Luxury Editorial & Modern Refined* (estetika website Louis Vuitton berpadu dengan layout arsitektural Shopify Metro).
- **Core Job:** Memberikan pengalaman visual yang tenang, mewah, dan cepat bagi pengunjung dalam menjelajahi produk kurasi pilihan $\le$ Rp 99.000.
- **Interaksi:** HTML-first statis, navigasi instan, pemuatan aset super cepat, interaktivitas ringan (video hero playback toggle, category smooth scroll, mobile menu).

---

## 2. Frontend Tech Stack
| Bagian | Pilihan | Fungsi & Keunggulan |
|---|---|---|
| **UI Framework** | **Astro 5.x** | Komponen modular `.astro`, output 100% HTML murni, zero JavaScript payload secara default. |
| **CSS & Design Tokens** | **Tailwind CSS 3.4+** | Mengikat token warna, tipografi, radius, dan spasi dari `DESIGN.md` ke utility classes. |
| **Tipografi** | **Google Fonts** | `Cormorant Garamond` (Display serif elegan) & `Inter` (Sans-serif tajam & terbaca). |
| **Media Frontend** | **HTML5 Video & WebP** | Video hero background autoplay/muted + packshot produk WebP dengan rasio presisi. |
| **Frontend Tooling** | **Vite (built-in Astro)** | HMR instan, CSS autoprefixing, bundling statis tanpa overhead. |

---

## 3. Komponen Front End (UI Component Tree)
```
src/
├── components/
│   ├── Header.astro            # Navigasi sticky, wordmark, category jump links & mobile drawer
│   ├── HeroVideo.astro         # Ambient full-bleed video hero, overlay, & headline editorial
│   ├── CategoryNav.astro       # Quick-jump horizontal pill strip (Fashion, Beauty, Home, etc.)
│   ├── DepartmentSection.astro # Kontainer lookbook per kategori + judul editorial
│   ├── ProductCard.astro       # Kartu produk: packshot rasio 1:1, badge harga, tombol CTA
│   ├── BuyingGuides.astro      # 3-kolom artikel kurasi gaya hidup (scenario-based stories)
│   └── Footer.astro            # Footer minimalis, direktori kategori, & affiliate disclosure
├── layouts/
│   └── BaseLayout.astro        # Kerangka HTML utama, OpenGraph meta, font imports, preconnect
└── pages/
    └── index.astro             # Halaman storefront menggabungkan seluruh komponen UI
```

---

## 4. Frontend Data Contracts (Static JSON Feeds)
Semua data produk dan kategori disuplai langsung melalui file JSON statis lokal tanpa API backend:

### Skema Produk (`products_99ribu.json`)
```typescript
interface ProductCardProps {
  title: string;       // Nama produk terkurasi
  price: string;       // Format harga display, e.g. "Rp99.000"
  href: string;        // Outbound affiliate link
  image: string;       // URL gambar packshot WebP
  alt: string;         // Alt text aksesibilitas
  category?: string;   // Kategori target
}
```

---

## 5. Frontend Development Workflow

### Menjalankan Server Lokal:
```bash
# Install dependencies frontend
npm install

# Jalankan dev server lokal dengan HMR instan (http://localhost:4321)
npm run dev
```

### Build & Audit Visual Frontend:
```bash
# Build static bundle ke dist/
npm run build

# Preview build statis lokal
npm run preview

# Audit kepatuhan desain & rendering browser (360px, 768px, 1440px)
dotuiux check http://localhost:4321
```

---

## 6. Standar Kualitas Front End (UI/UX Invariants)

1. **Anti-Clutter & Elegan:**
   - Tidak ada badge diskon berkedip, tidak ada popup pop-up paksa, tidak ada countdown timer palsu.
2. **Kontras & Aksesibilitas (WCAG AA):**
   - Rasio kontras teks utama minimal `4.5:1` di atas background `#fafaf9`.
   - Video hero harus memiliki overlay gelap cukup agar teks judul terbaca kontras $\ge 7:1$.
3. **Pencegahan Cumulative Layout Shift (CLS):**
   - Seluruh kontainer gambar packshot memiliki rasio aspek terkunci (`aspect-square` atau `aspect-[4/5]`) dan background placeholder lembut `#f5f4f0`.
4. **Responsive Integrity:**
   - Mobile (`360px – 767px`): 2 kolom produk, navigasi horizontal swipe, tombol kontrol video responsif.
   - Desktop (`≥ 768px`): 4 kolom produk teratur, tipografi serif lapang, spacing lega.
