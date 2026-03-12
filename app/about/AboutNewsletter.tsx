'use client';

import { ArrowRight } from 'lucide-react';
import { Heart } from 'lucide-react';
import { openNewsletter } from '@/components/NewsletterModal';

export default function AboutNewsletter() {
  return (
    <section className="bg-stone-900 text-stone-100 py-24 text-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <Heart size={32} className="mx-auto mb-6 text-stone-400" />
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Join the Inner Circle.</h2>
        <p className="text-stone-400 mb-10 font-light text-lg leading-relaxed">
          Receive our &ldquo;Sunday Edit&rdquo;—a weekly collection of design inspiration, hidden product gems, and architectural marvels.
        </p>
        <button
          onClick={() => openNewsletter()}
          className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors"
        >
          Subscribe Free <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
