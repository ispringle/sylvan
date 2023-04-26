import { retext } from "retext";
import smartypants from "retext-smartypants";
import { visit } from "unist-util-visit";

export const smarty = (options: any) => {
    const processor = retext().use(smartypants, options);
    return (tree: any) =>
        visit(
            tree,
            "text",
            (node) => (node.value = String(processor.processSync(node.value)))
        );
};
