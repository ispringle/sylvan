import * as path from 'path';
import * as fs from 'fs/promises';
import { visit } from "unist-util-visit";

const ContentDirectory = new URL('../../org', import.meta.url);

export const extractFrontmatter = async p => {
    const relpath = path.relative(await fs.realpath(ContentDirectory.pathname), p);
    const cleanName = relpath
        .replace(/\.(org|md)$/, '')
        .replace(/(^|\/)index$/, '')
    const slug = ('/' + cleanName + '/').replaceAll(/\/+/g, '/');

    let title = cleanName.split('/').pop();
    if (title) {
        title = title[0]?.toUpperCase() + title.slice(1);
    }

    return {
        title,
        slug,
    };
};

export const extractProperties = tree => {
    const frontmatter = {}
    const setValue = (v) => {
        switch (v) {
            case "t":
            case "true":
                return true
            case "nil":
            case "false":
                return false
            default:
                return v
        }
    }

    const drawer = tree.children[0]?.type === "property-drawer"
        ? tree.children[0]
        : undefined
    if (!drawer) { return }
    const props = drawer?.children
    props.forEach(node => frontmatter[node.key.toLowerCase()] = setValue(node.value))
    return frontmatter
}
