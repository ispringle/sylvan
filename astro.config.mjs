import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import compress from 'astro-compress';

import rehypePlugins from './src/lib/rehype/index.js';
import remarkPlugins from './src/lib/remark/index.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://drollery.org',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  markdown: {
    rehypePlugins,
    remarkPlugins,
  },
  integrations: [
    mdx({
      rehypePlugins,
      remarkPlugins,
    }),
    icon({
      include: {
        'fa6-brands': ['*'],
        'simple-icons': ['*'],
      },
    }),
    compress(),
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
