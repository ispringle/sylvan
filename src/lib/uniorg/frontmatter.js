import * as path from 'path';
import * as fs from 'fs/promises';
import { DateTime } from "luxon";

const ContentDirectory = new URL('../../../content', import.meta.url);

export function frontmatter() {
    return async (tree, file) => {
        file.data.astro.frontmatter = formatFrontmatter({
            ...(await extractFrontmatter(file.path)),
            ...(extractProperties(tree)),
            ...file.data.astro.frontmatter,
        });

        if (file.data.astro.frontmatter.hasOwnProperty('draft')) {
            file.data.astro.frontmatter.title += ' 🚧';
        }
    };
}

const extractFrontmatter = async p => {
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
    };
};

const extractProperties = tree => {
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

const formatFrontmatter = frontmatter => {
    const { created: createdStr, modified: modifiedStr, filetags } = frontmatter
    const created = createdStr ? orgTimeToDateTime(createdStr) : undefined
    const modified = modifiedStr ? orgTimeToDateTime(modifiedStr) : undefined
    const tags = formatTags(filetags)
    return {
        ...frontmatter, ...{
            created,
            modified,
            tags
        }
    }
}

/**
 * Potential timestamp formats:
 * [1900-01-31 Mon 2:55]
 * <1900-01-31 Mon 2:55>
 * <1900-01-31 Mon>
 * <1900-01-31>
 *
 * And I might be missing a few...
*/
const orgTimeToDateTime = str => {
    // Day is irrelevant to creating a dt object
    const [date, _, time] = str.slice(1, -1).split(" ")
    const [year, month, day] = date ? date.split("-") : []
    const [hour, minute] = time ? time.split(":") : []
    return DateTime.fromObject({ year, month, day, hour, minute }).toString()
}

const formatTags = tagsStr => {
    return tagsStr
        ? tagsStr.slice(1, -1).split(":")
        : []
}
