import { visit } from "unist-util-visit";

const unwrapImg = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type != "element") return;
      if (
        node.tagName == "p" &&
        node.children?.length == 1 &&
        node.children[0].tagName == "img"
      ) {
        const child = node.children[0];
        node.type = child.type;
        node.tagName = child.tagName;
        node.properties = child.properties;
        node.children = child.children;
      }
    });
  };
};
export default unwrapImg;
