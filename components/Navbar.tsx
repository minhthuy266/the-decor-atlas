'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Plus, Minus } from 'lucide-react';
import { Tag } from '@/types';
import SearchModal from './SearchModal';

export interface MenuPillar {
  label: string;
  slug: string;
  tagSlugs: string[];
  children: Tag[];
}

interface NavbarProps {
  initialMenuItems: MenuPillar[];
}

const Navbar: React.FC<NavbarProps> = ({ initialMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuItems] = useState<MenuPillar[]>(initialMenuItems);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setActiveMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;
  const textBase = isTransparent ? 'text-white' : 'text-stone-600';
  const textHover = isTransparent ? 'hover:text-stone-200' : 'hover:text-stone-900';
  const logoClass = isTransparent ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]' : 'text-stone-900';
  const iconClass = isTransparent
    ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:text-stone-100'
    : 'text-stone-500 hover:text-stone-900';

  const toggleAccordion = (slug: string) => {
    setActiveMobileMenu(activeMobileMenu === slug ? null : slug);
  };

  const LogoTag = isHome ? 'h1' : 'div';

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ease-in-out border-b ${
          scrolled || isOpen
            ? 'bg-stone-50/95 backdrop-blur-sm border-stone-200 py-3'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-between items-center relative">
          <Link href="/" className="block">
            <LogoTag
              className={`font-serif text-xl md:text-3xl tracking-tight font-bold transition-colors duration-300 ${
                isOpen ? 'text-stone-900' : logoClass
              }`}
            >
              The Decor Atlas.
            </LogoTag>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold tracking-wide transition-colors duration-300">
            {menuItems.map((item) => (
              <div key={item.slug} className="relative group">
                <button
                  className={`flex items-center transition-all duration-300 focus:outline-none pb-1 border-b-2 border-transparent hover:border-transparent ${textBase} ${textHover}`}
                >
                  {item.label} <ChevronDown size={14} className="ml-1 opacity-70" />
                </button>
                {item.children.length > 0 && (
                  <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white shadow-xl border border-stone-100 rounded-sm w-56 py-2 flex flex-col">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/tag/${sub.slug}`}
                          className="px-6 py-3 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-sm font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/about"
              className={`${textBase} ${textHover} border-b-2 border-transparent pb-1`}
            >
              About
            </Link>

            <button
              aria-label="Search"
              className={`ml-2 transition-colors ${iconClass}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} strokeWidth={2} />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden transition-colors duration-300 p-1 ${
              isOpen || !isTransparent ? 'text-stone-900' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[45] transition-all duration-500 ${isOpen ? 'visible' : 'invisible delay-300'}`}
      >
        <div
          className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#fafaf9] shadow-2xl transition-transform duration-500 ease-out transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-10">
            <div className="mb-6">
              <button
                onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                className="w-full flex items-center justify-between bg-white border border-stone-200 px-4 py-3 text-stone-400 text-sm font-medium rounded-sm active:bg-stone-50 transition-colors"
              >
                <span>Search...</span>
                <Search size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col items-start space-y-3">
              <Link
                href="/"
                className="font-serif text-2xl text-stone-900 hover:text-stone-600 font-bold w-full border-b border-stone-100 pb-3 flex justify-between items-center group"
              >
                <span>Journal</span>
              </Link>

              {menuItems.map((item) => (
                <div key={item.slug} className="w-full border-b border-stone-100 pb-3">
                  <button
                    onClick={() => toggleAccordion(item.slug)}
                    className="w-full flex items-center justify-between font-serif text-2xl text-stone-900 font-bold hover:text-stone-600 transition-colors text-left"
                  >
                    <span>{item.label}</span>
                    {item.children.length > 0 &&
                      (activeMobileMenu === item.slug ? (
                        <Minus size={20} className="text-stone-400" />
                      ) : (
                        <Plus size={20} className="text-stone-400" />
                      ))}
                  </button>

                  {item.children.length > 0 && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        activeMobileMenu === item.slug
                          ? 'max-h-[500px] opacity-100 mt-4'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="flex flex-col space-y-3 pl-2 border-l border-stone-200 ml-2">
                        {item.children.map((sub, idx) => (
                          <Link
                            key={sub.slug}
                            href={`/tag/${sub.slug}`}
                            className="font-serif text-lg text-stone-500 hover:text-stone-900 transition-colors block"
                            style={{ transitionDelay: `${idx * 40}ms` }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-stone-200">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-400">
                <Link href="/contact">Contact</Link>
                <Link href="/privacy">Privacy</Link>
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