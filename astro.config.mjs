import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://ian.ist",
  trailingSlash: "always",
  experimental: {
    contentCollections: true,
  },
});
