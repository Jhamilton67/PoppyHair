import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
  schema?: Record<string, any>[];
  keywords?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonicalUrl,
  imageUrl = '/src/Images/LucyPic_2.jpeg',
  schema,
  keywords,
  type = 'website'
}) => {
  const baseUrl = 'https://poppy-hair.com';
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
  
  // Base organization schema that's included on every page
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Poppy Hair",
    "url": baseUrl,
    "logo": `${baseUrl}/scissors.svg`,
    "image": [`${baseUrl}/src/Images/LucyPic_1.jpeg`, `${baseUrl}/src/Images/LucyPic_2.jpeg`],
    "description": "Professional hair salon in Edinburgh offering expert styling, cutting, and colouring services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "25A Dundas St",
      "addressLocality": "Edinburgh",
      "postalCode": "EH3 6QQ",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.9577",
      "longitude": "-3.1968"
    },
    "telephone": "+447849474199",
    "email": "lucy_hairbuisness@outlook.com",
    "priceRange": "££",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/people/Poppy-Hair/61571631990740",
      "https://www.instagram.com/poppy_lucyhair"
    ]
  };

  // Combine all schema data
  const allSchema = schema ? [organizationSchema, ...schema] : [organizationSchema];
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || "hair salon edinburgh, hairdresser edinburgh, hair styling, hair colouring, balayage edinburgh, highlights, haircuts, professional hairdresser"} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Language and locale */}
      <html lang="en-GB" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Poppy Hair" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content="Poppy Hair Salon Edinburgh" />
      
      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#44403c" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Poppy Hair" />
      
      {/* Mobile viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* JSON-LD structured data */}
      {allSchema.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;