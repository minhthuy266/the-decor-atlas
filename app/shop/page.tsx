import type { Metadata } from 'next';
import { getProducts } from '@/lib/ghost';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'The Shop',
  description: 'A curated selection of timeless furniture and decor.',
  alternates: { canonical: 'https://thedecoratlas.com/shop' },
  openGraph: {
    title: 'The Shop | The Decor Atlas',
    description: 'A curated selection of timeless furniture and decor.',
    url: 'https://thedecoratlas.com/shop',
  },
};

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient initialProducts={products} />;
}
