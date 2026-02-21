
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  schema 
}) => {
  const siteName = 'Surprise by Style';
  const defaultDescription = 'High-end luxury decor hiring and acquisition boutique based in Cape Town. Premium curation and editorial-grade styling services.';
  const defaultImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200';
  const siteUrl = window.location.origin;

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
