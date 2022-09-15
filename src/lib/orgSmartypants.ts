import { retext } from "retext";
import smartypants from "retext-smartypants";
import { visit } from "unist-util-visit";

const orgSmartypants = (options: any) => {
  const transformer = (tree: any) =>
    visit(
      tree,
      "text",
      (n) => (n.value = String(processor.processSync(n.value)))
    );
  const processor = retext().use(smartypants, options);
  return transformer;
};
