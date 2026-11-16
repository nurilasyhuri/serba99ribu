import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artikelDir = path.join(projectRoot, 'src', 'content', 'artikel');

function getIndonesianDate(date = new Date()) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const wibDate = new Date(utc + (3600000 * 7));
  const day = wibDate.getDate();
  const month = months[wibDate.getMonth()];
  const year = wibDate.getFullYear();
  return `${day} ${month} ${year}`;
}

const NATIONWIDE_SHIPPING_TABLE = `## Tabel Estimasi Pengiriman Produk Serba 99ribu Se-Indonesia

Seluruh pesanan melalui Serba 99ribu diproses langsung oleh mitra penjual resmi via platform 99ribu.com dengan pengiriman ke seluruh wilayah:

| Wilayah Pengiriman | Kota / Kabupaten Tujuan Utama | Moda Kurir Rekomendasi | Estimasi Waktu Sampai | Opsi Layanan Bayar |
|---|---|---|---|:---:|
| **Jabodetabek & Banten** | Jakarta, Tangerang, Tangsel, Bekasi, Depok, Bogor | J&T, SiCepat, Anteraja Regular | 1 – 2 Hari Kerja | Transfer Bank & COD Tersedia |
| **Jawa Barat** | Bandung, Cimahi, Cirebon, Sukabumi, Karawang | JNE Reg, J&T Express, Ninja | 1 – 3 Hari Kerja | Transfer Bank & COD Tersedia |
| **Jawa Tengah & DIY** | Semarang, Solo, Yogyakarta, Magelang, Brebes | SiCepat, J&T, Wahana Kargo | 2 – 3 Hari Kerja | Transfer Bank & COD Tersedia |
| **Jawa Timur** | Surabaya, Malang, Sidoarjo, Kediri, Jember | J&T, JNE Reg, Pos Indonesia | 2 – 3 Hari Kerja | Transfer Bank & COD Tersedia |
| **Sumatera Hub** | Medan, Palembang, Pekanbaru, Batam, Lampung | JNE Reguler, J&T, Lion Parcel | 3 – 5 Hari Kerja | Transfer Bank & COD Tersedia |
| **Kalimantan & IKN** | Balikpapan, Samarinda, Banjarmasin, Pontianak | J&T, JNE Reguler, Lion Parcel | 3 – 6 Hari Kerja | Transfer Bank & COD Tersedia |
| **Sulawesi & Maluku** | Makassar, Manado, Kendari, Palu, Ambon | JNE Reguler, J&T Cargo | 4 – 7 Hari Kerja | Transfer Bank & COD Tersedia |
| **Bali & Nusa Tenggara** | Denpasar, Badung, Mataram Lombok, Kupang | J&T Express, SiCepat | 3 – 5 Hari Kerja | Transfer Bank & COD Tersedia |
| **Papua Raya** | Jayapura, Sorong, Timika, Merauke | JNE Regular, Pos Kilat Khusus | 5 – 9 Hari Kerja | Transfer Bank Terverifikasi |`;

