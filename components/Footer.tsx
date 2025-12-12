import React from 'react';
import { openNewsletter } from './NewsletterModal';

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    openNewsletter();
  };

  return (
    <footer className="bg-stone-100 py-16 mt-20 border-t border-stone-200">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center text-center">
        <h2 className="font-serif text-2xl text-stone-800 mb-6">The Decor Atlas.</h2>
        
        <div className="max-w-xl mx-auto mb-10 text-stone-500 text-xs leading-relaxed">
          <p className="mb-2 font-bold uppercase tracking-widest text-stone-400">Affiliate Disclosure</p>
          <p>The Decor Atlas is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.</p>
        </div>

        <div className="flex space-x-6 mb-8 text-stone-500 text-sm tracking-wide">
          <a href="#" className="hover:text-stone-900 transition-colors">Instagram</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Pinterest</a>
          {/* Programmatic trigger for Portal */}
          <button onClick={handleSubscribe} className="hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit">Newsletter</button>
          <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
        </div>
        
        <p className="text-stone-400 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} The Decor Atlas. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;