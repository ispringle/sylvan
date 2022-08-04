import { makeSource } from 'contentlayer/source-files';
import { About, BookReview, BlogPost } from './src/contentlayer_type';

import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

const contentLayerConfig = makeSource({
  contentDirPath: 'src/content',
  date: {
    timezone: 'America/Chicago',
  },
  documentTypes: [About, BookReview, BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor']
          },
        },
      ],
      rehypeCodeTitles,
      rehypePrism,
    ],
  },
});

export default contentLayerConfig;
