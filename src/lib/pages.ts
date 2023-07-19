import fs from 'fs'
import { join } from 'path'
import { filterContent, slugify } from '@utils'

const PREFER_EXT = 'md'

export type Page = {
  frontmatter: {
    title: string
    id?: string
    type?: string
    slug: string
    created?: string
    modified?: string
    links: string[]
    tags: string[]
    draft?: boolean
    private?: boolean
  }
  ids: Record<string, string>
  file: string
}
const on = <T, R>(value: T, f: (value: T) => R): R => f(value)
const pages = Object.values(
  import.meta.glob<true, '', Page>(
    ['../../content/**/*.{md,mdx}', '../../content/**/*.org'],
    { eager: true }
  )
)

function setSlug (path: string): string {
  const isRoot = path.includes('/content/index') || path.includes('/content/site/index')
  const file = path.split("/content/")[1].split(".")[0];
  return isRoot
    ? undefined
    : slugify(file)
}

function setFrontmatter (page: Page): Page {
  page.frontmatter.slug = setSlug(page.file);
  return page
}

function unique (pages: Page[]): Page[] {
  let pageMap = {}
  pages.forEach(page => {
    const newSlug = page.frontmatter.slug
    pageMap[newSlug] = pageMap[newSlug]
      ? pageMap[newSlug].file.endsWith(PREFER_EXT)
        ? pageMap[newSlug]
        : page
      : page
  })
  return Object.values(pageMap)
}

export const allPages: Page[] = unique(
  pages
    .filter(
      page =>
        process.env.NODE_ENV === 'development' ||
        page.frontmatter?.draft !== true
    )
    .map(setFrontmatter)
)

const cwd = process.cwd()
export const resources = Object.fromEntries(
  Object.entries(
    import.meta.glob(
      ['../../content/**/*.{png,jpg,jpeg,gif,webp,avif,txt,pdf,sh,mp3,svg}'],
      { as: 'url' }
    )
  ).map(([path, loader]) => [
    fs.realpathSync(join(cwd, 'src/lib', path)),
    loader
  ])
)

const idLinks = on(allPages, posts => {
  const ids = new Map()
  posts.forEach(p => {
    const localIds = p.ids
    if (localIds) {
      Object.entries(localIds).forEach(([id, anchor]) => {
        ids.set(id, { slug: p.frontmatter.slug, anchor, post: p })
      })
    }
  })
  return ids
})

export const resolveId = (id: string) => {
  const saved = idLinks.get(id)
  if (!saved) {
    throw new Error(`Unable to resolve ${id}`)
  }

  const { slug, anchor } = saved
  return slug + anchor
}

const backlinks = on(allPages, posts => {
  const backlinks: Record<string, Set<Page>> = {}
  for (const p of posts) {
    if (p?.frontmatter.hasOwnProperty('no_links')) {
      continue
    }

    const links = p?.frontmatter.links ?? []

    for (let link of links) {
      if ( p?.ids && Object.keys(p.ids).includes(link)) {
        // linking to self -> does not count
        continue
      }

      try {
        link = resolveId(link)
      } catch {}

      backlinks[link] = backlinks[link] ?? new Set()
      backlinks[link].add(p)
    }
  }
  return backlinks
})

export const getBacklinks = (slug: string) => {
  return backlinks[slug] ?? new Set()
}

const getTags = () => {
  const t = {}
  allPages.forEach(p => {
    const tags = p.frontmatter?.tags || []
    tags.forEach(
      tag =>
        (t[tag] = [
          ...(t[tag] ? t[tag] : []),
          ...[JSON.stringify(p.frontmatter)]
        ])
    )
  })
  return t
}

export const tags = getTags()
