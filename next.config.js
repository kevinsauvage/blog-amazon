/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */

const path = require('node:path');

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },

  async headers() {
    return [
      {
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
        source: '/(.*)',
      },
    ];
  },
  images: {
    domains: ['strapi-blog-news-production.up.railway.app', 'localhost', '127.0.0.1'],

    minimumCacheTTL: 60 * 60,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `
        @import "mixins.scss";
        @import "responsive.scss";
        @import "themes.scss";
        @import "variables.scss";
        @import "fontFaces.scss";
        `,
  },
};

module.exports = nextConfig;
