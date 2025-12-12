import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { ArrowUpRight, Filter, ShoppingBag, ExternalLink, Star, ArrowRight, Loader } from 'lucide-react';
import { Link } from '../components/Navbar';
import { getProducts } from '../lib/ghost';
import { Post } from '../types';

// Helper to parse the custom "Price | Retailer | Brand" string from Ghost excerpt
const parseProductMeta = (excerpt?: string) => {
  if (!excerpt) return { price: 'See Price', retailer: 'Retailer', brand: 'Brand' };
  
  const parts = excerpt.split('|').map(s => s.trim());
  return {
    price: parts[0] || 'See Price',
    retailer: parts[1] || 'Retailer',
    brand: parts[2] || 'Design'
  };
};

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [isFiltering, setIsFiltering] = useState(false);

  // Hardcoded categories for filtering pills (Must match Ghost Tag names)
  const CATEGORIES = ["All", "Furniture", "Lighting", "Decor", "Textiles", "Kitchen"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtering Logic based on Primary Tag
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(p => p.primary_tag?.name === activeCategory || p.tags?.some(t => t.name === activeCategory));
  }, [activeCategory, products]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setIsFiltering(true);
    setActiveCategory(cat);
    setVisibleCount(12);
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  // Find a featured product (marked as 'featured' in Ghost)
  const featuredProduct = products.find(p => p.featured) || products[0];

  return (
    <>
      <SEO 
        title="The Shop" 
        description="A curated selection of timeless furniture and decor." 
        type="website"
      />
      
      <main className="bg-white min-h-screen pt-24">
        
        {/* --- COMPACT HERO SECTION --- */}
        {/* Reduced height and visual weight per user request */}
        <section className="container mx-auto px-4 md:px-8 max-w-7xl mb-12">
            <div className="bg-stone-50 border border-stone-100 rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative">
                <div className="z-10 max-w-lg">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 block flex items-center gap-2">
                        <Star size={10} className="fill-stone-400" /> Editor's Pick
                    </span>
                    {featuredProduct ? (
                        <>
                            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 leading-tight">
                                {featuredProduct.title}
                            </h2>
                            <p className="text-stone-500 font-light text-sm mb-6 line-clamp-2">
                                {featuredProduct.custom_excerpt ? parseProductMeta(featuredProduct.custom_excerpt).brand : 'Featured Collection'}
                            </p>
                            <Link 
                                to={`/${featuredProduct.slug}`} 
                                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-all"
                            >
                                Shop Item <ArrowRight size={12} className="ml-2" />
                            </Link>
                        </>
                    ) : (
                        <div className="animate-pulse h-20 bg-stone-200 rounded w-full"></div>
                    )}
                </div>
                
                {/* Decorative Image on right (Smaller, not full width) */}
                {featuredProduct && (
                    <div className="mt-8 md:mt-0 md:w-1/3 aspect-square md:aspect-[4/3] bg-white p-2 shadow-sm rotate-3 hover:rotate-0 transition-transform duration-700">
                        <img 
                            src={featuredProduct.feature_image} 
                            alt={featuredProduct.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </section>

        {/* --- STICKY FILTER BAR --- */}
        <div className="sticky top-[60px] md:top-[74px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
                    <div className="flex items-baseline gap-3 shrink-0 self-start md:self-auto">
                        <h1 className="font-serif text-xl text-stone-900">The Edit</h1>
                        <span className="text-xs text-stone-400 font-bold">{filteredProducts.length} Items</span>
                    </div>

                    <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`
                                        px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border
                                        ${activeCategory === cat 
                                            ? 'bg-stone-900 text-white border-stone-900' 
                                            : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-900'
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <section className="py-10 min-h-[400px]">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-stone-100 aspect-[3/4] mb-4"></div>
                                <div className="h-4 bg-stone-100 w-3/4 mb-2"></div>
                                <div className="h-3 bg-stone-100 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Empty State */}
                        {!isFiltering && displayedProducts.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="font-serif text-xl text-stone-400">No products found in this category.</p>
                                <button 
                                    onClick={() => handleCategoryChange("All")}
                                    className="mt-4 text-xs font-bold uppercase tracking-widest underline decoration-stone-300 underline-offset-4"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                            {displayedProducts.map((product) => {
                                const meta = parseProductMeta(product.custom_excerpt);
                                return (
                                    <div key={product.id} className="group flex flex-col relative">
                                        {/* Image Container */}
                                        <Link to={`/${product.slug}`} className="block relative aspect-[3/4] bg-stone-50 mb-4 overflow-hidden rounded-sm cursor-pointer">
                                            <img 
                                                src={product.feature_image} 
                                                alt={product.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            
                                            {/* Quick Action Button - Desktop */}
                                            <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                                                <button className="w-full bg-white text-stone-900 py-3 text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-colors">
                                                    View Details <ArrowUpRight size={12} />
                                                </button>
                                            </div>
                                        </Link>
                                        
                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 truncate pr-2">{meta.brand}</span>
                                                <span className="text-xs font-serif font-bold text-stone-900 whitespace-nowrap">{meta.price}</span>
                                            </div>
                                            <h3 className="font-serif text-base text-stone-900 leading-snug mb-3 group-hover:underline decoration-stone-200 underline-offset-2 cursor-pointer">
                                                <Link to={`/${product.slug}`}>{product.title}</Link>
                                            </h3>
                                            
                                            {/* Mobile Action Button */}
                                            <Link 
                                                to={`/${product.slug}`}
                                                className="md:hidden mt-auto w-full flex items-center justify-center gap-2 border border-stone-200 py-2.5 text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
                                            >
                                                <ShoppingBag size={12} /> Shop <ExternalLink size={10} className="ml-0.5 opacity-50" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Load More */}
                        {displayedProducts.length < filteredProducts.length && (
                            <div className="mt-20 text-center pb-10">
                                <button 
                                    onClick={handleLoadMore}
                                    className="group inline-flex items-center gap-3 px-10 py-4 border border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-all"
                                >
                                    Load More Items <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>

        {/* --- DISCLAIMER --- */}
        <div className="bg-stone-50 py-8 text-center border-t border-stone-100 mt-auto">
             <p className="text-[10px] text-stone-400 max-w-lg mx-auto leading-relaxed px-4">
                 *Prices updated daily. As an affiliate, we earn from qualifying purchases at no cost to you. 
             </p>
        </div>

      </main>
    </>
  );
};

export default Shop;