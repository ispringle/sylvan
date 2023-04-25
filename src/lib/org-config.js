import { uniorgSlug } from 'uniorg-slug';
import { retext } from 'retext';
import smartypants from 'retext-smartypants';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';
import prism from '@mapbox/rehype-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import minify from 'rehype-preset-minify';
import { selectAll } from 'hast-util-select';
import { visitParents } from 'unist-util-visit-parents';

import { rehypeResolveImg } from './rehype-resolve-image.js';
import { extractFrontmatter, extractProperties } from './extract-frontmatter.js';

export default {
    uniorgParseOptions: {
        useSubSuperscripts: '{}',
    },
    uniorgPlugins: [
        frontmatter,
        uniorgRemoveCards,
        saveRoamRefs,
        // [uniorgSmartypants, { oldschool: true }],
        uniorgSlug,
    ],
    rehypePlugins: [
        rehypeRaw,
        demoteHeadings,
        [
            prism,
            {
                ignoreMissing: true,
                alias: {
                    lisp: ['common-lisp'],
                    jsx: ['astro'],
                },
            },
        ],
        rehypeResolveImg,
        collectLinks,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        minify,
        saveImages,
    ],
};

function frontmatter() {
    return async (tree, file) => {
        file.data.astro.frontmatter = {
            ...(await extractFrontmatter(file.path)),
            ...(extractProperties(tree)),
            ...file.data.astro.frontmatter,
        };

        if (file.data.astro.frontmatter.hasOwnProperty('draft')) {
            file.data.astro.frontmatter.title += ' 🚧';
        }
    };
}

function uniorgRemoveCards() {
    return transformer;

    function transformer(tree) {
        tree.children = tree.children.filter((child) => {
            return !(
                child.type === 'section' &&
                child.children[0].rawValue.toLowerCase() === 'cards'
            );
        });
    }
}

function uniorgSmartypants(options) {
    const processor = retext().use(smartypants, options);
    return transformer;

    function transformer(tree) {
        visit(tree, 'text', (node) => {
            node.value = String(processor.processSync(node.value));
        });
    }
}

function demoteHeadings() {
    return transformer;

    function transformer(tree) {
        visit(tree, (node) => {
            if (node.type !== 'element') return;
            switch (node.tagName) {
                case 'h1':
                    node.tagName = 'h2';
                    break;
                case 'h2':
                    node.tagName = 'h3';
                    break;
                case 'h3':
                    node.tagName = 'h4';
                    break;
                case 'h4':
                    node.tagName = 'h5';
                    break;
                case 'h5':
                    node.tagName = 'h6';
                    break;
                case 'h6':
                    node.tagName = 'p';
                    break;
            }
        });
    }
}

function saveImages() {
    return transformer;

    function transformer(tree, file) {
        const images = selectAll('img', tree).map((img) => img.properties.src);
        if (!file.data.astro.frontmatter.images) {
            file.data.astro.frontmatter.images = images;
        }
    }
}

function collectLinks() {
    return transformer;

    function transformer(node, file) {
        const links = selectAll('a', node).map((a) => a.properties.href);
        file.data.astro.frontmatter.links = links;
    }
}

function saveRoamRefs() {
    return transformer;

    function transformer(tree, file) {
        const astro = file.data.astro;
        const ids = astro.ids || (astro.ids = {});

        visitRoamRefs(tree, (/** @type string */ value, node) => {
            let anchor = '';
            if (node.type === 'org-data') {
                anchor = '';
            } else if (node.type === 'section') {
                const headline = node.children[0];
                const data = (headline.data = headline.data || {});
                if (!data?.hProperties?.id) {
                    // The headline doesn't have an html id assigned.
                    //
                    // Assign an html id property based on org id property, so
                    // the links are not broken.
                    data.hProperties = data.hProperties || {};
                    data.hProperties.id = id;
                }

                anchor = '#' + data?.hProperties?.id;
            }

            const refs = value.split(/\s+/).filter((x) => !!x);
            refs.forEach((ref) => {
                ids[ref] = anchor;
            });
        });
    }
}

function visitRoamRefs(tree, f) {
    visitParents(
        tree,
        { type: 'node-property', key: 'ROAM_REFS' },
        (property, ancestors) => {
            const value = property.value;

            let parent = ancestors.pop();
            while (
                parent &&
                parent.type !== 'section' &&
                parent.type !== 'org-data'
            ) {
                parent = ancestors.pop();
            }

            if (parent) {
                f(value, parent);
            }
        }
    );
}
