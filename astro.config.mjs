import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import org from 'astro-org';
import icon from "astro-icon";

import orgConfig from './src/lib/org-config.js';
import rehypePlugins from './src/lib/rehype/index.js';
import remarkPlugins from './src/lib/remark/index.js';

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://drollery.org',
  experimental: {
    assets: true
  },
  image: {
    service: sharpImageService()
  },
  markdown: {
    rehypePlugins,
    remarkPlugins
  },
  integrations: [org(orgConfig), icon({
    include: {
      "fa6-brands": ["*"],
      "simple-icons": ["*"]
    }
  }), sitemap()
    , compress()],
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  vite: {
    css: {
      devSourcemap: true
    }
  }
});
