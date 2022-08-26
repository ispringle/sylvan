import { findDown } from 'vfile-find-down';
import * as path from 'path';

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

export default collectFiles;
