import { Post, Tag } from '../types';

const URL = "https://slaymua.com";
const KEY = "ab74a5f89d0a4a3c4451decb46";
const DEFAULT_COVER = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

// --- MOCK PRODUCT CARD HTML (Reusable) ---
const MOCK_PRODUCT_HTML = `
<div class="kg-card kg-product-card">
    <div class="kg-product-card-container">
        <img src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600" width="600" height="400" class="kg-product-card-image" loading="lazy">
        <div class="kg-product-card-title-container">
            <h4 class="kg-product-card-title"><b><strong style="white-space: pre-wrap;">Travertine Coffee Table</strong></b></h4>
        </div>
        <div class="kg-product-card-description"><p dir="ltr"><span style="white-space: pre-wrap;">Solid stone with a hexagonal base. The perfect centerpiece for a minimalist living room.</span></p></div>
        <a href="#" class="kg-product-card-button kg-product-card-btn-accent" target="_blank" rel="noopener noreferrer"><span>View Details</span></a>
    </div>
</div>
`;

// --- MOCK DATA FALLBACK ---
const MOCK_DATA = {
    tags: [
        // --- SHOP ---
        { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds", description: "Hidden gems and prime-eligible decor favorites." },
        { id: 'looks', name: "Shop The Look", slug: "shop-the-look", description: "Curated rooms and exactly where to buy them." },
        { id: 'splurge', name: "Splurge vs. Save", slug: "splurge-vs-save", description: "High-end looks for every budget." },
        { id: 'gifts', name: "Gift Guides", slug: "gift-guides", description: "Thoughtful presents for design lovers." },
        
        // --- ORGANIZATION ---
        { id: 'kitchen', name: "Kitchen & Pantry", slug: "kitchen-pantry", description: "Aesthetic storage solutions for the heart of the home." },
        { id: 'closet', name: "Closet Organization", slug: "closet-organization", description: "Maximize your wardrobe space." },
        { id: 'small', name: "Small Space Solutions", slug: "small-spaces", description: "Big style for apartments and compact living." },
        
        // --- ROOMS ---
        { id: 'living', name: "Living Room", slug: "living-room", description: "Sofas, rugs, and coffee table styling." },
        { id: 'bedroom', name: "Bedroom", slug: "bedroom", description: "Create a restful, cozy sanctuary." },
        { id: 'office', name: "Home Office", slug: "home-office", description: "Productivity meets style." },
        
        // --- STYLES ---
        { id: 'organic', name: "Organic Modern", slug: "organic-modern", description: "Warm neutrals, wood textures, and soft lines." },
        { id: 'seasonal', name: "Seasonal Decor", slug: "seasonal-decor", description: "Holiday updates and seasonal refreshes." },
        
        // --- SYSTEM ---
        { id: 'product', name: "product", slug: "product", description: "Shop items" }
    ],
    posts: [
        // --- BLOG POSTS (Re-tagged for Strategy) ---
        {
            id: '1',
            uuid: 'uuid-1',
            title: "20 Amazon Home Finds That Look Expensive",
            slug: "amazon-home-finds-look-expensive",
            html: `<p>You don't need to spend a fortune to get that high-end organic modern look. We've scoured Amazon for the best ceramics, textiles, and lighting.</p><p>Below are our top picks for this month.</p> ${MOCK_PRODUCT_HTML} <p>These pieces sell out fast, so grab them while you can.</p>`,
            feature_image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop",
            featured: true,
            created_at: new Date().toISOString(),
            published_at: new Date(Date.now() - 10000000).toISOString(),
            custom_excerpt: "From travertine trays to linen curtains, here are the Prime-eligible pieces designers are secretly buying.",
            visibility: "public",
            primary_tag: { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" },
            tags: [
                { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" },
                { id: 'splurge', name: "Splurge vs. Save", slug: "splurge-vs-save" }
            ],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
            id: '2',
            uuid: 'uuid-2',
            title: "Small Apartment Organization: 5 Rental Hacks",
            slug: "small-apartment-organization-hacks",
            html: "<p>Living in a rental doesn't mean you have to sacrifice style for storage.</p>",
            feature_image: "https://images.unsplash.com/photo-1595515106967-0f3fa03068e8?q=80&w=2000&auto=format&fit=crop",
            featured: true,
            created_at: new Date().toISOString(),
            published_at: new Date(Date.now() - 20000000).toISOString(),
            custom_excerpt: "Maximize your vertical space and declutter your life with these renter-friendly solutions.",
            visibility: "public",
            primary_tag: { id: 'small', name: "Small Space Solutions", slug: "small-spaces" },
            tags: [
                { id: 'small', name: "Small Space Solutions", slug: "small-spaces" },
                { id: 'closet', name: "Closet Organization", slug: "closet-organization" }
            ],
            primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
             id: '3',
             uuid: 'uuid-3',
             title: "The Ultimate Kitchen Pantry Reset",
             slug: "ultimate-kitchen-pantry-reset",
             html: "<p>A disorganized pantry leads to food waste and cooking stress. Let's fix that.</p>",
             feature_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop",
             featured: false,
             published_at: new Date(Date.now() - 40000000).toISOString(),
             created_at: new Date().toISOString(),
             custom_excerpt: "Glass jars, woven baskets, and the exact labels we use to keep everything pristine.",
             visibility: "public",
             primary_tag: { id: 'kitchen', name: "Kitchen & Pantry", slug: "kitchen-pantry" },
             tags: [{ id: 'kitchen', name: "Kitchen & Pantry", slug: "kitchen-pantry" }],
             primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        {
             id: '4',
             uuid: 'uuid-4',
             title: "Organic Modern Living Room Refresh",
             slug: "organic-modern-living-room",
             html: "<p>How to balance clean lines with warm textures.</p>",
             feature_image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
             featured: false,
             published_at: new Date(Date.now() - 50000000).toISOString(),
             created_at: new Date().toISOString(),
             custom_excerpt: "We style a neutral living room using wood, stone, and bouclé fabric.",
             visibility: "public",
             primary_tag: { id: 'organic', name: "Organic Modern", slug: "organic-modern" },
             tags: [
                { id: 'organic', name: "Organic Modern", slug: "organic-modern" },
                { id: 'living', name: "Living Room", slug: "living-room" }
             ],
             primary_author: { id: '1', name: "The Decor Atlas", slug: "the-decor-atlas" }
        },
        // --- PRODUCTS ---
        {
            id: 'p1',
            uuid: 'prod-1',
            title: "Akari 1A Table Lamp",
            slug: "product-akari-1a",
            feature_image: "https://images.unsplash.com/photo-1513506003011-38f044aff2dd?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            custom_excerpt: "$210 | Amazon | Vitra", 
            visibility: "public",
            primary_tag: { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" },
            tags: [{ id: 'product', name: "product", slug: "product" }, { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" }]
        },
        {
            id: 'p2',
            uuid: 'prod-2',
            title: "Clear Stackable Bins (Set of 4)",
            slug: "product-bins",
            feature_image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
            featured: true,
            published_at: new Date().toISOString(),
            custom_excerpt: "$24.99 | Amazon | The Home Edit",
            visibility: "public",
            primary_tag: { id: 'kitchen', name: "Kitchen & Pantry", slug: "kitchen-pantry" },
            tags: [{ id: 'product', name: "product", slug: "product" }, { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" }]
        },
        {
            id: 'p3',
            uuid: 'prod-3',
            title: "Linen Duvet Cover",
            slug: "product-linen",
            feature_image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
            featured: true,
            published_at: new Date().toISOString(),
            custom_excerpt: "$180 | Amazon | Simple&Opulence",
            visibility: "public",
            primary_tag: { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" },
            tags: [{ id: 'product', name: "product", slug: "product" }, { id: 'amazon', name: "Amazon Finds", slug: "amazon-finds" }]
        },
        {
            id: 'p4',
            uuid: 'prod-4',
            title: "Stoneware Vase",
            slug: "product-vase",
            feature_image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop",
            featured: false,
            published_at: new Date().toISOString(),
            custom_excerpt: "$35 | H&M Home | H&M",
            visibility: "public",
            primary_tag: { id: 'looks', name: "Shop The Look", slug: "shop-the-look" },
            tags: [{ id: 'product', name: "product", slug: "product" }, { id: 'looks', name: "Shop The Look", slug: "shop-the-look" }]
        }
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
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&include=tags,authors&limit=20&formats=html&filter=tag:-product`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
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
    const endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=tag:product&include=tags&limit=all`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        return MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === 'product')).map(mapPost);
    }
    
    const data = await response.json();
    return (data.posts || []).map(mapPost);
  } catch (error) {
    return MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === 'product')).map(mapPost);
  }
}

export async function getTags(): Promise<Tag[]> {
  // Return the Mock Tags structure for consistent menu regardless of API
  return new Promise((resolve) => {
    resolve(MOCK_DATA.tags.map(mapTag));
  });
}

export async function getSingleTag(slug: string): Promise<Tag | null> {
  if (slug === 'all') {
    return {
      id: 'archive-all',
      name: 'The Archive',
      slug: 'all',
      description: 'A complete collection of journal entries, sorted chronologically.',
      feature_image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop'
    };
  }
  const mock = MOCK_DATA.tags.find(t => t.slug === slug);
  return mock ? mapTag(mock) : null;
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
    let endpoint = '';
    
    if (slug === 'all') {
         endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=tag:-product&include=tags,authors&limit=${limit}&page=${page}&formats=html`;
    } else {
         endpoint = `${URL}/ghost/api/content/posts/?key=${KEY}&filter=tag:${slug}&include=tags,authors&limit=${limit}&page=${page}&formats=html`;
    }

    const response = await fetch(endpoint);
    
    if (!response.ok) throw new Error("API Failed");

    const data = await response.json();
    return {
      posts: (data.posts || []).map(mapPost),
      meta: data.meta
    };
  } catch (error) {
    let filtered;
    if (slug === 'all') {
        filtered = MOCK_DATA.posts.filter(p => !p.tags?.some(t => t.slug === 'product'));
    } else {
        filtered = MOCK_DATA.posts.filter(p => p.tags?.some(t => t.slug === slug));
    }
    
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
