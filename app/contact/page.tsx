import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Decor Atlas team for partnerships, press inquiries, or general questions.',
  alternates: { canonical: 'https://thedecoratlas.com/contact' },
};

export default function ContactPage() {
  return (
    <main className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Get In Touch</span>
            <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-8 leading-tight">
              Start a <br /><span className="italic text-stone-500">Conversation.</span>
            </h1>
            <p className="text-stone-600 font-light text-lg leading-relaxed max-w-md mb-16">
              Whether you have a question about a product, a partnership proposal, or just want to share your latest design project, we are listening.
            </p>
            <div className="space-y-12">
              {[
                { title: 'Editorial Inquiries', desc: 'For press releases, article submissions, and corrections.', email: 'editor@thedecoratlas.com' },
                { title: 'Partnerships', desc: 'For advertising, brand collaborations, and affiliate opportunities.', email: 'partners@thedecoratlas.com' },
              ].map((item) => (
                <div key={item.email} className="group">
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 mb-3 max-w-xs">{item.desc}</p>
                  <a href={`mailto:${item.email}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-colors">
                    {item.email} <ArrowUpRight size={12} className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
