import rehypeRaw from 'rehype-raw';
import prism from '@mapbox/rehype-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import minify from 'rehype-preset-minify';

import { resolveImage } from './resolve-image.js';
import { collectLinks } from './collect-links.js';
import { intoArticle } from './into-article.ts';
import { replaceTags } from './replace-tags.js';
import { saveImages } from './save-images.js';

export default [
    rehypeRaw,
    replaceTags,
    intoArticle,
    [
        prism,
        {
            ignoreMissing: true,
            alias: {
                lisp: ['common-lisp'],
                jsx: ['astro'],
                txt: ['org'],
            },
        },
    ],
    resolveImage,
    collectLinks,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    minify,
    saveImages,
]

export {
    resolveImage,
    collectLinks,
    intoArticle,
    replaceTags,
    saveImages
}