const CONSUMER_CITIES = [
  { name: 'Jakarta Selatan', region: 'Kebayoran Baru, Tebet, Cilandak & Setiabudi', province: 'DKI Jakarta', characteristic: 'komunitas pekerja kantor muda, eksekutif muda, dan gaya hidup urban cerdas', preference: 'busana kasual rapi, tas kerja minimalis, dan wewangian extrait de parfum beraroma segar' },
  { name: 'Jakarta Barat', region: 'Grogol, Puri Indah, Kebon Jeruk & Palmerah', province: 'DKI Jakarta', characteristic: 'pusat aktivitas niaga grosir, hunian komersial padat, dan tren belanja online cepat', preference: 'tas bahu praktis wanita, busana muslim kekinian, dan aksesoris rumah tangga multifungsi' },
  { name: 'Jakarta Timur', region: 'Rawamangun, Duren Sawit, Cakung & Ciracas', province: 'DKI Jakarta', characteristic: 'kawasan keluarga muda produktif dan sentra reseller online aktif', preference: 'paket busana muslim pria, perlengkapan kebersihan rumah tangga, dan suplemen herbal' },
  { name: 'Surabaya', region: 'Gubeng, Wonokromo, Rungkut & Tandes', province: 'Jawa Timur', characteristic: 'metropolitan perdagangan dinamis dengan orientasi belanja nilai guna tinggi (value-for-money)', preference: 'busana katun adem harian, rompi shalat fungsional, dan alat pembersih pipa tersumbat' },
  { name: 'Bandung', region: 'Coblong, Dago, Buahbatu & Antapani', province: 'Jawa Barat', characteristic: 'pusat kreativitas mode distro dan preferensi desain estetik minimalis', preference: 'kaos katun motivasi sablon halus, tas ransel santai, dan parfum tahan lama aroma woody' },
  { name: 'Bekasi', region: 'Bekasi Barat, Harapan Indah, Tambun & Cikarang', province: 'Jawa Barat', characteristic: 'komunitas komuter dan keluarga mandiri yang mengutamakan efisiensi belanja bulanan', preference: 'perlengkapan sanitasi kamar mandi, flatshoes empuk kerja harian, dan madu murni stamina' },
  { name: 'Tangerang & Tangsel', region: 'Serpong, Bintaro, Pamulang & Karawaci', province: 'Banten', characteristic: 'hunian modern berpendidikan tinggi yang selektif dalam memilih kualitas material', preference: 'tas selempang elegan wanita, hair lotion bayi alami, dan kurasi gaya hidup estetik' },
  { name: 'Depok', region: 'Margonda, Cinere, Sawangan & Sukmajaya', province: 'Jawa Barat', characteristic: 'lingkungan mahasiswa dan keluarga muda melek digital yang gemar belanja promo cerdas', preference: 'tas ransel laptop kasual, kurta pria modern, dan kebutuhan esensial kosan murah' },
  { name: 'Bogor', region: 'Bogor Tengah, Cibinong, Sentul & Bojonggede', province: 'Jawa Barat', characteristic: 'wilayah berhawa sejuk dengan curah hujan tinggi yang membutuhkan perlengkapan serbaguna', preference: 'payung lipat kapsul mini anti-angin, selang magic hose kebun, dan susu kambing herbal' },
  { name: 'Semarang', region: 'Banyumanik, Tembalang, Simpang Lima & Ngaliyan', province: 'Jawa Tengah', characteristic: 'pusat ekonomi Jawa Tengah dengan masyarakat yang cermat dalam membandingkan harga', preference: 'kemko lengan pendek katun, tas bahu wanita serbaguna, dan produk pembersih kerak toilet' },
  { name: 'Yogyakarta', region: 'Depok Sleman, Umbulharjo, Gondokusuman & Bantul', province: 'D.I. Yogyakarta', characteristic: 'kota pelajar dan sentra industri kreatif yang menyukai produk berdesain autentik', preference: 'kaos sablon quotes bermakna, tas pouch kosmetik travel, dan wewangian botani alam' },
  { name: 'Solo / Surakarta', region: 'Banjarsari, Laweyan, Jebres & Solo Baru', province: 'Jawa Tengah', characteristic: 'akar tradisi sandang kuat dengan minat tinggi terhadap busana muslim terjangkau', preference: 'rompi shalat bahan katun wasabi, kurta pria kancing shanghai, dan herbal keluarga' },
  { name: 'Malang Raya', region: 'Lowokwaru, Klojen, Sukun & Batu', province: 'Jawa Timur', characteristic: 'kota wisata sejuk berpenduduk pelajar aktif dengan selera busana kasual dinamis', preference: 'tas ransel backpack sekolah/kuliah, flatshoes santai, dan kaos distro katun combed' },
  { name: 'Sidoarjo', region: 'Waru, Gedangan, Candi & Krian', province: 'Jawa Timur', characteristic: 'wilayah penyangga industri padat dengan minat belanja online metode COD sangat tinggi', preference: 'alat pembersih rumah tangga instan, aksesoris motor harian, dan suplemen madu asli' },
  { name: 'Medan', region: 'Medan Baru, Petisah, Johor & Helvetia', province: 'Sumatera Utara', characteristic: 'pusat perdagangan barat Indonesia dengan konsumen yang menyukai produk berpenampilan mewah', preference: 'tas bahu wanita motif elegan, parfum aroma floral mewah, dan aksesoris motor sporty' },
  { name: 'Palembang', region: 'Ilir Barat, Seberang Ulu, Sukarami & Plaju', province: 'Sumatera Selatan', characteristic: 'komunitas masyarakat religius dan sentra perdagangan busana muslim', preference: 'kemko lengan pendek adem, rompi shalat premium, dan minyak bulus perawatan kulit' },
  { name: 'Pekanbaru', region: 'Tampang, Marpoyan Damai, Sukajadi & Rumbai', province: 'Riau', characteristic: 'kota bisnis energi dan kelapa sawit dengan daya beli kuat untuk barang praktis online', preference: 'tas selempang kantor wanita, cover pelindung motor trail, dan parfum tahan panas' },
  { name: 'Batam', region: 'Batam Kota, Nagoya, Sekupang & Batu Aji', province: 'Kepulauan Riau', characteristic: 'kawasan perdagangan pulau terpadu dengan ekspektasi produk trendi berstandar rapi', preference: 'tas fashion impor look, wewangian extrait de parfum elegan, dan kosmetik perawatan' },
  { name: 'Bandar Lampung', region: 'Tanjung Karang, Kedaton, Way Halim & Teluk Betung', province: 'Lampung', characteristic: 'gerbang logistik Sumatera dengan perputaran transaksi belanja digital sangat cepat', preference: 'rompi shalat pria, tas backpack wanita, dan cairan pembersih kerak kamar mandi' },
  { name: 'Balikpapan', region: 'Balikpapan Selatan, Baru, Gunung Sari & Manggar', province: 'Kalimantan Timur', characteristic: 'kota pesisir modern teratur dengan standar hidup rapi dan kesadaran produk higienis', preference: 'hair lotion bayi organik, tas travel waterproof ocean bag, dan parfum alam' },
  { name: 'Samarinda', region: 'Samarinda Kota, Sungai Kunjang, Palaran & Ulu', province: 'Kalimantan Timur', characteristic: 'kota perdagangan tepi sungai dengan permintaan busana sopan dan kebutuhan rumah tangga tinggi', preference: 'kemko kasual pria, alat pembersih saluran pipa mampet, dan suplemen herbal' },
  { name: 'Banjarmasin', region: 'Banjarmasin Tengah, Banjarmasin Selatan & Banjarbaru', province: 'Kalimantan Selatan', characteristic: 'sentra perdagangan busana muslim yang sangat memperhatikan adab dan kerapian ibadah', preference: 'rompi shalat wasabi, kurta basalin, dan madu murni multiflora kesehatan' },
  { name: 'Pontianak', region: 'Pontianak Kota, Pontianak Selatan & Siantan', province: 'Kalimantan Barat', characteristic: 'iklim tropis khatulistiwa yang menuntut pakaian berdaya serap keringat tinggi', preference: 'kaos katun sejuk, flatshoes jala breathable, dan payung tahan panas radiasi UV' },
  { name: 'Makassar', region: 'Panakkukang, Tamalanrea, Mariso & Bontoala', province: 'Sulawesi Selatan', characteristic: 'hub komersial timur Indonesia dengan karakter konsumen ekspresif dan menyukai tren baru', preference: 'tas bahu kulit sintetis halus, rompi shalat pria, dan cover mesin motor CRF/KLX' },
  { name: 'Manado', region: 'Wenang, Malalayang, Tikala & Sario', province: 'Sulawesi Utara', characteristic: 'kota modis pesisir dengan minat tinggi terhadap fashion terkini dan wewangian segar', preference: 'parfum extrait de parfum beraroma citrus laut, shoulderbag wanita, dan kaos casual' },
  { name: 'Denpasar & Badung', region: 'Denpasar Selatan, Kuta Utara, Sanur & Mengwi', province: 'Bali', characteristic: 'gaya hidup santai bernuansa tropis dengan apresiasi terhadap barang fungsional simpel', preference: 'tas anti air ocean bag, flatshoes nyaman berjalan jauh, dan aroma parfum alam' },
  { name: 'Mataram Lombok', region: 'Cakranegara, Ampenan, Selaparang & Sandubaya', province: 'Nusa Tenggara Barat', characteristic: 'kawasan religius agrowisata yang gemar mencari busana ibadah pria dan suplemen alami', preference: 'rompi shalat katun, susu kambing bubuk stevia, dan kemko kancing shanghai' },
  { name: 'Padang', region: 'Padang Barat, Padang Timur, Kuranji & Koto Tangah', province: 'Sumatera Barat', characteristic: 'sentra budaya Minang dengan pertimbangan nilai belanja yang kritis dan teliti', preference: 'kurta muslim berkualitas, madu murni asli, dan tas ransel wanita bahan awet' },
  { name: 'Cirebon', region: 'Kejaksan, Kesambi, Harjamukti & Lemahwungkuk', province: 'Jawa Barat', characteristic: 'kota pelabuhan Pantura dengan perdagangan busana pasar malam dan online marak', preference: 'paket pakaian muslim pria terjangkau, aksesoris motor, dan pembersih kerak WC' },
  { name: 'Jayapura', region: 'Jayapura Utara, Abepura, Heram & Sentani', province: 'Papua', characteristic: 'konsumen pulau timur yang mengandalkan belanja online terpercaya dengan barang awet', preference: 'tas ransel tahan air, kaos katun tahan cuci, dan perlengkapan rumah tangga instan' }
];

