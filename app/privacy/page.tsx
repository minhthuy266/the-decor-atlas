import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', robots: { index: false, follow: false } };

export default function PrivacyPage() {
  return (
    <main className="bg-stone-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <header className="mb-16 border-b border-stone-200 pb-10 text-center md:text-left">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Legal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Privacy Policy</h1>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Last Updated: May 15, 2024</p>
        </header>
        <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-stone-600 prose-a:text-stone-900 hover:prose-a:text-stone-600">
          <p>At <strong>The Decor Atlas</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), accessible from thedecoratlas.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by The Decor Atlas and how we use it.</p>
          <h3 className="text-2xl mt-12 mb-6">Information We Collect</h3>
          <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
            <li><strong>Newsletter:</strong> If you sign up for our newsletter, we collect your email address to send you curated content.</li>
            <li><strong>Log Files:</strong> Like many other websites, we use log files. These files log visitors when they visit websites.</li>
          </ul>
          <h3 className="text-2xl mt-12 mb-6">Cookies and Web Beacons</h3>
          <p>Like any other website, The Decor Atlas uses &lsquo;cookies&rsquo;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited.</p>
          <h3 className="text-2xl mt-12 mb-6">Affiliate Disclosure</h3>
          <p>As an Amazon Associate I earn from qualifying purchases. The Decor Atlas is also a participant in various other affiliate programs. When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission.</p>
          <h3 className="text-2xl mt-12 mb-6">CCPA Privacy Rights</h3>
          <p>Under the CCPA, among other rights, California consumers have the right to request disclosure, deletion, and opt-out of selling of personal data. Contact us at <a href="mailto:privacy@thedecoratlas.com">privacy@thedecoratlas.com</a>.</p>
          <h3 className="text-2xl mt-12 mb-6">GDPR Data Protection Rights</h3>
          <p>Every user is entitled to data access, rectification, and erasure rights. Contact us if you wish to exercise any of these rights.</p>
        </article>
      </div>
    </main>
  );
}
