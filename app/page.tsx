import type { Metadata } from 'next';
import { getPosts, getProducts } from '@/lib/ghost';
import HomeClient from './HomeClient';

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2600&auto=format&fit=crop';

export const metadata: Metadata = {
  title: 'The Decor Atlas — Curated Home Decor',
  description:
    'A minimalist design blog featuring Amazon finds, organization hacks, and rental-friendly interior solutions for small spaces.',
  openGraph: {
    title: 'The Decor Atlas — Curated Home Decor',
    description:
      'A minimalist design blog featuring Amazon finds, organization hacks, and rental-friendly interior solutions for small spaces.',
    type: 'website',
    images: [{ url: FALLBACK_HERO, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [FALLBACK_HERO],
  },
};

export default async function HomePage() {
  const [posts, amazonProducts] = await Promise.all([getPosts(), getProducts()]);

  const hotPost =
    posts.find((p) => p.tags?.some((t) => t.slug === 'amazon-finds' || t.slug === 'organization')) ||
    posts[0];

  const organizationPosts = posts.filter((p) =>
    p.tags?.some((t) =>
      ['organization', 'small-spaces', 'kitchen-pantry'].includes(t.slug),
    ),
  );
  const trendingPosts = posts.filter((p) => p.id !== hotPost?.id);
  const featuredProducts = amazonProducts.slice(0, 8);

  // Use Ghost CMS image as hero if available, else fallback
  const heroBgImage = hotPost?.feature_image || FALLBACK_HERO;

  return (
    <HomeClient
      hotPost={hotPost}
      organizationPosts={organizationPosts}
      trendingPosts={trendingPosts}
      amazonProducts={featuredProducts}
      heroBgImage={heroBgImage}
    />
  );
}
