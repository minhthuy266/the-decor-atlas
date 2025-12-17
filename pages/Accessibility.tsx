import React from 'react';
import SEO from '../components/SEO';

const Accessibility: React.FC = () => {
  return (
    <>
      <SEO title="Accessibility Statement" robots="noindex" />
      <main className="bg-stone-50 min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          
          <header className="mb-16 border-b border-stone-200 pb-10 text-center md:text-left">
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Inclusivity</span>
             <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Accessibility Statement</h1>
             <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Ongoing Commitment</p>
          </header>

          <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-stone-600 prose-a:text-stone-900 hover:prose-a:text-stone-600">
            <h3 className="text-2xl mt-8 mb-4">General</h3>
            <p>
              The Decor Atlas strives to ensure that its services are accessible to people with disabilities. The Decor Atlas has invested a significant amount of resources to help ensure that its website is made easier to use and more accessible for people with disabilities, with the strong belief that every person has the right to live with dignity, equality, comfort, and independence.
            </p>

            <h3 className="text-2xl mt-12 mb-4">Accessibility on thedecoratlas.com</h3>
            <p>
              We make available the UserWay Website Accessibility Widget that is powered by a dedicated accessibility server. The software allows thedecoratlas.com to improve its compliance with the Web Content Accessibility Guidelines (WCAG 2.1).
            </p>

            <h3 className="text-2xl mt-12 mb-4">Disclaimer</h3>
            <p>
              The Decor Atlas continues its efforts to constantly improve the accessibility of its site and services in the belief that it is our collective moral obligation to allow seamless, accessible, and unhindered use also for those of us with disabilities.
            </p>
            <p>
              Despite our efforts to make all pages and content on thedecoratlas.com fully accessible, some content may not have yet been fully adapted to the strictest accessibility standards. This may be a result of not having found or identified the most appropriate technological solution.
            </p>

            <h3 className="text-2xl mt-12 mb-4">Here For You</h3>
            <p>
              If you are experiencing difficulty with any content on thedecoratlas.com or require assistance with any part of our site, please contact us during normal business hours as detailed below and we will be happy to assist.
            </p>

            <h3 className="text-2xl mt-12 mb-4">Contact Us</h3>
            <p>
              If you wish to report an accessibility issue, have any questions or need assistance, please contact The Decor Atlas Customer Support as follows:
            </p>
            <p>
              Email: <a href="mailto:support@thedecoratlas.com">support@thedecoratlas.com</a>
            </p>
          </article>
        </div>
      </main>
    </>
  );
};

export default Accessibility;