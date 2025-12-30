import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from '../components/Navbar';
import { getSinglePost, getPosts } from '../lib/ghost';
import { Post as PostType } from '../types';
import SEO from '../components/SEO';
import { format } from 'date-fns';
import { ArrowLeft, List, ChevronDown, Share2, Check, Link as LinkIcon, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { openNewsletter } from '../components/NewsletterModal';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [trendingPosts, setTrendingPosts] = useState<PostType[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const [processedHtml, setProcessedHtml] = useState<string>("");
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const postData = await getSinglePost(slug);
        setPost(postData);

        const allPosts = await getPosts();
        const hot = allPosts.filter(p => p.slug !== slug).slice(0, 5);
        setTrendingPosts(hot);

        let related = [];
        if (postData?.primary_tag) {
           related = allPosts.filter(p => p.slug !== slug && p.tags?.some(t => t.id === postData.primary_tag?.id));
        }
        if (related.length < 4) {
            const remaining = allPosts.filter(p => p.slug !== slug && !related.includes(p));
            related = [...related, ...remaining];
        }
        setRelatedPosts(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Intercept clicks on custom internal cards to use internal navigation
  useEffect(() => {
    const handleInternalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cardLink = target.closest('.da-internal-card a');
      if (cardLink) {
        const href = cardLink.getAttribute('href');
        if (href && href.startsWith('/')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          window.dispatchEvent(new Event('popstate'));
        }
      }
    };
    document.addEventListener('click', handleInternalClick);
    return () => document.removeEventListener('click', handleInternalClick);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!post?.html) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.html, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const tocData: TOCItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${index}`;
      heading.id = id;
      tocData.push({ id, text, level: parseInt(heading.tagName.substring(1)) });
    });
    setProcessedHtml(doc.body.innerHTML);
    setToc(tocData);
  }, [post]);

  useEffect(() => {
    if (!processedHtml) return;
    const timer = setTimeout(() => {
        const contentDiv = document.querySelector('.gh-content');
        if (!contentDiv) return;
        const productCards = Array.from(contentDiv.querySelectorAll('.kg-product-card'));
        if (productCards.length > 1) {
            let i = 0;
            while (i < productCards.length) {
                const group = [productCards[i]];
                let j = i + 1;
                while (j < productCards.length) {
                    const current = productCards[j - 1];
                    const next = productCards[j];
                    if (current.nextElementSibling === next) { group.push(next); j++; } 
                    else { break; }
                }
                if (group.length > 1) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'gh-product-slider-wrapper';
                    const container = document.createElement('div');
                    container.className = 'gh-product-slider-container';
                    wrapper.appendChild(container);
                    const firstCard = group[0];
                    if(firstCard.parentNode) {
                        firstCard.parentNode.insertBefore(wrapper, firstCard);
                        group.forEach(card => container.appendChild(card));
                    }
                }
                i = j;
            }
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [processedHtml]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      if (toc.length === 0) return;
      const headerOffset = 150;
      let currentId = "";
      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) currentId = item.id;
        }
      }
      setActiveId(currentId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const handleShare = (platform: 'copy' | 'facebook' | 'twitter') => {
    const url = window.location.href;
    const text = post?.title || 'Check out this article';
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      setIsShareOpen(false);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
      setIsShareOpen(false);
    }
  };

  // Improved Scroll Handler for TOC
  const scrollToHeading = (id: string, isMobile: boolean = false) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset carefully. 
      // If it "scrolled too far" (meaning it went too low), we need a LARGER offset.
      // 100-110px is generally better for mobile safe areas and address bars.
      const offset = isMobile ? 110 : 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      if (isMobile) setIsMobileTocOpen(false);
      setActiveId(id);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif">Loading Story...</div>;
  if (!post) return (
    <>
      <SEO title="Page Not Found" robots="noindex" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 font-serif p-4 text-center">
         <h1 className="text-3xl mb-4">Story not found.</h1>
         <p className="text-stone-500 mb-8">The article you are looking for might have been moved or deleted.</p>
         <Link to="/" className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1">Back to Journal</Link>
      </div>
    </>
  );

  const breadcrumbs = [{ name: "Home", item: "/" }, ...(post.primary_tag ? [{ name: post.primary_tag.name, item: `/tag/${post.primary_tag.slug}` }] : []), { name: post.title, item: `/${post.slug}` }];

  return (
    <>
      <SEO title={post.title} description={post.custom_excerpt} type="article" schemaType="Article" ogImage={post.feature_image} publishedTime={post.published_at} author={post.primary_author?.name} breadcrumbs={breadcrumbs} canonical={`https://thedecoratlas.com/${post.slug}`} />
      <div className="fixed top-0 left-0 h-1 bg-stone-900 z-[100] transition-all duration-200" style={{ width: `${readingProgress}%` }} />
      <div className="bg-stone-50 min-h-screen pb-20">
        <header className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white border-b border-stone-100">
            <div className="container mx-auto px-6 md:px-8 max-w-7xl text-center">
                <Link to="/" className="inline-flex items-center text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 mb-6 md:mb-8 transition-colors">
                  <ArrowLeft size={10} className="mr-2" /> Back to Journal
                </Link>
                <div className="flex items-center justify-center space-x-3 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-5 md:mb-6">
                  {post.primary_tag && <Link to={`/tag/${post.primary_tag.slug}`} className="text-stone-900 bg-stone-100 px-2 py-1 hover:bg-stone-200 transition-colors">{post.primary_tag.name}</Link>}
                  <span className="text-stone-300">•</span>
                  <time dateTime={post.published_at}>{format(new Date(post.published_at), 'MMMM d, yyyy')}</time>
                </div>
                <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-900 leading-[1.2] mb-6 md:mb-8 max-w-3xl mx-auto">{post.title}</h1>
                {post.custom_excerpt && <p className="font-serif text-base md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">{post.custom_excerpt}</p>}
            </div>
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8 md:mt-12">
                <div className="aspect-[16/9] md:aspect-[2.4/1] overflow-hidden bg-stone-100 shadow-sm relative rounded-sm">
                    <img src={post.feature_image} alt={post.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" width="1200" height="600" />
                </div>
                <div className="flex justify-between items-start mt-4 px-1 relative">
                    <p className="text-[9px] md:text-xs text-stone-900 font-bold tracking-widest uppercase">
                        {post.primary_author?.name || 'The Decor Atlas'} <span className="text-stone-300 mx-1 md:mx-2">•</span> {post.reading_time || 5} min read
                    </p>
                    <div className="relative" ref={shareRef}>
                        <button onClick={() => setIsShareOpen(!isShareOpen)} className="flex items-center gap-1.5 text-[9px] md:text-xs uppercase font-bold tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
                            <Share2 size={12} /> Share
                        </button>
                        {isShareOpen && (
                            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-stone-100 shadow-xl rounded-sm z-50 animate-fade-in-up origin-top-right">
                                <div className="p-1">
                                    <button onClick={() => handleShare('facebook')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left"><Facebook size={12} /> Facebook</button>
                                    <button onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left"><Twitter size={12} /> Twitter / X</button>
                                    <button onClick={() => handleShare('copy')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left border-t border-stone-100">{copied ? <Check size={12} className="text-green-600" /> : <LinkIcon size={12} />}{copied ? 'Copied!' : 'Copy Link'}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12 md:mt-16 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
                <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-1">
                    {toc.length > 0 && (
                        <div>
                             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Contents</span>
                            <nav className="relative border-l border-stone-200">
                                <ul className="space-y-0">
                                {toc.map((item) => {
                                    const isActive = activeId === item.id;
                                    return (
                                        <li key={item.id} className="relative">
                                        <a href={`#${item.id}`} className={`block py-2 pl-4 text-xs leading-relaxed transition-all duration-300 border-l-2 -ml-[1px] ${item.level === 3 ? 'pl-8 text-[11px] opacity-90' : ''} ${isActive ? 'border-stone-900 text-stone-900 font-bold' : 'border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-300'}`}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            scrollToHeading(item.id, false);
                                            }}>
                                            {item.text}
                                        </a>
                                        </li>
                                    );
                                })}
                                </ul>
                            </nav>
                        </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-10">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Link key={tag.id} to={`/tag/${tag.slug}`} className="text-[9px] uppercase tracking-wide font-bold text-stone-400 hover:text-stone-900 transition-colors">#{tag.name}</Link>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
                {/* Main Content Area: Simplified border and shadow for cleaner mobile look */}
                <main className="col-span-1 lg:col-span-8 order-2 min-w-0 bg-white p-6 md:p-14 border border-stone-200 md:border-stone-300/80 shadow-md md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm">
                    {toc.length > 0 && (
                    <div className="lg:hidden mb-10 border-b border-t border-stone-100 py-3">
                        <button onClick={() => setIsMobileTocOpen(!isMobileTocOpen)} className="w-full flex items-center justify-between text-left">
                        <span className="text-xs font-bold tracking-widest uppercase text-stone-600 flex items-center"><List size={14} className="mr-3" /> Table of Contents</span>
                        <ChevronDown size={16} className={`text-stone-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileTocOpen && (
                        <div className="pt-4 mt-2 border-t border-stone-100">
                            <ul className="space-y-2.5 text-sm">
                            {toc.map((item) => (
                                <li key={item.id} className={`${item.level === 3 ? 'ml-4' : ''}`}>
                                <a href={`#${item.id}`} className={`block py-1 ${activeId === item.id ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    scrollToHeading(item.id, true);
                                    }}>
                                    {item.text}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        )}
                    </div>
                    )}
                    <div className="mb-6 text-center"><p className="text-[9px] text-stone-300 uppercase tracking-widest font-medium">Contains affiliate links</p></div>
                    <div className="gh-content max-w-none prose prose-stone prose-base md:prose-lg mx-auto prose-headings:font-serif prose-headings:font-normal prose-img:rounded-sm prose-img:w-full prose-a:text-stone-900 hover:prose-a:text-stone-600" dangerouslySetInnerHTML={{ __html: processedHtml || post.html }} />
                    <div className="flex items-center justify-center mt-12 md:mt-20 mb-10 md:mb-16 opacity-20"><div className="w-12 md:w-16 h-px bg-stone-900"></div></div>
                    {post.primary_author && (
                        <div className="flex items-center justify-center gap-4 md:gap-6 pt-8 border-t border-stone-100">
                            <img src={post.primary_author.profile_image || "https://picsum.photos/100/100"} alt={post.primary_author.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full grayscale object-cover border border-stone-100 shrink-0" loading="lazy" />
                            <div>
                                <h4 className="font-serif text-lg md:text-xl text-stone-900 mb-0.5 font-bold">{post.primary_author.name}</h4>
                                <p className="text-[10px] md:text-[11px] text-stone-500 uppercase tracking-widest">Editor & Curator</p>
                            </div>
                        </div>
                    )}
                </main>
                 <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-3">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Trending</span>
                        <div className="space-y-10">
                            {trendingPosts.map((trend, idx) => (
                                <Link to={`/${trend.slug}`} key={trend.id} className="group block">
                                    <div className="aspect-[4/3] bg-stone-200 overflow-hidden mb-3 relative rounded-sm shadow-sm border border-stone-200/50">
                                        <img src={trend.feature_image} alt={trend.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                        <div className="absolute top-0 left-0 bg-white/95 backdrop-blur px-2 py-1"><span className="text-[9px] font-bold tracking-widest text-stone-900">0{idx + 1}</span></div>
                                    </div>
                                    <div><h4 className="font-serif text-sm text-stone-900 leading-tight group-hover:text-stone-600 transition-colors font-bold">{trend.title}</h4></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
        <section className="bg-stone-900 text-stone-100 py-16 md:py-20 mb-16 md:mb-20">
            <div className="container mx-auto px-6 text-center max-w-2xl">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-60 mb-4 block">The Weekly Edit</span>
                <h3 className="font-serif text-2xl md:text-4xl mb-5 md:mb-6 leading-tight">Join our community of 15,000+ design lovers.</h3>
                <p className="text-stone-400 mb-8 font-light text-sm leading-relaxed">Get curated interiors, architectural inspiration, and exclusive shopping edits delivered to your inbox every Sunday.</p>
                <button onClick={() => openNewsletter()} className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-3.5 text-[10px] font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors">Subscribe Now <ArrowRight size={14} /></button>
            </div>
        </section>
        {relatedPosts.length > 0 && (
            <section className="container mx-auto px-6 md:px-8 max-w-7xl">
                <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-stone-200 pb-3 md:pb-4"><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400">Read Next</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {relatedPosts.map(post => (
                        <article key={post.id} className="group cursor-pointer">
                             <Link to={`/${post.slug}`}>
                                <div className="aspect-[3/2] overflow-hidden bg-stone-200 mb-4 relative rounded-sm border border-stone-200/50"><img src={post.feature_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" /></div>
                                <div className="flex flex-col"><div className="mb-2 text-[9px] font-bold tracking-widest uppercase text-stone-400">{post.primary_tag?.name || 'Journal'}</div><h4 className="font-serif text-lg text-stone-900 leading-snug group-hover:text-stone-600 transition-colors font-bold">{post.title}</h4></div>
                             </Link>
                        </article>
                    ))}
                </div>
            </section>
        )}
      </div>
    </>
  );
};

export default Post;