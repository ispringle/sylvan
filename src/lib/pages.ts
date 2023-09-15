import fs from "fs";
import { join } from "path";
import { devFilterMaybe, getURL, slugify } from "@utils";

const PREFER_EXT = "md";
const DENOTE_TITLE_RE = /\d{8}T\d{6}(?:==[\da-zA-Z]+)?--([\da-zA-Z-]+)(?:\w+)?/;

export type Page = {
  frontmatter: {
    title: string;
    id?: string;
    denoteID?: string;
    type?: string;
    slug: string | undefined;
    Link: string;
    canonicalUrl: string;
    created?: string;
    modified?: string;
    link: string;
    links: string[];
    tags: string[];
    draft?: boolean;
    private?: boolean;
  };
  ids: Record<string, string>;
  file: string;
};
const on = <T, R>(value: T, f: (value: T) => R): R => f(value);
const pages = Object.values(
  import.meta.glob<true, "", Page>(
    ["../../content/**/*.{md,mdx}", "../../content/**/*.org"],
    { eager: true },
  ),
);

export const allPages: Page[] = unique(
  pages.filter(devFilterMaybe).map(setFrontmatter),
);

function setSlug(filepath: string): string {
  const file = filepath.split("/content/")[1].split(".")[0];
  const path = file
    .split("/")
    .map((part) => {
      if (DENOTE_TITLE_RE.test(part)) {
        part = DENOTE_TITLE_RE.exec(part)[1];
      }
      return part === "index" ? "" : part;
    })
    .join("/");
  return slugify(path);
}

function setFrontmatter(page: Page): Page {
  const slug =
    page.frontmatter.type === "root" ? undefined : setSlug(page.file);
  page.frontmatter.slug = slug;
  page.frontmatter.link = slug ? `/${slug}` : "/";
  page.frontmatter.canonicalUrl = getURL(import.meta.env.SITE, slug);
  return page;
}

function unique(pages: Page[]): Page[] {
  let pageMap = {};
  pages.forEach((page) => {
    const newSlug = page.frontmatter.slug || "root";
    pageMap[newSlug] = pageMap[newSlug]
      ? pageMap[newSlug].file.endsWith(PREFER_EXT)
        ? pageMap[newSlug]
        : page
      : page;
  });
  return Object.values(pageMap);
}

const cwd = process.cwd();
export const resources = Object.fromEntries(
  Object.entries(
    import.meta.glob(
      ["../../content/**/*.{png,jpg,jpeg,gif,webp,avif,txt,pdf,sh,mp3,svg}"],
      { as: "url" },
    ),
  ).map(([path, loader]) => [
    fs.realpathSync(join(cwd, "src/lib", path)),
    loader,
  ]),
);
const makeLinkTable = (linkKind: string) => (posts) => {
  const linkTable = new Map();
  posts.forEach((p) => {
    const identifier = p.frontmatter[linkKind];
    if (identifier) {
      const link = p.frontmatter.link;
      linkTable.set(`denote:${identifier}`, { slug: link, post: p });
    }
  });
  return linkTable;
};

const getLinkTable = (linkKind: string) => (posts) => {
  const linkTable = new Map();
  posts.forEach((p) => {
    const localLinks = p[linkKind];
    if (localLinks) {
      Object.entries(localLinks).forEach(([id, anchor]) => {
        const link = p.frontmatter.link;
        linkTable.set(id, { slug: link, anchor, post: p });
      });
    }
  });
  return linkTable;
};

const orgIdLinks = on(allPages, getLinkTable("ids"));
const denoteIdLinks = on(allPages, makeLinkTable("denoteID"));

const resolveLink = (linkTable) => (link: string) => {
  const saved = linkTable.get(link);
  if (!saved) {
    throw new Error(`Unable to resolve ${link}`);
  }

  const { slug, anchor = "" } = saved;
  return slug + anchor;
};

export const resolveOrgId = resolveLink(orgIdLinks);
export const resolveDenoteId = resolveLink(denoteIdLinks);

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
  const t = {};
  allPages.forEach((p) => {
    const tags = p.frontmatter?.tags || [];
    tags.forEach(
      (tag) =>
        (t[tag] = {
          color: `hsl(${Math.random() * 360} 100% ${Math.random() * 75 + 25}%)`,
          pages: [
            ...(t[tag] ? t[tag].pages : []),
            ...[{ frontmatter: p.frontmatter }],
          ],
        }),
    );
  });
  return t;
};

export const tags = getTags();
