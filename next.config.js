/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' https://s3.tradingview.com 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' https://s3.tradingview.com https://*.tradingview.com http://localhost:8000 ${process.env.CANDLE_API_URL || ''};
  img-src 'self' data: https:;
  frame-src https://s.tradingview.com https://www.tradingview.com https://www.youtube.com;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ' '),
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
