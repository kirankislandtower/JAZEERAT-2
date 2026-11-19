// Counts lead actions as Microsoft Clarity custom events (Clarity → Dashboard
// → Smart events / Filters → Custom events), so the SEO report can show how
// many visitors called, messaged or emailed, not just form submissions.

export function trackLead(name) {
  try {
    window.clarity?.('event', name)
  } catch {
    // tracking must never break the page
  }
}

function leadType(href) {
  if (href.startsWith('tel:')) return 'lead_call'
  if (href.startsWith('mailto:')) return 'lead_email'
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href)) return 'lead_whatsapp'
  return null
}

// One listener for the whole page, so every call, WhatsApp and email link is
// counted wherever it appears (navbar, footer, widget, blog CTAs, contact page).
export function installLeadTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest?.('a[href]')
      const type = a && leadType(a.getAttribute('href'))
      if (type) trackLead(type)
    },
    { capture: true },
  )
}
