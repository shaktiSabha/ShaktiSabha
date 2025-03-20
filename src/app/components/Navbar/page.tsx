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
    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text 
      text-transparent group-hover:from-white group-hover:to-white transform 
      group-hover:scale-105 transition-all duration-300">
      Shakti Sabha
    </span>
  </Link>
);

const NavLink = ({ item }: { item: string }) => (
  <Link
    href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
    className="relative px-4 py-2 text-gray-300 font-medium text-sm 
      hover:text-white transition-all duration-300 group overflow-hidden"
  >
    {item}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/70 transform 
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
            
            <Link
              href="/join-us"
              className="block px-4 py-3 text-sm text-white
                bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
                hover:bg-gradient-to-br shadow-lg shadow-purple-500/50 
                hover:shadow-purple-800/80 font-medium transition-all duration-300
                hover:pl-6 transform hover:scale-[1.02]"
            >
              Join Us
            </Link>
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
            
            <Link
              href="/join-us"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Join Us
            </Link>
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
