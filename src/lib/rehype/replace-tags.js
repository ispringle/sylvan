import { visit } from 'unist-util-visit';

const REPLACEMENTS = {
    "h1": "h2",
    "h2": "h3",
    "h3": "h4",
    "h4": "h5",
    "h5": "h6",
    "h6": "p",
}

export const replaceTags = () => (tree) => {
    visit(tree, (node) => {
        if (node.type !== 'element') return;
        if (!REPLACEMENTS.hasOwnProperty(node.tagName)) return;
        node.tagName = REPLACEMENTS[node.tagName]
    });
}
