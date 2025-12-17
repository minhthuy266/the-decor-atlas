import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, ChevronDown, ArrowRight, Plus, Minus } from 'lucide-react';
import { Tag } from '../types';
import SearchModal from './SearchModal';

// --- ROUTER CONFIGURATION ---
const getEnvRouterConfig = () => {
  try {
    if (typeof window !== 'undefined' && window.location.protocol === 'blob:') {
      return true;
    }
    return import.meta.env.VITE_USE_HASH_ROUTER === 'true';
  } catch {
    return false;
  }
};
const USE_HASH_ROUTER = getEnvRouterConfig();

// --- Custom Router Implementation ---
const getLoc = () => {
  if (typeof window === 'undefined') return { pathname: '/', search: '', hash: '' };
  if (USE_HASH_ROUTER) {
    const hashPath = window.location.hash.slice(1);
    return { pathname: hashPath || '/', search: window.location.search, hash: window.location.hash };
  } else {
    return { pathname: window.location.pathname, search: window.location.search, hash: window.location.hash };
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
      window.addEventListener('popstate', handler);
      return () => window.removeEventListener('popstate', handler);
    }
  }, []);
  return location;
};

export const useParams = <T extends Record<string, string | undefined>>() => {
  const { pathname } = useLocation();
  let slug: string | undefined = undefined;
  if (pathname.startsWith('/tag/')) {
    slug = pathname.replace(/^\/tag\//, '');
  } else if (pathname !== '/' && !pathname.startsWith('/about') && !pathname.startsWith('/shop')) { 
    slug = pathname.replace(/^\//, '');
  }
  return { slug } as unknown as T;
};

export const Link: React.FC<{ to: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ to, className, style, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (USE_HASH_ROUTER) {
        window.location.hash = to;
    } else {
        try {
            window.history.pushState({}, '', to);
            window.dispatchEvent(new Event('popstate'));
        } catch (err) {
            console.error("Navigation error:", err);
            window.location.href = to;
        }
    }
    window.scrollTo(0, 0);
  };
  const href = USE_HASH_ROUTER ? (to.startsWith('#') ? to : `#${to}`) : to;
  return (
    <a href={href} className={`${className || ''} cursor-pointer`} onClick={handleClick} style={style}>
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
    if (props.path === pathname) { match = props.element; return; }
    if (props.path === '/tag/:slug' && pathname.startsWith('/tag/')) { match = props.element; return; }
    if (props.path === '/:slug' && pathname !== '/' && !pathname.startsWith('/tag/') && !pathname.startsWith('/shop') && !pathname.startsWith('/about')) { match = props.element; }
  });
  return <>{match}</>;
};
// --- End Custom Router ---

