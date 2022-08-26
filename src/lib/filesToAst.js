import { toVFile } from 'to-vfile';

import orgToHtml from './orgToHtml';

async function filesToAst(files) {
  return Promise.all(files.map(async (file) => {
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
  }));

}

export default filesToAst;
