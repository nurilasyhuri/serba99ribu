# Design System — Serba 99ribu (`serba99ribu.com`)

## 1. Aesthetic Identity & Brand Philosophy
**Serba 99ribu** mengadaptasi secara presisi **Anatomi Desain Website Resmi Louis Vuitton** ([`id.louisvuitton.com`](https://id.louisvuitton.com/eng-id/homepage)) yang dipadukan dengan fungsionalitas katalog e-commerce kurasi modern.

### Prinsip Utama (The Luxury Baseline):
- **Visual Dominance & Cinematic Immersion:** Ruang visual lapang dengan video ambient full-bleed 100vh berlatar belakang audio muted dan overlay sinematik.
- **Bottom-Anchored Typography:** Konten judul diletakkan di sepertiga bawah (*bottom third*) dari hero, memberikan napas lapang pada panggung visual.
- **Quiet Commerce:** Menolak segala bentuk gimik diskon norak (flash-sale, timer hitung mundur palsu, sticker heboh). Harga flat $\le$ Rp 99.000 ditampilkan secara bermartabat dan terpercaya.
- **Typographic Refinement:** Paduan tipografi serif klasik (*Cormorant Garamond*) dan sans-serif geometris (*Inter*) dengan pelacakan huruf (*letter spacing*) yang presisi.

---

## 2. Design Tokens

### 2.1 Palet Warna (Color Palette)
```
Canvas & Backgrounds:
  --color-canvas-base:   #fafaf9   /* Warm Stone Cream (Latar belakang halaman utama) */
  --color-surface-card:  #ffffff   /* Pure White (Permukaan kartu produk & artikel) */
  --color-surface-tint:  #f5f4f0   /* Soft Neutral (Stage packshot produk & strip navigasi) */

Text & Foreground:
  --color-text-main:     #18181b   /* High-contrast Charcoal (Teks judul & nama produk) */
  --color-text-muted:    #71717a   /* Neutral Slate (Kicker, kategori, sub-informasi) */
  --color-text-subtle:   #a1a1aa   /* Light Slate (Border hairline & placeholder) */

Brand Accents:
  --color-accent-warm:   #c2410c   /* Refined Terracotta (Highlight harga kurasi) */
  --color-accent-hover:  #9a3412   /* Dark Terracotta (State hover) */
  --color-accent-dark:   #09090b   /* Deep Onyx (Tombol CTA & badge kontras tinggi) */

Borders & Dividers:
  --color-border-subtle: rgba(0, 0, 0, 0.08) /* Hairline border pembagi section */
  --color-border-light:  #e4e4e7              /* Garis luar kartu */
```

### 2.2 Tipografi (Typography)
| Peran | Font Family | Bobot | Ukuran (Mobile / Desktop) | Tracking / Leading |
|---|---|---|---|---|
| **Editorial Hero** | `'Cormorant Garamond', Georgia, serif` | 600 SemiBold | `32px / 52px` | Leading: 1.15, Tracking: -0.01em |
| **Section Title** | `'Cormorant Garamond', Georgia, serif` | 600 SemiBold | `24px / 36px` | Leading: 1.25, Tracking: normal |
| **Kicker / Label** | `'Inter', sans-serif` | 600 SemiBold | `11px / 12px` | All Caps, Tracking: +0.12em |
| **Card Heading** | `'Inter', sans-serif` | 500 Medium | `15px / 16px` | Leading: 1.4 |
| **Price Tag** | `'Inter', sans-serif` | 600 SemiBold | `14px / 16px` | Warna Terracotta / Dark |
| **Body Text** | `'Inter', sans-serif` | 400 Regular | `14px / 16px` | Leading: 1.6 |
| **Nav & Buttons** | `'Inter', sans-serif` | 500 Medium | `13px / 14px` | Tracking: +0.02em |

### 2.3 Radius & Sudut (Border Radius)
- **Komponen Kartu (`--radius-card`):** `14px` (lembut, elegan, tidak terlalu bulat).
- **Tombol & Pill Tag (`--radius-pill`):** `9999px` (full rounded pill untuk chip kategori dan tombol CTA).
- **Stage Gambar Packshot:** `12px`.

### 2.4 Ritme Spasi (Spacing Scale)
Skala berbasis kelipatan 8px:
- `8px` (`0.5rem`): Jarak internal elemen kecil, padding badge.
- `16px` (`1.0rem`): Padding kartu produk mobile, gap antar teks.
- `24px` (`1.5rem`): Padding kartu desktop, gap grid mobile.
- `32px` (`2.0rem`): Jarak antar sub-komponen, padding section mobile.
- `48px` (`3.0rem`): Gap grid desktop.
- `64px – 96px` (`4.0rem – 6.0rem`): Margin vertikal antar seksi koleksi utama.

---

## 3. Anatomi Desain Louis Vuitton (LV Component Anatomy)

### 3.1 Floating Navbar
- **State Awal (Di atas Hero Video):**
  - Background transparan dengan gradien halus ke bawah.
  - Teks dan ikon putih bersih (`#ffffff`).
  - Wordmark *"SERBA 99RIBU"* berada di tengah dengan tracking `+0.25em`.
  - Kiri: Tombol Menu (hamburger garis tipis 1.5px) + label *"MENU"*, dan tombol Search.
  - Kanan: Tautan *"KATALOG"* atau *"PANDUAN"*.
- **State Saat Di-scroll:**
  - Transisi mulus 250ms ke background putih gading (`#fafaf9`) dengan `backdrop-filter: blur(16px)` dan border hairline bawah `rgba(0,0,0,0.06)`.
  - Teks dan ikon berubah menjadi charcoal gelap (`#18181b`).

### 3.2 Full-Bleed Ambient Hero Video
- **Rasio:** `100vh` (desktop) dengan video 1080p MP4 autoplay, loop, muted, playsinline.
- **Poster Fallback:** High-res static image (`hero-poster.jpg`).
- **Overlay:** Gradien gelap sinematik (`linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.3) 100%)`).
- **Posisi Konten:** Sepertiga bawah layar (bottom-anchored, `64px` dari bawah).
- **Hirarki Judul:**
  - Headline: *"Curated Essentials for the Modern Lifestyle"* (Cormorant Garamond, 52px).
  - Sub-headline: *"PREMIUM QUALITY, UNDER 99K"* (Inter 14px All Caps, Tracking `+0.15em`).
  - Action link: *"Discover the Collection"* (Underline dengan offset 4px).
- **Kontrol Media:** Tombol bundar kecil di sudut kiri bawah untuk Play / Pause video hero.

### 3.3 Curated Department Lookbook ("Explore of Selection")
- **Tajuk Seksi:**
  - Kicker: *"EXPLORE OF SELECTION SERBA 99RIBU"* (All Caps, 11px, tracking `+0.12em`).
  - Judul Kategori: Misal *"Koleksi Fashion & Gaya Hidup"* (Cormorant Garamond 32px).
  - Tautan Kanan: *"Lihat Semua Koleksi [Kategori] →"*.
- **Grid Layout:**
  - Mobile (`< 768px`): 2 kolom, gap `16px`.
  - Desktop (`≥ 768px`): 4 kolom seimbang, gap `24px`.

### 3.4 Luxury Product Card Anatomy
1. **Packshot Stage:**
   - Rasio kotak presisi `1:1` atau portrait `4:5`.
   - Latar belakang panggung netral lembut (`#f6f5f3` atau `#ffffff`).
   - Radius sudut: `12px`.
   - Hover zoom halus (`scale(1.03)` dalam `300ms ease-out`).
2. **Metadata Produk:**
   - Label Kategori: Huruf kapital 11px, warna Slate Muted (`#71717a`).
   - Nama Produk: 15px/16px, medium weight, charcoal `#18181b`, `line-clamp: 2`.
   - Harga: Stated flat *"Rp 99.000"*, font Inter bobot 600.
3. **Outbound Action:**
   - Tautan terverifikasi dengan atribut `rel="noopener noreferrer sponsored"` menuju official/verified merchant partner.

### 3.5 Full Navigation Drawer (LV Style)
- Slide-over drawer dari sisi kiri saat tombol menu ditekan.
- Daftar kategori utama dengan tipografi besar dan representasi editorial.
- Seksi panduan kurasi dan transparansi independen Serba 99ribu.

---

## 4. Aturan Pantangan (Three Won't Do)

1. **DILARANG MENGGUNAKAN ELEMEN DISKON NORAK:**
   - Tidak ada badge diskon merah berkedip, stiker "CUCI GUDANG", atau pita diskon heboh.
2. **DILARANG MEMASANG COUNTDOWN TIMER / POPUP PALSU:**
   - Tidak ada jam hitung mundur palsu atau notifikasi pembelian buatan.
3. **DILARANG MENUMPUK KARTU BERLEBIHAN (CARD-IN-CARD CLUTTER):**
   - Kartu produk tidak dibungkus dalam kontainer berbingkai tebal. Hirarki visual dibangun menggunakan proporsi ruang dan keanggunan tipografi.
