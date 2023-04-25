export default function getURL(...parts): string {
    return parts.reduce((url, part) => {
        return url + (part.endsWith('/') ? part : part + '/');
    }, "")
}
