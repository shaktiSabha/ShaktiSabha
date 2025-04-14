import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = {
    Facebook: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
    Twitter: (
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    ),
    Instagram: (
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    ),
    Telegram: (
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    ),
  };

  return (
    <footer className="bg-black/30 backdrop-blur-sm text-red-400 py-12">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo & Copyright Section */}
          <div className="text-center md:text-left space-y-4">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-red-400">
                Shakti Sabha
              </h3>
              <p className="text-gray-300">
                &copy; {currentYear} All Rights Reserved.
              </p>
            </div>
            <p className="text-sm text-gray-300 max-w-xs mx-auto md:mx-0">
              Empowering Women, Enriching Lives Through Unity and Strength
            </p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center text-white">Connect With Us</h4>
            <div className="flex justify-center gap-4">
              {[
                { href: "https://facebook.com", label: "Facebook" },
                { href: "https://twitter.com", label: "Twitter" },
                { href: "https://instagram.com", label: "Instagram" },
                { href: "https://telegram.org", label: "Telegram" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                >
                  <svg 
                    className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {socialIcons[social.label as keyof typeof socialIcons]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 
                    hover:translate-x-1 transform inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-300">
                Made with ❤️ for women empowerment
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
