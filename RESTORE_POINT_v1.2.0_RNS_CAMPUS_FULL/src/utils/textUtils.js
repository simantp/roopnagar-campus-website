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

export function generateSlug(title) {
  if (!title) return 'item';
  const words = title
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4);

  const shortTitle = words.join(' ');

  const slugified = shortTitle
    .toLowerCase()
    .replace(/[^\u0900-\u097Fa-zA-Z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slugified || 'item';
}