const LIFESTYLE_ARCHETYPES = [
  {
    slugSuffix: 'panduan-memilih-rompi-shalat-kurta-pria-adem-di-bawah-99-ribu',
    category: 'Fashion Pria',
    serviceTitle: 'Panduan Memilih Rompi Shalat & Kurta Pria Bahan Adem Elegan di Bawah 99 Ribu',
    seoKeyword: 'rompi shalat kurta pria murah',
    tags: ['rompi shalat pria', 'kurta modern', 'kemko lengan pendek', 'busana muslim pria', 'baju shalat adem'],
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'kebutuhan busana ibadah pria yang menutup aurat sempurna saat ruku dan sujud, tidak panas saat dipakai shalat berjamaah di masjid, dan tetap modis untuk aktivitas harian',
    materialFocus: 'Kain katun wasabi poly-cotton berpori mikro yang jatuh rapi (*drape effect*), tidak mudah kusut, dan memiliki jahitan ganda di bagian lingkar leher serta belahan samping.',
    smartBuyerTips: [
      '**Perhatikan Panjang Bagian Belakang Rompi:** Saat memilih rompi shalat, pastikan potongan belakang lebih panjang 5–8 cm dari bagian depan (*hi-lo cut*). Hal ini penting untuk memastikan bagian pinggang belakang tetap tertutup rapat saat posisi sujud sempurna.',
      '**Pilih Resleting atau Kancing Berkualitas Halus:** Rompi shalat yang nyaman menggunakan resleting depan model invisible zipper atau kancing snap tertutup agar tidak menimbulkan gesekan di dada saat sujud.'
    ],
    tableSpec: [
      ['Material Kain Utama', 'Katun Wasabi / Poplin Poly-Cotton', 'Serat ringan, adem di kulit, dan tidak menerawang'],
      ['Pola Jahitan & Fitting', 'Regular Fit / Loose Cutting Hi-Lo', 'Nyaman dipakai melapis kaos oblong maupun kemeja kerja'],
      ['Aksen Saku & Fungsionalitas', 'Saku Kiri & Kanan Tersembunyi (Hidden Pocket)', 'Aman untuk menyimpan kunci mobil, smartphone, atau dompet'],
      ['Kemudahan Perawatan', 'Bisa Dicuci Mesin, Cepat Kering & Minim Setrika', 'Ideal untuk pakaian ibadah rutin harian'],
      ['Batas Harga Kurasi Serba 99ribu', 'Maksimal Rp 99.000 per potong', 'Kualitas sebanding produk butik seharga Rp 180.000+']
    ],
    recommendProducts: ['Rompi Shalat Wasabi', 'Kurta Basalin', 'Kemko Lengan Pendek Kemeja Kerah Sanghai']
  },
  {
    slugSuffix: 'rekomendasi-tas-wanita-shoulderbag-dan-backpack-elegan-di-bawah-99-ribu',
    category: 'Fashion Wanita',
    serviceTitle: 'Rekomendasi Tas Wanita Shoulderbag & Backpack Kulit Sintetis di Bawah 99 Ribu',
    seoKeyword: 'tas wanita shoulderbag murah elegan',
    tags: ['tas wanita shoulderbag', 'tas backpack wanita', 'tas selempang elegan', 'tas pesta murah', 'tas kuliah cewek'],
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'mencari tas kerja harian, tas hangout kasual, maupun tas kondangan dengan tampilan mewah, kompartemen muat banyak, dan bahan kulit sintetis awet tanpa takut terkelupas',
    materialFocus: 'Bahan Synthetic PU Leather Grade-A bertekstur jeruk halus atau matte lembut, dipadukan dengan aksesoris logam kaitan berlapis nikel anti-karat dan resleting anti-macet.',
    smartBuyerTips: [
      '**Cek Kelenturan Jahitan Tali Bahu (Strap Reinforcement):** Titik sambungan tali bahu dengan bodi tas wajib memiliki jahitan silang (box-X stitch) agar tidak putus saat tas terisi penuh botol minum, payung, dan pouch kosmetik.',
      '**Uji Ketahanan Permukaan Kulit Sintetis:** Bahan kulit sintetis yang bagus tidak mudah tergores kuku dan tidak berbau bahan kimia lem yang menyengat saat baru dibuka dari kemasan plastik.'
    ],
    tableSpec: [
      ['Bahan Permukaan Luar', 'Premium Synthetic PU Leather & Canvas Oxford', 'Tampilan mewah elegan, tahan percikan air ringan'],
      ['Lapisan Dalam (Furing)', 'Kain Furing Polyester Tebal Bertekstur Licin', 'Mudah dibersihkan dan tidak mudah robek tersangkut kunci'],
      ['Kapasitas Muatan Tas', 'Muat HP 6.7 Inch, Dompet Panjang, Pouch & Kacamata', 'Kompartemen terorganisir rapi dengan saku resleting dalam'],
      ['Pilihan Gaya Pemakaian', '2-in-1: Shoulder Bag & Sling Bag Selempang', 'Panjang strap fleksibel dapat disesuaikan tinggi badan'],
      ['Batas Harga Kurasi Serba 99ribu', 'Harga Tetap Rp 55.000 – Rp 99.000', 'Tampilan mirip tas branded departemen store Rp 250.000+']
    ],
    recommendProducts: ['Milea Shoulderbag Tas Bahu Wanita', 'Beryl Shoulderbag Tas Bahu Dan Selempang', 'Ransel Nadine Tas Backpack Wanita Simple']
  },
  {
    slugSuffix: 'solusi-pembersih-kerak-wc-dan-pelancar-pipa-tersumbat-di-bawah-99-ribu',
    category: 'Rumah Tangga',
    serviceTitle: 'Solusi Cepat Pembersih Kerak WC Membandel & Pipa Saluran Tersumbat di Bawah 99 Ribu',
    seoKeyword: 'pembersih kerak wc pelancar pipa mampet',
    categoryTag: 'rumah-tangga',
    tags: ['pembersih kerak wc', 'pelancar pipa tersumbat', 'pembersih toilet ampuh', 'selang magic hose', 'alat rumah tangga hemat'],
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'mengatasi masalah kloset kusam berkerak kuning/hitam menahun serta wastafel dan saluran pembuangan air kamar mandi yang mampet tanpa perlu membongkar lantai pipa berbiaya mahal',
    materialFocus: 'Formula kimia aktif non-asam keras (bebas HCl pekat yang merusak nat keramik) dan alat mekanik pelancar spiral kawat baja pegas elastis penembus sumbatan rambut/lemak.',
    smartBuyerTips: [
      '**Hindari Menggunakan Asam Sulfat / Air Keras di Pipa PVC:** Penggunaan cairan pelancar asam pekat murahan dapat melunakkan dan merusak sambungan lem pipa PVC di dalam cor dak rumah, memicu kebocoran plafon lantai bawah.',
      '**Gunakan Kuas Halus & Diamkan 10 Menit Sebelum Dibilas:** Untuk pembersih kerak porselen, oleskan cairan formula secara merata, biarkan zat aktif melunakkan kerak kalsium selama 10 menit, lalu gosok ringan dan siram dengan air mengalir.'
    ],
    tableSpec: [
      ['Kekuatan Pengikis Kerak', 'Formula Oksidasi Aktif Tanpa Asap Perih', 'Mengangkat kerak kuning air tanah tanpa mengikis glasir keramik'],
      ['Kemampuan Pelancar Pipa', 'Kawat Spiral Baja Fleksibel Panjang 5–10 Meter', 'Mampu menjangkau belokan pipa leher angsa perangkap lemak'],
      ['Keamanan Terhadap Kulit & Nat', 'Tidak Mengikis Semen Nat Keramik Lantai', 'Aman bagi septik tank dan tidak mematikan bakteri pengurai'],
      ['Efisiensi Tenaga Kerja', 'Cukup Dioles & Dibilas (Kerak Terangkat Spontan)', 'Menghemat waktu membersihkan rumah di akhir pekan'],
      ['Batas Harga Kurasi Serba 99ribu', 'Harga Hemat Hanya Rp 35.000 – Rp 85.000', 'Solusi tuntas tanpa memanggil jasa sedot pipa jutaan rupiah']
    ],
    recommendProducts: ['Alat Pembersih Kerak dan Plak WC Toilet', 'Alat Pembersih Pipa Saluran Tersumbat', 'Selang Magic Hose 15m']
  },
  {
    slugSuffix: 'rekomendasi-parfum-extrait-de-parfum-aroma-mewah-tahan-lama-di-bawah-99-ribu',
    category: 'Kecantikan',
    serviceTitle: 'Rekomendasi Extrait de Parfum 30ml Aroma Mewah Tahan 8 Jam di Bawah 99 Ribu',
    seoKeyword: 'extrait de parfum murah tahan lama',
    tags: ['extrait de parfum', 'parfum tahan lama', 'parfum mewah murah', 'hy london nature', 'parfum unisex segar'],
    heroImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'menikmati wewangian berkelas dengan konsentrasi minyak wangi pekat (*high oil concentration*) yang tahan seharian di iklim tropis beraktivitas aktif tanpa aroma menyengat alkohol murah',
    materialFocus: 'Konsentrasi Extrait de Parfum (kandungan fragrance oil 25%–35%) berbahan pelarut cosmetic grade yang lembut di kulit, dilengkapi botol kaca tebal dengan tutup spray kabut mikro halus.',
    smartBuyerTips: [
      '**Semprotkan pada Titik Nadi Tubuh (Pulse Points):** Agar wangi parfum tahan hingga malam hari, semprotkan pada pergelangan tangan dalam, belakang telinga, dan lipatan siku setelah mandi saat pori-pori kulit masih lembap.',
      '**Pahami Fase Piramida Aroma (Top, Heart, Base Notes):** Extrait de parfum berkualitas tidak berbau alkohol menyengat di awal. Setelah 15 menit, aroma akan berangsur berubah menuju aroma tengah dan base notes yang lembut memikat.'
    ],
    tableSpec: [
      ['Tingkat Konsentrasi Parfum', 'Extrait de Parfum (Konsentrasi Tertinggi)', 'Jauh lebih tahan lama dibandingkan Eau de Cologne atau Body Mist'],
      ['Ketahanan Wangi (Longevity)', '6 hingga 8+ Jam di Kulit (12 Jam di Pakaian)', 'Tetap tercium lembut meski berkeringat di luar ruangan'],
      ['Jejak Aroma (Sillage & Projection)', 'Moderate to Intimate Projection (Radius 1.5 Meter)', 'Memberikan kesan wangi elegan tanpa mengganggu orang sekitar'],
      ['Kemasan & Portabilitas', 'Botol Kaca Kristal 30ml Pocket Travel Size', 'Praktis dibawa di dalam tas kerja atau mobil harian'],
      ['Batas Harga Kurasi Serba 99ribu', 'Hanya Rp 75.000 – Rp 99.000 per botol', 'Nuansa aroma sekelas parfum desainer harga jutaan rupiah']
    ],
    recommendProducts: ['HY London Nature Series 30ml Extrait de', 'HY London Senandung Alam Nature 30ml', 'HY London Angin Pagi Nature Series 30ml']
  },
  {
    slugSuffix: 'aksesoris-pelindung-motor-trail-crf-150-dan-klx-150-di-bawah-99-ribu',
    category: 'Otomotif',
    serviceTitle: 'Pilihan Aksesoris Modifikasi & Pelindung Mesin CRF / KLX 150 di Bawah 99 Ribu',
    seoKeyword: 'aksesoris motor crf klx 150 murah',
    tags: ['aksesoris crf 150', 'cover mesin klx 150', 'cover disk carbon trail', 'komstir crf klx', 'variasi motor trail'],
    heroImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'melindungi blok mesin, piringan cakram, dan leher knalpot motor trail CRF 150L dan KLX 150 dari benturan batu kerikil serta lumpur saat trabas terjal maupun harian supermoto',
    materialFocus: 'Plastik ABS cetak injeksi tebal bertekstur carbon look motif hydrographic, plat baja press presisi lubang baut plug and play (PnP), dan bearing mangkok stang komstir baja tahan aus.',
    smartBuyerTips: [
      '**Pastikan Ukuran Lubang Baut Plug and Play (PnP):** Pilih cover pelindung mesin yang menggunakan dudukan baut bawaan pabrik rangka motor tanpa perlu mengebor atau merusak sasis asli.',
      '**Pilih Bahan Plastik Ulet Tahan Benturan:** Aksesoris motor trail wajib dibuat dari plastik polimer lentur yang tidak mudah pecah getas saat terkena loncatan batu tajam dari putaran roda depan.'
    ],
    tableSpec: [
      ['Material Pelindung Bodi', 'Injected ABS High-Impact & Metal Pressing', 'Menahan benturan kerikil tajam dan goresan ranting semak'],
      ['Pemasangan Komponen (Fitting)', '100% Plug and Play (PnP) Tanpa Ubah Rangka', 'Bisa dipasang mandiri di rumah menggunakan kunci standar'],
      ['Aksen Finishing Visual', 'Tekstur Serat Karbon Hydrographic Glossy', 'Tampilan motor tampak lebih garang, sporty, dan bersih'],
      ['Kompatibilitas Tipe Motor', 'Khusus Honda CRF 150L & Kawasaki KLX 150 / D-Tracker', 'Presisi menutup celah mesin samping dan piringan rem cakram'],
      ['Batas Harga Kurasi Serba 99ribu', 'Harga Sangat Murah Rp 45.000 – Rp 99.000', 'Fungsi proteksi sebanding produk aftermarket berharga mahal']
    ],
    recommendProducts: ['Cover Mesin CRF 150 Set Plus Rangka', 'Cover Disk Depan KLX 150 Motif Carbon', 'Komstir Mangkok Stang CRF 150 KLX 150']
  },
  {
    slugSuffix: 'panduan-memilih-madu-murni-asli-dan-suplemen-herbal-di-bawah-99-ribu',
    category: 'Makanan & Herbal',
    serviceTitle: 'Panduan Membedakan Madu Murni Asli & Suplemen Herbal Sehat di Bawah 99 Ribu',
    seoKeyword: 'madu murni asli herbal murah',
    tags: ['madu murni multiflora', 'susu kambing stevia', 'suplemen herbal keluarga', 'madu asli lebah', 'kesehatan alami murah'],
    heroImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'menjaga daya tahan tubuh keluarga dari flu dan kelelahan dengan konsumsi madu mentah murni serta susu kambing bebas gula pasir sintetis tanpa tertipu produk sirup gula palsu',
    materialFocus: 'Madu murni nektar multiflora hasil panen peternakan lebah Apis mellifera tanpa proses pasteurisasi berlebih (raw honey) dan susu kambing etawa bubuk pemanis daun stevia alami.',
    smartBuyerTips: [
      '**Uji Sederhana Kelarutan Madu di Dalam Air Dingin:** Madu murni berkadar air rendah akan langsung mengendap kental di dasar gelas saat dituang ke dalam air dingin, tidak langsung larut dan pudar seperti sirup gula encer.',
      '**Madu Asli Memiliki Enzim Diastase Alami:** Ciri khas madu mentah asli adalah terbentuknya buih busa halus dan gas alami saat botol terguncang, menandakan enzim bioaktif lebah masih hidup dan utuh berkhasiat.'
    ],
    tableSpec: [
      ['Sumber Nektar Lebah', 'Nektar Bunga Hutan Multiflora Alami', 'Kaya antioksidan flavonoid, asam fenolat, dan mineral esensial'],
      ['Kadar Pemanis Alami', '100% Gula Alami Fruktosa-Glukosa (Zero Sirup Jagung)', 'Aman dikonsumsi harian untuk anak-anak hingga orang dewasa'],
      ['Pilihan Susu Kambing Herbal', 'Susu Kambing Bubuk Diperkaya Daun Stevia', 'Rendah kalori, mudah dicerna lambung tanpa kembung laktosa'],
      ['Kemasan & Standar Keamanan', 'Botol Segel Higienis Food-Grade Bebas BPA', 'Menjaga kesegaran dan khasiat madu selama penyimpanan'],
      ['Batas Harga Kurasi Serba 99ribu', 'Harga Bersahabat Rp 60.000 – Rp 99.000', 'Kualitas madu murni peternak lokal terjamin keasliannya']
    ],
    recommendProducts: ['Madu Murni Multiflora 500gr', 'Supergoat Stevia Mini Package Membantu', 'SR12 Minyak Bulus']
  },
  {
    slugSuffix: 'peluang-usaha-reseller-dropship-produk-serba-99-ribu-modal-minim',
    category: 'Peluang Usaha',
    serviceTitle: 'Peluang Bisnis Reseller & Paket Usaha Produk Serba 99 Ribu Modal Kecil Cuan Cepat',
    seoKeyword: 'paket usaha reseller serba 99 ribu',
    tags: ['paket usaha baju 99 ribu', 'reseller serba 99 ribu', 'peluang usaha modal kecil', 'jualan online dropship', 'bisnis sampingan untung'],
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572248?auto=format&fit=crop&w=1200&q=80',
    curationContext: 'memulai bisnis sampingan jualan produk esensial dari rumah atau lapak bazar dengan modal awal di bawah 1 juta rupiah, perputaran stok cepat (*fast moving*), dan margin keuntungan tebal 30%–50%',
    materialFocus: 'Katalog terkurasi produk esensial harga grosir mulai Rp 35.000 hingga Rp 75.000 yang sangat mudah dijual kembali ke konsumen akhir dengan harga psikologis serba Rp 99.000.',
    smartBuyerTips: [
      '**Pilih Produk Kebutuhan Rutin yang Memiliki Repeat Order Tinggi:** Fokuskan katalog jualan Anda pada produk yang cepat habis dipakai seperti parfumextrait, madu herbal, busana muslim pria, dan alat kebersihan rumah tangga.',
      '**Manfaatkan Penjualan Sistem Bundling:** Tawarkan promo paket "Ambil 2 Hanya Rp 180.000" atau "Beli Rompi Shalat Gratis Parfum Mini" untuk menaikkan nilai rata-rata keranjang belanja (*average order value*) pembeli Anda.'
    ],
    tableSpec: [
      ['Estimasi Modal Awal Usaha', 'Mulai dari Rp 500.000 – Rp 1.000.000 Saja', 'Bisa mulai dengan stok 10 hingga 15 item terlaris (*best-seller*)'],
      ['Margin Keuntungan Kotor', 'Berkisar 30% hingga 55% per Transaksi', 'Beli harga modal grosir Rp 50.000, jual kembali Rp 99.000'],
      ['Dukungan Materi Promosi', 'Foto Produk Studio & Deskripsi Copywriting Siap Pakai', 'Tinggal posting di status WhatsApp, Instagram & Facebook Marketplace'],
      ['Kecepatan Perputaran Modal', 'Barang Fast Moving Cepat Laku dalam 7–14 Hari', 'Risiko barang macet (*dead stock*) sangat rendah'],
      ['Kemudahan Akses Platform', 'Terintegrasi Melalui Jaringan Mitra 99ribu.com', 'Sistem pemesanan mudah dengan opsi pengiriman langsung ke pembeli']
    ],
    recommendProducts: ['Rompi Shalat Classic', 'Milea Shoulderbag Tas Bahu Wanita', 'HY London Senandung Alam Nature 30ml']
  }
];

