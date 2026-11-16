import type { ProductItem, CategoryGroup, BuyingGuideItem } from '../types/catalog';
import rawProducts from '../../products_99ribu.json';

export const categoryDefinitions = [
  {
    id: 'koleksi-fashion-wanita',
    slug: 'fashion-wanita',
    title: "Women's Fashion",
    shortTitle: 'Women',
    description: 'Functional shoulder bags, structured pouches, and comfortable slip-on footwear tailored for daily commutes.'
  },
  {
    id: 'koleksi-fashion-pria',
    slug: 'fashion-pria',
    title: "Men's Essentials",
    shortTitle: 'Men',
    description: 'Minimalist mandarin shirts, lightweight prayer vests, and durable everyday carrying gear.'
  },
  {
    id: 'koleksi-kecantikan',
    slug: 'kecantikan',
    title: 'Beauty & Fragrance',
    shortTitle: 'Beauty',
    description: 'Concentrated Extrait de Parfum formulations and botanical skin oils designed for daily care.'
  },
  {
    id: 'koleksi-rumah-tangga',
    slug: 'rumah-tangga',
    title: 'Home & Living',
    shortTitle: 'Home',
    description: 'Practical kitchen utilities and mechanical sanitation tools to keep your living space orderly.'
  },
  {
    id: 'koleksi-otomotif',
    slug: 'otomotif',
    title: 'Automotive & Riding',
    shortTitle: 'Automotive',
    description: 'Engine heat guards, fork braces, and durable accessories built for daily motorcycle riding.'
  },
  {
    id: 'koleksi-makanan-herbal',
    slug: 'makanan-herbal',
    title: 'Nutrition & Herbal',
    shortTitle: 'Nutrition',
    description: 'Unprocessed natural honey and verified herbal supplements to support daily vitality.'
  }
];

// Helper to generate natural English product descriptions and specifications
function getProductDescription(title: string, category: string): { description: string; features: string[] } {
  if (category === 'kecantikan') {
    if (title.toLowerCase().includes('parfum') || title.toLowerCase().includes('extrait')) {
      return {
        description: 'Concentrated Extrait de Parfum in a portable 30 ml glass spray bottle. Formulated with high-potency fragrance oils providing 6 to 8 hours of consistent scent projection without fabric staining.',
        features: [
          'Extrait de Parfum concentration (30 ml)',
          'Lasts 6 to 8 hours on skin and textiles',
          'Fine-mist glass spray atomizer',
          'Compact travel-friendly silhouette'
        ]
      };
    }
    return {
      description: 'Traditional botanical skin-conditioning oil processed under hygienic standards to maintain natural moisture balance, improve skin elasticity, and calm dry areas.',
      features: [
        'Pure botanical extract formulation',
        'Quick-absorbing texture without heavy residue',
        'Suitable for all skin types',
        'Sealed tamper-evident glass dropper bottle'
      ]
    };
  }

  if (category === 'fashion-pria') {
    if (title.toLowerCase().includes('rompi')) {
      return {
        description: 'Men’s classic prayer vest cut with an extended hemline to ensure full coverage during prayer movements. Sewn from lightweight breathable cotton-blend fabric that layers comfortably over daily wear.',
        features: [
          'Lightweight cotton-polyester blend',
          'Extended drop hem for modest prayer coverage',
          'Concealed zippered pockets for essentials',
          'Wrinkle-resistant and packable for travel'
        ]
      };
    }
    return {
      description: 'Tailored everyday men’s top with clean stitching and an upright band collar. Cut for a relaxed regular fit suitable for work, prayer, or casual outings.',
      features: [
        'Breathable tight-weave cotton fabric',
        'Minimalist mandarin stand collar',
        'Reinforced double-stitched seams',
        'Pre-shrunk fabric to retain shape after washing'
      ]
    };
  }

  if (category === 'fashion-wanita') {
    if (title.toLowerCase().includes('tas') || title.toLowerCase().includes('ransel') || title.toLowerCase().includes('pouch')) {
      return {
        description: 'Compact women’s shoulder bag designed with structured compartments to hold phones, cardholders, and cosmetic essentials. Equipped with an adjustable strap and smooth metal hardware.',
        features: [
          'Water-resistant textured synthetic leather',
          'Smooth gliding nylon zipper closure',
          'Adjustable shoulder strap with swivel clasp',
          'Reinforced interior fabric lining'
        ]
      };
    }
    return {
      description: 'Women’s lightweight slip-on flat shoes with breathable mesh uppers and cushioned footbeds to keep feet comfortable throughout active days.',
      features: [
        'Ventilated woven mesh upper',
        'Anti-slip textured rubber outsole',
        'Cushioned arch and heel support',
        'Easy slip-on design with elasticated collar'
      ]
    };
  }

  if (category === 'rumah-tangga') {
    return {
      description: 'Heavy-duty drain maintenance tool featuring a flexible steel spring auger that navigates pipe bends to clear hair, grease, and debris mechanically without harsh chemicals.',
      features: [
        'High-tensile flexible steel spring cable',
        'Ergonomic rotating hand crank',
        'Navigates sink, shower, and floor drain traps',
        'Corrosion-resistant steel wire construction'
      ]
    };
  }

  if (category === 'otomotif') {
    return {
      description: 'Precision-stamped heat shield and engine protection guard designed to shield exhaust pipes, frame tubes, and wiring from trail debris and excessive engine heat.',
      features: [
        'Heat-resistant stamped metal alloy',
        'Direct bolt-on fit with included mounting clamps',
        'Protects rider boots from direct exhaust contact',
        'Matte corrosion-resistant protective coating'
      ]
    };
  }

  return {
    description: 'Pure, verified food-grade nutritional supplement carefully bottled to preserve natural enzymes, nutrients, and authentic taste.',
    features: [
      '100% natural verified origin',
      'Airtight tamper-evident sealing',
      'Free from artificial colorants and additives',
      'Independently lab-verified purity'
    ]
  };
}

