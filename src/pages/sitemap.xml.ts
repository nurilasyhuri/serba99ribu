import type { APIRoute } from 'astro';
import { getCategoryGroups, getAllProducts } from '../utils/catalog';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://serba99ribu.com';
  const categoryGroups = getCategoryGroups();
  const allProducts = getAllProducts();
  const articles = await getCollection('artikel');
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
    {
      loc: `${siteUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${siteUrl}/artikel`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    ...categoryGroups.map((cat) => ({
      loc: `${siteUrl}/kategori/${cat.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    })),
    ...allProducts.map((prod) => ({
      loc: `${siteUrl}/produk/${prod.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    })),
    ...articles.map((art) => ({
      loc: `${siteUrl}/artikel/${art.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    }))
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
