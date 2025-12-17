import React from 'react';
import { openNewsletter } from './NewsletterModal';
import { Link } from './Navbar';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    openNewsletter();
  };

  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-1">
             <Link to="/" className="font-serif text-2xl text-stone-900 block mb-6">The Decor Atlas.</Link>
             <p className="text-stone-500 text-sm leading-relaxed mb-6">
               Curated interiors for the modern minimalist. We believe in intentional living, timeless design, and quality over quantity.
             </p>
             <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                Est. 2024 • New York, NY
             </div>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-1 md:pl-8">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-stone-500">
               <li><Link to="/" className="hover:text-stone-900 transition-colors">Journal</Link></li>
               <li><Link to="/shop" className="hover:text-stone-900 transition-colors">The Shop</Link></li>
               <li><Link to="/about" className="hover:text-stone-900 transition-colors">About Us</Link></li>
               <li><Link to="/tag/minimalism" className="hover:text-stone-900 transition-colors">Minimalism</Link></li>
               <li><Link to="/tag/architecture" className="hover:text-stone-900 transition-colors">Architecture</Link></li>
            </ul>
          </div>

           {/* Column 3: Legal & Support (Crucial for US Trust) */}
           <div className="md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-stone-500">
               <li><Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link></li>
               <li><Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link></li>
               <li><Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link></li>
               <li><Link to="/accessibility" className="hover:text-stone-900 transition-colors">Accessibility Statement</Link></li>
               {/* CCPA Requirement */}
               <li><Link to="/privacy" className="hover:text-stone-900 transition-colors">Do Not Sell My Info</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-1">
             <h4 className="font-bold text-xs uppercase tracking-widest text-stone-900 mb-6">The Weekly Edit</h4>
             <p className="text-stone-500 text-xs mb-4">
                Join 15,000+ subscribers. No spam, just design.
             </p>
             <button 
                onClick={handleSubscribe} 
                className="w-full bg-stone-900 text-white py-3 px-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors"
             >
                Subscribe
             </button>
             <div className="flex gap-4 mt-8">
                <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-stone-900 transition-colors">Instagram</a>
                <a href="#" aria-label="Pinterest" className="text-stone-400 hover:text-stone-900 transition-colors">Pinterest</a>
                <a href="#" aria-label="Twitter" className="text-stone-400 hover:text-stone-900 transition-colors">Twitter</a>
             </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Affiliate */}
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="text-stone-400 text-[10px] uppercase tracking-widest">
              &copy; {new Date().getFullYear()} The Decor Atlas. All rights reserved.
           </div>
           <div className="text-stone-400 text-[10px] leading-relaxed max-w-lg text-left md:text-right">
             The Decor Atlas is a participant in the Amazon Services LLC Associates Program. We may earn commissions from qualifying purchases.
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;