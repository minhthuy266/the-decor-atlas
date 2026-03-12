'use client';

import React, { useEffect, useState } from 'react';
import { X, Star, Check, AlertCircle } from 'lucide-react';

export const EVENT_OPEN_NEWSLETTER = 'open-newsletter';

export const openNewsletter = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_OPEN_NEWSLETTER));
  }
};

const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener(EVENT_OPEN_NEWSLETTER, handler);
    return () => window.removeEventListener(EVENT_OPEN_NEWSLETTER, handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const currentSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!currentSubscribers.some((sub: any) => sub.email === email)) {
        const newSubscriber = { email, date: new Date().toISOString(), source: 'NewsletterModal' };
        currentSubscribers.push(newSubscriber);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(currentSubscribers));
      }
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setEmail('');
      }, 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative bg-white w-full max-w-md p-8 md:p-10 text-center shadow-2xl animate-fade-in-up">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="py-12 flex flex-col items-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <Check size={32} />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 mb-2">You&apos;re on the list.</h3>
            <p className="text-stone-500">Welcome to The Decor Atlas.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-stone-50 rounded-full">
                <Star size={32} className="text-stone-900" />
              </div>
            </div>
            <h2 className="font-serif text-3xl text-stone-900 mb-4">The Weekly Edit</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Join 15,000+ tastemakers receiving our curated digest of design, travel, and culture. No spam, just beauty.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="w-full bg-stone-50 border border-stone-200 px-4 py-4 text-center placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all text-stone-900 disabled:opacity-50"
              />
              {status === 'error' && (
                <div className="flex items-center justify-center text-red-500 text-xs font-bold uppercase tracking-widest gap-2">
                  <AlertCircle size={14} /> Something went wrong. Try again.
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-stone-900 text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-stone-700 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            <p className="mt-6 text-[10px] text-stone-400">Unsubscribe at any time.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;