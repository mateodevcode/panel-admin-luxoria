export const normalizeUrl = (url) => {
  if (!url) return null;
  const s = String(url).trim();
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return `https://${s}`;
};