function generateProceduralArticle(city, archetype) {
  const slug = `${archetype.slugSuffix}-${city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const title = `${archetype.serviceTitle} di ${city.name}`;
  const seoTitle = `${archetype.serviceTitle} di ${city.name}`;
  const description = `Panduan kurasi ${archetype.seoKeyword} untuk warga ${city.name}, ${city.province} (${city.region}). Pilihan produk berkualitas teruji dengan harga maksimal Rp 99.000.`;

  const intro = `Bagi masyarakat di kawasan **${city.name}, ${city.province}**—khususnya pada sentra pemukiman dan aktivitas **${city.region}**—kebutuhan terhadap produk esensial berkualitas dengan harga terjangkau menjadi prioritas utama. Wilayah ini dikenal dengan **${city.characteristic}**, di mana konsumen semakin cermat membandingkan nilai manfaat barang (*value for money*) dibanding sekadar membeli merek mahal. Kebutuhan terhadap **${city.preference}** terus meningkat pesat seiring tingginya dinamika aktivitas masyarakat sehari-hari.

**Serba 99ribu** menghadirkan platform kurasi belanja independen yang mengumpulkan ragam produk esensial terbaik dengan satu prinsip tegas: **seluruh koleksi dipatok dengan harga maksimal Rp 99.000**. Simak ulasan mendalam seputar **${archetype.serviceTitle.toLowerCase()}** khusus bagi Anda di wilayah **${city.name}**.`;

  const section1 = `Dalam memilih produk untuk kebutuhan harian di kawasan **${city.name}**, konsumen kerap dihadapkan pada dilema antara produk impor murahan yang cepat rusak atau barang bermerek mall dengan harga ratusan ribu rupiah. Padahal, jika memahami standar bahan dan fungsi produk, Anda bisa mendapatkan barang berpenampilan mewah dan berdaya tahan lama di bawah plafon harga sembilan puluh sembilan ribu rupiah.

Kurasi ini difokuskan untuk menjawab ${archetype.curationContext}. Kami menyeleksi langsung mitra produsen dan UMKM terverifikasi yang menggunakan ${archetype.materialFocus}. Hasilnya, Anda di ${city.name} dapat menikmati produk berstandar tinggi yang fungsional, tahan lama, dan ramah di kantong.`;

  const smartBuyerNotes = archetype.smartBuyerTips.map((tip, idx) => `> ${idx + 1}. ${tip}`).join('\n>\n');
  const tableHeaderStr = `| ${archetype.tableSpec.map(item => item[0]).join(' | ')} |\n| ${archetype.tableSpec.map(() => '---').join(' | ')} |`;
  const row1 = archetype.tableSpec.map(item => item[1]).join(' | ');
  const row2 = archetype.tableSpec.map(item => item[2]).join(' | ');
  const tableRowsStr = `| ${row1} |\n| ${row2} |`;

  const steps = [
    {
      title: `Kurasi Bahan & Standar Jahitan / Formula`,
      desc: `Pemeriksaan sampel fisik produk untuk memastikan tidak ada cacat pabrik, benang jahitan lepas, atau bahan kimia berbahaya.`
    },
    {
      title: `Uji Kenyamanan & Daya Tahan Pemakaian Harian`,
      desc: `Pengujian langsung fungsi produk dalam skenario aktivitas harian masyarakat tropis Indonesia yang aktif dan dinamis.`
    },
    {
      title: `Pengecekan Harga Bersahabat (Cap Maksimal Rp 99.000)`,
      desc: `Memastikan harga eceran resmi tidak melebihi Rp 99.000 dengan nilai manfaat yang melampaui harga yang dibayarkan.`
    },
    {
      title: `Pengemasan Rapi & Pengiriman Cepat ke ${city.name}`,
      desc: `Pesanan dikemas menggunakan bubble wrap tebal dan kardus pelindung untuk menjamin barang sampai dalam kondisi mulus di alamat Anda.`
    }
  ];
  const stepsStr = steps.map((st, idx) => `${idx + 1}. **${st.title}:** ${st.desc}`).join('\n');

  const faqs = [
    {
      q: `Apakah seluruh produk di Serba 99ribu benar-benar berharga di bawah Rp 99.000?`,
      a: `Ya, komitmen platform kami adalah menetapkan batas harga maksimal Rp 99.000 untuk setiap item tunggal yang terdaftar dalam katalog kurasi.`
    },
    {
      q: `Berapa lama estimasi pengiriman pesanan ke wilayah ${city.name}?`,
      a: `Untuk wilayah ${city.name} dan sekitarnya, pengiriman memakan waktu rata-rata 1 hingga 3 hari kerja melalui ekspedisi kurir terpercaya.`
    },
    {
      q: `Bagaimana cara memesan produk rekomendasi ini?`,
      a: `Anda dapat mengeksplor katalog lengkap di website kami dan melakukan pemesanan langsung melalui link mitra resmi kami di 99ribu.com.`
    }
  ];

  const faqsMarkdown = faqs.map(f => `### ${f.q}\n${f.a}`).join('\n\n');
  const schemaFaqs = faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a.replace(/\n/g, ' ').replace(/"/g, '\\"')
    }
  }));

  const content = `---
title: '${title.replace(/'/g, "''")}'
seoTitle: '${seoTitle.replace(/'/g, "''")}'
description: '${description.replace(/'/g, "''")}'
publishDate: '${getIndonesianDate()}'
author: 'Editorial Serba 99ribu'
category: '${archetype.category}'
tags: [${[
  `serba 99ribu ${city.name.toLowerCase()}`,
  archetype.seoKeyword,
  ...archetype.tags
].map(t => `'${t}'`).join(', ')}]
heroImage: '${archetype.heroImage}'
featured: false
---

# ${title}

${intro}

---

## 1. Analisis Belanja Cerdas & Kebutuhan Konsumen di ${city.name}

${section1}

---

> ### Catatan Kurator & Tips Belanja Cerdas
${smartBuyerNotes}

---

## 2. Tabel Spesifikasi Mutu & Analisis Nilai Produk

${tableHeaderStr}
${tableRowsStr}

---

## 3. Langkah Kurasi Mutu Serba 99ribu

${stepsStr}

---

${NATIONWIDE_SHIPPING_TABLE}

---

## Tanya Jawab Seputar Belanja (FAQ)

${faqsMarkdown}

---

## Temukan Pilihan Produk Terbaik di Serba 99ribu

Miliki koleksi produk esensial berkualitas tinggi untuk gaya hidup Anda di wilayah **${city.name}** tanpa membebani anggaran bulanan:

- **Eksplor Katalog Lengkap**: [Lihat Seluruh Koleksi Under Rp 99.000](/#katalog)
- **Panduan Belanja Lainnya**: [Baca Editorial & Tips Belanja](/artikel)
- **Kunjungi Platform Belanja Resmi**: [Buka 99ribu.com](https://99ribu.com)

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": ${JSON.stringify(schemaFaqs, null, 2)}
}
\`\`\`
`;

  return {
    slug,
    title,
    content
  };
}

