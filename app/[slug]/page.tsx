import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSinglePost, getPosts } from '@/lib/ghost';
import PostClient from './PostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(slug);
  if (!post) return { title: 'Not Found' };

  const siteUrl = 'https://thedecoratlas.com';
  const url = `${siteUrl}/${post.slug}`;
  const image = post.feature_image || `${siteUrl}/og-default.jpg`;

  return {
    title: post.title,
    description: post.custom_excerpt || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      url,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.primary_author?.name || 'The Decor Atlas'],
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      images: [image],
    },
    other: {
      'article:published_time': post.published_at,
      'article:author': post.primary_author?.name || 'The Decor Atlas',
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // Exclude known static routes
  const STATIC_ROUTES = ['about', 'shop', 'contact', 'privacy', 'terms', 'accessibility'];
  if (STATIC_ROUTES.includes(slug)) notFound();

  const [post, allPosts] = await Promise.all([getSinglePost(slug), getPosts()]);
  if (!post) notFound();

  const trendingPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 5);
  let related = post.primary_tag
    ? allPosts.filter((p) => p.slug !== slug && p.tags?.some((t) => t.id === post.primary_tag?.id))
    : [];
  if (related.length < 4) {
    const remaining = allPosts.filter((p) => p.slug !== slug && !related.includes(p));
    related = [...related, ...remaining];
  }

  // JSON-LD Schema
  const siteUrl = 'https://thedecoratlas.com';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(post.primary_tag
        ? [{ '@type': 'ListItem', position: 2, name: post.primary_tag.name, item: `${siteUrl}/tag/${post.primary_tag.slug}` }]
        : []),
      { '@type': 'ListItem', position: post.primary_tag ? 3 : 2, name: post.title, item: `${siteUrl}/${post.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${post.slug}` },
    headline: post.title,
    description: post.custom_excerpt || post.excerpt,
    image: [post.feature_image],
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Person', name: post.primary_author?.name || 'The Decor Atlas' },
    publisher: {
      '@type': 'Organization',
      name: 'The Decor Atlas',
      logo: { '@type': 'ImageObject', url: 'https://ui-avatars.com/api/?name=The+Decor+Atlas&background=111110&color=fff' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PostClient post={post} trendingPosts={trendingPosts} relatedPosts={related.slice(0, 4)} />
    </>
  );
}
