
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schemas?: object[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image, 
  url, 
  type = 'website',
  schemas = [] 
}) => {
  const siteName = 'Surprise by Style';
  const defaultDescription = 'High-end luxury decor hiring and acquisition boutique based in Cape Town. Premium curation, event hiring, and editorial-grade styling services.';
  const defaultKeywords = 'luxury decor, furniture hiring Cape Town, interior styling, artisanal homeware, event decor South Africa, boutique furniture';
  const defaultImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200';
  const siteUrl = window.location.origin;

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = (description || defaultDescription).substring(0, 160);
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={siteName} />
      <meta name="theme-color" content="#F8F7F2" />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_ZA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@surprisebystyle" />

      {/* Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
