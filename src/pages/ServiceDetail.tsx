import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, DollarSign, Info, Scissors, Droplet, Sparkles, Brush } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import BookNowButton from '../components/BookNowButton';
import SEO from '../components/SEO';

const ServiceDetail = () => {
  useScrollToTop();
  const { serviceId } = useParams<{ serviceId: string }>();
  
  const serviceDetails = {
    haircuts: {
      title: 'Haircuts & Styling',
      icon: <Scissors className="h-6 w-6" />,
      description: 'Our expert stylists are trained in the latest cutting techniques to create looks that enhance your natural features and suit your lifestyle.',
      image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      longDescription: 'At Poppy Hair, we believe that a great haircut is the foundation of any hairstyle. Our haircut services begin with a thorough consultation to understand your hair type, face shape, lifestyle, and personal preferences. Our skilled stylists use precision cutting techniques to create a look that not only suits you perfectly but is also easy to maintain at home. Whether you\'re looking for a classic style, a trendy cut, or a complete transformation, our team has the expertise to bring your vision to life.',
      services: [
        { 
          name: 'Women\'s Haircut', 
          description: 'Includes consultation, shampoo, cut, and style.',
          details: 'Our women\'s haircut service includes a thorough consultation, relaxing shampoo and conditioning, precision cutting, and a professional blow-dry and style. We take into account your hair texture, face shape, and lifestyle to create a cut that works for you.'
        },
        { 
          name: 'Men\'s Haircut', 
          description: 'Includes consultation, shampoo, cut, and style.',
          details: 'Our men\'s haircut service includes a consultation to determine your preferred style, a relaxing shampoo, precision cutting, and styling. Whether you want a classic look or something more contemporary, our stylists will deliver.'
        },
        { 
          name: 'Children\'s Haircut', 
          description: 'For children under 12 years.',
          details: 'Our children\'s haircut service is designed to make the experience fun and stress-free. We take extra care to ensure children feel comfortable while delivering a great cut that parents will love.'
        },
        { 
          name: 'Blowout & Style', 
          description: 'Shampoo and professional styling.',
          details: 'Our blowout service includes a thorough shampoo and conditioning treatment followed by a professional blow-dry and style. Perfect for special occasions or whenever you want to look your best.'
        }
      ]
    },
    coloring: {
      title: 'Colouring',
      icon: <Droplet className="h-6 w-6" />,
      description: 'From subtle highlights to bold transformations, our colour experts deliver stunning results using premium products that protect your hair.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      longDescription: 'Hair colour can completely transform your look, enhance your natural features, and boost your confidence. At Poppy Hair, our colour specialists are trained in the latest techniques and use premium products to deliver vibrant, long-lasting results while maintaining the health of your hair. Whether you\'re looking to cover gray, add dimension with highlights, or make a bold statement with a fashion colour, our team will work with you to achieve the perfect shade for your skin tone and lifestyle.',
      services: [
        { 
          name: 'Single Process Colour', 
          price: '$75+', 
          duration: '90 min',
          description: 'All-over colour application.',
          details: 'Our single process colour service provides full coverage with rich, dimensional colour. Perfect for covering gray hair or changing your overall hair colour. Includes a consultation to determine the perfect shade for your skin tone.'
        },
        { 
          name: 'Partial Highlights', 
          price: '$95+', 
          duration: '120 min',
          description: 'Highlights focused on the top and crown areas.',
          details: 'Partial highlights add dimension and brightness to the most visible parts of your hair. This service is ideal for those who want a subtle change or are new to highlighting.'
        },
        { 
          name: 'Full Highlights', 
          price: '$125+', 
          duration: '150 min',
          description: 'Highlights throughout the entire head.',
          details: 'Full highlights create maximum dimension and brightness throughout your entire head of hair. This service is perfect for those wanting a more dramatic change or significant lightening.'
        },
        { 
          name: 'Balayage', 
          price: '$150+', 
          duration: '180 min',
          description: 'Hand-painted highlights for a natural, sun-kissed look.',
          details: 'Balayage is a French word meaning "to sweep." This technique involves hand-painting highlights onto the hair to create a graduated, natural-looking effect. The result is a sun-kissed, dimensional look with softer, less noticeable regrowth.'
        },
        { 
          name: 'Colour Correction', 
          price: 'Consultation Required', 
          duration: 'Varies',
          description: 'Corrective colour services priced upon consultation.',
          details: 'Colour correction is a specialized service for addressing undesired colour results. This might include fixing at-home colour gone wrong, removing unwanted tones, or transitioning from one colour to another. A consultation is required to assess your hair and determine the best approach.'
        }
      ]
    },
    treatments: {
      title: 'Treatments',
      icon: <Sparkles className="h-6 w-6" />,
      description: 'Revitalize your hair with our nourishing and restorative treatments designed to address specific hair concerns.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      longDescription: 'Healthy hair is beautiful hair. Our specialized treatments are designed to address specific hair concerns such as dryness, damage, frizz, and lack of volume. Using premium products and advanced techniques, our treatments restore vitality, shine, and manageability to your hair. Whether you need intensive moisture, protein reinforcement, or smoothing therapy, we have a solution that will transform your hair and enhance your overall look.',
      services: [
        { 
          name: 'Deep Conditioning', 
          price: '$35+', 
          duration: '30 min',
          description: 'Intensive moisture treatment for dry or damaged hair.',
          details: 'Our deep conditioning treatment infuses your hair with moisture and nutrients to restore softness, shine, and manageability. Ideal for dry, damaged, or colour-treated hair.'
        },
        { 
          name: 'Keratin Treatment', 
          price: '$250+', 
          duration: '180 min',
          description: 'Smoothing treatment that reduces frizz and adds shine.',
          details: 'Our keratin treatment reduces frizz, enhances shine, and makes styling easier by infusing the hair with keratin protein. Results last up to 3-5 months with proper maintenance.'
        },
        { 
          name: 'Scalp Treatment', 
          price: '$45+', 
          duration: '45 min',
          description: 'Therapeutic treatment for scalp health.',
          details: 'Our scalp treatment addresses issues such as dryness, flakiness, and irritation to promote a healthy environment for hair growth. Includes a relaxing scalp massage.'
        },
        { 
          name: 'Hair Mask', 
          price: '$40+', 
          duration: '45 min',
          description: 'Nourishing mask to restore hair vitality.',
          details: 'Our customized hair masks are selected based on your specific hair needs. Whether you need protein, moisture, or colour protection, we have a mask that will revitalize your hair.'
        },
        { 
          name: 'Olaplex Treatment', 
          price: '$50+', 
          duration: '45 min',
          description: 'Bond-building treatment to repair damaged hair.',
          details: 'Olaplex is a revolutionary treatment that repairs broken bonds in the hair caused by chemical, thermal, and mechanical damage. It restores the integrity of the hair and improves its strength and appearance.'
        }
      ]
    },
    styling: {
      title: 'Extensions & Specialty',
      icon: <Brush className="h-6 w-6" />,
      description: 'Add length, volume, or both with our premium extension services and specialty treatments.',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      longDescription: 'Our extensions and specialty services allow you to achieve looks that might not be possible with your natural hair alone. Whether you want to add length, volume, or both, our extension services use premium quality hair and advanced application techniques to deliver natural-looking results. Our specialty services, including perms, relaxers, and bridal styling, are performed by skilled technicians who understand the science and artistry behind these transformative treatments.',
      services: [
        { 
          name: 'Tape-In Extensions', 
          price: 'Consultation Required', 
          duration: 'Varies',
          description: 'Semi-permanent extensions that last 6-8 weeks.',
          details: 'Tape-in extensions are a semi-permanent method that uses adhesive to attach wefts of hair to your natural hair. They lie flat against the head for a comfortable, natural look and can be reused with proper care.'
        },
        { 
          name: 'Fusion Extensions', 
          price: 'Consultation Required', 
          duration: 'Varies',
          description: 'Long-lasting extensions for a natural look.',
          details: 'Fusion extensions use a keratin bond to attach individual strands of extension hair to your natural hair. They offer the most natural look and movement and can last up to 3-4 months with proper care.'
        },
        { 
          name: 'Bridal Services', 
          price: 'Consultation Required', 
          duration: 'Varies',
          description: 'Comprehensive bridal packages including trial run.',
          details: 'Our bridal services include a consultation and trial run to ensure your wedding day hair is exactly what you envision. We also offer services for the entire bridal party to create a cohesive look for your special day.'
        },
        { 
          name: 'Perm', 
          price: '$120+', 
          duration: '180 min',
          description: 'Creates long-lasting curls or waves.',
          details: 'Our perm service creates long-lasting curls or waves using modern techniques and gentle solutions. We can achieve various curl patterns from tight spirals to loose waves depending on your preference.'
        },
        { 
          name: 'Relaxer', 
          price: '$100+', 
          duration: '120 min',
          description: 'Straightens curly or coily hair textures.',
          details: 'Our relaxer service permanently straightens curly or coily hair textures. We use professional-grade products and techniques to minimize damage while achieving smooth, manageable results.'
        }
      ]
    }
  };

  const service = serviceId && serviceDetails[serviceId as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center p-4">
        <SEO 
          title="Service Not Found | Poppy Hair"
          description="The service you're looking for doesn't exist or has been moved. Explore our other professional hair services at Poppy Hair Edinburgh."
          canonicalUrl="/services"
        />
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-4">Service Not Found</h1>
          <p className="text-stone-600 mb-6">The service you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/services" 
            className="bg-stone-700 text-cream-light px-4 sm:px-6 py-2 sm:py-3 rounded font-medium hover:bg-stone-800 transition-colors duration-200 text-sm sm:text-base"
          >
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  // Create structured data for service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "HairSalon",
      "name": "Poppy Hair",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "25A Dundas St",
        "addressLocality": "Edinburgh",
        "postalCode": "EH3 6QQ",
        "addressCountry": "UK"
      }
    },
    "description": service.longDescription,
    "offers": service.services.map(item => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": item.name,
        "description": item.details
      },
      ...(item.price && { "price": item.price.replace('$', '') }),
      "priceCurrency": "GBP"
    })),
    "image": service.image
  };

  const metaTitle = `${service.title} Services | Poppy Hair Edinburgh`;
  const metaDescription = `Expert ${service.title.toLowerCase()} services at Poppy Hair Edinburgh. ${service.description.substring(0, 100)}`;

  return (
    <div className="bg-cream-light py-8 sm:py-12">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={`/services/${serviceId}`}
        imageUrl={service.image}
        schema={[serviceSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8 sm:mb-12 h-64 sm:h-96">
          <img 
            src={service.image} 
            alt={`${service.title} services at Poppy Hair`} 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-stone-900/50 flex items-center">
            <div className="px-4 sm:px-8">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-cream p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  {service.icon}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-cream-light">{service.title}</h1>
              </div>
              <p className="text-cream-light/90 text-sm sm:text-base md:text-lg max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">About Our {service.title} Services</h2>
          <p className="text-stone-600 text-sm sm:text-base">{service.longDescription}</p>
        </div>

        {/* Services List */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-4 sm:mb-6">Our {service.title} Services</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {service.services.map((item, index) => (
              <div key={index} className="bg-cream rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-2">{item.name}</h3>
                  
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center text-stone-600 text-sm sm:text-base">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                      <span>{item.price}</span>
                    </div>
                    {item.duration && (
                      <div className="flex items-center text-stone-600 text-sm sm:text-base">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-stone-600 flex-shrink-0 mt-1" />
                      <p className="text-stone-600 text-sm sm:text-base">{item.details}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/contact" 
                    className="inline-block bg-stone-700 text-cream-light px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-stone-800 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Services */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 mb-4 sm:mb-6">Explore Other Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(serviceDetails)
              .filter(([id]) => id !== serviceId)
              .map(([id, details]) => (
                <Link 
                  key={id} 
                  to={`/services/${id}`} 
                  className="bg-cream rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="bg-cream-dark p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                        {details.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-stone-800">{details.title}</h3>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm">{details.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-stone-700 text-cream-light rounded-lg p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold">Ready to Book Your {service.title} Service?</h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Our team of expert stylists is ready to help you achieve the look you've always wanted. Get in touch today!
            </p>
            <div className="mt-4 sm:mt-6">
              <Link 
                to="/contact" 
                className="bg-cream-light text-stone-800 px-5 sm:px-6 py-2 sm:py-3 rounded font-medium hover:bg-cream transition-colors duration-200 inline-block text-sm sm:text-base"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;