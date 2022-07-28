import { defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from './GlobalComputedFields'

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: `about/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    picture: {
      type: 'string',
      description: 'Picture of me',
      required: true,
    },
  },
  computedFields
}));

