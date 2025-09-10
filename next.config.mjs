/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove unused transpilePackages since we're not using lobe-ui anymore
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons'],
  },
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Bundle analyzer configuration (only in development)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer')())({
          enabled: true,
        })
      );
      return config;
    },
  }),

  // Performance optimizations enabled by default in Next.js 15
  
  // Reduce bundle size by tree-shaking unused code
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/es/icons/{{member}}',
    },
  },
};

export default nextConfig;