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

export default populateBacklinks;
