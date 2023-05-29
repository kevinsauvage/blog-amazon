/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */

const path = require('node:path');

const nextConfig = {
  images: { domains: ['brainbloomr.com', 'localhost'] },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles/')],
    prependData: `
        @import "mixins.scss";
        @import "responsive.scss";
        @import "themes.scss";
        @import "variables.scss";
        `,
  },
};

module.exports = nextConfig;
