import LandingPage from '../components/LandingPage'

export default function ExportSteelFabrication() {
  return (
    <LandingPage
      path="/steel-fabrication-export"
      pageKey="export"
      label="EXPORT"
      heroLine1="Fabricated in Sharjah."
      heroLine2="Shipped worldwide."
      video="/assets/services-hero.mp4"
      poster="/assets/project-truss-install.webp"
      primaryCta="Request an Export Quote"
      secondaryCta={{ to: '/services', label: 'See Our Services' }}
      cta={{ eyebrow: 'Steel Fabrication Export', heading: 'Have a project abroad?', accent: 'Send us the drawings.' }}
    />
  )
}
