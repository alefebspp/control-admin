/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER: process.env.API_SERVER
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/control-test/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
