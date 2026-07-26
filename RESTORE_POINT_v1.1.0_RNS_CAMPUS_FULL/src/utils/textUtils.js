// Text and HTML Utility Functions for Clean Formatting

export function stripHtml(content) {
  if (!content) return '';
  return content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getCleanExcerpt(content, maxLength = 120) {
  if (!content) return '';
  const clean = stripHtml(content);
  if (!clean) return '';
  return clean.length > maxLength ? clean.slice(0, maxLength).trim() + '...' : clean;
}
