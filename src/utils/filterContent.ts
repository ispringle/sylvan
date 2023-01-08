export default function filterContent(content, filterIndices = true) {
  const devMode = import.meta.env.DEV;
  return devMode
    ? content
        .filter((a) => !filterIndices || a.frontmatter.kind != "index")
        .sort(sortNewestToOldest)
    : content
        .filter((a) => !filterIndices || a.frontmatter.kind != "index")
        .filter((a) => a.frontmatter.draft == false)
        .filter((a) => a.frontmatter.public == true)
        .sort(sortNewestToOldest);
}

export function sortNewestToOldest(a, b) {
  return (
    new Date(b.frontmatter.created).valueOf() -
    new Date(a.frontmatter.created).valueOf()
  );
}

export function sortOldestToNewest(a, b) {
  return (
    new Date(a.frontmatter.created).valueOf() -
    new Date(b.frontmatter.created).valueOf()
  );
}
