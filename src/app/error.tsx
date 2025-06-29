'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
         {[...Array(15)].map((_, i) => {
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
          {/* Error Icon */}
          <div className="relative mb-8">
            <div className="text-8xl sm:text-9xl md:text-[8rem] lg:text-[10rem] mb-4">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                ⚠️
              </span>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-6 mb-12">
            <h1 className={`${poppins.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4`}>
              Something Went Wrong
            </h1>
            <p className={`${poppins.className} text-xl sm:text-2xl md:text-3xl font-light text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed`}>
              We encountered an unexpected issue while processing your request.
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Don&apos;t worry - our team has been notified and is working to resolve this issue.
            </p>
          </div>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-red-400 font-semibold mb-2">Development Error Details:</h3>
              <p className="text-red-300 text-sm font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={reset}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl min-w-[200px]"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Try Again</span>
              </span>
            </Button>

            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl min-w-[200px]"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 001 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Go Home</span>
              </span>
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <h3 className={`${poppins.className} text-2xl font-semibold text-white mb-6`}>
              Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/10 hover:border-white/20">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  📧
                </div>
                <h4 className="text-white font-semibold mb-2">Contact Support</h4>
                <p className="text-white/60 text-sm">
                  Get in touch with our team
                </p>
              </div>

              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/10 hover:border-white/20">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  🔄
                </div>
                <h4 className="text-white font-semibold mb-2">Refresh Page</h4>
                <p className="text-white/60 text-sm">
                  Sometimes a simple refresh helps
                </p>
              </div>

              <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/10 hover:border-white/20">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  📱
                </div>
                <h4 className="text-white font-semibold mb-2">Report Issue</h4>
                <p className="text-white/60 text-sm">
                  Help us improve the platform
                </p>
              </div>
            </div>
          </div>

          {/* Brand Message */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xl">⚔️</span>
              </div>
              <span className={`${poppins.className} text-2xl font-bold bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent`}>
                Shakti Sabha
              </span>
            </div>
            <p className="text-white/60 text-lg">
              💪 Empowering women through education and support
            </p>
          </div>
                 </div>
       </div>
     </main>
   );
 } 