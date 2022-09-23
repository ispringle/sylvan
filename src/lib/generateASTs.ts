import orgToHtml from "@lib/orgToHtml";

import { Page, BuildCtx } from "@lib/build";

async function generateASTs(ctx: BuildCtx): Promise<void> {
  await Promise.all(Object.values(ctx.pages).map(processPage));

  async function processPage(file: Page): Promise<Page | null> {
    const data = file.data;

    const type = data.type;
    if (type === ".org") {
      await orgToHtml(file);
      // } else if (type === ".md") {
      //   await mdToHtml(file);
      // } else if (type === ".bib") {
      //   await bibtexToHtml(file);
    } else {
      throw new Error(`unknown page type: ${type}`);
    }

    const published = (file.data as any).published;
    if (published && (published !== "true" || published !== "yes")) {
      // TODO: refactor this, so it does less mutation
      if (process.env.NODE_ENV !== "development") {
        delete ctx.pages[file.data.slug];
      }
    }
    // Delete the raw file, we don't need it once we have the AST
    file.value = null;
    // if (file.data.title == "Org Mode Examples") console.log(file.result);
    return file;
  }
}

export default generateASTs;
