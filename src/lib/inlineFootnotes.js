import { visit } from "unist-util-visit";
import { h } from "hastscript";

const maybeGetFootnoteDefinition = (tree) => {
  const fnDefs = tree.children.reduce((arr, n) => {
    const classNameArray = Array.from(n.properties?.className || []);
    classNameArray.includes("footnote-definition") ? arr.push(n) : null;
    return arr;
  }, Array());
  return fnDefs;
};

const makeFnObj = (fns) => {
  let fnObj = {};
  // console.log(fns);
  fns.forEach((n) => {
    const zeroeth = n.children[0];
    if (zeroeth.tagName == "sup" && zeroeth.children[0].tagName == "a") {
      fnObj[zeroeth.children[0].properties.id] = n.children[1].children;
    }
  });
  return fnObj;
};

const inlineFootnotes = () => {
  return (tree) => {
    const fnDefs = maybeGetFootnoteDefinition(tree);
    if (!fnDefs.length) return;
    const fnObj = makeFnObj(fnDefs);
    visit(tree, (node) => {
      if (node.tagName != "sup") return;
      const footnoteA = node.children[0];
      if (footnoteA.properties?.className.includes("footref")) {
        const footnoteKey = footnoteA.properties?.href.replace("#", "") || "";
        node.children.push(h("span.footdef", fnObj[footnoteKey] || {}));
      }
    });
  };
};

export default inlineFootnotes;