// --- MENU STRUCTURE ---
const MENU_STRUCTURE = [
    {
        label: "Shop",
        slug: "shop",
        children: [
            { label: "Amazon Finds", slug: "amazon-finds" },
            { label: "Shop The Look", slug: "shop-the-look" },
            { label: "Gift Guides", slug: "gift-guides" },
            { label: "Splurge vs. Save", slug: "splurge-vs-save" }
        ]
    },
    {
        label: "Organization",
        slug: "organization",
        children: [
            { label: "Kitchen & Pantry", slug: "kitchen-pantry" },
            { label: "Closet Organization", slug: "closet-organization" },
            { label: "Small Space Solutions", slug: "small-spaces" }
        ]
    },
    {
        label: "Room Ideas",
        slug: "rooms",
        children: [
            { label: "Living Room", slug: "living-room" },
            { label: "Bedroom", slug: "bedroom" },
            { label: "Home Office", slug: "home-office" }
        ]
    },
    {
        label: "Styles",
        slug: "styles",
        children: [
            { label: "Organic Modern", slug: "organic-modern" },
            { label: "Seasonal Decor", slug: "seasonal-decor" }
        ]
    }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // State for Mobile Accordions (tracks which section is open by slug)
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setActiveMobileMenu(null);
  }, [location]);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;
  const textBase = isTransparent ? 'text-white' : 'text-stone-600';
  const textHover = isTransparent ? 'hover:text-stone-200' : 'hover:text-stone-900';
  const logoClass = isTransparent ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]' : 'text-stone-900';
  const iconClass = isTransparent ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-stone-100' : 'text-stone-500 hover:text-stone-900';

  const toggleAccordion = (slug: string) => {
    setActiveMobileMenu(activeMobileMenu === slug ? null : slug);
  };

  const LogoTag = isHome ? 'h1' : 'div';

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ease-in-out border-b ${scrolled || isOpen ? 'bg-stone-50/95 backdrop-blur-sm border-stone-200 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center relative">
          <Link to="/" className="block">
            <LogoTag className={`font-serif text-2xl md:text-3xl tracking-tight font-bold transition-colors duration-300 ${isOpen ? 'text-stone-900' : logoClass}`}>
              The Decor Atlas.
            </LogoTag>
          </Link>

          {/* DESKTOP NAV - PILLARS */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold tracking-wide transition-colors duration-300">
            {MENU_STRUCTURE.map((item) => (
                <div key={item.slug} className="relative group">
                    <button className={`flex items-center transition-all duration-300 focus:outline-none pb-1 border-b-2 border-transparent hover:border-transparent ${textBase} ${textHover}`}>
                        {item.label} <ChevronDown size={14} className="ml-1 opacity-70" />
                    </button>
                    {/* Desktop Dropdown */}
                    <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white shadow-xl border border-stone-100 rounded-sm w-56 py-2 flex flex-col">
                            {item.children.map(sub => (
                                <Link 
                                    key={sub.slug} 
                                    to={`/tag/${sub.slug}`} 
                                    className="px-6 py-3 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-sm font-medium"
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            
            <Link to="/about" className={`${textBase} ${textHover} border-b-2 border-transparent pb-1`}>About</Link>
            
            <button aria-label="Search" className={`ml-2 transition-colors ${iconClass}`} onClick={() => setIsSearchOpen(true)}>
              <Search size={20} strokeWidth={2} />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden transition-colors duration-300 ${isOpen || !isTransparent ? 'text-stone-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[45] transition-all duration-500 ${isOpen ? 'visible' : 'invisible delay-300'}`}>
        <div className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
        
        <div className={`absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#fafaf9] shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col h-full pt-24 px-8 pb-10">
              <div className="mb-8">
                 <button onClick={() => { setIsOpen(false); setIsSearchOpen(true); }} className="w-full flex items-center justify-between bg-white border border-stone-200 px-4 py-3 text-stone-400 text-sm font-medium rounded-sm active:bg-stone-50 transition-colors">
                    <span>Search...</span>
                    <Search size={16} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-start space-y-4">
                
                {/* Home Link */}
                <Link to="/" className="font-serif text-3xl text-stone-900 hover:text-stone-600 font-bold w-full border-b border-stone-100 pb-4 flex justify-between items-center group">
                   <span>Journal</span>
                </Link>

                {/* Dynamic Accordions for Pillars */}
                {MENU_STRUCTURE.map((item) => (
                    <div key={item.slug} className="w-full border-b border-stone-100 pb-4">
                        <button 
                            onClick={() => toggleAccordion(item.slug)}
                            className="w-full flex items-center justify-between font-serif text-3xl text-stone-900 font-bold hover:text-stone-600 transition-colors text-left"
                        >
                            <span>{item.label}</span>
                            {activeMobileMenu === item.slug ? <Minus size={24} className="text-stone-400" /> : <Plus size={24} className="text-stone-400" />}
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeMobileMenu === item.slug ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                            <div className="flex flex-col space-y-4 pl-2 border-l border-stone-200 ml-2">
                                {item.children.map((sub, idx) => (
                                    <Link 
                                        key={sub.slug} 
                                        to={`/tag/${sub.slug}`} 
                                        className="font-serif text-xl text-stone-500 hover:text-stone-900 transition-colors block"
                                        style={{ transitionDelay: `${idx * 50}ms` }}
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-stone-200">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-stone-400">
                     <Link to="/contact">Contact</Link>
                     <Link to="/privacy">Privacy</Link>
                     <span>NY, USA</span>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;