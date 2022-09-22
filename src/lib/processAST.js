import rehypeAutolinkHeadings from "rehype-autolink-headings";
import raw from "rehype-raw";
import rehypeRewrite from "rehype-rewrite";
import rehypePresetMinify from "rehype-preset-minify";

import process from "./process";

const processor = process()
  .use(rehypeRewrite, {
    rewrite: (node, index, parent) => {
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
    },
  })
  .use(raw)
  .use(rehypeAutolinkHeadings, { behavior: "append" })
  .use(rehypePresetMinify);

async function processAST(file) {
  return await processor.process(file);
}

async function processASTs(ctx) {
  const ids = {};
  Object.values(ctx.pages).forEach((p) => {
    Object.entries(p.data.ids).forEach(([id, anchor]) => {
      ids[id] = { path: p.path, anchor };
    });
  });

  await Promise.all(Object.values(ctx.pages).map(processPage));

  async function processPage(file) {
    const data = file.data;

    file.bibliography = ctx.bibliography;
    file.pageExists = pageExists;
    file.ids = ids;

    await processAST(file);

    return file;
  }
  function pageExists(slug) {
    return ctx.options.specialPages.has(slug) || slug in ctx.pages;
  }
}

export default processASTs;
