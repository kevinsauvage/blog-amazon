/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */

const path = require('node:path');

const nextConfig = {
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
  images: { domains: ['brainbloomr3.local', 'localhost'] },
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
