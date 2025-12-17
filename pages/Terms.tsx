import React from 'react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <>
      <SEO title="Terms of Service" robots="noindex" />
      <main className="bg-stone-50 min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          
          <header className="mb-16 border-b border-stone-200 pb-10 text-center md:text-left">
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Legal</span>
             <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Terms of Service</h1>
             <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Last Updated: May 15, 2024</p>
          </header>

          <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-stone-600 prose-a:text-stone-900 hover:prose-a:text-stone-600">
            <h3 className="text-2xl mt-8 mb-4">1. Terms</h3>
            <p>
              By accessing this Website, accessible from thedecoratlas.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
            </p>

            <h3 className="text-2xl mt-12 mb-4">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials on The Decor Atlas's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h3 className="text-2xl mt-12 mb-4">3. Disclaimer</h3>
            <p>
              All the materials on The Decor Atlas’s Website are provided "as is". The Decor Atlas makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, The Decor Atlas does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.
            </p>
            <p>
                The content provided on this website is for informational and inspirational purposes only. It is not intended to be professional design, architectural, or structural advice.
            </p>

            <h3 className="text-2xl mt-12 mb-4">4. Limitations</h3>
            <p>
              The Decor Atlas or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on The Decor Atlas’s Website, even if The Decor Atlas or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
            </p>

            <h3 className="text-2xl mt-12 mb-4">5. Revisions and Errata</h3>
            <p>
              The materials appearing on The Decor Atlas’s Website may include technical, typographical, or photographic errors. The Decor Atlas will not promise that any of the materials in this Website are accurate, complete, or current. We may change the materials contained on its Website at any time without notice.
            </p>

            <h3 className="text-2xl mt-12 mb-4">6. Links</h3>
            <p>
              The Decor Atlas has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by The Decor Atlas of the site. The use of any linked website is at the user’s own risk.
            </p>
          </article>
        </div>
      </main>
    </>
  );
};

export default Terms;