export function formatDate(str) {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} @ ${date.getHours()}:${date.getMinutes()}`;
}
