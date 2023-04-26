import { selectAll } from 'hast-util-select';

export const saveImages = () => (tree, file) => {
    const images = selectAll('img', tree).map((img) => img.properties.src);
    if (!file.data.astro.frontmatter.images) {
        file.data.astro.frontmatter.images = images;
    }
}
