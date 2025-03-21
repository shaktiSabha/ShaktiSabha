
import Link from 'next/link';

const navigationItems = [
  'Home',
  'About Us',
  'Learn and Empower',
  'Community',
  'Blogs',
  'Our Gallery',
  'Contact'
];

const Logo = () => (
  <Link href="/" className="group flex items-center space-x-3">
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center 
      group-hover:bg-white/20 transform group-hover:scale-105 group-hover:rotate-3
      transition-all duration-300 shadow-lg hover:shadow-white/20">
      <span className="text-2xl transform group-hover:-rotate-3">⚔️</span>
    </div>
    <span className="text-2xl font-bold bg-red-400 bg-clip-text 
      text-transparent group-hover:from-white group-hover:to-white transform 
      group-hover:scale-105 transition-all duration-300">
      Shakti Sabha
    </span>
  </Link>
);

const NavLink = ({ item }: { item: string }) => (
  <Link
    href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
    className="relative px-4 py-2 text-white font-medium text-sm 
      hover:text-red-400 transition-all duration-300 group overflow-hidden"
  >
    {item}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform 
      translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
  </Link>
);

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="list-none p-2 rounded-lg hover:bg-white/10 
          transition-all duration-300 cursor-pointer transform hover:scale-105">
          <svg
            className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <div className="absolute right-0 w-56 mt-2 origin-top-right">
          <div className="bg-black/80 backdrop-blur-md rounded-lg shadow-lg 
            border border-white/10 overflow-hidden transform transition-all duration-300
            hover:border-white/20 hover:shadow-white/10">
            {navigationItems.map(item => (
              <Link
                key={item}
                href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
                className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 
                  hover:text-white hover:pl-6 transition-all duration-300
                  border-b border-white/5"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map(item => (
              <NavLink key={item} item={item} />
            ))}
          </div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
"use client"; // Ensure this is a client component

import { useState } from "react";
import Link from "next/link";

const navigationItems = [
  "Home",
  "About Us",
  "Learn and Empower",
  "Community",
  "Blog & Media",
  "Shop",
  "Contact",
  "Join Us",
];

const Logo = () => (
  <Link
    href="/"
    className="text-3xl font-bold text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-105"
  >
    <span className="bg-gradient-to-r from-gray-300 to-white text-transparent bg-clip-text">
      Shakti Sabha
    </span>
  </Link>
);

const NavLink = ({ item }: { item: string }) => (
  <Link
    href={`/${item === "Home" ? "" : item.toLowerCase().replaceAll(" ", "-")}`}
    className="relative px-4 py-2 text-gray-300 font-medium text-sm hover:text-white transition-all duration-300 group"
  >
    {item}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </Link>
);

const MobileMenu = ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean; toggleMenu: () => void }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 mt-2 px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md rounded-lg">
          {navigationItems.map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase().replaceAll(" ", "-")}`}
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navigationItems.map((item) => (
              <NavLink key={item} item={item} />
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
