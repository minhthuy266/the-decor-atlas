import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SeoProps } from '../types';

interface ExtendedSeoProps extends SeoProps {
  breadcrumbs?: { name: string; item: string }[];
  robots?: string;
  schemaType?: 'Article' | 'Product' | 'WebSite' | 'CollectionPage';
  price?: string;
  currency?: string;
  availability?: string;
}

const SEO: React.FC<ExtendedSeoProps> = ({ 
  title, 
  description = "A minimalist, sophisticated interior design blog featuring high-quality photography and curated home decor content.", 
  canonical, 
  ogImage, 
  type = 'website',
  publishedTime,
  author,
  breadcrumbs,
  robots = "index, follow",
  schemaType,
  price,
  currency
}) => {
  const siteTitle = "The Decor Atlas";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const siteUrl = "https://thedecoratlas.com";
  const currentUrl = canonical || siteUrl;
  const defaultImage = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop";
  const finalImage = ogImage || defaultImage;

  // --- SCHEMAS ---

  // 1. Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
    }))
  } : null;

  // 2. Organization Schema (Standard Brand Info)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteTitle,
    "url": siteUrl,
    "logo": "https://ui-avatars.com/api/?name=The+Decor+Atlas&background=111110&color=fff",
    "sameAs": [
        "https://instagram.com/thedecoratlas",
        "https://pinterest.com/thedecoratlas",
        "https://twitter.com/thedecoratlas"
    ]
  };

  // 3. Main Entity Schema (Article, Product, or WebSite)
  let mainSchema: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  if (schemaType === 'Article' || type === 'article') {
    mainSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      },
      "headline": title,
      "description": description,
      "image": [finalImage],
      "datePublished": publishedTime,
      "dateModified": publishedTime, 
      "author": {
        "@type": "Person",
        "name": author || "The Decor Atlas"
      },
      "publisher": {
        "@type": "Organization",
        "name": siteTitle,
        "logo": {
          "@type": "ImageObject",
          "url": "https://ui-avatars.com/api/?name=The+Decor+Atlas&background=111110&color=fff"
        }
      }
    };
  } else if (schemaType === 'Product') {
    mainSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title,
      "image": [finalImage],
      "description": description,
      "brand": {
        "@type": "Brand",
        "name": author || "Curated"
      },
      "offers": {
        "@type": "Offer",
        "url": currentUrl,
        "priceCurrency": currency || "USD",
        "price": price?.replace(/[^0-9.]/g, '') || "0",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={currentUrl} />
      <meta name="author" content={author || siteTitle} />
      <meta name="publisher" content={siteTitle} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thedecoratlas" />
      <meta name="twitter:creator" content="@thedecoratlas" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(mainSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;