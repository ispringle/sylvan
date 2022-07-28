import { makeSource } from 'contentlayer/source-files';
import { BookReview, BlogPost } from './contentlayer_type';

import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [BookReview, BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
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
      rehypeSlug,
      rehypePrism,
    ],
  },
});

export default contentLayerConfig;
