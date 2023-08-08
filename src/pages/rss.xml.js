// import rss from '@astrojs/rss';
// import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
// import { allPages } from "@lib/pages";
// import { contentFilter } from "@utils";

// export async function get(context) {
//   	const pages = filterContent(await allPages, false);
// 	return rss({
// 		title: SITE_TITLE,
// 		description: SITE_DESCRIPTION,
// 		site: context.site,
// 		items: pages.map((page) => ({
// 			...page.data,
// 			link: page.slug,
// 			title: page.title,
// 			pubDate: page?.created || ''})),
// 	});
// }
