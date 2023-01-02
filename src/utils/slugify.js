export default function slugify(str) {
  const url = str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^\//g, "")
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\/\-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-/, "")
    .replace(/-+$/, "");
  return url;
}
