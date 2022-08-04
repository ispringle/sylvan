import { defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from './GlobalComputedFields'

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: `about/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of content',
      required: false,
    },
    date: {
      type: 'string',
      description: 'Date of content',
      required: false,
    },
    picture: {
      type: 'string',
      description: 'Picture of me',
      required: true,
    },
  },
  computedFields
}));

