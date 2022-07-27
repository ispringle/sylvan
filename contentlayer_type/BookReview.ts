import { defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from './GlobalComputedFields.ts'

export const BookReview = defineDocumentType(() => ({
  name: 'BookReview',
  filePathPattern: `book/**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    author: {
      type: 'string',
      description: "The name of the book's author",
      required: true,
    },
    cover: {
      type: 'string',
      description: "The path to the book's cover image",
      required: true,
    },
  },
  computedFields
}));

