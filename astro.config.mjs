import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import org from 'astro-org'
import orgConfig from './src/lib/org-config.js'
import rehypePlugins from './src/lib/rehype/index.js'
import remarkPlugins from './src/lib/remark/index.js'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://ian.ist',
  markdown: {
    rehypePlugins,
    remarkPlugins,
  },
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    prefetch({
      throttle: 3
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
