import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { allPages } from "@lib/pages";

// export async function get(context) {
//     const pages = await allPages;
//     const items = pages.map(({ frontmatter }) => ({
//         ...frontmatter.data,
//         link: frontmatter.slug,
//         title: frontmatter.title,
//         pubDate: frontmatter?.created || new Date()
//     }));
//     console.log(items)
//     return rss({
//         title: SITE_TITLE,
//         description: SITE_DESCRIPTION,
//         site: context.site,
//         items: [...items]
//     });
// }
