import LandingPage from '../components/LandingPage'

export default function AbuDhabiSteelErection() {
  return (
    <LandingPage
      path="/steel-structure-erection-abu-dhabi"
      pageKey="abu-dhabi"
      label="ABU DHABI"
      heroLine1="Fabricated in Sharjah."
      heroLine2="Erected in Abu Dhabi."
      image="/assets/abu-dhabi-skyline.webp"
      imageAlt="Abu Dhabi skyline with the Etihad Towers on the Corniche"
      poster="/assets/abu-dhabi-skyline.webp"
      primaryCta="Request a Quote"
      secondaryCta={{ to: '/services/delivery-installation', label: 'Erection & Installation Service' }}
      cta={{ eyebrow: 'Steel Erection in Abu Dhabi', heading: 'Have an Abu Dhabi project?', accent: 'Send us the drawings.' }}
    />
  )
}
