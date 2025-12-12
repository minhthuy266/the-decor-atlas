import React, { useEffect, useState } from 'react';
import { Link } from '../components/Navbar';
import { getPosts } from '../lib/ghost';
import { Post } from '../types';
import SEO from '../components/SEO';
import { format } from 'date-fns';
import { ArrowRight, Mail, ArrowDown, ArrowUpRight, Star } from 'lucide-react';
import { openNewsletter } from '../components/NewsletterModal';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero Image (High-end, Warm, Architectural)
  const HERO_IMAGE = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2600&auto=format&fit=crop";
  // Parallax Break Image (Texture, Concrete/Stone detail)
  const PARALLAX_IMAGE = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2600&auto=format&fit=crop";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Use native trigger
  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    openNewsletter();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center animate-pulse">
          <span className="font-serif text-2xl text-stone-300 tracking-[0.2em] uppercase">The Decor Atlas</span>
        </div>
      </div>
    );
  }

  // Layout Logic
  const latestPost = posts[0];
  const recentPosts = posts.slice(1, 4); // Next 3 posts for the sidebar
  const archivePosts = posts.slice(4);   // Rest for the grid

  const MARQUEE_ITEMS = [
    "Architecture", "Interior Design", "Slow Living", "Sustainability", "Craftsmanship",
    "Minimalism", "Art & Culture", "Wellness"
  ];

  const TRUST_LOGOS = ["Vogue Living", "Architectural Digest", "Elle Decor", "Kinfolk", "Dezeen"];

  // Updated Mock Curated Products (Fixed broken link)
  const CURATED_PICKS = [
    { name: "Travertine Bowl", price: "$145", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop" },
    { name: "Linen Lounge Chair", price: "$890", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop" },
    { name: "Ceramic Vase No. 4", price: "$65", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop" },
    { name: "Oak Coffee Table", price: "$420", img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <>
      <SEO 
        title="The Decor Atlas — Curated Interiors" 
        description="Exploring the intersection of minimalist design, intentional living, and architectural beauty." 
        type="website"
      />
      
      <main className="bg-stone-50 overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={HERO_IMAGE} 
                alt="Minimalist Interior"
                className="w-full h-full object-cover object-center animate-slow-zoom"
              />
              
              {/* Layer 0: Top Gradient for Header Visibility */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

              {/* Layer 1: Subtle warm overlay */}
              <div className="absolute inset-0 bg-stone-900/10" />
              
              {/* Layer 2: Bottom Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center text-white mt-10">
              <div className="animate-fade-in-up">
                <span className="inline-block mb-6 text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 text-shadow-sm">
                  Est. 2024 • A Design Journal
                </span>
                
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 font-normal tracking-tight drop-shadow-lg">
                  Curated <br/> <span className="italic font-light opacity-90">Simplicity.</span>
                </h1>
                
                <p className="text-sm md:text-lg text-stone-100 font-light max-w-lg mx-auto leading-relaxed mb-12 drop-shadow-md opacity-90">
                  A digital sanctuary for those who believe a home is not just built, but intentionally curated.
                </p>
                
                <div 
                   onClick={() => document.getElementById('journal-start')?.scrollIntoView({ behavior: 'smooth' })}
                   className="flex flex-col items-center animate-bounce-slow opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
                >
                   <span className="text-[9px] uppercase tracking-widest mb-3 font-bold group-hover:translate-y-1 transition-transform">Discover</span>
                   <ArrowDown size={18} />
                </div>
              </div>
            </div>
        </section>

        {/* --- TRUST BAR --- */}
        <div className="bg-white border-b border-stone-100 py-10 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 opacity-100">
             <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400 hidden md:block">As seen in</span>
             <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               {TRUST_LOGOS.map((logo, i) => (
                 <span key={i} className="font-serif text-xl md:text-2xl text-stone-900">{logo}</span>
               ))}
             </div>
          </div>
        </div>

        {/* --- SCROLLING MARQUEE --- */}
        <div className="bg-stone-900 text-stone-400 border-b border-stone-800 overflow-hidden relative z-20 flex select-none py-1">
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10 px-10 py-4">
            {MARQUEE_ITEMS.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap hover:text-white transition-colors cursor-default">{item}</span>
                <span className="text-[8px] opacity-20">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10 px-10 py-4" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, i) => (
              <React.Fragment key={`dup-${i}`}>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap hover:text-white transition-colors cursor-default">{item}</span>
                <span className="text-[8px] opacity-20">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- MAGAZINE GRID --- */}
        <div id="journal-start" className="container mx-auto px-4 md:px-8 max-w-7xl pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Feature (Left) */}
            <div className="lg:col-span-8">
              {latestPost && (
                <Link to={`/${latestPost.slug}`} className="group flex flex-col md:flex-row shadow-sm hover:shadow-2xl transition-all duration-700 bg-white rounded-sm overflow-hidden h-full min-h-[550px]">
                  {/* Image Half */}
                  <div className="w-full md:w-[60%] relative overflow-hidden bg-stone-100">
                    <img 
                      src={latestPost.feature_image} 
                      alt={latestPost.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[9px] font-bold tracking-widest uppercase z-10 text-stone-900">
                      Cover Story
                    </div>
                  </div>
                  
                  {/* Text Half - Modern Sans Layout */}
                  <div className="w-full md:w-[40%] bg-white p-8 md:p-12 flex flex-col justify-center relative border-l border-stone-50">
                     <div className="flex items-center space-x-3 mb-8 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                        <span className="text-stone-900 border-b border-stone-200 pb-0.5">{latestPost.primary_tag?.name || 'Design'}</span>
                        <span className="w-px h-3 bg-stone-300" />
                        <time>{format(new Date(latestPost.published_at), 'MMM d')}</time>
                     </div>
                    
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight mb-6 group-hover:text-stone-600 transition-colors font-medium">
                      {latestPost.title}
                    </h2>
                    
                    <p className="text-stone-500 font-light leading-relaxed line-clamp-4 text-sm mb-10">
                      {latestPost.custom_excerpt || latestPost.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 border-b border-stone-200 pb-1 group-hover:border-stone-900 transition-colors">
                        Read Story <ArrowRight size={12} className="ml-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4 flex flex-col border-l border-stone-100 pl-0 lg:pl-12 pt-4 lg:pt-0">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-stone-100">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">Trending Now</span>
                <Link to="/tag/all" className="text-[10px] font-bold uppercase tracking-wider text-stone-900 hover:text-stone-600">View All</Link>
              </div>

              <div className="space-y-12">
                {recentPosts.map((post, idx) => (
                  <article key={post.id} className="group flex flex-col">
                    <Link to={`/${post.slug}`} className="flex gap-5 items-start">
                       <span className="text-3xl font-serif text-stone-200 font-bold leading-none -mt-1 w-8 group-hover:text-stone-400 transition-colors">
                         0{idx + 1}
                       </span>
                       <div className="flex-1">
                          <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-stone-400 mb-2">
                             {post.primary_tag?.name || 'Design'}
                          </span>
                          <h3 className="font-serif text-lg text-stone-900 leading-snug mb-2 group-hover:underline decoration-stone-200 underline-offset-4 transition-all">
                            {post.title}
                          </h3>
                       </div>
                       <div className="w-20 h-20 bg-stone-100 shrink-0 overflow-hidden rounded-sm">
                          <img 
                            src={post.feature_image} 
                            alt={post.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                          />
                       </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Enhanced Sidebar Newsletter */}
              <div className="mt-auto pt-16">
                <div className="bg-stone-50 border border-stone-100 p-8 text-center rounded-sm relative overflow-hidden group">
                   <h4 className="font-serif text-xl mb-3 relative z-10 text-stone-900">The Weekly Edit</h4>
                   <p className="text-xs text-stone-500 mb-6 font-light relative z-10 leading-relaxed px-2">
                     Join 15,000+ tastemakers receiving our curated digest.
                   </p>
                   <button 
                     onClick={handleSubscribe}
                     className="w-full block py-3 bg-stone-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors relative z-10 cursor-pointer shadow-md"
                   >
                     Subscribe
                   </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- THE CURATED EDIT (Shopping) --- */}
        <section className="bg-white py-24 border-t border-stone-100">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
             <div className="flex justify-between items-end mb-12">
               <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 block">The Shop</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal">Curated Objects</h3>
               </div>
               <a href="/shop" className="hidden md:flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 hover:text-stone-600 transition-colors border-b border-stone-200 pb-1 hover:border-stone-900">
                  Visit Shop <ArrowRight size={12} className="ml-2" />
               </a>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {CURATED_PICKS.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-[4/5] bg-stone-100 mb-4 overflow-hidden relative rounded-sm">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors" />
                         <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                             <span className="bg-white/90 backdrop-blur px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-stone-900 shadow-sm">Shop Now</span>
                         </div>
                     </div>
                     <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-stone-900 group-hover:text-stone-600 transition-colors">{item.name}</h4>
                        <p className="text-xs text-stone-500 font-bold mt-0.5">{item.price}</p>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-10 md:hidden text-center">
                <a href="/shop" className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900 border-b border-stone-200 pb-1">
                  Visit Shop <ArrowRight size={12} className="ml-2" />
               </a>
             </div>
          </div>
        </section>

        {/* --- PARALLAX BREAK --- */}
        <section 
          className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-fixed-parallax"
          style={{ backgroundImage: `url(${PARALLAX_IMAGE})` }}
        >
           <div className="absolute inset-0 bg-black/30" />
           <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
              <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight italic drop-shadow-xl mb-8 font-light">
                 "The details are not the details. They make the design."
              </blockquote>
              <cite className="block text-white/80 text-[10px] font-bold not-italic tracking-[0.25em] uppercase drop-shadow-md">
                 Charles Eames
              </cite>
           </div>
        </section>

        {/* --- ARCHIVE FEED --- */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-24">
          <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-6">
             <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-3 block">Journal</span>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal">Recent Stories</h3>
             </div>
             <div className="hidden md:flex gap-2">
                <button className="p-3 border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all rounded-full"><ArrowDown size={16}/></button>
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {archivePosts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full">
                <Link to={`/${post.slug}`} className="block overflow-hidden bg-stone-100 mb-5 relative aspect-[3/4] rounded-sm">
                  <img 
                    src={post.feature_image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-[1s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-md">
                     <ArrowUpRight size={14} className="text-stone-900" />
                  </div>
                </Link>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-stone-500 font-bold">
                      {post.primary_tag?.name || 'Living'}
                    </span>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest">
                       {post.reading_time || 5} min
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl text-stone-900 mb-3 leading-snug group-hover:text-stone-600 transition-colors font-medium">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-sm text-stone-500 font-light line-clamp-2 mt-auto leading-relaxed">
                    {post.custom_excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 flex justify-center">
             <Link to="/tag/all" className="group flex items-center gap-3 px-10 py-4 border border-stone-200 text-stone-600 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all bg-white shadow-sm hover:shadow-lg">
                Load More Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;