import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import prism from '@mapbox/rehype-prism';

import { resolveImage } from './resolve-image.js';
import { collectLinks } from './collect-links.js';
import { intoArticle } from './into-article.ts';
import { replaceTags } from './replace-tags.js';
import { saveImages } from './save-images.js';

export default [
    rehypeRaw,
    // replaceTags,
    intoArticle,
    resolveImage,
    collectLinks,
    [
        prism,
        {
            ignoreMissing: true,
            alias: {
                lisp: ['common-lisp'],
                jsx: ['astro'],
            }
        }
    ],
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    saveImages,
]

export {
    resolveImage,
    collectLinks,
    intoArticle,
    replaceTags,
    saveImages
}
