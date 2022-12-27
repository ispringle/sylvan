export default function slugify(str: string): string {
  const url = str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-/, "")
    .replace(/-+$/, "");
    return url
}
