import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/privacy', '/terms', '/accessibility'],
      },
    ],
    sitemap: 'https://thedecoratlas.com/sitemap.xml',
    host: 'https://thedecoratlas.com',
  };
}
