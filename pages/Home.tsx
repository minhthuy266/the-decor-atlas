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
          <span className="font-serif text-2xl text-stone-300 tracking-widest uppercase font-bold">The Decor Atlas</span>
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
    { name: "Travertine Bowl", price: "$145", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop" }, // Replaced broken image
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
        <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={HERO_IMAGE} 
                alt="Minimalist Interior"
                className="w-full h-full object-cover object-center animate-slow-zoom"
              />
              
              {/* Layer 0: Top Gradient for Header Visibility */}
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

              {/* Layer 1: Overall darken for mood */}
              <div className="absolute inset-0 bg-stone-900/10" />
              {/* Layer 2: Bottom Gradient for text readability */}
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
                  A digital sanctuary for those who believe a home is not just built, but intentionally curated.
                </p>
                
                <div 
                   onClick={() => document.getElementById('journal-start')?.scrollIntoView({ behavior: 'smooth' })}
                   className="flex flex-col items-center animate-bounce-slow opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                >
                   <span className="text-[9px] uppercase tracking-widest mb-2 drop-shadow-md font-bold">Discover</span>
                   <ArrowDown size={20} className="drop-shadow-md" />
                </div>
              </div>
            </div>
        </section>

        {/* --- TRUST BAR --- */}
        <div className="bg-stone-100 border-b border-stone-200 py-8 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-500">
             <span className="text-[10px] uppercase tracking-widest font-bold hidden md:block">As seen in</span>
             <div className="flex flex-wrap justify-center gap-8 md:gap-12">
               {TRUST_LOGOS.map((logo, i) => (
                 <span key={i} className="font-serif italic text-lg md:text-xl text-stone-900 font-semibold tracking-tight">{logo}</span>
               ))}
             </div>
          </div>
        </div>

        {/* --- SCROLLING MARQUEE --- */}
        <div className="bg-stone-900 text-stone-400 border-b border-stone-800 overflow-hidden relative z-20 flex select-none">
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10 px-10 py-4">
            {MARQUEE_ITEMS.map((item, i) => (
              <React.Fragment key={i}>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap hover:text-white transition-colors cursor-default">{item}</span>
                <span className="text-[8px] opacity-30">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10 px-10 py-4" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, i) => (
              <React.Fragment key={`dup-${i}`}>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap hover:text-white transition-colors cursor-default">{item}</span>
                <span className="text-[8px] opacity-30">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* --- MAGAZINE GRID --- */}
        <div id="journal-start" className="container mx-auto px-4 md:px-8 max-w-7xl pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Feature (Left) */}
            <div className="lg:col-span-8">
              {latestPost && (
                <Link to={`/${latestPost.slug}`} className="group flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden h-full min-h-[500px]">
                  {/* Image Half */}
                  <div className="w-full md:w-[65%] relative overflow-hidden bg-stone-300">
                    <img 
                      src={latestPost.feature_image} 
                      alt={latestPost.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-stone-900 text-white px-5 py-3 text-[10px] font-bold tracking-widest uppercase z-10">
                      Cover Story
                    </div>
                  </div>
                  
                  {/* Text Half - Modern Sans Layout */}
                  <div className="w-full md:w-[35%] bg-stone-100 p-8 flex flex-col justify-center relative border-l border-white/50">
                     <div className="flex items-center space-x-2 mb-6 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                        <span className="text-stone-800">{latestPost.primary_tag?.name || 'Design'}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        <time>{format(new Date(latestPost.published_at), 'MMM d')}</time>
                     </div>
                    
                    <h2 className="font-serif text-3xl md:text-3xl text-stone-900 leading-tight mb-6 group-hover:text-stone-600 transition-colors font-bold tracking-tight">
                      {latestPost.title}
                    </h2>
                    
                    <p className="text-stone-500 font-normal leading-relaxed line-clamp-4 text-sm mb-8">
                      {latestPost.custom_excerpt || latestPost.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-stone-200 w-full">
                      <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-stone-900 group-hover:translate-x-2 transition-transform duration-300">
                        Read Story <ArrowRight size={12} className="ml-2" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4 flex flex-col border-l border-stone-100 pl-0 lg:pl-12">
              <div className="flex items-center justify-between mb-8 pb-2 border-b border-stone-200">
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400">Trending Now</span>
                <Link to="/tag/all" className="text-[10px] font-bold uppercase text-stone-900 hover:text-stone-600">View All</Link>
              </div>

              <div className="space-y-10">
                {recentPosts.map((post, idx) => (
                  <article key={post.id} className="group flex flex-col">
                    <Link to={`/${post.slug}`} className="flex gap-4 items-start">
                       <span className="text-2xl font-serif text-stone-300 font-bold leading-none -mt-1 w-6 group-hover:text-stone-400">
                         0{idx + 1}
                       </span>
                       <div className="flex-1">
                          <span className="block text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-1">
                             {post.primary_tag?.name || 'Design'}
                          </span>
                          <h3 className="font-serif text-lg text-stone-900 leading-snug mb-2 group-hover:underline decoration-stone-200 underline-offset-4 font-semibold tracking-tight">
                            {post.title}
                          </h3>
                       </div>
                       <div className="w-16 h-16 bg-stone-100 shrink-0 overflow-hidden rounded-sm">
                          <img 
                            src={post.feature_image} 
                            alt={post.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                       </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Enhanced Sidebar Newsletter - Native React Modal */}
              <div className="mt-auto pt-12">
                <div className="bg-stone-900 text-stone-100 p-8 text-center rounded-sm shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><Star size={64} /></div>
                   <h4 className="font-serif text-xl mb-2 relative z-10 font-bold">The Weekly Edit</h4>
                   <p className="text-xs opacity-70 mb-6 font-normal relative z-10 leading-relaxed">
                     Join 15,000+ tastemakers receiving our curated digest of design, travel, and culture.
                   </p>
                   {/* Changed to button with programmatic trigger */}
                   <button 
                     onClick={handleSubscribe}
                     className="w-full block py-3 bg-white text-stone-900 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors relative z-10 cursor-pointer"
                   >
                     Subscribe
                   </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- THE CURATED EDIT (Shopping) --- */}
        <section className="bg-white py-20 border-t border-stone-100">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
             <div className="flex justify-between items-end mb-10">
               <div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 block">The Shop</span>
                  <h3 className="font-serif text-3xl text-stone-900 font-bold tracking-tight">Curated Objects</h3>
               </div>
               <a href="#" className="hidden md:flex items-center text-xs font-bold tracking-widest uppercase text-stone-900 hover:text-stone-600 transition-colors">
                  Visit Shop <ArrowRight size={12} className="ml-2" />
               </a>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {CURATED_PICKS.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-square bg-stone-100 mb-4 overflow-hidden relative">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                     </div>
                     <div className="text-center">
                        <h4 className="font-serif text-lg text-stone-900 font-bold">{item.name}</h4>
                        <p className="text-xs text-stone-500 font-bold mt-1">{item.price}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* --- PARALLAX BREAK --- */}
        <section 
          className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-fixed-parallax"
          style={{ backgroundImage: `url(${PARALLAX_IMAGE})` }}
        >
           <div className="absolute inset-0 bg-stone-900/40" />
           <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
              <blockquote className="font-serif text-3xl md:text-5xl text-white leading-tight italic drop-shadow-xl mb-6 font-semibold">
                 "The details are not the details. They make the design."
              </blockquote>
              <cite className="block text-white/90 text-xs font-bold not-italic tracking-[0.2em] uppercase drop-shadow-md">
                 Charles Eames
              </cite>
           </div>
        </section>

        {/* --- ARCHIVE FEED --- */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl py-24">
          <div className="flex items-end justify-between mb-12 border-b border-stone-200 pb-4">
             <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2 block">Journal</span>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-bold tracking-tight">Recent Stories</h3>
             </div>
             <div className="hidden md:flex gap-2">
                <button className="p-2 border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all"><ArrowDown size={16}/></button>
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {archivePosts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full">
                <Link to={`/${post.slug}`} className="block overflow-hidden bg-stone-100 mb-4 relative aspect-[4/3]">
                  <img 
                    src={post.feature_image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <ArrowUpRight size={14} className="text-stone-900" />
                  </div>
                </Link>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] tracking-widest uppercase text-stone-500 font-bold">
                      {post.primary_tag?.name || 'Living'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                       {post.reading_time || 5} min read
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl text-stone-900 mb-2 leading-snug group-hover:text-stone-600 transition-colors font-bold tracking-tight">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-sm text-stone-500 font-normal line-clamp-2 mt-auto pt-2">
                    {post.custom_excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
             <Link to="/tag/all" className="group flex items-center gap-3 px-8 py-4 border border-stone-900 text-stone-900 text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-all">
                Load More Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;