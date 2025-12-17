import React, { useEffect, useState } from 'react';
import { Link, useParams } from '../components/Navbar';
import { getPostsByTag, getSingleTag, PaginatedPosts } from '../lib/ghost';
import { Post, Tag } from '../types';
import SEO from '../components/SEO';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Library, Grid } from 'lucide-react';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tag, setTag] = useState<Tag | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PaginatedPosts['meta'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when slug changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        // Fetch Tag Details
        const tagData = await getSingleTag(slug);
        setTag(tagData);

        // Fetch Posts for this Tag
        // Using limit 12 to suit 4-column layout (divisible by 4)
        const { posts: postsData, meta: metaData } = await getPostsByTag(slug, currentPage, 3);
        setPosts(postsData);
        setMeta(metaData);
      } catch (error) {
        console.error("Error fetching category data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, currentPage]);

  const handlePrevPage = () => {
    if (meta?.pagination.prev) {
      setCurrentPage(meta.pagination.prev);
    }
  };

  const handleNextPage = () => {
    if (meta?.pagination.next) {
      setCurrentPage(meta.pagination.next);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-serif bg-stone-50">Loading Collection...</div>;
  if (!tag) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-serif bg-stone-50">Collection not found.</div>;

  const isArchive = slug === 'all';
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: isArchive ? "Archive" : tag.name, item: `/tag/${tag.slug}` }
  ];

  return (
    <>
      <SEO 
        title={tag.name} 
        description={tag.description || `Articles about ${tag.name}`}
        type="website"
        schemaType="CollectionPage"
        breadcrumbs={breadcrumbs}
        canonical={`https://thedecoratlas.com/tag/${tag.slug}`}
      />
      <main className="bg-stone-50 min-h-screen">
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
          
          {/* Category Header */}
          <header className={`mb-20 text-center mx-auto ${isArchive ? 'max-w-4xl' : 'max-w-3xl'}`}>
            <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 flex items-center justify-center gap-2">
               {isArchive ? <Library size={12} /> : <Grid size={12} />}
               {isArchive ? "The Full Journal" : "Collection"}
            </span>
            
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6 capitalize leading-tight">
              {tag.name}
            </h1>
            
            {tag.description && (
               <p className="font-serif text-xl md:text-2xl text-stone-500 font-light leading-relaxed">
                 {tag.description}
               </p>
            )}

            {isArchive && (
               <div className="w-24 h-px bg-stone-300 mx-auto mt-8"></div>
            )}
          </header>

          {/* Posts Grid */}
          <section>
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {posts.map((post) => (
                  <article key={post.id} className="group flex flex-col h-full">
                    <Link to={`/${post.slug}`} className="block h-full">
                      <div className="aspect-[3/4] overflow-hidden bg-stone-200 mb-6 relative rounded-sm">
                        <img 
                          src={post.feature_image} 
                          alt={post.title} 
                          className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                          loading="lazy"
                        />
                         {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                      </div>
                      
                      <div className="flex flex-col items-start text-left">
                        <div className="mb-3 w-full flex justify-between items-center text-[10px] tracking-widest uppercase text-stone-400 font-bold border-b border-stone-200 pb-2">
                          <span>{post.primary_tag?.name || 'Journal'}</span>
                          <time dateTime={post.published_at}>
                            {format(new Date(post.published_at), 'MMM yyyy')}
                          </time>
                        </div>
                        
                        <h3 className="font-serif text-2xl text-stone-900 mb-3 leading-tight group-hover:text-stone-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                          {post.custom_excerpt || post.excerpt}
                        </p>

                        <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-stone-900 group-hover:underline decoration-stone-300 underline-offset-4">Read Story</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center text-stone-400 py-32 border border-dashed border-stone-200 rounded-sm">
                <p className="font-serif text-xl">No stories found in this collection yet.</p>
              </div>
            )}

            {/* Pagination */}
            {meta && meta.pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-8 mt-24 pt-12 border-t border-stone-200">
                <button 
                  onClick={handlePrevPage}
                  disabled={!meta.pagination.prev}
                  className={`flex items-center text-xs font-bold tracking-widest uppercase transition-colors px-4 py-2 hover:bg-white rounded-sm ${!meta.pagination.prev ? 'text-stone-300 cursor-not-allowed' : 'text-stone-900 hover:text-stone-600'}`}
                >
                  <ArrowLeft size={14} className="mr-2" /> Previous
                </button>
                
                <span className="font-serif text-stone-400 italic text-sm">
                  Page {meta.pagination.page} of {meta.pagination.pages}
                </span>

                <button 
                  onClick={handleNextPage}
                  disabled={!meta.pagination.next}
                  className={`flex items-center text-xs font-bold tracking-widest uppercase transition-colors px-4 py-2 hover:bg-white rounded-sm ${!meta.pagination.next ? 'text-stone-300 cursor-not-allowed' : 'text-stone-900 hover:text-stone-600'}`}
                >
                  Next <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Category;