export function generateDailyArticles(count = 1) {
  console.log(`[ARTICLE-GENERATOR] Checking existing articles in ${artikelDir}...`);
  if (!fs.existsSync(artikelDir)) {
    fs.mkdirSync(artikelDir, { recursive: true });
  }

  const existingFiles = fs.readdirSync(artikelDir).filter((f) => f.endsWith('.md'));
  const existingSlugs = new Set(existingFiles.map((f) => f.replace(/\.md$/, '')));

  console.log(`[ARTICLE-GENERATOR] Found ${existingSlugs.size} existing articles.`);

  // Build programmatic matrix: 30 cities x 7 archetypes = 210 targeted articles
  const candidateTopics = [];
  for (const city of CONSUMER_CITIES) {
    for (const archetype of LIFESTYLE_ARCHETYPES) {
      candidateTopics.push(generateProceduralArticle(city, archetype));
    }
  }

  const availableTopics = candidateTopics.filter((art) => !existingSlugs.has(art.slug));

  if (availableTopics.length === 0) {
    console.log('[ARTICLE-GENERATOR] All 210+ programmatic topics already published!');
    return [];
  }

  const toPublish = availableTopics.slice(0, count);
  const generatedFiles = [];

  for (const item of toPublish) {
    const filePath = path.join(artikelDir, `${item.slug}.md`);
    fs.writeFileSync(filePath, item.content, 'utf8');
    console.log(`[ARTICLE-GENERATOR] Published new article: ${filePath}`);
    generatedFiles.push(filePath);
  }

  console.log(`[ARTICLE-GENERATOR] Successfully created ${generatedFiles.length} new article(s)!`);
  return generatedFiles;
}

// CLI execution support
const args = process.argv.slice(2);
let count = 1;
const countIdx = args.indexOf('--count');
if (countIdx !== -1 && args[countIdx + 1]) {
  count = parseInt(args[countIdx + 1], 10);
}

generateDailyArticles(count);
