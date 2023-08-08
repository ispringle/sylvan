import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import org from 'astro-org'
import orgConfig from './src/lib/org-config.js'
import rehypePlugins from './src/lib/rehype/index.js'
import remarkPlugins from './src/lib/remark/index.js'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://drollery.org',
  expirimental: {
    assets: true,
  },
  markdown: {
    rehypePlugins,
    remarkPlugins,
  },
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    org(orgConfig),
    sitemap(),
    mdx()
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  }
})
