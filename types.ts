export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
}

export interface Product {
  name: string;
  image: string;
  price: string;
  currency: string;
  link: string; // Affiliate link
  retailer: string; // e.g., 'Amazon', 'West Elm'
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id?: string;
  feature_image?: string;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  primary_author?: Author;
  primary_tag?: Tag;
  authors?: Author[];
  tags?: Tag[];
  excerpt?: string;
  reading_time?: number;
  products?: Product[]; // New field for affiliate items
}

export interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}