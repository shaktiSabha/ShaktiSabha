import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize compilation
  typescript: {
    // Skip type checking during build for faster development
    ignoreBuildErrors: false,
  },

  // Reduce filesystem operations
  generateEtags: false,

  // Optimize static file serving
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      }
    ],
    // Optimize image loading
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimizations (only used when --webpack flag is passed)
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce filesystem watchers in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules',
          '**/.git',
          '**/.next',
          '**/dist',
          '**/build',
        ],
      };
    }

    return config;
  },

  // Turbopack configuration (Next.js 16+ default)
  turbopack: {},
};

export default nextConfig;
