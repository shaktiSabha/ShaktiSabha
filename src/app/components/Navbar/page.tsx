import Link from 'next/link';

const navigationItems = [
  'Home',
  'About Us',
  'Learn and Empower',
  'Community',
  'Blog & Media',
  'Shop',
  'Contact',
  'Join Us'
];

const Logo = () => (
  <Link href="/" className="text-3xl font-bold text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-105">
    <span className="bg-gradient-to-r from-gray-300 to-white text-transparent bg-clip-text">
      Shakti Sabha
    </span>
  </Link>
);

const NavLink = ({ item }: { item: string }) => (
  <Link
    href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
    className="relative px-4 py-2 text-gray-300 font-medium text-sm hover:text-white transition-all duration-300 group"
  >
    {item}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </Link>
);

// Create a separate client component for mobile menu
const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <details className="group">
        <summary className="list-none text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300">
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
        </summary>
        <div className="absolute left-0 right-0 mt-2 px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-md">
          {navigationItems.map(item => (
            <Link
              key={item}
              href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navigationItems.map(item => (
              <NavLink key={item} item={item} />
            ))}
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2">
              {['Home', 'About', 'History', 'Contact', 'Blog'].map((item) => (
                <Link
                  key={item}
                  href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '')}`}
                  className="block px-3 py-2 rounded-md text-white hover:bg-purple-500/20 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
