import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const animationClasses = ['animate-float', 'animate-float-slow', 'animate-float-medium'];
          const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-red-400/30 rounded-full ${randomAnimation}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className={`${poppins.className} text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-bold bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent leading-none select-none`}>
              404
            </h1>
            
            {/* Glowing effect behind 404 */}
            <div className="absolute inset-0 text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-red-500/20 blur-sm leading-none">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h2 className={`${poppins.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4`}>
              Page Not Found
            </h2>
            <p className={`${poppins.className} text-xl sm:text-2xl md:text-3xl font-light text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed`}>
              Oops! The page you&apos;re looking for seems to have wandered off on its own empowerment journey.
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Don&apos;t worry though - let&apos;s get you back on track to discover amazing content and resources.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              asChild
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl min-w-[200px]"
            >
              <Link href="/">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Go Home</span>
                </span>
              </Link>
            </Button>

            <Button 
              asChild
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl min-w-[200px]"
            >
              <Link href="/contact">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact Us</span>
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 