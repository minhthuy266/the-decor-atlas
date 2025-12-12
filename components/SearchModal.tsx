import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, Loader, ArrowRight, TrendingUp } from 'lucide-react';
import { searchPosts } from '../lib/ghost';
import { Post } from '../types';
import { Link } from './Navbar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Fake popular searches for empty state
  const POPULAR_SEARCHES = ["Minimalism", "Small Spaces", "Kitchen", "Ceramics"];

  // Focus input when opened & handle body scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery(''); // Reset query on close
      setResults([]);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        const data = await searchPosts(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const hasResults = results.length > 0;
  const isTyping = query.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center bg-stone-100/90 backdrop-blur-2xl transition-all duration-500 animate-fade-in">
      
      {/* Close Button - Elegant & Absolute */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 p-4 group z-50"
      >
        <span className="sr-only">Close</span>
        <div className="relative w-8 h-8 md:w-10 md:h-10">
            <X size={40} strokeWidth={1} className="text-stone-400 group-hover:text-stone-900 transition-colors duration-300" />
        </div>
      </button>

      <div className={`w-full max-w-4xl px-6 transition-all duration-700 ease-out flex flex-col h-full ${isTyping ? 'pt-24 md:pt-32' : 'justify-center pb-32'}`}>
        
        {/* Search Input Area */}
        <div className="relative w-full group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Journal..."
            className="w-full bg-transparent border-b border-stone-300 py-4 md:py-6 text-3xl md:text-6xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-all duration-500 text-center md:text-left"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* Loader Absolute */}
          {loading && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Loader className="animate-spin text-stone-400" size={24} />
            </div>
          )}
        </div>

        {/* Empty State / Suggestions */}
        {!isTyping && (
            <div className="mt-12 text-center md:text-left animate-fade-in-up">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Trending Now</span>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {POPULAR_SEARCHES.map((term, i) => (
                        <button 
                            key={i}
                            onClick={() => setQuery(term)}
                            className="px-6 py-3 border border-stone-200 rounded-full text-stone-500 hover:text-stone-900 hover:border-stone-900 transition-all duration-300 bg-white/50"
                        >
                            {term}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Results List */}
        {isTyping && (
            <div className="mt-12 w-full flex-1 overflow-y-auto no-scrollbar pb-20">
            {hasResults ? (
                <div className="space-y-4 animate-fade-in-up">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 block mb-8">
                    {results.length} Stories Found
                </span>
                {results.map((post, idx) => (
                    <Link 
                    key={post.id} 
                    to={`/${post.slug}`}
                    // Slight stagger delay based on index could be added here
                    className="group flex items-center gap-6 md:gap-8 p-4 md:p-6 -mx-4 md:-mx-6 hover:bg-white/60 rounded-lg transition-all duration-300 border border-transparent hover:border-stone-100"
                    >
                    <div className="w-24 h-16 md:w-40 md:h-28 bg-stone-200 shrink-0 overflow-hidden shadow-sm">
                        <img 
                            src={post.feature_image} 
                            alt="" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" 
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-stone-400 font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                             <span>Read Story</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-3xl text-stone-900 group-hover:text-stone-600 transition-colors truncate">
                            {post.title}
                        </h3>
                        <p className="text-sm text-stone-400 line-clamp-1 mt-1 font-light hidden md:block opacity-60">
                            {post.excerpt}
                        </p>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 text-stone-300 group-hover:border-stone-900 group-hover:text-stone-900 transition-all duration-300 transform group-hover:rotate-[-45deg]">
                         <ArrowRight size={16} />
                    </div>
                    </Link>
                ))}
                </div>
            ) : !loading ? (
                <div className="text-center py-20 animate-fade-in">
                    <p className="font-serif text-2xl text-stone-400 mb-2">No stories found.</p>
                    <p className="text-sm text-stone-400">Try searching for "Design", "Art", or "Home".</p>
                </div>
            ) : null}
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;