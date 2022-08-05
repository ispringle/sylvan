const nextBuildId = require('next-build-id')

module.exports = {
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
};
