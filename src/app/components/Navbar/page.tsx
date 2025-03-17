"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        {/* Home Link */}
        <Link 
          href="/" 
          className="text-3xl font-bold text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-105 fire-animation"
        >
          Shakti Sabha
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul 
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto`}
        >
          <li>
            <Link 
              href="/" 
              className="block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-black-200 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl hover:shadow-gray-500/30 text-center mb-2"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-black-200 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl hover:shadow-gray-500/30 text-center mb-2"
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              href="/history" 
              className="block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-black-200 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl hover:shadow-gray-500/30 text-center mb-2"
              onClick={closeMenu}
            >
              History
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className="block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-black-200 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl hover:shadow-gray-500/30 text-center mb-2"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className="block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-black-200 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl hover:shadow-gray-500/30 text-center mb-2"
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
