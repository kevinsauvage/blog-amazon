/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */

const path = require('node:path');

const nextConfig = {
  images: { domains: ['healthwellnessguide9.files.wordpress.com', 'localhost'] },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `
        @import "mixins.scss";
        @import "responsive.scss";
        @import "themes.scss";
        `,
  },
};

module.exports = nextConfig;
