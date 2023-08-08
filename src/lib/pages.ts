import fs from 'fs'
import { join } from 'path'
import { devFilterMaybe, getURL, slugify } from '@utils'

const PREFER_EXT = 'md'

export type Page = {
  frontmatter: {
    title: string
    id?: string
    type?: string
    slug: string | undefined
    link: string
    canonicalUrl: string
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

export const allPages: Page[] = unique(
  pages
    .filter(devFilterMaybe)
    .map(setFrontmatter)
)

function setSlug(path: string): string {
  const isRoot = path.includes('/content/index') || path.includes('/content/site/index')
  const file = path.split("/content/")[1].split(".")[0];
  return isRoot
    ? undefined
    : slugify(file)
}

function setFrontmatter(page: Page): Page {
  const slug = page.frontmatter.type === "root" ? undefined : setSlug(page.file);
  page.frontmatter.slug = slug
  page.frontmatter.link = slug ? `/${slug}` : "/"
  page.frontmatter.canonicalUrl = getURL(import.meta.env.SITE, slug);
  return page
}

function unique(pages: Page[]): Page[] {
  let pageMap = {}
  pages.forEach(page => {
    const newSlug = page.frontmatter.slug || "root"
    pageMap[newSlug] = pageMap[newSlug]
      ? pageMap[newSlug].file.endsWith(PREFER_EXT)
        ? pageMap[newSlug]
        : page
      : page
  })
  return Object.values(pageMap)
}

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

const idLinks = on(allPages, (posts) => {
  const ids = new Map();
  posts.forEach((p) => {
    const localIds = p.ids;
    if (localIds) {
      Object.entries(localIds).forEach(([id, anchor]) => {
        const link = p.frontmatter.link;
        ids.set(id, { slug: link, anchor, post: p });
      });
    }
  });
  return ids;
});

export const resolveId = (id: string) => {
  const saved = idLinks.get(id);
  if (!saved) {
    throw new Error(`Unable to resolve ${id}`);
  }

  const { slug, anchor } = saved;
  return slug + anchor;
};

const backlinks = on(allPages, (posts) => {
  const backlinks: Record<string, Set<Page>> = {};
  for (const p of posts) {
    const links = p.frontmatter.links ?? [];

    for (let link of links) {
      if (Object.keys(p.ids).includes(link)) {
        // linking to self -> does not count
        continue;
      }

      try {
        link = resolveId(link);
      } catch {}

      backlinks[link] = backlinks[link] ?? new Set();
      backlinks[link].add(p);
    }
  }

  return backlinks;
});

export const getBacklinks = (slug: string) => {
  return backlinks[slug] ?? new Set();
};

const getTags = () => {
  const t = {}
  allPages.forEach(p => {
    const tags = p.frontmatter?.tags || []
    tags.forEach(
      tag =>
      (t[tag] = {
        color: `hsl(${Math.random() * 360} 100% ${(Math.random() * 75) + 25}%)`,
        pages: [
          ...(t[tag] ? t[tag].pages : []),
          ...[JSON.stringify(p.frontmatter)]
        ]
      })
    )
  })
  return t
}

export const tags = getTags()
