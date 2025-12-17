import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import { getTags } from '../lib/ghost';
import { Tag } from '../types';
import SearchModal from './SearchModal';

// --- ROUTER CONFIGURATION ---

// Safe access to environment variable
const getEnvRouterConfig = () => {
  try {
    // Check various ways the env might be exposed
    const envValue = import.meta.env?.VITE_USE_HASH_ROUTER;
    
    // Logic: Only use Hash Router if explicitly set to 'true'.
    // Otherwise, default to History API (Clean URLs).
    if (envValue === 'true') {
      return true;
    }
    
    // Default to false (History Mode / Clean URLs)
    // This fixes the issue where undefined defaulted to Hash.
    return false;
  } catch {
    return false;
  }
};

const USE_HASH_ROUTER = getEnvRouterConfig();

// --- Custom Router Implementation ---

const getLoc = () => {
  if (typeof window === 'undefined') return { pathname: '/', search: '', hash: '' };

  if (USE_HASH_ROUTER) {
    // Hash Mode: /#/about -> pathname: /about
    const hashPath = window.location.hash.slice(1);
    return {
      pathname: hashPath || '/',
      search: window.location.search,
      hash: window.location.hash
    };
  } else {
    // History Mode: /about -> pathname: /about
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    };
  }
};

export const useLocation = () => {
  const [location, setLocation] = useState(getLoc());

  useEffect(() => {
    const handler = () => setLocation(getLoc());

    if (USE_HASH_ROUTER) {
      window.addEventListener('hashchange', handler);
      return () => window.removeEventListener('hashchange', handler);
    } else {
      // Listen for browser back/forward interactions
      window.addEventListener('popstate', handler);
      return () => window.removeEventListener('popstate', handler);
    }
  }, []);

  return location;
};

