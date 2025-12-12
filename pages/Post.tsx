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
  
  // Share State
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // TOC State
  const [processedHtml, setProcessedHtml] = useState<string>("");
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const postData = await getSinglePost(slug);
        setPost(postData);

        // Fetch all posts to filter for Trending and Related
        const allPosts = await getPosts();
        
        // 1. Trending (Sidebar) - Simple logic: newest posts excluding current
        const hot = allPosts
            .filter(p => p.slug !== slug)
            .slice(0, 5);
        setTrendingPosts(hot);

        // 2. Related (Bottom) - Logic: Same primary tag, or just next available
        let related = [];
        if (postData?.primary_tag) {
           related = allPosts.filter(p => 
              p.slug !== slug && p.tags?.some(t => t.id === postData.primary_tag?.id)
           );
        }
        // Fallback if no tag match or not enough posts
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
    window.scrollTo(0, 0);
  }, [slug]);

  // Click outside to close share menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Process HTML to generate TOC
  useEffect(() => {
    if (!post?.html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.html, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const tocData: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `section-${index}`;
      
      heading.id = id;
      tocData.push({
        id,
        text,
        level: parseInt(heading.tagName.substring(1))
      });
    });

    setProcessedHtml(doc.body.innerHTML);
    setToc(tocData);
  }, [post]);

  // Scroll Listener for Active State
  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const headerOffset = 150;
      let currentId = "";

      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
             currentId = item.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
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

  const handleSubscribe = () => {
    openNewsletter();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif">Loading Story...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif">Story not found.</div>;

  return (
    <>
      <SEO 
        title={post.title}
        description={post.custom_excerpt}
        type="article"
        ogImage={post.feature_image}
        publishedTime={post.published_at}
        author={post.primary_author?.name}
      />

      <div className="bg-stone-50 min-h-screen pb-24">
        
        {/* --- Header Section --- */}
        <header className="pt-32 pb-16 bg-white border-b border-stone-100">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
                <Link to="/" className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 mb-8 transition-colors">
                  <ArrowLeft size={10} className="mr-2" /> Back to Journal
                </Link>
                
                <div className="flex items-center justify-center space-x-3 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 mb-6">
                  {post.primary_tag && <span className="text-stone-900 bg-stone-100 px-2 py-1">{post.primary_tag.name}</span>}
                  <span className="text-stone-300">•</span>
                  <time dateTime={post.published_at}>{format(new Date(post.published_at), 'MMMM d, yyyy')}</time>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 leading-[1.1] mb-8 max-w-3xl mx-auto">
                  {post.title}
                </h1>

                {post.custom_excerpt && (
                  <p className="font-serif text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                    {post.custom_excerpt}
                  </p>
                )}
            </div>

            {/* Feature Image - Aligned to max-w-7xl */}
            <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-12">
                <div className="aspect-[21/9] md:aspect-[2.4/1] overflow-hidden bg-stone-100 shadow-sm relative">
                    <img 
                    src={post.feature_image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Image Metadata Bar */}
                <div className="flex justify-between items-start mt-4 px-1 relative">
                    <p className="text-xs text-stone-900 font-bold tracking-widest uppercase">
                        {post.primary_author?.name || 'The Decor Atlas'} <span className="text-stone-300 mx-2">•</span> {post.reading_time || 5} min read
                    </p>
                    
                    {/* Share Button & Dropdown */}
                    <div className="relative" ref={shareRef}>
                        <button 
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                        >
                            <Share2 size={14} /> Share
                        </button>

                        {isShareOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-100 shadow-xl rounded-sm z-50 animate-fade-in-up origin-top-right">
                                <div className="p-1">
                                    <button 
                                        onClick={() => handleShare('facebook')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left"
                                    >
                                        <Facebook size={14} /> Facebook
                                    </button>
                                    <button 
                                        onClick={() => handleShare('twitter')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left"
                                    >
                                        <Twitter size={14} /> Twitter / X
                                    </button>
                                    <button 
                                        onClick={() => handleShare('copy')}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left border-t border-stone-100"
                                    >
                                        {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>


        {/* --- 3-Column Grid (TOC - Content - Trending) --- */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-16 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
                {/* --- 1. Left Column: Table of Contents --- */}
                <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-1">
                    {toc.length > 0 && (
                        <div>
                             <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">
                                Contents
                            </span>
                            
                            <nav className="relative border-l border-stone-200">
                                <ul className="space-y-0">
                                {toc.map((item) => {
                                    const isActive = activeId === item.id;
                                    return (
                                        <li key={item.id} className="relative">
                                        <a 
                                            href={`#${item.id}`} 
                                            className={`
                                                block py-2 pl-4 text-sm leading-relaxed transition-all duration-300 border-l-2 -ml-[1px]
                                                ${item.level === 3 ? 'pl-8 text-xs opacity-90' : ''}
                                                ${isActive 
                                                    ? 'border-stone-900 text-stone-900 font-bold' 
                                                    : 'border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-300'
                                                }
                                            `}
                                            onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById(item.id);
                                            if (el) {
                                                const y = el.getBoundingClientRect().top + window.scrollY - 120;
                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                setActiveId(item.id);
                                            }
                                            }}
                                        >
                                            {item.text}
                                        </a>
                                        </li>
                                    );
                                })}
                                </ul>
                            </nav>
                        </div>
                    )}

                    {/* Tags List */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">
                                Tags
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Link key={tag.id} to={`/tag/${tag.slug}`} className="text-[10px] uppercase tracking-wide font-bold text-stone-400 hover:text-stone-900 transition-colors">
                                        #{tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>


                {/* --- 2. Center Column: Content --- */}
                <main className="col-span-1 lg:col-span-8 order-2 min-w-0 bg-white p-8 md:p-14 shadow-sm rounded-sm">
                    
                    {/* Mobile TOC */}
                    {toc.length > 0 && (
                    <div className="lg:hidden mb-8 border-b border-t border-stone-100 py-4">
                        <button 
                        onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                        className="w-full flex items-center justify-between text-left"
                        >
                        <span className="text-sm font-bold tracking-widest uppercase text-stone-600 flex items-center">
                            <List size={16} className="mr-3" /> Table of Contents
                        </span>
                        <ChevronDown size={18} className={`text-stone-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isMobileTocOpen && (
                        <div className="pt-4 mt-2 border-t border-stone-100">
                            <ul className="space-y-3 text-base">
                            {toc.map((item) => (
                                <li key={item.id} className={`${item.level === 3 ? 'ml-4' : ''}`}>
                                <a 
                                    href={`#${item.id}`} 
                                    className={`block py-1 ${activeId === item.id ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById(item.id);
                                    if (el) {
                                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                        setIsMobileTocOpen(false);
                                        setActiveId(item.id);
                                    }
                                    }}
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

                    {/* Affiliate Disclosure */}
                    <div className="mb-8 text-center">
                        <p className="text-[10px] text-stone-300 uppercase tracking-widest font-medium">
                        Contains affiliate links
                        </p>
                    </div>

                    {/* Main Article Content */}
                    <div 
                        className="gh-content max-w-none prose prose-stone prose-lg mx-auto prose-headings:font-serif prose-headings:font-normal prose-img:rounded-sm prose-img:w-full prose-a:text-stone-900 hover:prose-a:text-stone-600"
                        dangerouslySetInnerHTML={{ __html: processedHtml || post.html }}
                    />

                    {/* Divider */}
                    <div className="flex items-center justify-center mt-20 mb-16 opacity-20">
                        <div className="w-16 h-px bg-stone-900"></div>
                    </div>

                        {/* Author Bio */}
                    {post.primary_author && (
                        <div className="flex items-center gap-6 pt-8 border-t border-stone-100">
                            <img 
                                src={post.primary_author.profile_image || "https://picsum.photos/100/100"} 
                                alt={post.primary_author.name}
                                className="w-16 h-16 rounded-full grayscale object-cover border border-stone-100 shrink-0"
                            />
                            <div>
                                <h4 className="font-serif text-xl text-stone-900 mb-1 font-bold">{post.primary_author.name}</h4>
                                <p className="text-[11px] text-stone-500 uppercase tracking-widest">Editor & Curator</p>
                            </div>
                        </div>
                    )}

                    {/* Shop The Look */}
                    {post.products && post.products.length > 0 && (
                        <div className="mt-16 pt-10 border-t border-stone-100">
                            <div className="mb-8">
                                <h3 className="font-serif text-2xl text-stone-900 italic">Shop This Look</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {post.products.map((product, idx) => (
                                <div key={idx} className="flex gap-4 items-center group">
                                    <div className="w-20 h-20 bg-stone-50 overflow-hidden relative shrink-0 border border-stone-100">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-serif text-sm text-stone-900 truncate font-bold">{product.name}</h4>
                                        <a 
                                            href={product.link} 
                                            target="_blank" 
                                            rel="nofollow noopener noreferrer"
                                            className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mt-1 block"
                                        >
                                            View {product.currency}{product.price}
                                        </a>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                 {/* --- 3. Right Column: Trending --- */}
                 <aside className="hidden lg:block lg:col-span-2 sticky top-32 order-3">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">
                            Trending
                        </span>

                        <div className="space-y-10">
                            {trendingPosts.map((trend, idx) => (
                                <Link to={`/${trend.slug}`} key={trend.id} className="group block">
                                    <div className="aspect-[4/3] bg-stone-200 overflow-hidden mb-3 relative rounded-sm shadow-sm">
                                        <img 
                                            src={trend.feature_image} 
                                            alt={trend.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-0 left-0 bg-white/95 backdrop-blur px-2 py-1">
                                            <span className="text-[10px] font-bold tracking-widest text-stone-900">0{idx + 1}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-base text-stone-900 leading-tight group-hover:text-stone-600 transition-colors font-bold">
                                            {trend.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
                
            </div>
        </div>

        {/* --- NEWSLETTER BREAK --- */}
        <section className="bg-stone-900 text-stone-100 py-20 mb-20">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 mb-4 block">The Weekly Edit</span>
                <h3 className="font-serif text-3xl md:text-4xl mb-6">Join our community of 15,000+ design lovers.</h3>
                <p className="text-stone-400 mb-8 font-light text-sm leading-relaxed">
                    Get curated interiors, architectural inspiration, and exclusive shopping edits delivered to your inbox every Sunday.
                </p>
                <button 
                    onClick={handleSubscribe}
                    className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors"
                >
                    Subscribe Now <ArrowRight size={14} />
                </button>
            </div>
        </section>

        {/* --- READ MORE (Related Posts) --- */}
        {relatedPosts.length > 0 && (
            <section className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="flex items-center justify-between mb-12 border-b border-stone-200 pb-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400">Read Next</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedPosts.map(post => (
                        <article key={post.id} className="group cursor-pointer">
                             <Link to={`/${post.slug}`}>
                                <div className="aspect-[3/2] overflow-hidden bg-stone-200 mb-4 relative rounded-sm">
                                    <img 
                                        src={post.feature_image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2 text-[10px] font-bold tracking-widest uppercase text-stone-400">
                                        {post.primary_tag?.name || 'Journal'}
                                    </div>
                                    <h4 className="font-serif text-xl text-stone-900 leading-snug group-hover:text-stone-600 transition-colors font-bold">
                                        {post.title}
                                    </h4>
                                </div>
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