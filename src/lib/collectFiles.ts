import { toVFile } from "to-vfile";
import { findDown, SKIP, INCLUDE } from "vfile-find-down";
import { rename } from "vfile-rename";
import * as path from "path";

import { PageData, Page, BuildCtx } from "./build";

const pageType = (
  path: string
): "note" | "blog" | "index" | "root" | "slip" | "biblio" | "literate" => {
  if (path.startsWith("cite")) return "biblio";
  if (path.startsWith("blog")) return "blog";
  if (path.startsWith("loci")) return "slip";
  if (path.startsWith("/index.org")) return "root";
  return "note";
};

async function collectFiles(ctx: BuildCtx): Promise<void> {
  const files = await new Promise<Page[]>((resolve, reject) => {
    findDown(
      (file, stats) => {
        const p = path.relative(ctx.options.root, file.path!);
        if (stats.isDirectory()) {
          if (ctx.options.blacklistedDirectories.has(p)) {
            return SKIP;
          } else {
            return;
          }
        }

        const ext = path.extname(p);
        if (ext === ".org") {
          const slug = "/" + p.replace(/\.org$/, "");

          const data = {
            slug,
            type: ext,
            pageType: pageType(p),
            title: "",
            images: [],
            ids: {},
            links: [],
            backlinks: new Set(),
            excerpt: "",
          };
          file.data = data;

          return true;
        }
      },
      ctx.options.root,
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files as Page[]);
        }
      }
    );
  });
  const pages = await Promise.all(
    files.map(async (f) => {
      await toVFile.read(f, "utf8");
      return rename(
        rename(f, { path: path.relative(ctx.options.root, f.path) }),
        { path: f.data.slug }
      );
    })
  );
  ctx.pages = Object.fromEntries(pages.map((p) => [p.data.slug, p]));
}

export default collectFiles;
