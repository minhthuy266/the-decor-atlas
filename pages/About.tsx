import React from 'react';
import { Link } from '../components/Navbar';
import SEO from '../components/SEO';
import { ArrowRight, Compass, Heart, Search, CheckCircle2, ShoppingBag } from 'lucide-react';
import { openNewsletter } from '../components/NewsletterModal';

const About: React.FC = () => {
  // Use native newsletter trigger
  const handleSubscribe = () => {
    openNewsletter();
  };

  const CATEGORIES = [
    { name: "Furniture", desc: "Sofas, Chairs, Tables", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop" },
    { name: "Lighting", desc: "Pendants, Lamps, Sconces", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop" },
    { name: "Textiles", desc: "Rugs, Curtains, Bedding", img: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop" },
    { name: "Decor", desc: "Vases, Art, Sculptures", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop" },
  ];

  const BRANDS = [
    "Herman Miller", "Knoll", "Vitra", "Ferm Living", "Menu Space", "Muuto", "GUBI", "Hay", "&Tradition", "Aesop"
  ];

  return (
    <>
      <SEO 
        title="About Us" 
        description="We curate the finest home decor and furniture to help you build a sanctuary." 
        type="website"
      />
      
      <main className="bg-stone-50 min-h-screen">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <div className="order-2 lg:order-1">
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Our Mission</span>
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-stone-900 leading-[1.1] mb-8">
                 Curating the <br/><span className="italic text-stone-500">Sanctuary.</span>
               </h1>
               <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed max-w-lg">
                 <p>
                   In a world of endless choices and fast furniture, <strong>The Decor Atlas</strong> exists to slow things down.
                 </p>
                 <p>
                   We believe that a home is not merely a container for things, but a canvas for living. Our goal is to filter out the noise and present you with only the most intentional, beautiful, and timeless pieces for your space.
                 </p>
               </div>
               
               <div className="mt-10 pt-10 border-t border-stone-200 flex gap-8">
                  <div>
                    <span className="block font-serif text-3xl text-stone-900">15k+</span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">Readers</span>
                  </div>
                  <div>
                    <span className="block font-serif text-3xl text-stone-900">500+</span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">Curated Objects</span>
                  </div>
               </div>
            </div>

            {/* Image Side */}
            <div className="order-1 lg:order-2 relative">
               <div className="aspect-[4/5] bg-stone-200 overflow-hidden relative rounded-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1200&auto=format&fit=crop" 
                    alt="Interior Design Studio" 
                    className="w-full h-full object-cover"
                  />
               </div>
               {/* Decorative Element */}
               <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                  <p className="font-serif italic text-xl text-stone-800">"The details are not the details. They make the design."</p>
               </div>
            </div>
          </div>
        </section>

        {/* --- WHAT WE COVER (The "Everything" Section) --- */}
        <section className="bg-white py-24 border-y border-stone-100">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">The Scope</span>
              <h2 className="font-serif text-4xl text-stone-900 mb-6">Everything Home.</h2>
              <p className="text-stone-500 font-light">
                From the foundation of your living room to the smallest ceramic detail on your bookshelf, we cover the full spectrum of interior design.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {CATEGORIES.map((cat, idx) => (
                 <div key={idx} className="group relative aspect-square overflow-hidden bg-stone-100 cursor-pointer">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                       <h3 className="font-serif text-2xl mb-1">{cat.name}</h3>
                       <p className="text-[10px] uppercase tracking-widest opacity-80">{cat.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- BRANDS WE ADMIRE (New Section) --- */}
        <section className="bg-stone-900 text-stone-400 py-20 border-y border-stone-800 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50 block mb-2">Curated Partners</span>
                <h3 className="font-serif text-2xl text-stone-200">Brands We Admire</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 px-4 max-w-5xl mx-auto">
                {BRANDS.map((brand, i) => (
                    <span key={i} className="font-serif text-2xl md:text-3xl italic text-stone-600 hover:text-stone-300 transition-colors duration-300 cursor-default">
                        {brand}
                    </span>
                ))}
            </div>
        </section>

        {/* --- HOW WE WORK (Affiliate Disclosure) --- */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
           <div className="bg-stone-100 p-8 md:p-16 rounded-sm">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                 <div>
                    <h3 className="font-serif text-3xl text-stone-900 mb-6">How We Work</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                       The Decor Atlas is an independent digital publication. To keep our content free for readers, we participate in various affiliate marketing programs.
                    </p>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                       This means that when you click on links to products we recommend and make a purchase, we may earn a small commission. <strong>This comes at no extra cost to you.</strong>
                    </p>
                    <div className="flex flex-col gap-4 mt-8">
                       <div className="flex items-start gap-4">
                          <div className="bg-white p-2 rounded-full text-stone-900"><Search size={18} /></div>
                          <div>
                             <h4 className="font-bold text-sm uppercase tracking-widest text-stone-900">1. We Hunt</h4>
                             <p className="text-sm text-stone-500 mt-1">We spend hours scouring retailers, estate sales, and artisan shops to find the best pieces.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="bg-white p-2 rounded-full text-stone-900"><CheckCircle2 size={18} /></div>
                          <div>
                             <h4 className="font-bold text-sm uppercase tracking-widest text-stone-900">2. We Curate</h4>
                             <p className="text-sm text-stone-500 mt-1">We only recommend items we truly love, value for quality, or have tested ourselves.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="bg-white p-2 rounded-full text-stone-900"><ShoppingBag size={18} /></div>
                          <div>
                             <h4 className="font-bold text-sm uppercase tracking-widest text-stone-900">3. You Shop</h4>
                             <p className="text-sm text-stone-500 mt-1">You find the perfect piece for your home, supporting our work in the process.</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Quote Side */}
                 <div className="flex items-center justify-center h-full border-l border-stone-200 pl-0 md:pl-12">
                    <blockquote className="text-center">
                       <span className="block mb-6 text-stone-300"><Compass size={48} className="mx-auto"/></span>
                       <p className="font-serif text-3xl md:text-4xl text-stone-800 italic leading-tight mb-6">
                         "We don't just fill spaces. We curate moments of pause."
                       </p>
                       <cite className="not-italic text-xs font-bold tracking-[0.2em] uppercase text-stone-400">
                          The Editors
                       </cite>
                    </blockquote>
                 </div>
              </div>
           </div>
        </section>

        {/* --- NEWSLETTER CTA --- */}
        <section className="bg-stone-900 text-stone-100 py-24 text-center">
            <div className="container mx-auto px-4 max-w-2xl">
                <Heart size={32} className="mx-auto mb-6 text-stone-400" />
                <h2 className="font-serif text-4xl md:text-5xl mb-6">Join the Inner Circle.</h2>
                <p className="text-stone-400 mb-10 font-light text-lg leading-relaxed">
                    Receive our "Sunday Edit"—a weekly collection of design inspiration, hidden product gems, and architectural marvels.
                </p>
                <button 
                    onClick={handleSubscribe}
                    className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors"
                >
                    Subscribe Free <ArrowRight size={16} />
                </button>
            </div>
        </section>

      </main>
    </>
  );
};

export default About;