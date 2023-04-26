import { selectAll } from 'hast-util-select';

export const collectLinks = () => {
    return transformer;

    function transformer(node, file) {
        const links = selectAll('a', node).map((a) => a.properties.href);
        file.data.astro.frontmatter.links = links;
    }
}
