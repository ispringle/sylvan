import visit from "unist-util-visit";

function visitor(node, index, parent) {
  console.log(node);
  return node;
}

export function remarkObsidian(options = {}) {
  return function(tree, file) {
    visit(tree, "text", visitor);
  };
}
