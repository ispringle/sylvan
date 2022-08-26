import * as path from 'path';
import { trough } from 'trough';

import prism from 'rehype-prism-plus';

import collectFiles from './collectFiles';
import filesToAst from './filesToAst';
import resolveLinks from './resolveLinks';
import populateBacklinks from './populateBacklinks';

const processor = trough()
  .use(collectFiles)
  .use(filesToAst)
  .use(resolveLinks)
  .use(populateBacklinks);

export { processor }
