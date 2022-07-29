const { withContentlayer } = require("next-contentlayer");
const nextBuildId = require('next-build-id')

module.exports = withContentlayer({
  compiler: {
    removeConsole: true,
  },
  experimental: {
    images: {
      unoptimized: false,
    },
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
});
