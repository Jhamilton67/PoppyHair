import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links - Left Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-stone-300 hover:text-cream-light transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-stone-300 hover:text-cream-light transition-colors duration-200">Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-300 hover:text-cream-light transition-colors duration-200">Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-300 hover:text-cream-light transition-colors duration-200">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-cream-light transition-colors duration-200">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Logo and Social - Center Column */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-4">
              <Scissors className="h-6 w-6" />
              <span className="ml-2 text-xl font-serif font-semibold">Poppy Hair</span>
            </div>
            <p className="text-stone-300 text-sm max-w-md mb-6">
              Elevating your natural beauty with expert hair care and styling.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/poppy_lucyhair/?igsh=MTVseDhuenk2N3QwZg%3D%3D&utm_source=qr#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-300 hover:text-cream-light transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.facebook.com/people/Poppy-Hair/61571631990740/?mibextid=wwXIfr&rdid=5Q5LiDh8N61KwYHc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FkzSpUNTV%2F%3Fmibextid%3DwwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-300 hover:text-cream-light transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info - Right Column */}
          <div className="flex flex-col items-center sm:items-end">
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-end">
                <Phone className="h-5 w-5 mr-2" />
                <span>+44 7849 474199</span>
              </li>
              <li className="flex items-center justify-center sm:justify-end">
                <Mail className="h-5 w-5 mr-2" />
                <span className="break-all">lucy_hairbuisness@outlook.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-end text-center sm:text-right">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>25A Dundas St, Edinburgh EH3 6QQ</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-700 mt-12 pt-8 text-center text-stone-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Poppy Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;