import { visit } from "unist-util-visit";

export function setContent() {
  return function (tree, file) {
    let content = "";

    visit(tree, "paragraph", (node) => {
      node.children.forEach((child) => {
        content += child.value;
      });
    });

    file.data.astro.frontmatter.strippedContent = content;
  };
}
