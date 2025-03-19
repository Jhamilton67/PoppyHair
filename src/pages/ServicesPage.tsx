import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Droplet, Sparkles, Brush, Info } from 'lucide-react';
import BookNowButton from '../components/BookNowButton';
import { useScrollToTop } from '../hooks/useScrollToTop';
import SEO from '../components/SEO';

const ServicesPage = () => {
  useScrollToTop();
  
  const serviceCategories = [
    {
      id: 'haircuts',
      title: 'Haircuts & Styling',
      icon: <Scissors className="h-6 w-6" />,
      description: 'Precision cuts and styling tailored to your face shape and personal style.',
      services: [
        { name: 'Women\'s Haircut', description: 'Shampoo, cut, and style.', price: 'From £50' },
        { name: 'Men\'s Haircut',  description: 'Shampoo, cut, and style.', price: 'From £35' },
        { name: 'Children\'s Haircut', description: 'For children under 12 years.', price: 'From £35' },
        { name: 'Blowout & Style',  description: 'Shampoo and professional styling.', price: 'From £30' },
        { name: 'Fringe Trim',  description: 'A fringe trim keeps your hair fresh and styled please arrive with clean, washed hair.', price: 'From £5' }
      ]
    },
    {
      id: 'coloring',
      title: 'Colouring',
      icon: <Droplet className="h-6 w-6" />,
      description: 'From subtle highlights to bold transformations.',
      services: [
        { name: 'Full Head Highlights', description: 'A full refresh with highlights placed throughout your hair for a bright, multi dimensional look. (Consultation Required)', price: 'From £110' },
        { name: 'T Line Highlights', description: 'Subtle highlights focused around the hairline and parting, perfect for a soft refresh. (Consultation Required)', price: 'From £80' },
        { name: 'Half Head Highlight', description: 'Highlights applied to the top and sides of your hair, adding dimension while keeping depth underneath. (Consultation Required)', price: 'From £95' },
        { name: 'Full Head Bleach & Tone', description: 'A complete blonde transformation with a bleaching process and toner for a flawless, even finish. (Consultation Required)', price: 'From £110' },
        { name: 'Full Head Tint', description: 'A rich, all over colour applied from roots to ends for a vibrant and refreshed look. (Consultation Required)', price: 'From £85' },
        { name: 'Regrowth Tint', description: 'A root touch up to blend new growth seamlessly with your existing colour. (Consultation Required)', price: 'From £70' },
        { name: 'Balayage Maintenance', description: 'A refresh for your existing balayage, maintaining brightness and blending regrowth. (Consultation Required)', price: 'From £95' },
        { name: 'Balayage', description: 'A hand painted colouring technique for a soft, natural looking gradient with low maintenance regrowth. (Consultation Required)', price: 'From £110'},
        { name: 'Tint & Highlights', description: 'A combination of rich colour and soft highlights for depth and dimension. (Consultation Required)', price: 'From £95' },
        { name: 'Semi Permanent All-Over Colour', description: 'A temporary colour that enhances tone and shine while gradually fading over time. (Consultation Required)', price: 'From £80' },
        { name: 'Toner', description: 'A temporary colour that enhances tone and shine while gradually fading over time. (Consultation Required)', price: 'From £30' },
        { name: 'Colour Correction', description: 'Corrective colour services priced upon consultation. (Consultation Required)', price: 'Consultation Required' }        
      ]
    },
    {
      id: 'treatments',
      title: 'Treatments',
      icon: <Sparkles className="h-6 w-6" />,
      description: 'Revitalise your hair with nourishing and restorative treatments.',
      services: [
        { name: 'K18 Treatment', description: 'A powerful, bond building treatment that repairs hair from the inside out, restoring strength, softness, and resilience.', price: 'From £25' },
        { name: 'Moisture Treatment', description: 'A deep conditioning treatment that hydrates and nourishes dry, brittle hair, leaving it soft, smooth, and revitalized.', price: 'From £10' },
      ]
    }
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Poppy Hair",
    "url": "https://poppy-hair.com/services",
    "makesOffer": serviceCategories.flatMap(category => 
      category.services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "GBP",
          "price": service.price?.replace(/[^0-9]/g, '') || "0"
        }
      }))
    ),
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://poppy-hair.com/contact",
        "inLanguage": "en-GB",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Hair Service Booking"
      }
    }
  };

  return (
    <div className="bg-cream-light py-8 sm:py-12">
      <SEO 
        title="Hair Salon Services & Prices | Poppy Hair Edinburgh"
        description="Discover our comprehensive range of professional hair services in Edinburgh. From precision cuts to expert colouring and treatments. View our service menu and book your appointment today."
        canonicalUrl="/services"
        schema={[servicesSchema]}
        keywords="hair salon prices edinburgh, haircut prices, hair colouring prices, balayage edinburgh, highlights cost, hair treatment prices, professional hair services"
        type="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800">Services</h1>
          <p className="mt-3 sm:mt-4 text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
            At Poppy Hair, I offer a comprehensive range of hair services designed to enhance your natural beauty and help you express your unique style.
          </p>
        </div>

        {/* Animated Price Disclaimer */}
        <div className="relative overflow-hidden bg-stone-50 border-l-4 border-stone-700 rounded-lg shadow-md mb-10 sm:mb-12 p-5 sm:p-7 animate-[fadeIn_0.8s_ease-in-out] hover:shadow-lg transition-shadow duration-300">
          {/* Pulsing background effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-stone-200 opacity-0 animate-[pulse_3s_infinite] rounded-r-lg"></div>
          
          <div className="flex items-start relative z-10">
            <div className="bg-stone-700 text-cream-light p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0 animate-[bounce_2s_ease-in-out]">
              <Info className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-stone-800 mb-2 sm:mb-3">
                Pricing Information
              </h2>
              <p className="text-stone-600 text-sm sm:text-base">
                All prices listed are starting prices. The final cost will be determined after a personal consultation with Poppy, as service requirements can vary based on hair length, thickness, condition, and desired outcome. A detailed quote will be provided before proceeding with any service.
              </p>
            </div>
          </div>
        </div>

        {serviceCategories.map((category) => (
          <div key={category.id} className="mb-10 sm:mb-16" id={category.id}>
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="bg-cream p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                {category.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800">{category.title}</h2>
            </div>
            <p className="text-stone-600 mb-5 sm:mb-8 max-w-3xl text-sm sm:text-base">{category.description}</p>
            
            <div className="bg-cream rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-stone-200">
                {category.services.map((service, index) => (
                  <div key={index} className="p-4 sm:p-6 hover:bg-cream-dark transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 sm:gap-0">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base sm:text-lg font-medium text-stone-800">{service.name}</h3>
                          <span className="text-stone-700 font-medium bg-cream-dark px-2 py-1 rounded text-sm">
                            {service.price}
                          </span>
                        </div>
                        <p className="mt-1 text-stone-600 text-sm">{service.description}</p>
                      </div>
                      <div className="w-full sm:w-auto text-right mt-2 sm:mt-0 sm:ml-4">
                        <BookNowButton className="w-full sm:w-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="bg-stone-700 text-cream-light rounded-lg p-6 sm:p-8 mt-10 sm:mt-12">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold">Ready to transform your look?</h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              I'm here to help you achieve the look you've always wanted. Get in touch to book your appointment!
            </p>
            <div className="mt-5 sm:mt-6">
              <BookNowButton variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;