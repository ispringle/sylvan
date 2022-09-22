import rehypeAutolinkHeadings from "rehype-autolink-headings";
import raw from "rehype-raw";
import rehypePresetMinify from "rehype-preset-minify";
import sectionParent from "@agentofuser/rehype-section";
import demoteHeadings from "./demoteHeadings";
import unwrapImg from "./unwrapImg";

import process from "./process";

const section = sectionParent.default;

const processor = process()
  .use(unwrapImg)
  .use(raw)
  .use(rehypeAutolinkHeadings, { behavior: "append" })
  .use(demoteHeadings)
  .use(section)
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
