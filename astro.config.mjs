import { defineConfig } from "astro/config";
import { remarkObsidian } from "./src/utils";

// https://astro.build/config
export default defineConfig({
  site: "https://ian.ist",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [
        remarkObsidian,
    ],
  },
});
