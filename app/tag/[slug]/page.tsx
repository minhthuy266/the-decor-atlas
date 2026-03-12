import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTag, getSingleTag, getTags } from '@/lib/ghost';
import CategoryClient from './CategoryClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const tags = await getTags();
    return tags.map((tag) => ({ slug: tag.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getSingleTag(slug);
  if (!tag) return { title: 'Not Found' };

  const siteUrl = 'https://thedecoratlas.com';
  const url = `${siteUrl}/tag/${slug}`;

  return {
    title: tag.name,
    description: tag.description || `Articles about ${tag.name} — The Decor Atlas`,
    alternates: { canonical: url },
    openGraph: {
      title: tag.name,
      description: tag.description || `Articles about ${tag.name}`,
      url,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [tag, { posts, meta }] = await Promise.all([
    getSingleTag(slug),
    getPostsByTag(slug, 1, 12),
  ]);

  if (!tag) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thedecoratlas.com' },
      { '@type': 'ListItem', position: 2, name: tag.name, item: `https://thedecoratlas.com/tag/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CategoryClient tag={tag} initialPosts={posts} initialMeta={meta} slug={slug} />
    </>
  );
}
