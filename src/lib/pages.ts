import fs from 'fs';
import { join } from 'path';

export type Page = {
    frontmatter: {
        title: string;
        id?: string;
        type?: string;
        slug?: string;
        created?: string;
        modified?: string;
        links: string[];
        tags: string[];
        draft?: boolean;
        private?: boolean;
    }
    ids: Record<string, string>;
}
const on = <T, R>(value: T, f: (value: T) => R): R => f(value);

const pages = import.meta.glob<true, '', Page>(
    [
        '../../content/**/*.org',
    ],
    { eager: true }
)

export const allPages = Object.values(pages).filter(
    page => process.env.NODE_ENV === 'development' || page.frontmatter?.draft !== true);

const cwd = process.cwd()
export const resources = Object.fromEntries(
    Object.entries(
        import.meta.glob(
            ['../../content/**/*.{png,jpg,jpeg,gif,webp,avif,txt,pdf,sh,mp3,svg}'],
            { as: 'url' }
        )).map(([path, loader]) => [fs.realpathSync(join(cwd, 'src/lib', path)), loader]));

const idLinks = on(allPages, (posts) => {
    const ids = new Map();
    posts.forEach((p) => {
        const localIds = p.ids;
        if (localIds) {
            Object.entries(localIds).forEach(([id, anchor]) => {
                ids.set(id, { slug: p.frontmatter.slug, anchor, post: p });
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
        if (p.frontmatter.hasOwnProperty('no_links')) {
            continue;
        }

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
        p.frontmatter.tags.forEach(
            tag => t[tag] = [
                ...(t[tag] ? t[tag] : []),
                ...[JSON.stringify(p.frontmatter)]])
    })
    return t
}

export const tags = getTags()
