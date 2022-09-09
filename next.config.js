const packageJson = require("./package.json");

const nextBuildId = require("next-build-id");

module.exports = {
  compiler: {
    removeConsole: true,
  },
  env: {
    NEXT_PUBLIC_NEXT_JS_VERSION: packageJson.dependencies.next.replace("^", ""),
    NEXT_PUBLIC_BUILD_TIME: new Date(),
  },
  experimental: {
    images: {
      unoptimized: false,
    },
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  swcMinify: true,
};
