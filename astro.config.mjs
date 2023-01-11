import { defineConfig } from "astro/config";

// integrations
import critters from "astro-critters";
import purgecss from "astro-purgecss";
import mdx from "@astrojs/mdx";
import markdownIntegration from "@astropub/md";

// remark plugins
import m2dx from "astro-m2dx";
import wikiLinkPlugin from "remark-wiki-link-plus";
import remarkEmbed from "remark-embed-plus";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import sectionize from "remark-sectionize";
import remarkDirective from "remark-directive"; // This is required for m2dx
import remarkObsidian from "./src/utils/remark-obsidian-md";

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  mdast: true,
  rawmdx: true,
  styleDirectives: true,
};

// https://astro.build/config
export default defineConfig({
  site: "https://ian.ist",
  trailingSlash: "always",
  integrations: [
    critters(),
    markdownIntegration(),
    mdx({}),
    // This has to be last
    purgecss({
      safelist: ["sidenote", "fn-container"],
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      [m2dx, m2dxOptions],
      remarkObsidian,
      remarkEmbed,
      wikiLinkPlugin,
      remarkGfm,
      remarkSmartypants,
      sectionize,
    ],
  },
});
