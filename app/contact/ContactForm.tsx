'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => { setFormStatus('success'); }, 1500);
  };

  return (
    <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 self-start mt-8 lg:mt-0 relative overflow-hidden">
      {formStatus === 'success' ? (
        <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-900">
            <Check size={32} />
          </div>
          <h3 className="font-serif text-3xl text-stone-900 mb-4">Message Sent</h3>
          <p className="text-stone-500 leading-relaxed max-w-xs mb-8">Thank you for reaching out. Our team will get back to you within 24-48 hours.</p>
          <button onClick={() => setFormStatus('idle')} className="text-xs font-bold uppercase tracking-widest border-b border-stone-300 hover:border-stone-900 pb-1 transition-colors">
            Send another message
          </button>
        </div>
      ) : null}
      <form className={`space-y-8 transition-opacity duration-500 ${formStatus === 'success' ? 'opacity-0' : 'opacity-100'}`} onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8">
          {[{ label: 'Name', type: 'text', placeholder: 'Jane Doe' }, { label: 'Email', type: 'email', placeholder: 'jane@example.com' }].map((f) => (
            <div key={f.label} className="group">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">{f.label}</label>
              <input required type={f.type} className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <div className="group">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Subject</label>
          <select className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg appearance-none rounded-none cursor-pointer">
            <option>General Inquiry</option><option>Partnership Proposal</option><option>Press &amp; Media</option><option>Feedback</option>
          </select>
        </div>
        <div className="group">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Message</label>
          <textarea required rows={4} className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg resize-none" placeholder="How can we help you?" />
        </div>
        <div className="pt-4">
          <button type="submit" disabled={formStatus === 'loading'} className="group w-full md:w-auto flex items-center justify-center gap-3 bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-all disabled:opacity-70">
            {formStatus === 'loading' ? <><span>Sending...</span> <Loader2 size={14} className="animate-spin" /></> : <><span>Send Message</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </div>
      </form>
    </div>
  );
}
