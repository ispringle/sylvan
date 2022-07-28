import { makeSource } from 'contentlayer/source-files';
import { BookReview, BlogPost } from './contentlayer_type';

import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [BookReview, BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypePrism,
      [
      rehypeAutolinkHeadings,
      {
          behavior: 'append',
          properties: {
            className: ['anchor']
          },
        },
      ],
    ],
  },
});

export default contentLayerConfig;
