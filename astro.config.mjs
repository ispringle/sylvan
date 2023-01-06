import { defineConfig } from "astro/config";
import wikiLinkPlugin from "remark-wiki-link-plus";
import remarkEmbed from "remark-embed-plus";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkObsidian from "./src/utils/remark-obsidian-md";
import sectionize from "remark-sectionize";
import critters from "astro-critters";
// import partytown from "@astrojs/partytown";
import purgecss from "astro-purgecss";

export default defineConfig({
  site: "https://ian.ist",
  trailingSlash: "always",
  integrations: [
    critters(),
    // partytown(), // Not working with turbo
    // This has to be last
    purgecss(),
  ],
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
