import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', robots: { index: false, follow: false } };

export default function TermsPage() {
  return (
    <main className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <header className="mb-16 border-b border-stone-200 pb-10 text-center md:text-left">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Legal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Terms of Service</h1>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Last Updated: May 15, 2024</p>
        </header>
        <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-stone-600 prose-a:text-stone-900 hover:prose-a:text-stone-600">
          <h3 className="text-2xl mt-8 mb-4">1. Terms</h3>
          <p>By accessing this Website, accessible from thedecoratlas.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>
          <h3 className="text-2xl mt-12 mb-4">2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials on The Decor Atlas&apos;s Website for personal, non-commercial transitory viewing only. Under this license you may not:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose or for any public display;</li>
            <li>remove any copyright or other proprietary notations from the materials.</li>
          </ul>
          <h3 className="text-2xl mt-12 mb-4">3. Disclaimer</h3>
          <p>All the materials on The Decor Atlas&apos;s Website are provided &ldquo;as is&rdquo;. The Decor Atlas makes no warranties, expressed or implied. The content is for informational and inspirational purposes only.</p>
          <h3 className="text-2xl mt-12 mb-4">4. Limitations</h3>
          <p>The Decor Atlas or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on The Decor Atlas&apos;s Website.</p>
          <h3 className="text-2xl mt-12 mb-4">5. Links</h3>
          <p>The Decor Atlas has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement.</p>
        </article>
      </div>
    </main>
  );
}
