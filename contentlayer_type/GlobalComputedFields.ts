import { ComputedFields } from 'contentlayer/source-files'

export const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc: any) => doc._raw.sourceFileName.replace(/\.md[x]?$/, ''),
  },
  url: {
    type: 'string',
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
};

