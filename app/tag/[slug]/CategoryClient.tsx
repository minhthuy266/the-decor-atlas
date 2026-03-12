'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post, Tag } from '@/types';
import { PaginatedPosts, getPostsByTag } from '@/lib/ghost';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Library, Grid } from 'lucide-react';

interface Props {
  tag: Tag;
  initialPosts: Post[];
  initialMeta: PaginatedPosts['meta'];
  slug: string;
}

export default function CategoryClient({ tag, initialPosts, initialMeta, slug }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [meta, setMeta] = useState<PaginatedPosts['meta']>(initialMeta);
  const [loading, setLoading] = useState(false);

  const handlePrevPage = async () => {
    if (!meta.pagination.prev) return;
    setLoading(true);
    const data = await getPostsByTag(slug, meta.pagination.prev, 12);
    setPosts(data.posts);
    setMeta(data.meta);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = async () => {
    if (!meta.pagination.next) return;
    setLoading(true);
    const data = await getPostsByTag(slug, meta.pagination.next, 12);
    setPosts(data.posts);
    setMeta(data.meta);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isArchive = slug === 'all';

  return (
    <main className="bg-stone-50 min-h-screen">
      <div className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <header className={`mb-12 md:mb-20 text-center mx-auto ${isArchive ? 'max-w-4xl' : 'max-w-3xl'}`}>
          <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase mb-4 flex items-center justify-center gap-2">
            {isArchive ? <Library size={12} /> : <Grid size={12} />}
            {isArchive ? 'The Full Journal' : 'Collection'}
          </span>
          <h1 className="font-serif text-3xl md:text-6xl text-stone-900 mb-5 md:mb-6 capitalize leading-tight">
            {tag.name}
          </h1>
          {tag.description && (
            <p className="font-serif text-lg md:text-2xl text-stone-500 font-light leading-relaxed">{tag.description}</p>
          )}
          {isArchive && <div className="w-16 md:w-24 h-px bg-stone-300 mx-auto mt-6 md:mt-8" />}
        </header>

        <section className={`transition-opacity duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          {posts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {posts.map((post) => (
                <article key={post.id} className="group flex flex-col h-full">
                  <Link href={`/${post.slug}`} className="block h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 mb-4 rounded-sm">
                      <Image
                        src={post.feature_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <div className="mb-2.5 w-full flex justify-between items-center text-[9px] tracking-widest uppercase text-stone-400 font-bold border-b border-stone-200 pb-2">
                        <span>{post.primary_tag?.name || 'Journal'}</span>
                        <time dateTime={post.published_at}>{format(new Date(post.published_at), 'MMM yyyy')}</time>
                      </div>
                      <h3 className="font-serif text-base md:text-xl text-stone-900 mb-3 leading-tight group-hover:text-stone-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed line-clamp-3 mb-4 hidden md:block">
                        {post.custom_excerpt || post.excerpt}
                      </p>
                      <span className="mt-auto text-[9px] font-bold uppercase tracking-widest text-stone-900 group-hover:underline decoration-stone-300 underline-offset-4">
                        Read Story
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-stone-400 py-24 md:py-32 border border-dashed border-stone-200 rounded-sm">
              <p className="font-serif text-lg md:text-xl">No stories found in this collection yet.</p>
            </div>
          )}

          {meta.pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-6 md:space-x-8 mt-16 md:mt-24 pt-10 border-t border-stone-200">
              <button
                onClick={handlePrevPage}
                disabled={!meta.pagination.prev || loading}
                className={`flex items-center text-[10px] font-bold tracking-widest uppercase transition-colors px-3 py-2 rounded-sm ${!meta.pagination.prev ? 'text-stone-300 cursor-not-allowed' : 'text-stone-900 hover:bg-white'}`}
              >
                <ArrowLeft size={14} className="mr-2" /> Prev
              </button>
              <span className="font-serif text-stone-400 italic text-sm">
                {meta.pagination.page} / {meta.pagination.pages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={!meta.pagination.next || loading}
                className={`flex items-center text-[10px] font-bold tracking-widest uppercase transition-colors px-3 py-2 rounded-sm ${!meta.pagination.next ? 'text-stone-300 cursor-not-allowed' : 'text-stone-900 hover:bg-white'}`}
              >
                Next <ArrowRight size={14} className="ml-2" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
