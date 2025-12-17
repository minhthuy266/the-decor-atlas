import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ArrowRight, ArrowUpRight, Check, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      // Reset after showing success message for a few seconds if desired, 
      // or keep it to show completion.
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with The Decor Atlas team for partnerships, press inquiries, or general questions." 
        type="website" 
      />
      <main className="bg-stone-50 min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
             {/* Left Column: Info & Context */}
             <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 block">Get In Touch</span>
                <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-8 leading-tight">
                  Start a <br/><span className="italic text-stone-500">Conversation.</span>
                </h1>
                <p className="text-stone-600 font-light text-lg leading-relaxed max-w-md mb-16">
                  Whether you have a question about a product, a partnership proposal, or just want to share your latest design project, we are listening.
                </p>

                <div className="space-y-12">
                   <div className="group">
                      <h3 className="font-serif text-2xl text-stone-900 mb-2">Editorial Inquiries</h3>
                      <p className="text-sm text-stone-500 mb-3 max-w-xs">For press releases, article submissions, and corrections.</p>
                      <a href="mailto:editor@thedecoratlas.com" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-colors">
                        editor@thedecoratlas.com <ArrowUpRight size={12} className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                   </div>

                   <div className="group">
                      <h3 className="font-serif text-2xl text-stone-900 mb-2">Partnerships</h3>
                      <p className="text-sm text-stone-500 mb-3 max-w-xs">For advertising, brand collaborations, and affiliate opportunities.</p>
                      <a href="mailto:partners@thedecoratlas.com" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-1 hover:border-stone-900 transition-colors">
                        partners@thedecoratlas.com <ArrowUpRight size={12} className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                   </div>
                </div>
             </div>

             {/* Right Column: The Form */}
             <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 self-start mt-8 lg:mt-0 relative overflow-hidden">
                
                {/* Success Overlay */}
                {formStatus === 'success' ? (
                   <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-stone-900">
                         <Check size={32} />
                      </div>
                      <h3 className="font-serif text-3xl text-stone-900 mb-4">Message Sent</h3>
                      <p className="text-stone-500 leading-relaxed max-w-xs mb-8">
                        Thank you for reaching out. Our team will get back to you within 24-48 hours.
                      </p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-xs font-bold uppercase tracking-widest border-b border-stone-300 hover:border-stone-900 pb-1 transition-colors"
                      >
                        Send another message
                      </button>
                   </div>
                ) : null}

                <form className={`space-y-8 transition-opacity duration-500 ${formStatus === 'success' ? 'opacity-0' : 'opacity-100'}`} onSubmit={handleSubmit}>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="group">
                         <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Name</label>
                         <input 
                           required
                           type="text" 
                           className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" 
                           placeholder="Jane Doe" 
                         />
                      </div>
                      <div className="group">
                         <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Email</label>
                         <input 
                           required
                           type="email" 
                           className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg" 
                           placeholder="jane@example.com" 
                         />
                      </div>
                   </div>
                   
                   <div className="group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Subject</label>
                      <select className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg appearance-none rounded-none cursor-pointer">
                         <option>General Inquiry</option>
                         <option>Partnership Proposal</option>
                         <option>Press & Media</option>
                         <option>Feedback</option>
                      </select>
                   </div>

                   <div className="group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 group-focus-within:text-stone-900 transition-colors">Message</label>
                      <textarea 
                        required
                        rows={4} 
                        className="w-full bg-transparent border-b border-stone-200 py-3 text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors font-serif text-lg resize-none" 
                        placeholder="How can we help you?"
                      ></textarea>
                   </div>

                   <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="group w-full md:w-auto flex items-center justify-center gap-3 bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                         {formStatus === 'loading' ? (
                            <>Sending... <Loader2 size={14} className="animate-spin" /></>
                         ) : (
                            <>Send Message <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                         )}
                      </button>
                   </div>
                </form>
             </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;