// Shortens text to fit Google's meta description length (about 155
// characters), cutting at a word boundary and adding an ellipsis.
export function clipText(text, max = 155) {
  const s = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—-]+$/, '') + '…'
}
