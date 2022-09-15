// Build out the AST processing here, for things like prism and other rehype plugins
import prism from "rehype-prism-plus";
import raw from "rehype-raw";

import process from "./process";

// const processor = process().use(raw).use(prism, { ignoreMissing: true });
const processor = process().use(raw);

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
