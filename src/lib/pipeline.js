import * as path from 'path';
import { trough } from 'trough';
import { toVFile } from 'to-vfile';
import { findDown } from 'vfile-find-down';

import orgToHtml from './orgToHtml';
// import processAST from './processAST';
import resolveLinks from './resolveLinks';

const processor = trough()
  .use(collectFiles)
  .use(filesToAst)
  // .use(processASTs)
  .use(resolveLinks)
  .use(populateBacklinks);

function collectFiles(root) {
  return new Promise((resolve, reject) => {
    findDown(
      (f, stats) => stats.isFile() && f.basename.endsWith('.org'),
      root,
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          files.forEach((f) => {
            f.filepath = f.path
            const slug =
              '/' + path.relative(root, f.path).replace(/\.org$/, '');
            f.data.slug = slug;
          });
          resolve(files);
        }
      }
    );
  });
}

async function filesToAst(files) {
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




// Assign all collected backlinks to file. This function should be
// called after all pages have been processed---otherwise, it might
// miss backlinks.
function populateBacklinks(files) {
  const backlinks = {};
  files.forEach((file) => {
    file.data.links = file.data.links || new Set();
    file.data.backlinks = backlinks[file.data.slug] =
      backlinks[file.data.slug] || new Set();

    file.data.links.forEach((other) => {
      backlinks[other] = backlinks[other] || new Set();
      backlinks[other].add(file.data.slug);
    });
  });
}

export { processor }
