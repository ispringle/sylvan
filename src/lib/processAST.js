// TODO build out the AST processing here, for things like prism and other rehype plugins
import { unified } from 'unified';
import { toVFile } from 'to-vfile';

import prism from 'rehype-prism-plus';

const processor = unified()
  .use(prism)
  .use(toJson);

async function processAST(file) {
  try {
    return await processor.process(file);
  } catch (e) {
    console.error('failed to process file', file.path, e);
    throw e;
  }
}

function toJson() {
  this.Compiler = (node) => {
    return node;
  };
}

async function processASTs(files) {
  return Promise.all(files.map(getAst));

  async function getAst(file) {
    try {
      await toVFile.read(file, 'utf8');
    } catch (e) {
      console.error('Error reading file', file, e);
      throw e;
    }
    file.path = file.data.slug;
    if (file.filepath.endsWith('.org')) {
      await orgToHtml(file);
    } else {
      throw new Error(`Unknown page type: $file.filepath`)
    }

    return file;
  }
}

export default processASTs;
