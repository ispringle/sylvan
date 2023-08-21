const indexTypes = [
  "index",
  "root",
  "all",
  "news",
]

export const devFilterMaybe = page => {
  const devMode = import.meta.env.DEV
  if (devMode) return true;
  if (page.frontmatter.private) return false;
  if (page.frontmatter.draft) return false;
  return true
}
export const filterIndices = (page) => !indexTypes.includes(page.frontmatter?.type)
export const filterByDir = dirRE => page => page.file.split("/content/")[1].match(dirRE);

export const sortNewestToOldest = (a, b) => new Date(b.frontmatter.created).valueOf() - new Date(a.frontmatter.created).valueOf()
export const sortOldestToNewest = (a, b) => new Date(a.frontmatter.created).valueOf() - new Date(b.frontmatter.created).valueOf()
export const sortAToZ = (a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title);
