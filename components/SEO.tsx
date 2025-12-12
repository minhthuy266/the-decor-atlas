import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SeoProps } from '../types';

const SEO: React.FC<SeoProps> = ({ 
  title, 
  description = "A minimalist interior design blog.", 
  canonical, 
  ogImage, 
  type = 'website',
  publishedTime,
  author
}) => {
  const siteTitle = "The Decor Atlas";
  const fullTitle = `${title} | ${siteTitle}`;

  // JSON-LD Schema for BlogPosting
  const schema = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [ogImage],
    "datePublished": publishedTime,
    "author": [{
      "@type": "Person",
      "name": author
    }]
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "url": "https://thedecoratlas.com"
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || "https://thedecoratlas.com"} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEO;