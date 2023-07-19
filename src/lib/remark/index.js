import remarkCallouts from '@portaljs/remark-callouts'
import remarkWikiLink, { getPermalinks } from '@portaljs/remark-wiki-link'
import  slugify  from './src/utils/slugify.js'

const permalinks = getPermalinks('content/')

export default [
  remarkCallouts,
  [
    remarkWikiLink,
    {
      permalinks: getPermalinks('content/'),
      pathFormat: 'obsian-short',
      hrefTemplate: s => {
        return slugify(s, true)
      }
    }
  ]
]