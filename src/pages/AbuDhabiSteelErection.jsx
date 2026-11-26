import LandingPage from '../components/LandingPage'

export default function AbuDhabiSteelErection() {
  return (
    <LandingPage
      path="/steel-structure-erection-abu-dhabi"
      pageKey="abu-dhabi"
      label="ABU DHABI"
      heroLine1="Fabricated in Sharjah."
      heroLine2="Erected in Abu Dhabi."
      video="/assets/contact-hero.mp4"
      poster="/assets/assetsJazeerat/IMG_9087.webp"
      primaryCta="Request a Quote"
      secondaryCta={{ to: '/services/delivery-installation', label: 'Erection & Installation Service' }}
      cta={{ eyebrow: 'Steel Erection in Abu Dhabi', heading: 'Have an Abu Dhabi project?', accent: 'Send us the drawings.' }}
    />
  )
}
