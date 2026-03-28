'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post as PostType } from '@/types';
import { format } from 'date-fns';
import { ArrowLeft, List, ChevronDown, ArrowRight } from 'lucide-react';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

interface TOCItem { id: string; text: string; level: number; }

interface PostClientProps {
  post: PostType;
  trendingPosts: PostType[];
  relatedPosts: PostType[];
  processedHtml: string;
  tocData: TOCItem[];
}

export default function PostClient({ 
  post, 
  trendingPosts, 
  processedHtml: initialHtml, 
  tocData 
}: PostClientProps) {
  const [processedHtml, setProcessedHtml] = useState<string>(initialHtml);
  const [toc, setToc] = useState<TOCItem[]>(tocData);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Detect affiliate content to show disclosure
  const hasAffiliateLinks = post.html?.includes('amazon.com') || post.html?.includes('amzn.to') || post.tags?.some(t => ['amazon-finds','shop-the-look','splurge-vs-save','gift-guides'].includes(t.slug));

  useEffect(() => {
    const handleInternalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cardLink = target.closest('.da-internal-card a');
      if (cardLink) {
        const href = cardLink.getAttribute('href');
        if (href && href.startsWith('/')) {
          e.preventDefault();
          window.location.href = href;
        }
      }
    };
    document.addEventListener('click', handleInternalClick);
    return () => document.removeEventListener('click', handleInternalClick);
  }, []);

  // Sync state with props
  useEffect(() => {
    setProcessedHtml(initialHtml);
    setToc(tocData);
  }, [initialHtml, tocData]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
      if (toc.length === 0) return;
      const headerOffset = 150;
      let currentId = '';
      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= headerOffset) currentId = item.id;
      }
      setActiveId(currentId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string, isMobile: boolean = false) => {
    if (isMobile) {
      setIsMobileTocOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(id); }
      }, 10);
    } else {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(id); }
    }
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-stone-900 z-[100] transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="bg-stone-50 min-h-screen pb-20">
        {/* Article Header */}
        <header className="pt-24 pb-10 md:pt-32 md:pb-16 bg-white border-b border-stone-100">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl text-center">
            <Link
              href="/"
              className="inline-flex items-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 mb-6 transition-colors"
            >
              <ArrowLeft size={10} className="mr-2" /> Back to Journal
            </Link>

            <div className="flex items-center justify-center flex-wrap gap-2 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-5">
              {post.primary_tag && (
                <Link
                  href={`/tag/${post.primary_tag.slug}`}
                  className="text-stone-900 bg-stone-100 px-2 py-1 hover:bg-stone-200 transition-colors"
                >
                  {post.primary_tag.name}
                </Link>
              )}
              <span className="text-stone-300">•</span>
              <time dateTime={post.published_at}>{format(new Date(post.published_at), 'MMMM d, yyyy')}</time>
              {post.reading_time && (
                <>
                  <span className="text-stone-300">•</span>
                  <span>{post.reading_time} min read</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-900 leading-[1.2] mb-6 max-w-3xl mx-auto">
              {post.title}
            </h1>
            {post.custom_excerpt && (
              <p className="font-serif text-base md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                {post.custom_excerpt}
              </p>
            )}
          </div>

          {/* Feature Image */}
          <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8 md:mt-12">
            <div className="relative aspect-[16/9] md:aspect-[2.4/1] overflow-hidden bg-stone-100 shadow-sm rounded-sm">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          </div>
        </header>

        {/* Article Layout */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12 md:mt-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">

            {/* Left Sidebar — TOC */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-1">
              {toc.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Contents</span>
                  <nav className="border-l border-stone-200">
                    <ul className="space-y-0">
                      {toc.map((item) => (
                        <li key={item.id} className="relative">
                          <a
                            href={`#${item.id}`}
                            className={`block py-2 pl-4 text-xs leading-relaxed transition-all duration-300 border-l-2 -ml-[1px] ${item.level === 3 ? 'pl-8 text-[11px]' : ''} ${activeId === item.id ? 'border-stone-900 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-300'}`}
                            onClick={(e) => { e.preventDefault(); scrollToHeading(item.id, false); }}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <main className="col-span-1 lg:col-span-8 order-2 min-w-0 bg-white p-5 md:p-14 border border-stone-200 shadow-md rounded-sm">
              {/* FTC Disclosure */}
              {hasAffiliateLinks && <AffiliateDisclosure variant="post" />}

              {/* Mobile TOC */}
              {toc.length > 0 && (
                <div className="lg:hidden mb-8 border-b border-t border-stone-100 py-3">
                  <button
                    onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-600 flex items-center">
                      <List size={14} className="mr-3" /> Table of Contents
                    </span>
                    <ChevronDown size={16} className={`text-stone-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileTocOpen && (
                    <div className="pt-4 mt-2 border-t border-stone-100">
                      <ul className="space-y-2.5 text-sm">
                        {toc.map((item) => (
                          <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                            <a
                              href={`#${item.id}`}
                              className={`block py-1 ${activeId === item.id ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                              onClick={(e) => { e.preventDefault(); scrollToHeading(item.id, true); }}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Article Body */}
              <div
                className="gh-content max-w-none prose prose-stone prose-base md:prose-lg mx-auto prose-headings:font-serif prose-headings:font-normal prose-img:rounded-sm prose-img:w-full prose-a:text-stone-900 hover:prose-a:text-stone-600"
                dangerouslySetInnerHTML={{ __html: processedHtml || post.html }}
                suppressHydrationWarning
              />
            </main>

            {/* Right Sidebar — Trending */}
            <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-3">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Trending</span>
              <div className="space-y-8">
                {trendingPosts.map((trend, idx) => (
                  <Link href={`/${trend.slug}`} key={trend.id} className="group block">
                    <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden mb-3 rounded-sm shadow-sm border border-stone-200/50">
                      <Image
                        src={trend.feature_image}
                        alt={trend.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        sizes="208px"
                      />
                      <div className="absolute top-0 left-0 bg-white/95 backdrop-blur px-2 py-1">
                        <span className="text-[9px] font-bold tracking-widest text-stone-900">0{idx + 1}</span>
                      </div>
                    </div>
                    <h4 className="font-serif text-sm text-stone-900 leading-tight group-hover:text-stone-600 transition-colors font-bold">
                      {trend.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          {/* Mobile Trending — Below Article */}
          <div className="lg:hidden mt-12 pt-10 border-t border-stone-200">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">More Stories</span>
            <div className="grid grid-cols-2 gap-4">
              {trendingPosts.slice(0, 4).map((trend) => (
                <Link href={`/${trend.slug}`} key={trend.id} className="group block">
                  <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden mb-2 rounded-sm">
                    <Image
                      src={trend.feature_image}
                      alt={trend.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="50vw"
                    />
                  </div>
                  <h4 className="font-serif text-sm text-stone-900 leading-tight group-hover:text-stone-600 transition-colors">
                    {trend.title}
                  </h4>
                </Link>
              ))}
            </div>
            <Link href="/" className="mt-6 w-full flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase text-stone-900 border border-stone-200 py-3 rounded-sm">
              Back to Journal <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
