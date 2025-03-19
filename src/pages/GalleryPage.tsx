import React, { useState } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { X, Instagram, Facebook } from 'lucide-react';
import SEO from '../components/SEO';

const GalleryPage = () => {
  useScrollToTop();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { url: '/images/PoppyHair_Work1.jpeg', alt: 'Hair styling transformation' },
    { url: '/images/PoppyHair_Work2.jpeg', alt: 'Modern haircut' },
    { url: '/images/PoppyHair_Work3.jpeg', alt: 'Hair styling session' },
    { url: '/images/PoppyHair_Work4.jpeg', alt: 'Traditional Haircut' },
    { url: '/images/PoppyHair_Work5.jpeg', alt: 'New Highlights' },
    { url: '/images/PoppyHair_Work6.jpeg', alt: 'New Look' }
  ];

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Debugging function to show if images are loading
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, imageUrl: string) => {
    console.error(`Failed to load image: ${imageUrl}`);
    e.currentTarget.style.backgroundColor = '#f8d7da'; // Light red background for failed images
  };

  // ImageGallery schema for structured data
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Poppy Hair Gallery",
    "description": "Browse through a collection of hair transformations and styling work by Poppy Hair",
    "image": galleryImages.map(img => ({
      "@type": "ImageObject",
      "contentUrl": `https://poppy-hair.com${img.url}`,
      "description": img.alt
    }))
  };

  return (
    <div className="bg-cream-light py-8 sm:py-12">
      <SEO 
        title="Hair Styling Gallery | Poppy Hair Edinburgh"
        description="Browse our gallery of stunning hair transformations including cuts, colours, and styling work by our expert stylist at Poppy Hair Edinburgh."
        canonicalUrl="/gallery"
        schema={[gallerySchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">Gallery</h1>
          <p className="text-stone-600 max-w-2xl mx-auto px-2">
            Browse through a collection of my latest hair transformations and styling work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square bg-stone-200 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              onClick={() => openLightbox(image.url)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                onError={(e) => handleImageError(e, image.url)}
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Social Media CTA Section */}
        <div className="bg-cream rounded-lg shadow-md p-6 sm:p-10 mt-10 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">Explore more of Poppy Hair</h2>
          <p className="text-stone-600 max-w-3xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            These are just a few highlights from my portfolio. To explore more of my creative work, follow me on Instagram and Facebook. Stay updated with my latest projects and behind the scenes moments!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-6">
            <a 
              href="https://www.instagram.com/poppy_lucyhair/?igsh=MTVseDhuenk2N3QwZg%3D%3D&utm_source=qr#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center bg-stone-700 text-cream-light px-6 py-3 rounded-md hover:bg-stone-800 transition-all duration-200 transform hover:translate-y-[-2px]"
            >
              <Instagram className="h-5 w-5 mr-3" />
              <span>@poppy_lucyhair</span>
            </a>
            <a 
              href="https://www.facebook.com/people/Poppy-Hair/61571631990740/?mibextid=wwXIfr&rdid=5Q5LiDh8N61KwYHc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FkzSpUNTV%2F%3Fmibextid%3DwwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center bg-stone-700 text-cream-light px-6 py-3 rounded-md hover:bg-stone-800 transition-all duration-200 transform hover:translate-y-[-2px]"
            >
              <Facebook className="h-5 w-5 mr-3" />
              <span>Poppy Hair</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-h-[90vh] max-w-[90vw] object-contain animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;