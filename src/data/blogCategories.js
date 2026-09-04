// Shared category → tag styling for blog cards, filters and post headers.
// Kept in brand tokens (no off-palette colors) so tags read as part of the
// same sharp industrial system as the rest of the site.
export const categoryColors = {
  'Technical Insights': 'bg-weld text-white',
  'Industry News': 'bg-white text-graphite',
  'Company Updates': 'bg-graphite-light text-steel-light border border-panel-line',
  'default': 'bg-panel-line text-steel-light',
}

export const getCategoryColor = (category) => categoryColors[category] || categoryColors.default
