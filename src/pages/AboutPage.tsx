import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, MapPin, Users, Heart, Scissors } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import BookNowButton from '../components/BookNowButton';
import SEO from '../components/SEO';

const AboutPage = () => {
  useScrollToTop();
  
  const values = [
    {
      icon: <Scissors className="h-6 w-6" />,
      title: 'Technical excellence',
      description: 'I continuously train and develop my skills to stay at the forefront of hair techniques and trends.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Client focused approach',
      description: 'I listen carefully to understand your needs and preferences, ensuring results that make you feel confident and beautiful.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Inclusive environment',
      description: 'At Poppy Hair I welcome clients of all backgrounds, creating a space where everyone feels comfortable and valued.'
    }
  ];

  // Person schema for the stylist
  const stylistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lucy",
    "jobTitle": "Hair Stylist",
    "description": "With over 12 years of experience, I'm a passionate and creative hairdresser dedicated to making my clients look and feel their best.",
    "worksFor": {
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
    "image": "https://poppy-hair.com/images/LucyPic_1.jpeg"
  };

  return (
    <div className="bg-cream-light py-8 sm:py-12">
      <SEO 
        title="About Poppy Hair | Hair Salon Edinburgh"
        description="Meet Lucy, the expert stylist behind Poppy Hair salon in Edinburgh. With over 12 years of experience, discover her passion for hairdressing and dedication to client satisfaction."
        canonicalUrl="/about"
        schema={[stylistSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">About Poppy Hair</h1>
          <p className="text-stone-600 max-w-3xl mx-auto text-sm sm:text-lg">
           I'm dedicated to providing exceptional hair services in a welcoming and professional environment.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
          <div>
            <img 
              src="/images/LucyPic_1.jpeg" 
              alt="Lucy, professional hair stylist at Poppy Hair salon" 
              className="rounded-lg shadow-md w-full h-auto"
              loading="eager"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">My Story</h2>
            <p className="text-stone-600 mb-3 sm:mb-4 text-sm sm:text-base">
              With over 12 years of experience, I'm a passionate and creative hairdresser dedicated to making my clients look and feel their best. My love for hairdressing has only grown over the years, and I take pride in delivering results that boost confidence and happiness.
            </p>
            <p className="text-stone-600 mb-3 sm:mb-4 text-sm sm:text-base">
              While I enjoy working with all hair types, I have a special passion for short and cropped styles, enhancing natural curls, and creating lived-in colour looks, all while keeping hair healthy and vibrant. There's nothing more rewarding than seeing my clients leave feeling like the best version of themselves.
            </p>
            <p className="text-stone-600 text-sm sm:text-base">
              I'm thrilled to be back at NoiRouge and can't wait to reconnect with past clients and welcome new ones. Whether you're ready for a bold change or just want to refresh your current style, I'd love to work with you!
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 mb-6 sm:mb-8 text-center">My Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-cream p-5 sm:p-6 rounded-lg shadow-md">
                <div className="bg-cream-dark p-2 sm:p-3 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-2">{value.title}</h3>
                <p className="text-stone-600 text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-stone-700 text-cream-light rounded-lg p-6 sm:p-8 mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6 sm:mb-8 text-center">Why choose Poppy Hair ?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex items-start">
              <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <Award className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Expert styling</h3>
                <p className="text-cream-light/80 text-sm sm:text-base">
                  Precision cuts, seamless colour, and expert styling; all crafted to enhance your natural beauty.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Personalised service</h3>
                <p className="text-cream-light/80 text-sm sm:text-base">
                  At PoppyHair, every appointment is personal, I take the time to understand your unique style and hair needs to create a look that's perfectly tailored to you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Convenient hours</h3>
                <p className="text-cream-light/80 text-sm sm:text-base">
                  I offer flexible scheduling, including evening and weekend appointments, to accommodate your busy lifestyle.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-stone-600 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Central location</h3>
                <p className="text-cream-light/80 text-sm sm:text-base">
                  The salon is conveniently located in the heart of Edinbrugh city centre with easy access to public transportation and parking.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-800 mb-3 sm:mb-4">Ready to experience Poppy Hair?</h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
            I'd love to welcome you to the salon and help you achieve the look you've always wanted. Contact for your appointment today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/services" 
              className="w-full sm:w-auto bg-stone-700 text-cream-light px-6 py-3 rounded font-medium hover:bg-stone-800 transition-all duration-200 hover:transform hover:translate-y-[-2px] text-sm sm:text-base"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;