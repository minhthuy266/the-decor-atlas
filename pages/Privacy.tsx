import React from 'react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <>
      <SEO title="Privacy Policy" robots="noindex" />
      <main className="bg-stone-50 min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          
          <header className="mb-16 border-b border-stone-200 pb-10 text-center md:text-left">
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-4 block">Legal</span>
             <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Privacy Policy</h1>
             <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Last Updated: May 15, 2024</p>
          </header>

          <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-stone-600 prose-a:text-stone-900 hover:prose-a:text-stone-600">
            <p>
              At <strong>The Decor Atlas</strong> ("we", "us", "our"), accessible from thedecoratlas.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by The Decor Atlas and how we use it.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Information We Collect</h3>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                <li><strong>Newsletter:</strong> If you sign up for our newsletter, we collect your email address to send you curated content.</li>
                <li><strong>Log Files:</strong> Like many other websites, we use log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.</li>
            </ul>

            <h3 className="text-2xl mt-12 mb-6">Cookies and Web Beacons</h3>
            <p>
              Like any other website, The Decor Atlas uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3 className="text-2xl mt-12 mb-6">Affiliate Disclosure</h3>
            <p>
              The Decor Atlas is a participant in the Amazon Services LLC Associates Program and other affiliate programs. These programs are designed to provide a means for sites to earn advertising fees by advertising and linking to products. When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission.
            </p>

            <h3 className="text-2xl mt-12 mb-6">CCPA Privacy Rights</h3>
            <p>
              Under the CCPA, among other rights, California consumers have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
            </ul>
            <p>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <a href="mailto:privacy@thedecoratlas.com">privacy@thedecoratlas.com</a>.
            </p>

            <h3 className="text-2xl mt-12 mb-6">GDPR Data Protection Rights</h3>
            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
          </article>
        </div>
      </main>
    </>
  );
};

export default Privacy;