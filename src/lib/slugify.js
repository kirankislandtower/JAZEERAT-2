// Generates a URL-safe slug from a project title. The projects table has
// no dedicated slug column, so routes are derived from the title at
// request time — this must stay in sync with how ProjectDetail.jsx looks
// up a project by slug.
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