// Process and enrich all 42 products with clean slugs and English details
export const products: ProductItem[] = rawProducts.map((p) => {
  const slug = p.href.split('/produk/').pop() || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const details = getProductDescription(p.title, p.category);
  return {
    slug,
    title: p.title,
    price: p.price,
    href: p.href,
    image: p.image,
    alt: p.alt || p.title,
    category: p.category,
    description: details.description,
    features: details.features
  };
});

export function getAllProducts(): ProductItem[] {
  return products;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryGroups(): CategoryGroup[] {
  return categoryDefinitions.map((def) => {
    const groupProducts = products.filter((p) => {
      if (def.slug === 'makanan-herbal') {
        return p.category === 'makanan-herbal' || p.category === 'lainnya';
      }
      return p.category === def.slug;
    });

    return {
      ...def,
      products: groupProducts
    };
  }).filter((group) => group.products.length > 0);
}

export function getCategoryBySlug(slug: string): CategoryGroup | undefined {
  const groups = getCategoryGroups();
  return groups.find((g) => g.slug === slug);
}

export const buyingGuides: BuyingGuideItem[] = [
  {
    id: 'guide-1',
    title: 'Practical Home Maintenance',
    summary: 'Functional kitchen and plumbing essentials to keep your living space running smoothly without unnecessary expense.',
    image: 'https://99ribu.com/_next/image?url=%2Fmedia%2Fcatalog%2Falat-pembersih-pipa-saluran-tersumbat-27b33d356540.webp&w=384&q=60',
    categorySlug: 'rumah-tangga',
    targetAnchor: '/kategori/rumah-tangga'
  },
  {
    id: 'guide-2',
    title: 'The Daily Scent Profile',
    summary: 'Curated 30 ml Extrait de Parfum blends providing clean, long-lasting scent projection for morning commutes and evenings out.',
    image: 'https://99ribu.com/_next/image?url=%2Fmedia%2Fcatalog%2Fhy-london-nature-series-30ml-extrait-de-1c95b78ac93b.webp&w=384&q=60',
    categorySlug: 'kecantikan',
    targetAnchor: '/kategori/kecantikan'
  },
  {
    id: 'guide-3',
    title: 'Daily Commute & Carrying Gear',
    summary: 'Lightweight shoulder bags, protective motorcycle covers, and utility accessories engineered for life on the go.',
    image: 'https://99ribu.com/_next/image?url=%2Fmedia%2Fcatalog%2Fdianti-tas-selempang-wanita-pouch-make-e3c3b01e3b5e.webp&w=384&q=60',
    categorySlug: 'fashion-wanita',
    targetAnchor: '/kategori/fashion-wanita'
  }
];
