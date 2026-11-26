import LandingPage from '../components/LandingPage'

export default function DubaiSteelFabrication() {
  return (
    <LandingPage
      path="/steel-fabrication-dubai"
      pageKey="dubai"
      label="DUBAI"
      heroLine1="Dubai office."
      heroLine2="Sharjah workshop."
      video="/assets/services-hero.mp4"
      poster="/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp"
      primaryCta="Request a Quote"
      secondaryCta={{ to: '/projects', label: 'See Our Projects' }}
      cta={{ eyebrow: 'Steel Fabrication in Dubai', heading: 'Have a Dubai project?', accent: 'Send us the drawings.' }}
    />
  )
}
