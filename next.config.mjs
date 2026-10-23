/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
  async redirects() {
    return [
      // One canonical host: www goes to the bare domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.westernpremium.co' }],
        destination: 'https://westernpremium.co/:path*',
        permanent: true,
      },
      { source: '/asset-one-africa', destination: '/assetone', permanent: true },
      { source: '/experience', destination: '/case-studies', permanent: true },
      // Pages from the previous site on this domain that Google still links to
      { source: '/why-westernpremium', destination: '/about', permanent: true },
      { source: '/insights', destination: '/case-studies', permanent: true },
      { source: '/insights/:slug*', destination: '/case-studies', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/services/:slug*', destination: '/solutions', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
