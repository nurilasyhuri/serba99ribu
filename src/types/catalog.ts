export interface ProductItem {
  slug: string;
  title: string;
  price: string;
  href: string;
  image: string;
  alt: string;
  category: string;
  description?: string;
  features?: string[];
}

export interface CategoryGroup {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  products: ProductItem[];
}

export interface BuyingGuideItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  categorySlug: string;
  targetAnchor: string;
}
