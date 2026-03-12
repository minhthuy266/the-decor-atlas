import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterModal from '@/components/NewsletterModal';

export const metadata: Metadata = {
  title: {
    default: 'The Decor Atlas — Curated Home Decor & Amazon Finds',
    template: '%s | The Decor Atlas',
  },
  description:
    'Curated home decor, Amazon finds, and organization hacks for renters & small-space lovers. Updated weekly.',
  metadataBase: new URL('https://thedecoratlas.com'),
  openGraph: {
    siteName: 'The Decor Atlas',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thedecoratlas',
    creator: '@thedecoratlas',
  },
  // Pinterest domain verification + crawler hints
  other: {
    'p:domain_verify': 'ecd139aa26a9e8fd9f666d3379a8bd99',
    'pinterest-rich-pin': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <meta name="theme-color" content="#fafaf9" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900 flex flex-col">
        <Navbar />
        <NewsletterModal />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
