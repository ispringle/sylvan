import { ComputedFields, defineDocumentType } from 'contentlayer/source-files'
import { computedFields } from './GlobalComputedFields'

const customComputedFields: ComputedFields = {
  title: {
    type: 'string',
    resolve: (doc: any) => `${doc.book} Review`
  }
}

export const BookReview = defineDocumentType(() => ({
  name: 'BookReview',
  filePathPattern: `book/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    author: {
      type: 'string',
      description: "The name of the book's author",
      required: false,
    },
    book: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    cover: {
      type: 'string',
      description: "The path to the book's cover image",
      required: false,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    isbn: {
      type: 'string',
      description: "The book's ISBN reference number",
      required: false,
    },
  },
  computedFields: {...computedFields, ...customComputedFields},
}));

