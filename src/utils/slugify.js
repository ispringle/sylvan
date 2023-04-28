export default function slugify(str, root = false) {
    const url = str
        .toString()
        .trim()
        .toLowerCase()
        .replace(/^\//g, "")
        .replace(/\/$/g, "")
        .replace(/\s+/g, "-")
        .replace(/&/g, "and")
        .replace(/[^\w\/\-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-/, "")
        .replace(/-+$/, "");
    return root ? "/" + url : url;
}
