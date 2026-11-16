import type { ProductItem, CategoryGroup } from '../types/catalog';

export const SITE_URL = 'https://serba99ribu.com';
export const SITE_NAME = 'Serba 99ribu';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-poster.jpg`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: DEFAULT_OG_IMAGE,
    description:
      'Curated lifestyle essentials across fashion, beauty, home goods, automotive, and nutrition, strictly capped at Rp 99.000.',
    currenciesAccepted: 'IDR',
    priceRange: 'Rp 25.000 - Rp 99.000',
    sameAs: ['https://99ribu.com'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID'
    }
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    publisher: {
      '@id': `${SITE_URL}/#organization`
    }
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

export function getProductSchema(product: ProductItem, categoryTitle?: string) {
  // Extract numeric price, default 99000 if not parseable
  const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 99000;
  const productCanonical = `${SITE_URL}/produk/${product.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productCanonical}/#product`,
    name: product.title,
    image: [product.image],
    description: product.description || `${product.title} curated lifestyle item under Rp 99.000.`,
    sku: product.slug,
    ...(categoryTitle && { category: categoryTitle }),
    brand: {
      '@type': 'Brand',
      name: 'Curated by Serba 99ribu'
    },
    offers: {
      '@type': 'Offer',
      url: product.href,
      priceCurrency: 'IDR',
      price: numericPrice,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: '99ribu.com',
        url: 'https://99ribu.com'
      }
    }
  };
}

export function getItemListSchema(name: string, products: ProductItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/produk/${prod.slug}`,
      name: prod.title
    }))
  };
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };
}
