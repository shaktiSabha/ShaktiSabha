import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const primaryNavigationItems = [
  'Home',
  'About Us',
  'Learn and Empower',
  'Blogs',
];

const secondaryNavigationItems = [
  'Our Gallery',
  'Contact',
];

const allNavigationItems = [...primaryNavigationItems, ...secondaryNavigationItems];

const Logo = () => (
  <Link href="/" className="flex items-center space-x-2 md:space-x-3">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center 
      hover:bg-white/20 transform hover:scale-105 hover:rotate-3
      transition-all duration-300 shadow-lg hover:shadow-white/20">
      <span className="text-xl md:text-2xl transform hover:-rotate-3">⚔️</span>
    </div>
    <span className="text-lg md:text-2xl font-bold bg-red-400 bg-clip-text 
      text-transparent hover:from-white hover:to-white transform 
      hover:scale-105 transition-all duration-300">
      Shakti<span className="hidden sm:inline"> Sabha</span>
    </span>
  </Link>
);

const NavLink = ({ item, compact = false }: { item: string; compact?: boolean }) => (
  <Link
    href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
    className={`relative px-2 lg:px-4 py-2 text-white font-medium transition-all duration-300 group overflow-hidden
      hover:text-red-400 ${compact ? 'text-xs lg:text-sm' : 'text-sm'}`}
  >
    <span className="hidden lg:inline">{item}</span>
    <span className="lg:hidden">
      {item === 'Learn and Empower' ? 'Learn' : 
       item === 'About Us' ? 'About' : 
       item === 'Our Gallery' ? 'Gallery' : item}
    </span>
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform 
      -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
  </Link>
);

const JoinUsButton = ({ compact = false }: { compact?: boolean }) => (
  <Button
    asChild
    className={`bg-red-500 text-white font-semibold rounded-full 
      hover:bg-red-600 transform hover:scale-105 transition-all duration-300 
      shadow-lg hover:shadow-red-500/30 ${compact ? 'px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm' : ''}`}
  >
    <Link href="/join-us">
      <span className="hidden sm:inline">Join Us</span>
      <span className="sm:hidden">Join</span>
    </Link>
  </Button>
);

const MoreDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative px-2 lg:px-4 py-2 text-white font-medium text-sm 
        hover:text-red-400 transition-all duration-300 group overflow-hidden flex items-center space-x-1">
        <span>More</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform 
          -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-black/90 backdrop-blur-md rounded-lg shadow-lg 
      border border-white/10 overflow-hidden transform transition-all duration-300">
      {secondaryNavigationItems.map((item) => (
        <DropdownMenuItem key={item} asChild>
          <Link
            href={`/${item.toLowerCase().replaceAll(' ', '-')}`}
            className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 
              hover:text-white transition-all duration-300"
          >
            {item}
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileMenu = () => (
  <div className="md:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-white/10 
          transition-all duration-300 transform hover:scale-105">
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
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/80 backdrop-blur-md rounded-lg shadow-lg 
        border border-white/10 overflow-hidden transform transition-all duration-300
        hover:border-white/20 hover:shadow-white/10 w-48">
        {allNavigationItems.map((item) => (
          <DropdownMenuItem key={item} asChild>
            <Link
              href={`/${item === 'Home' ? '' : item.toLowerCase().replaceAll(' ', '-')}`}
              className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 
                hover:text-white transition-all duration-300"
            >
              {item}
            </Link>
          </DropdownMenuItem>
        ))}
        <div className="p-4 border-t border-white/5 flex justify-center">
          <JoinUsButton compact={true} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Logo />
          
          {/* Medium and Large Screen Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {/* Primary navigation - always visible on md+ */}
            <div className="flex items-center space-x-1 lg:space-x-4">
              {primaryNavigationItems.map((item) => (
                <NavLink key={item} item={item} compact={true} />
              ))}
            </div>
            
            {/* Secondary navigation - dropdown on medium, expanded on large */}
            <div className="hidden lg:flex items-center space-x-4">
              {secondaryNavigationItems.map((item) => (
                <NavLink key={item} item={item} />
              ))}
            </div>
            
            {/* More dropdown - only visible on medium screens */}
            <div className="lg:hidden">
              <MoreDropdown />
            </div>
            
            <div className="ml-2 lg:ml-0">
              <JoinUsButton compact={true} />
            </div>
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
