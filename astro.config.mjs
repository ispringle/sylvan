import { defineConfig } from "astro/config";
import wikiLinkPlugin from "remark-wiki-link-plus";
import remarkEmbed from "remark-embed-plus";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkObsidian from "./src/utils/remark-obsidian-md";
import sectionize from "remark-sectionize";

// https://astro.build/config
export default defineConfig({
  site: "https://ian.ist",
  trailingSlash: "always",
  markdown: {
    remarkPlugins: [
      remarkObsidian,
      remarkEmbed,
      wikiLinkPlugin,
      remarkGfm,
      remarkSmartypants,
      sectionize,
    ],
  },
});
