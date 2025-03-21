import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Star, ChevronRight, Droplet, Sparkles } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import BookNowButton from '../components/BookNowButton';
import SEO from '../components/SEO';

const HomePage = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const handleViewServices = () => {
    navigate('/services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      title: 'Haircuts',
      description: 'Precision cuts tailored to your face shape and personal style.',
      icon: <Scissors className="h-6 w-6" />,
    },
    {
      title: 'Colouring',
      description: 'From subtle highlights to bold transformations, I can deliver stunning results.',
      icon: <Droplet className="h-6 w-6" />,
    },
    {
      title: 'Treatments',
      description: 'Revitalize your hair with my nourishing and restorative treatments.',
      icon: <Sparkles className="h-6 w-6" />,
    }
  ];

  const testimonials = [
    {
      text: "Poppy has been cutting my short hair for years, and I'm more than happy to follow her here. Whether you're a man or woman with short hair, I highly recommend her! My cuts are always stylish, easy to maintain, and if I ever want a change (even with limited length to work with), Poppy always has great ideas.",
      author: "Ashley Buchan",
      role: "Regular Client"
    },
    {
      text: "I got a quick cut with Poppy, and she was so thoughtful throughout—checking the water temperature, making sure I was happy with the length, and perfecting the styling. I can't wait to come back for a refresh and a colour next time!",
      author: "Clara C.",
      role: "New Client"
    },
    {
      text: "Poppy did my hair, and she was excellent! She took the time to understand what I like, how I manage my hair, and how to care for it at home. She's clearly a skilled cutter with great knowledge of colour, all while being incredibly charming and courteous. Thank you, Poppy!",
      author: "Fiona Robertson",
      role: "Loyal Customer"
    }
  ];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Poppy Hair",
    "url": "https://poppy-hair.com",
    "logo": "https://poppy-hair.com/scissors.svg",
    "image": "https://poppy-hair.com/images/LucyPic_2.jpeg",
    "description": "Expert hair salon in Edinburgh specializing in precision cuts, creative colouring, and professional styling. Visit our welcoming salon for a personalized hair experience.",
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
    "areaServed": {
      "@type": "City",
      "name": "Edinburgh"
    },
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
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Haircuts",
            "description": "Professional haircuts for all styles"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hair Colouring",
            "description": "Expert colour services including highlights, balayage, and full colour"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hair Treatments",
            "description": "Specialized treatments for hair health and maintenance"
          }
        }
      ]
    }
  };

  return (
    <div>
      <SEO 
        title="Poppy Hair | Professional Hair Salon in Edinburgh"
        description="Edinburgh's premier hair salon offering expert styling, precision cutting, and creative colouring services. Visit our central Edinburgh location for a personalized hair experience with our skilled stylist."
        canonicalUrl="/"
        schema={[businessSchema]}
        keywords="hair salon edinburgh, hairdresser edinburgh, balayage edinburgh, hair colouring edinburgh, highlights edinburgh, professional haircuts, women's haircuts, men's haircuts, hair treatments"
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[90vh] bg-cover bg-center" style={{ backgroundImage: 'url("/images/LucyPic_2.jpeg")' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream-light leading-tight max-w-2xl animate-fade-in">
            Elevate your style at Poppy Hair
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-cream-light/90 max-w-xl animate-fade-in delay-100">
            Expert styling, cutting, and colouring services tailored to enhance your natural beauty.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-4 animate-fade-in delay-200">
            <button 
              onClick={handleViewServices}
              className="w-full sm:w-[160px] h-[48px] bg-cream-light text-stone-800 rounded font-medium transition-all duration-200 flex items-center justify-center hover:bg-cream hover:transform hover:translate-y-[-2px]"
            >
              Explore Services
            </button>
            <BookNowButton 
              variant="primary" 
              className="!w-full sm:!w-[160px] !h-[48px]"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">My Services</h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              From precision cuts to vibrant colours, I offer a full range of professional hair services to suit your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-cream-light p-6 sm:p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl group flex flex-col"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="bg-cream p-3 rounded-full mr-3">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-stone-800">{service.title}</h3>
                    {/* <p className="text-stone-600 text-sm">{service.price}</p> */}
                  </div>
                </div>
                <p className="text-stone-600 mb-6 sm:mb-8 flex-grow">{service.description}</p>
                <BookNowButton variant="primary" className="!w-full mt-auto" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleViewServices}
              className="inline-flex items-center justify-center px-6 py-3 bg-stone-700 text-cream-light rounded font-medium hover:bg-stone-800 transition-all duration-200 group w-full sm:w-auto"
            >
              View All Services
              <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-stone-700 text-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4 sm:mb-6">Client Stories</h2>
            <p className="text-base sm:text-lg text-cream-light/80 max-w-2xl mx-auto">
              Read what my clients have to say about their experiences with Poppy Hair
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-stone-800/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm flex flex-col h-full"
              >
                <div className="flex text-cream mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="italic text-cream-light/90 mb-6 sm:mb-8 flex-grow text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 bg-stone-600 rounded-full flex items-center justify-center text-cream-light font-medium">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-cream-light/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 mb-4 sm:mb-6">Ready to transform your look?</h2>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto mb-6 sm:mb-8">
            Book your appointment today and experience the Poppy Hair difference.
          </p>
          <BookNowButton 
            variant="primary"
            className="!w-full sm:!w-auto !px-8 !py-4"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;