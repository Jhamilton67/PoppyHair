import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream-light/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Scissors className="h-8 w-8 text-stone-700" />
              <span className="ml-2 text-xl font-serif font-semibold text-stone-800">Poppy Hair</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-stone-800 font-medium' : 'text-stone-600 hover:text-stone-800'} transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`${isActive('/services') ? 'text-stone-800 font-medium' : 'text-stone-600 hover:text-stone-800'} transition-colors duration-200`}
            >
              Services
            </Link>
            <Link 
              to="/gallery" 
              className={`${isActive('/gallery') ? 'text-stone-800 font-medium' : 'text-stone-600 hover:text-stone-800'} transition-colors duration-200`}
            >
              Gallery
            </Link>
            <Link 
              to="/about" 
              className={`${isActive('/about') ? 'text-stone-800 font-medium' : 'text-stone-600 hover:text-stone-800'} transition-colors duration-200`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-stone-800 font-medium' : 'text-stone-600 hover:text-stone-800'} transition-colors duration-200`}
            >
              Contact
            </Link>
            <Link 
              to="/contact" 
              className="bg-stone-700 text-cream-light px-4 py-2 rounded hover:bg-stone-800 transition-colors duration-200"
            >
              Enquire Now
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-stone-600 hover:text-stone-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream-light border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`${isActive('/') ? 'bg-cream-dark text-stone-800' : 'text-stone-600 hover:bg-cream'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`${isActive('/services') ? 'bg-cream-dark text-stone-800' : 'text-stone-600 hover:bg-cream'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/gallery"
              className={`${isActive('/gallery') ? 'bg-cream-dark text-stone-800' : 'text-stone-600 hover:bg-cream'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={toggleMenu}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'bg-cream-dark text-stone-800' : 'text-stone-600 hover:bg-cream'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${isActive('/contact') ? 'bg-cream-dark text-stone-800' : 'text-stone-600 hover:bg-cream'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium bg-stone-700 text-cream-light hover:bg-stone-800"
              onClick={toggleMenu}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;