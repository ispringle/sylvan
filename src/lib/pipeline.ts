import { trough } from "trough";
import { toVFile } from "to-vfile";
// import bibtexParse from "bibtex-parse";

import collectFiles from "./collectFiles";
import generateASTs from "./generateASTs";
import processASTs from "./processAST";

// import bibtexToHtml from './bibtex';
// import rewritePath from './rewrite-path';

import { Page, LociOptions, BuildCtx } from "./build";

const process = trough()
  .use(collectFiles)
  // .use(collectBibliography)
  // .use(populateBibliographyPages)
  .use(generateASTs)
  .use(processASTs)
  .use(populateBacklinks);

export const build = async (
  options: LociOptions
): Promise<Record<string, Page>> => {
  console.time("pipeline:build");
  const result = await new Promise<Record<string, Page>>((resolve, reject) => {
    process.run({ options, backlinks: {} }, (err: any, ctx: BuildCtx) => {
      if (err) {
        reject(err);
      } else {
        resolve(ctx.pages!);
      }
    });
  });
  console.timeEnd("pipeline:build");
  return result;
};

// Create pages for all bibliography references
function populateBibliographyPages(ctx: BuildCtx): void {
  Object.values(ctx.bibliography).forEach((b) => {
    const path = "/biblio/" + b.key + "/";
    if (path in ctx.pages) return;

    ctx.pages[path] = toVFile({
      path,
      contents: "",
      data: {
        slug: path,
        type: ".org",
        pageType: "biblio",
        title: "",
        images: [],
        ids: {},
        links: [],
        backlinks: [],
        excerpt: "",
      },
    });
  });
}

function populateBacklinks(ctx: BuildCtx) {
  const backlinks: Record<string, Set<string>> = {};
  Object.values(ctx.pages).forEach((file) => {
    file.data.links = file.data.links ?? [];
    file.data.backlinks = backlinks[file.data.slug] =
      backlinks[file.data.slug] ?? new Set();

    file.data.links
      .filter((l) => l !== file.data.slug)
      .forEach((other) => {
        backlinks[other] = backlinks[other] || new Set();
        backlinks[other].add(file.data.slug);
      });
  });
}
