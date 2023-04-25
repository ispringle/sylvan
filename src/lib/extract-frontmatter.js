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
    const pageType = getPageType(relpath);

    let title = cleanName.split('/').pop();
    if (title) {
        title = title[0]?.toUpperCase() + title.slice(1);
    }

    return {
        title,
        renderer: 'post',
        slug,
        pageType,
        icon: getPageIcon(pageType),
    };
};

const getPageType = (path) => {
    if (path.startsWith('posts')) return 'post';
    return 'note';
};

const getPageIcon = (type) => {
    if (!type) return null;
    if (type === 'post') return '🖋';
    return '📝';
};

export const extractProperties = tree => {
    const properties = {}

    // const props = tree.children[0]?.children?.[0];
    // console.log(tree.filter(prop => prop.type == "property-drawer"))
    // const props = tree.children.filter(child => child.type == 'property-drawer')?.[0]
    // console.log(props)
    // props?.children.forEach(node => data.properties[node.key] = node.value)
    visit(tree, "node-property", (prop) => {
        properties[prop.key.toLowerCase()] = prop.value;
    });
    return properties
}
