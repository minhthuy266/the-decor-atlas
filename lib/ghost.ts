import { Post, Tag } from '../types';

const URL = "https://slaymua.com";
const KEY = "ab74a5f89d0a4a3c4451decb46";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

// --- MOCK DATA FALLBACK (Used when API is 404 or unreachable) ---
const MOCK_DATA = {
    posts: [
        // --- BLOG POSTS ---
        {
            id: '1',
            uuid: 'uuid-1',
            title: "Japandi: The Art of Imperfect Minimalism",
            slug: "japandi-art-of-imperfect-minimalism",
            html: "<p>Content...</p>",
            feature_image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2000&auto=format&fit=crop",
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date(Date.now() - 10000000).toISOString(),
            custom_excerpt: "Exploring the fusion of Scandinavian functionality and Japanese rustic minimalism in modern homes.",
            visibility: "public",
            reading_time: 5,
            primary_tag: { id: '1', name: "Minimalism", slug: "minimalism" },
            tags: [{ id: '1', name: "Minimalism", slug: "minimalism" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: '2',
            uuid: 'uuid-2',
            title: "Material Focus: The Renaissance of Travertine",
            slug: "renaissance-of-travertine",
            feature_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
            featured: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date(Date.now() - 20000000).toISOString(),
            custom_excerpt: "Why the design world is trading high-gloss marble for the earthy, porous textures of limestone.",
            visibility: "public",
            primary_tag: { id: '3', name: "Materials", slug: "materials" },
            tags: [{ id: '3', name: "Materials", slug: "materials" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
             id: '3',
             uuid: 'uuid-3',
             title: "The Parisian Apartment: Mastering Small Spaces",
             slug: "parisian-apartment-guide",
             feature_image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
             featured: true,
             published_at: new Date(Date.now() - 40000000).toISOString(),
             created_at: new Date().toISOString(),
             updated_at: new Date().toISOString(),
             custom_excerpt: "Lessons in verticality, mixing eras, and the art of curated clutter from the French capital.",
             visibility: "public",
             primary_tag: { id: '5', name: "Small Spaces", slug: "small-spaces" },
             tags: [{ id: '5', name: "Small Spaces", slug: "small-spaces" }],
             primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        
        // --- SHOP PRODUCTS (Mocking Ghost Posts tagged as 'product') ---
        // Convention: custom_excerpt = "Price | Retailer | Brand"
        {
            id: 'p1',
            uuid: 'prod-1',
            title: "Akari 1A Table Lamp",
            slug: "product-akari-1a",
            feature_image: "https://images.unsplash.com/photo-1513506003011-38f044aff2dd?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$210 | Design Within Reach | Vitra", 
            visibility: "public",
            primary_tag: { id: '4', name: "Lighting", slug: "lighting" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: '4', name: "Lighting", slug: "lighting" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p2',
            uuid: 'prod-2',
            title: "Travertine Coffee Table",
            slug: "product-travertine-table",
            feature_image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop",
            featured: true,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$1,450 | Finnish Design Shop | GUBI",
            visibility: "public",
            primary_tag: { id: 'f', name: "Furniture", slug: "furniture" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 'f', name: "Furniture", slug: "furniture" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p3',
            uuid: 'prod-3',
            title: "Pacha Lounge Chair",
            slug: "product-pacha-chair",
            feature_image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
            featured: true,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$2,800 | 2Modern | GUBI",
            visibility: "public",
            primary_tag: { id: 'f', name: "Furniture", slug: "furniture" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 'f', name: "Furniture", slug: "furniture" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p4',
            uuid: 'prod-4',
            title: "Stoneware Vase No. 04",
            slug: "product-stoneware-vase",
            feature_image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$85 | Nordic Nest | Menu Space",
            visibility: "public",
            primary_tag: { id: 'd', name: "Decor", slug: "decor" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 'd', name: "Decor", slug: "decor" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p5',
            uuid: 'prod-5',
            title: "Linen Duvet Set",
            slug: "product-linen-duvet",
            feature_image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$329 | Parachute Home | Parachute",
            visibility: "public",
            primary_tag: { id: 't', name: "Textiles", slug: "textiles" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 't', name: "Textiles", slug: "textiles" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p6',
            uuid: 'prod-6',
            title: "Walnut Dining Chair",
            slug: "product-walnut-chair",
            feature_image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$895 | Herman Miller | Eames",
            visibility: "public",
            primary_tag: { id: 'f', name: "Furniture", slug: "furniture" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 'f', name: "Furniture", slug: "furniture" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p7',
            uuid: 'prod-7',
            title: "Anglepoise Desk Lamp",
            slug: "product-anglepoise",
            feature_image: "https://images.unsplash.com/photo-1534349762948-3a47050e3903?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$190 | Amazon | Anglepoise",
            visibility: "public",
            primary_tag: { id: '4', name: "Lighting", slug: "lighting" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: '4', name: "Lighting", slug: "lighting" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: 'p8',
            uuid: 'prod-8',
            title: "Abstract Wall Art",
            slug: "product-wall-art",
            feature_image: "https://images.unsplash.com/photo-1580130601254-05fa235e1e54?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            custom_excerpt: "$120 | The Poster Club | Studio 5",
            visibility: "public",
            primary_tag: { id: 'd', name: "Decor", slug: "decor" },
            tags: [{ id: 'shop', name: "product", slug: "product" }, { id: 'd', name: "Decor", slug: "decor" }],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        }
    ],
    tags: [
        { id: '1', name: "Minimalism", slug: "minimalism", description: "The pursuit of simplicity and clarity." },
        { id: '2', name: "Design Theory", slug: "design-theory", description: "Understanding the why behind the what." },
        { id: '3', name: "Materials", slug: "materials", description: "Exploring stone, wood, and textiles." },
        { id: '4', name: "Lighting", slug: "lighting", description: "Illuminating spaces with intention." },
        { id: '5', name: "Small Spaces", slug: "small-spaces", description: "Maximizing life in minimal square footage." },
        { id: '6', name: "Architecture", slug: "architecture", description: "Structural design and spatial theory." },
        { id: 'f', name: "Furniture", slug: "furniture", description: "Statement pieces." },
        { id: 'd', name: "Decor", slug: "decor", description: "Finishing touches." },
        { id: 't', name: "Textiles", slug: "textiles", description: "Soft goods." }
    ]
};

// Helper to ensure images have absolute URLs
const normalizeUrl = (url?: string) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  return `${URL}${url}`;
};

// Helper to map Ghost API response to our Post type
const mapPost = (p: any): Post => ({
  ...p,
  feature_image: normalizeUrl(p.feature_image) || DEFAULT_COVER,
  primary_author: p.primary_author ? {
    ...p.primary_author,
    profile_image: normalizeUrl(p.primary_author.profile_image)
  } : undefined,
  published_at: p.published_at || new Date().toISOString(),
  products: [] 
});

const mapTag = (t: any): Tag => ({
  ...t,
  feature_image: normalizeUrl(t.feature_image)
});

export async function getPosts(): Promise<Post[]> {
  try {
    // Exclude posts with tag 'product' from main blog feed
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&include=tags,authors&limit=20&formats=html&filter=tag:-product`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        // Filter mock data to exclude products
        return MOCK_DATA.posts.filter(p => !p.tags?.some(t => t.slug === 'product')).map(mapPost);
    }

    const data = await response.json();
    return (data.posts || []).map(mapPost);
  } catch (error) {
    console.warn("Failed to fetch posts, using Mock Data");
    return MOCK_DATA.posts.filter(p => !p.tags?.some(t => t.slug === 'product')).map(mapPost);
  }
}

export async function getSinglePost(slug: string): Promise<Post | null> {
  try {
    const endpoint = `${URL}/ghost/api/content/posts/slug/${slug}/?key=${KEY}&include=tags,authors&formats=html`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        const mock = MOCK_DATA.posts.find(p => p.slug === slug);
        return mock ? mapPost(mock) : null;
    }

    const data = await response.json();
    if (!data.posts || data.posts.length === 0) return null;
    
    return mapPost(data.posts[0]);
  } catch (error) {
    const mock = MOCK_DATA.posts.find(p => p.slug === slug);
    return mock ? mapPost(mock) : null;
  }
}

// --- NEW FUNCTION: Get Products (Posts tagged with 'product') ---
export async function getProducts(): Promise<Post[]> {
  try {
    // Fetch posts specifically tagged as 'product'
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=tag:product&include=tags&limit=all`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        // Filter mock data for products
        return MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === 'product')).map(mapPost);
    }
    
    const data = await response.json();
    return (data.posts || []).map(mapPost);
  } catch (error) {
    console.warn("Using Mock Products");
    return MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === 'product')).map(mapPost);
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const endpoint = `${URL}/ghost/api/content/tags/?key=${KEY}&limit=all&include=count.posts&order=count.posts%20desc`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        return MOCK_DATA.tags.map(mapTag);
    }
    const data = await response.json();
    return (data.tags || []).map(mapTag);
  } catch (error) {
    return MOCK_DATA.tags.map(mapTag);
  }
}

export async function getSingleTag(slug: string): Promise<Tag | null> {
  try {
    const endpoint = `${URL}/ghost/api/content/tags/slug/${slug}/?key=${KEY}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        const mock = MOCK_DATA.tags.find(t => t.slug === slug);
        return mock ? mapTag(mock) : null;
    }
    const data = await response.json();
    if (!data.tags || data.tags.length === 0) return null;
    return mapTag(data.tags[0]);
  } catch (error) {
    const mock = MOCK_DATA.tags.find(t => t.slug === slug);
    return mock ? mapTag(mock) : null;
  }
}

export interface PaginatedPosts {
  posts: Post[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    }
  }
}

export async function getPostsByTag(slug: string, page: number = 1, limit: number = 9): Promise<PaginatedPosts> {
  try {
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=tag:${slug}&include=tags,authors&limit=${limit}&page=${page}&formats=html`;
    const response = await fetch(endpoint);
    
    if (!response.ok) throw new Error("API Failed");

    const data = await response.json();
    return {
      posts: (data.posts || []).map(mapPost),
      meta: data.meta
    };
  } catch (error) {
    const filtered = MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === slug));
    return { 
      posts: filtered.map(mapPost), 
      meta: { pagination: { page: 1, limit, pages: 1, total: filtered.length, next: null, prev: null } } 
    };
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=title:~'${encodedQuery}'&limit=5&fields=title,slug,feature_image,published_at,excerpt`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("API Failed");
    const data = await response.json();
    return (data.posts || []).map(mapPost);
  } catch (error) {
    const lowerQ = query.toLowerCase();
    const filtered = MOCK_DATA.posts.filter(p => p.title.toLowerCase().includes(lowerQ));
    return filtered.map(mapPost);
  }
}