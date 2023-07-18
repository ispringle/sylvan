export default function getURL(...parts): string {
    return parts.reduce((url, part) => {
        return part !== undefined ? url + (part.endsWith('/') ? part : part + '/') : "/";
    }, "")
}
