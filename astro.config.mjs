import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import org from 'astro-org';


import orgConfig from './src/lib/org-config.js'

export default defineConfig({
	site: 'https://ian.ist',
	integrations: [
		image({ serviceEntryPoint: '@astrojs/image/sharp' }),
		prefetch({ throttle: 3 }),
		org(orgConfig),
		sitemap()
	],
	build: { assets: "assets" },
});