export const useParams = <T extends Record<string, string | undefined>>() => {
  const { pathname } = useLocation();
  
  // Logic to parse params based on known patterns
  let slug: string | undefined = undefined;

  if (pathname.startsWith('/tag/')) {
    slug = pathname.replace(/^\/tag\//, '');
  } else if (pathname !== '/' && !pathname.startsWith('/about') && !pathname.startsWith('/shop')) { 
    slug = pathname.replace(/^\//, '');
  }

  return { slug } as unknown as T;
};

export const Link: React.FC<{ to: string; className?: string; children: React.ReactNode }> = ({ to, className, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    // Allow default behavior for new tabs (ctrl/meta click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    
    if (USE_HASH_ROUTER) {
        // Hash Mode Update
        window.location.hash = to;
    } else {
        // History Mode Update
        window.history.pushState({}, '', to);
        // Manually dispatch popstate to trigger re-render in useLocation
        window.dispatchEvent(new Event('popstate'));
    }
    
    window.scrollTo(0, 0);
  };

  // Construct href for accessibility and hover status bar
  const href = USE_HASH_ROUTER 
    ? (to.startsWith('#') ? to : `#${to}`) 
    : to;

  return (
    <a href={href} className={`${className || ''} cursor-pointer`} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Route: React.FC<{ path: string; element: React.ReactNode }> = () => null;

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  
  let match = null;
  React.Children.forEach(children, (child) => {
    if (match) return;
    if (!React.isValidElement(child)) return;
    
    const props = child.props as { path: string; element: React.ReactNode };
    
    // 1. Generic Exact Match
    if (props.path === pathname) {
      match = props.element;
      return;
    }
    
    // 2. Specific match for Tags
    if (props.path === '/tag/:slug' && pathname.startsWith('/tag/')) {
      match = props.element;
      return;
    }

    // 3. Match for Post slug (Catch-all)
    if (props.path === '/:slug' && pathname !== '/' && !pathname.startsWith('/tag/') && !pathname.startsWith('/shop') && !pathname.startsWith('/about')) {
       match = props.element;
    }
  });
  
  return <>{match}</>;
};

// --- End Custom Router ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch tags for menu
    getTags().then(fetchedTags => {
      // Tags to exclude from the Explore menu (Shop categories)
      const EXCLUDED_TAGS = ["All", "Furniture", "Lighting", "Decor", "Textiles", "Kitchen", "product"];
      
      const validTags = fetchedTags.filter(t => {
        const isInternal = t.name.startsWith('#');
        // Case-insensitive check
        const isExcluded = EXCLUDED_TAGS.some(ex => ex.toLowerCase() === t.name.toLowerCase() || ex.toLowerCase() === t.slug.toLowerCase());
        return !isInternal && !isExcluded;
      });
      setTags(validTags);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false); // Close search on route change
  }, [location]);

  // Determine styles based on route and scroll state
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;
  
  // Logic to highlight "Explore" if active
  const isExploreActive = location.pathname.startsWith('/tag/');

  // Base colors
  const textBase = isTransparent ? 'text-white' : 'text-stone-600';
  const textHover = isTransparent ? 'hover:text-stone-200' : 'hover:text-stone-900';
  const logoClass = isTransparent
    ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
    : 'text-stone-900';
  const iconClass = isTransparent
    ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-stone-100'
    : 'text-stone-500 hover:text-stone-900';

  // Helper for active state
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    const activeStyle = isActive 
      ? (isTransparent ? 'opacity-100 border-b-2 border-white' : 'text-stone-900 opacity-100 border-b-2 border-stone-900') 
      : 'opacity-70 hover:opacity-100 border-b-2 border-transparent';
    
    return `${textBase} ${textHover} transition-all duration-300 pb-1 ${activeStyle}`;
  };

  // Logic for Explore button active state
  const exploreActiveStyle = isExploreActive
      ? (isTransparent ? 'opacity-100 border-b-2 border-white' : 'text-stone-900 opacity-100 border-b-2 border-stone-900')
      : 'opacity-70 hover:opacity-100 border-b-2 border-transparent';

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-500 ease-in-out border-b ${scrolled ? 'bg-stone-50/95 backdrop-blur-sm border-stone-200 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="z-50 relative">
            <h1 className={`font-serif text-2xl md:text-3xl tracking-tight font-bold transition-colors duration-300 ${logoClass}`}>
              The Decor Atlas.
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide transition-colors duration-300">
            <Link to="/" className={getLinkClass('/')}>Journal</Link>
            
            {/* Explore Dropdown */}
            <div className="relative group">
              <button className={`flex items-center transition-all duration-300 focus:outline-none pb-1 ${textBase} ${textHover} ${exploreActiveStyle}`}>
                Explore <ChevronDown size={14} className="ml-1" />
              </button>
              
              {/* Dropdown Menu - appears on hover */}
              <div className="absolute top-full -left-4 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white shadow-xl border border-stone-100 rounded-sm w-64 max-h-[60vh] overflow-y-auto no-scrollbar py-2 flex flex-col">
                    {tags.length > 0 ? (
                      tags.map(tag => (
                        <Link 
                          key={tag.id} 
                          to={`/tag/${tag.slug}`} 
                          className="px-6 py-3 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors capitalize text-sm block text-left font-medium"
                        >
                          {tag.name}
                        </Link>
                      ))
                    ) : (
                      <span className="px-6 py-3 text-stone-300 text-xs italic">Loading...</span>
                    )}
                </div>
              </div>
            </div>
            
            <Link to="/about" className={getLinkClass('/about')}>About</Link>
            
            <Link to="/shop" className={`flex items-center ${getLinkClass('/shop')}`}>
              Shop
            </Link>
            
            <button 
              aria-label="Search" 
              className={`ml-4 transition-colors ${iconClass}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} strokeWidth={2} />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden z-50 transition-colors duration-300 ${isTransparent ? 'text-white drop-shadow-md' : 'text-stone-800'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-stone-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col h-full pt-28 px-8 pb-10">
              {/* Scrollable container */}
              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-center space-y-6">
                <Link to="/" className="font-serif text-3xl text-stone-900 hover:text-stone-600 font-bold">Journal</Link>
                
                {/* Divider & Header */}
                <div className="w-12 h-px bg-stone-200 my-2 shrink-0"></div>
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400 shrink-0">Collections</span>

                {/* Tags List */}
                <div className="flex flex-col items-center space-y-4 w-full">
                  {tags.map(tag => (
                    <Link key={tag.id} to={`/tag/${tag.slug}`} className="font-serif text-2xl text-stone-800 hover:text-stone-500 capitalize text-center font-semibold">
                      {tag.name}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-stone-200 my-2 shrink-0"></div>
                
                <button 
                  onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                  className="font-serif text-3xl text-stone-900 hover:text-stone-600 shrink-0 font-bold"
                >
                  Search
                </button>

                <Link to="/shop" className="font-serif text-3xl text-stone-900 hover:text-stone-600 shrink-0 font-bold">Shop</Link>
                <Link to="/about" className="font-serif text-3xl text-stone-900 hover:text-stone-600 shrink-0 pb-8 font-bold">About</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;