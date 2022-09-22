import { visit } from "unist-util-visit";
const demoteHeadings = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type != "element") return;
      switch (node.tagName) {
        case "h1":
          node.tagName = "h2";
          break;
        case "h2":
          node.tagName = "h3";
          break;
        case "h3":
          node.tagName = "h4";
          break;
        case "h4":
          node.tagName = "h5";
          break;
        case "h5":
          node.tagName = "h6";
          break;
        case "h6":
          node.tagName = "p";
          break;
      }
    });
  };
};
export default demoteHeadings;
