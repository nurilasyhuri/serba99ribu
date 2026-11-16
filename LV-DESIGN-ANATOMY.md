# Louis Vuitton Design Anatomy — Adaptation for Serba 99ribu

Dokumen ini membedah secara mendalam **Anatomi Desain Website Resmi Louis Vuitton** ([`id.louisvuitton.com`](https://id.louisvuitton.com/eng-id/homepage)) dan memetakannya secara presisi ke dalam sistem desain front end **Serba 99ribu** (`serba99ribu.com`).

---

## 1. Prinsip Inti Estetika Louis Vuitton (The Luxury Baseline)

Website Louis Vuitton merepresentasikan standar tertinggi dalam *Digital Luxury Retail*:
1. **Visual Dominance & Cinematic Immersion:** Konten video dan fotografi editorial mengambil porsi 80%+ dari viewport pertama tanpa distraksi teks berlebihan.
2. **Bottom-Anchored Typography:** Teks hero dan headline kampanye diletakkan di sepertiga bawah (*bottom third*), memberikan panggung penuh bagi visual model dan produk.
3. **Extreme Typographic Discipline:** Hanya menggunakan 1 jenis sans-serif geometris berkontur tajam (*Futura / LV Geometric Sans*) atau serif klasik (*Didot / Garamond*) dengan letter-spacing lebar (*wide tracking*) untuk judul kapital.
4. **Quiet Commerce:** Tidak ada harga berkedip, tidak ada stiker diskon, tidak ada urgensi palsu. Penjualan terjadi karena daya tarik visual dan kurasi, bukan manipulasi psikologis diskon.

---

## 2. Anatomi Komponen (Component-by-Component Teardown)

### 2.1 Anatomi Header & Floating Navigation
```
+---------------------------------------------------------------------------------------+
|  [Menu ☰]  [Cari ⌕]               S E R B A   9 9 R I B U             [Katalog ↗] [Bantuan] |
+---------------------------------------------------------------------------------------+
```
- **Posisi:** `fixed` di puncak layar dengan `z-index: 50`.
- **State Awal (Top of Page / Hero Overlay):**
  - Latar belakang: Transparan dengan gradien halus ke bawah (`rgba(0,0,0,0.4)` ke `transparent`).
  - Warna Teks & Ikon: Putih bersih (`#ffffff`) dengan drop shadow tipis agar terbaca di atas video.
  - Wordmark: *SERBA 99RIBU* berada persis di tengah horizontal (*centered*), huruf kapital, tracking `+0.25em`.
- **State Saat Di-scroll (Scrolled / Sticky):**
  - Transisi halus (250ms ease).
  - Latar belakang: Putih hangat (`#fafaf9`) dengan `backdrop-filter: blur(16px)` dan border bawah hairline `1px solid rgba(0,0,0,0.06)`.
  - Warna Teks & Ikon: Charcoal gelap (`#18181b`).
- **Anatomi Navigasi Kiri:**
  - Tombol toggle Menu dengan ikon hamburger minimalis (garis tipis 1.5px) + teks label *"MENU"*.
  - Tombol Pencarian Cepat (*Search*) dengan ikon kaca pembesar outline tipis.
- **Anatomi Navigasi Kanan:**
  - Tautan eksplorasi *"KATALOG"* atau *"PANDUAN GAYA HIDUP"*.

---

### 2.2 Anatomi Ambient Video Hero (The Signature LV Hero)
```
+---------------------------------------------------------------------------------------+
|                                                                                       |
|                                                                                       |
|                                [ CINEMATIC VIDEO 1080p ]                              |
|                              Autoplay, Loop, Muted 100vh                              |
|                                                                                       |
|                                                                                       |
|   (▶/❚❚)                                                                              |
|               Curated Essentials for the Modern Lifestyle                             |
|                       PREMIUM QUALITY, UNDER 99K                                      |
|                       <u>Discover the Collection</u>                                  |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```
- **Rasio & Dimensi:** `100vh` (viewport penuh) pada desktop, aspect ratio `16:9` atau `9:16` teradaptasi pada mobile.
- **Lapisan Video:**
  - File MP4 1080p terkompresi dengan bitrate optimal (~1.5 Mbps), 24–30 FPS.
  - Atribut HTML: `autoplay loop muted playsinline preload="auto" poster="hero-poster.jpg"`.
- **Lapisan Overlay:**
  - `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.3) 100%)`.
- **Anatomi Konten Teks (Bottom-Centered):**
  - **Jarak dari bawah:** `64px` (desktop) / `40px` (mobile).
  - **Headline Utama:**
    - Font: `'Cormorant Garamond', Georgia, serif`.
    - Ukuran: `32px` (mobile) / `52px` (desktop).
    - Bobot: SemiBold 600.
    - Warna: Putih bersih (`#ffffff`).
    - Teks: *"Curated Essentials for the Modern Lifestyle"*.
  - **Sub-headline:**
    - Font: `'Inter', sans-serif`.
    - Ukuran: `12px` (mobile) / `14px` (desktop).
    - Bobot: 600, All Caps, Tracking `+0.15em`.
    - Warna: Putih krem hangat (`#f5f4f0`).
    - Teks: *"PREMIUM QUALITY, UNDER 99K"*.
  - **Action Link:**
    - Teks: *"Discover the Collection"* / *"Jelajahi Koleksi"*.
    - Style: Link bergaris bawah tipis (*underline with 4px offset*) atau pill outline transparan.
- **Kontrol Video Aksesibilitas:**
  - Tombol melingkar kecil (36px) di sudut kiri bawah dengan ikon Play / Pause outline tipis untuk menghormati pengguna yang ingin menjeda gerakan.

---

### 2.3 Anatomi Pengelompokan Koleksi ("Explore a Selection")
Di situs Louis Vuitton, produk tidak pernah ditampilkan secara acak atau tercampur aduk. Setiap seksi memiliki tajuk editorial:
```
                               EXPLORE A SELECTION OF
                             Koleksi Fashion & Gaya Hidup
                 Kurasi busana dan aksesori modern dengan batas harga Rp99.000
```
- **Label Kicker:** All Caps, ukuran 11px/12px, tracking `+0.12em`, warna Slate Muted (`#71717a`).
- **Judul Seksi:** Cormorant Garamond Serif, ukuran 28px–36px, warna Charcoal (`#18181b`).
- **Deskripsi Singkat:** 1 baris pengantar filosofi kurasi kategori.
- **Tautan Eksplorasi Kategori:** Di sisi kanan tajuk seksi terdapat tautan teks *"Lihat Semua Koleksi [Kategori] →"*.

---

### 2.4 Anatomi Kartu Produk Mewah (The Luxury Product Card)
```
+------------------------------------------+
|                                          |
|                                          |
|                [ PACKSHOT ]              |
|             Aspect Ratio 1:1             |
|         Background: Soft Neutral         |
|               (#f5f4f0)                  |
|                                          |
|                                          |
+------------------------------------------+
  KECANTIKAN
  Hy London Extrait De Parfum 30ml
  Rp 99.000
  [ Lihat Detail di Mitra Resmi ]
```

1. **Bingkai Gambar (Packshot Stage):**
   - Aspect ratio murni `1:1` (kotak sempurna) atau `4:5` (portrait fashion).
   - Background stage: `#f6f5f3` (Warm studio neutral) atau `#ffffff`.
   - Radius: `10px – 14px` halus.
   - Hover Effect: Zoom foto sangat halus (`transform: scale(1.03)` dalam durasi `300ms ease-out`).
   - Tanpa border tebal atau bayangan kasar.
2. **Hierarki Teks:**
   - **Kategori:** Teks huruf besar 11px, warna `#71717a`, tracking `+0.05em`.
   - **Nama Produk:** Ukuran 15px/16px, bobot 500 (Medium), warna `#18181b`, `line-clamp: 2`.
   - **Harga:** Format bersih *"Rp 99.000"*, font Inter bobot 600, warna Terracotta `#c2410c` atau Charcoal `#18181b`.
3. **Tombol Interaksi:**
   - Tombol pill minimalis atau teks underline elegan yang muncul saat hover di desktop dan selalu tampak rapi di mobile.

---

### 2.5 Anatomi Menu Drawer & Dropdown (LV Luxury Drawer)
Saat ikon menu diklik:
- **Tampilan:** Slide-over drawer dari kiri (lebar 420px di desktop, 100% di mobile) dengan latar belakang putih bersih (`#ffffff`).
- **Navigasi Departemen Utama:**
  - Tipografi besar (20px–24px) dengan font Cormorant Garamond atau Inter SemiBold.
  - Setiap kategori memiliki thumbnail editorial kecil yang merepresentasikan koleksi.
  - Tautan langsung ke setiap kategori:
    1. *Fashion Pria*
    2. *Fashion Wanita*
    3. *Kecantikan & Parfum*
    4. *Rumah Tangga & Dapur*
    5. *Otomotif & Perkakas*
    6. *Elektronik & Gadget*
- **Seksi Bawah Menu:** Tautan panduan kurasi, tentang Serba 99ribu, dan informasi transparansi afiliasi.

---

### 2.6 Anatomi Footer (Understated Luxury Closing)
- **Latar Belakang:** Charcoal gelap (`#18181b`) atau Stone Warm (`#f5f4f0`).
- **Elemen:**
  - Baris atas: Statement kurasi *"Curated Essentials Under Rp 99.000"*.
  - Baris tengah: 4 kolom direktori navigasi (Koleksi, Panduan Belanja, Bantuan & FAQ, Legal & Afiliasi).
  - Baris bawah: Pemberitahuan legalitas dan etika afiliasi (*"Serba 99ribu adalah kurator independen yang mengarahkan pembeli ke mitra resmi terverifikasi"*).
