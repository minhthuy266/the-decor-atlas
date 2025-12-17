import React, { useEffect, useState, useRef } from 'react';
import { Link } from '../components/Navbar';
import { getPosts, getProducts } from '../lib/ghost';
import { Post } from '../types';
import SEO from '../components/SEO';
import { ArrowRight, ArrowUpRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { openNewsletter } from '../components/NewsletterModal';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [amazonProducts, setAmazonProducts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ref for Slider
  const sliderRef = useRef<HTMLDivElement>(null);

  // Hero Image (High-end, Warm, Architectural)
  const HERO_IMAGE = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2600&auto=format&fit=crop";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, productsData] = await Promise.all([getPosts(), getProducts()]);
        setPosts(postsData);
        // Filter products that are specifically amazon finds or just general products
        setAmazonProducts(productsData.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
        // Scroll amount: slightly more than a card width (200px mobile / 260px desktop)
        const scrollAmount = 280; 
        sliderRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    openNewsletter();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center animate-pulse">
          <span className="font-serif text-2xl text-stone-300 tracking-widest uppercase font-bold">The Decor Atlas</span>
        </div>
      </div>
    );
  }

  // Section Data logic
  const hotPost = posts.find(p => p.tags?.some(t => t.slug === 'amazon-finds' || t.slug === 'organization')) || posts[0];
  const organizationPosts = posts.filter(p => p.tags?.some(t => t.slug === 'organization' || t.slug === 'small-spaces' || t.slug === 'kitchen-pantry'));
  const trendingPosts = posts.filter(p => p.id !== hotPost?.id); // Rest of feed

  return (
    <>
      <SEO 
        title="The Decor Atlas — Curated Home Decor" 
        description="A minimalist design blog featuring Amazon finds, organization hacks, and rental-friendly interior solutions." 
        type="website"
      />
      
      <main className="bg-stone-50 overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={HERO_IMAGE} 
                alt="Minimalist Interior"
                className="w-full h-full object-cover object-center animate-slow-zoom"
                loading="eager"
                // @ts-ignore
                fetchpriority="high"
                width="2600"
                height="1600"
              />
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-stone-900/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center text-white mt-16">
              <div className="animate-fade-in-up">
                <span className="inline-block py-2 px-6 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-8 shadow-lg">
                  Est. 2024
                </span>
                
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-6 drop-shadow-2xl font-bold tracking-tight">
                  Curated <span className="font-light text-stone-200">Simplicity</span>
                </h1>
                
                <p className="text-sm md:text-lg text-stone-100 font-normal max-w-lg mx-auto leading-relaxed mb-10 drop-shadow-md text-shadow">
                  Affordable luxury, Amazon finds, and organization hacks for the modern home.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Link to="/tag/amazon-finds" className="bg-white text-stone-900 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">
                      Shop Amazon Finds
                   </Link>
                   <Link to="/tag/organization" className="bg-transparent border border-white text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors">
                      Organization
                   </Link>
                </div>
              </div>
            </div>
        </section>

        {/* --- SECTION 1: AMAZON FAVORITES SLIDER (Updated for Mobile & Desktop Navigation) --- */}
        <section className="bg-white py-16 border-b border-stone-100 overflow-hidden">
           <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 block">The Edit</span>
                    <h3 className="font-serif text-3xl text-stone-900 font-bold tracking-tight">Amazon Favorites</h3>
                 </div>
                 
                 {/* Navigation Arrows (Visible on Mobile & Desktop) */}
                 <div className="flex gap-2 shrink-0">
                    <button 
                        onClick={() => scrollSlider('left')}
                        className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors active:bg-stone-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        onClick={() => scrollSlider('right')}
                        className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors active:bg-stone-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={18} />
                    </button>
                 </div>
              </div>

              {/* Horizontal Scroll Container */}
              <div 
                ref={sliderRef}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
              >
                  {amazonProducts.map((prod) => (
                      <div key={prod.id} className="snap-center md:snap-start shrink-0 w-[200px] md:w-[260px] flex flex-col group select-none">
                          <Link to={`/${prod.slug}`} className="block relative aspect-[3/4] bg-stone-100 mb-4 overflow-hidden rounded-sm cursor-pointer">
                             <img 
                                src={prod.feature_image} 
                                alt={prod.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                draggable="false"
                             />
                             <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <ShoppingBag size={14} className="text-stone-900" />
                             </div>
                          </Link>
                          
                          <h4 className="font-serif text-sm md:text-base text-stone-900 font-bold truncate pr-2 group-hover:text-stone-600 transition-colors">
                              <Link to={`/${prod.slug}`}>{prod.title}</Link>
                          </h4>
                          
                          <div className="flex justify-between items-center mt-1">
                             <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                                {prod.custom_excerpt?.split('|')[0] || 'See Price'}
                             </span>
                             <span className="text-[10px] text-stone-300 uppercase tracking-widest">
                                {prod.custom_excerpt?.split('|')[1] || 'Amazon'}
                             </span>
                          </div>
                      </div>
                  ))}

                  {/* View All Card - Fixed width to match products */}
                  <Link to="/tag/amazon-finds" className="snap-center md:snap-start shrink-0 w-[200px] md:w-[260px] flex flex-col items-center justify-center bg-stone-50 border border-stone-100 text-center hover:bg-stone-100 transition-colors aspect-[3/4] rounded-sm">
                      <span className="font-serif text-xl text-stone-900 mb-2">View All Finds</span>
                      <ArrowRight size={20} className="text-stone-400" />
                  </Link>
                  
                  {/* Spacer for right padding on mobile */}
                  <div className="w-2 shrink-0 md:hidden" />
              </div>
           </div>
        </section>

        {/* --- SECTION 2: SMALL SPACE & ORGANIZATION --- */}
        <section className="py-20 bg-stone-50">
           <div className="container mx-auto px-4 md:px-8 max-w-7xl">
              <div className="text-center max-w-2xl mx-auto mb-16">
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Problem Solvers</span>
                 <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Small Apartment? No Problem.</h2>
                 <p className="text-stone-500 font-light">Renter-friendly hacks and storage solutions that maximize your square footage without sacrificing style.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Feature Post */}
                 {hotPost && (
                    <Link to={`/${hotPost.slug}`} className="lg:col-span-2 group relative h-[400px] md:h-[500px] overflow-hidden rounded-sm bg-stone-200 block shadow-sm hover:shadow-lg transition-shadow">
                       <img src={hotPost.feature_image} alt={hotPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                       <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                          <span className="bg-white/20 backdrop-blur border border-white/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 inline-block">
                             {hotPost.primary_tag?.name}
                          </span>
                          <h3 className="font-serif text-3xl md:text-4xl mb-3 leading-tight font-bold">{hotPost.title}</h3>
                          <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest hover:underline decoration-white underline-offset-4">Read Article <ArrowRight size={12} className="ml-2" /></span>
                       </div>
                    </Link>
                 )}

                 {/* Vertical List */}
                 <div className="flex flex-col gap-6 justify-center">
                    {organizationPosts.slice(0, 3).map(post => (
                        <Link key={post.id} to={`/${post.slug}`} className="flex gap-4 items-center group bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                           <div className="w-20 h-20 bg-stone-200 shrink-0 overflow-hidden rounded-sm">
                              <img src={post.feature_image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                           </div>
                           <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">{post.primary_tag?.name}</span>
                              <h4 className="font-serif text-base text-stone-900 leading-tight group-hover:text-stone-600 transition-colors font-bold">{post.title}</h4>
                           </div>
                        </Link>
                    ))}
                    <Link to="/tag/organization" className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-stone-900 border border-stone-200 py-3 hover:bg-stone-900 hover:text-white transition-colors rounded-sm">
                       More Organization Hacks
                    </Link>
                 </div>
              </div>
           </div>
        </section>

        {/* --- SECTION 3: TRENDING NOW (Grid) --- */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-20 border-t border-stone-200">
          <div className="flex items-end justify-between mb-12">
             <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 block">The Journal</span>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-bold tracking-tight">Trending Now</h3>
             </div>
             <Link to="/tag/all" className="hidden md:flex gap-2 text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors">
               View Archive <ArrowRight size={14} />
             </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {trendingPosts.slice(0, 8).map((post) => (
              <article key={post.id} className="group flex flex-col h-full">
                <Link to={`/${post.slug}`} className="block overflow-hidden bg-stone-100 mb-4 relative aspect-[4/3] rounded-sm">
                  <img 
                    src={post.feature_image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <ArrowUpRight size={14} className="text-stone-900" />
                  </div>
                </Link>
                
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] tracking-widest uppercase text-stone-400 font-bold mb-2">
                      {post.primary_tag?.name}
                  </span>
                  
                  <h3 className="font-serif text-lg text-stone-900 mb-2 leading-snug group-hover:text-stone-600 transition-colors font-bold tracking-tight">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

      </main>
    </>
  );
};

export default Home;