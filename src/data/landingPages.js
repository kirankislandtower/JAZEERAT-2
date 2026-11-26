// Body content for the location / market landing pages.
// Used by the page components and by scripts/prerender-meta.mjs, which writes
// the same text into the static HTML so crawlers that don't run JavaScript
// (Bing, AI search crawlers, link previews) read the full page, not just the H1.
// Plain JS only (no JSX): the build script imports this file under Node.
//
// Every statement here restates facts already published elsewhere on the site.

import { SERVICES } from './services.js'

export const ISLAND_TOWER = 'Island Tower Group'

// Short proof points shown under the hero buttons on the landing pages.
export const TRUST_POINTS = [
  '7,000 m² Sharjah workshop',
  'ISO 9001 & 14001 certified',
  '6G certified welders',
  'Quote in 24 hours',
]

export const LANDING_PAGES = {
  '/steel-fabrication-dubai': {
    intro:
      'Jazeerat Al Hadeed is a steel fabrication company with its head office in Al Qusais, Dubai. We design, detail, fabricate and erect structural steel for contractors and developers across Dubai, with fabrication carried out in our own workshop in Sharjah.',
    about: {
      heading: 'Structural steel fabrication for Dubai projects',
      paragraphs: [
        'Dubai projects move quickly, and steel that arrives late or does not fit holds up every trade behind it. We keep design, detailing, cutting, fabrication, welding, finishing and erection inside one company, so drawings go straight to the workshop and one team stays responsible until handover.',
        `Our recent Dubai work includes heavy steel erection and column splicing, architectural facade steel and warehouse loading canopies. We are part of ${ISLAND_TOWER}, and we have more than 30 years of steel fabrication experience behind us.`,
      ],
      addresses: [
        ['Head Office', 'Damascus Street, Al Qusais, Dubai, UAE'],
        ['Workshop', 'Al Sajaa Industrial Area, Sharjah, UAE'],
      ],
    },
    list: {
      heading: 'Steelwork we deliver in Dubai',
      items: [
        'Structural steel frames, trusses, columns and beams',
        'Pre-engineered buildings, warehouses and factories',
        'Architectural facade steel and cladding support structures',
        'Steel staircases, handrails and balcony railings',
        'Canopies, including warehouse loading canopies',
        'Access platforms, catwalks and cage ladders',
        'Pipe support steel for district cooling plants',
        'Heavy erection, crane lifting and column splicing on site',
      ],
    },
    servicesHeading: 'Our steel fabrication services in Dubai',
    reasons: {
      heading: 'Why Dubai contractors work with us',
      items: [
        { title: 'A Dubai head office', desc: 'Our head office is on Damascus Street in Al Qusais, so meetings, drawings and approvals are handled in Dubai.' },
        { title: 'One team, drawing to erection', desc: 'Design, detailing, supply, fabrication and on-site erection are handled by one company, with one point of contact.' },
        { title: 'A 7,000 m² workshop', desc: 'Steel is fabricated on our own shop floor in Al Sajaa Industrial Area, Sharjah, and delivered to site in Dubai.' },
        { title: 'Certified quality', desc: 'Our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015.' },
        { title: 'Certified welders', desc: 'Our welders are third-party certified to 6G and are capable of argon, TIG and MIG welding.' },
        { title: 'Quotes in 24 hours', desc: 'Send us your drawings or specifications and we typically return a quote within 24 hours.' },
      ],
    },
    faqs: {
      heading: 'Steel fabrication in Dubai: FAQs',
      items: [
        { q: 'Where is your office in Dubai?', a: 'Our head office is on Damascus Street in Al Qusais, Dubai. Our fabrication workshop is in Al Sajaa Industrial Area, Sharjah.' },
        { q: 'Where is the steel for Dubai projects fabricated?', a: 'In our own 7,000 m² workshop in Al Sajaa Industrial Area, Sharjah. Fabricated steel is then delivered to your site in Dubai, in phases that match your erection sequence.' },
        { q: 'Do you install steel on site in Dubai?', a: 'Yes. Our own on-site erection and installation team installs the steel we fabricate, including crane lifting, bolting and site welding.' },
        { q: 'Which steel fabrication services do you offer in Dubai?', a: `All ${SERVICES.length} of our services: ${SERVICES.map((s) => s.title).join(', ')}.` },
        { q: 'How quickly can I get a quote for a Dubai project?', a: 'Send us your drawings or specifications and we typically return a quote within 24 hours.' },
      ],
    },
  },

  '/steel-structure-erection-abu-dhabi': {
    intro:
      'Jazeerat Al Hadeed fabricates structural steel in its own workshop in Al Sajaa Industrial Area, Sharjah, delivers it to site in Abu Dhabi phase by phase, and erects it with its own installation teams. One company stays responsible from the first drawing to the final plumb survey.',
    about: {
      heading: 'Steel structure erection for Abu Dhabi projects',
      paragraphs: [
        'Steel erection goes smoothly when the people lifting the steel are the people who detailed and fabricated it. We match the fabrication schedule to your erection sequence, load members in the order you build, and deliver them phase by phase so your site in Abu Dhabi is never congested with steel it cannot use yet.',
        'On site, our erection team handles crane lifting, bolting, site welding and high-strength bolt tensioning, then carries out a final plumb survey before handover. Erection is carried out to AISC erection tolerances.',
        `We install steel across the UAE, including Abu Dhabi, Dubai and Sharjah, and we have supplied fabricated steel to Saudi Arabia. We are part of ${ISLAND_TOWER}, with more than 30 years of steel fabrication experience behind us.`,
      ],
      addresses: [
        ['Workshop', 'Al Sajaa Industrial Area, Sharjah, UAE'],
        ['Head Office', 'Damascus Street, Al Qusais, Dubai, UAE'],
      ],
    },
    list: {
      heading: 'Erection work we carry out in Abu Dhabi',
      items: [
        'Erection of structural steel frames, columns, beams and trusses',
        'Pre-engineered buildings, warehouses and factories',
        'Heavy crane lifting and column splicing on site',
        'High-strength bolt tightening and tensioning',
        'Site welding by third-party certified 6G welders',
        'Canopies, access platforms, catwalks and staircases',
        'Over-dimensional (ODC) transport of long and heavy members',
        'Final plumb surveys, handover and maintenance work',
      ],
    },
    process: {
      heading: 'How we erect steel in Abu Dhabi',
      items: [
        { title: 'Detail and approve', desc: 'Our in-house team details the steel in Tekla Structures and AutoCAD, and shop drawings are approved before cutting starts.' },
        { title: 'Fabricate in Sharjah', desc: 'Members are cut, welded and finished in our 7,000 m² workshop in Al Sajaa Industrial Area, with welds logged against our quality control records.' },
        { title: 'Deliver in sequence', desc: 'Fabricated steel is loaded in erection order and delivered phase by phase on heavy flatbed trailers, including over-dimensional loads.' },
        { title: 'Lift, bolt and survey', desc: 'Our own crews lift, bolt, tension and weld on site, then complete a final plumb survey before handover.' },
      ],
    },
    servicesHeading: 'Services behind every Abu Dhabi erection job',
    reasons: {
      heading: 'Why contractors choose us for erection',
      items: [
        { title: 'Fabricator and erector in one', desc: 'The company that fabricated the steel stands behind its installation, so fit-up problems are solved by the team that made the parts.' },
        { title: 'Planned in Primavera P6', desc: 'A project manager and a project engineer plan each job in Primavera P6 and give clients regular updates.' },
        { title: 'Safety on site', desc: 'We deliver regular safety training to our workforce, and an HSE-trained technician coordinates health and safety on site and on the shop floor.' },
        { title: 'Certified quality', desc: 'Our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015.' },
        { title: 'Certified welders', desc: 'Our welders are third-party certified to 6G and are capable of argon, TIG and MIG welding.' },
        { title: 'Quotes in 24 hours', desc: 'Send us your drawings or specifications and we typically return a quote within 24 hours.' },
      ],
    },
    faqs: {
      heading: 'Steel structure erection in Abu Dhabi: FAQs',
      items: [
        { q: 'Do you carry out steel structure erection in Abu Dhabi?', a: 'Yes. We install steel across the UAE, including Abu Dhabi, Dubai and Sharjah, using our own on-site erection and installation team.' },
        { q: 'Where is the steel fabricated?', a: 'In our own 7,000 m² workshop in Al Sajaa Industrial Area, Sharjah. Fabricated steel is then delivered to your site in Abu Dhabi, phase by phase, to match your erection sequence.' },
        { q: 'Can you erect steel that we fabricated elsewhere?', a: 'Our erection team installs the steel we fabricate, which lets one company take responsibility from fabrication to handover. Send us your drawings and scope and we will confirm what we can take on.' },
        { q: 'Can you transport over-dimensional steel members to Abu Dhabi?', a: 'Yes. We plan and carry out over-dimensional (ODC) transport on heavy flatbed trailers.' },
        { q: 'Which tolerances do you erect to?', a: 'Steel is erected to AISC erection tolerances, and we carry out a final plumb survey before handover.' },
        { q: 'How quickly can I get a quote for an Abu Dhabi project?', a: 'Send us your drawings or specifications and the site location. We typically return a quote within 24 hours.' },
      ],
    },
  },

  '/steel-fabrication-export': {
    intro:
      'Jazeerat Al Hadeed fabricates structural and custom steel in its workshop in Al Sajaa Industrial Area, Sharjah, and exports it to projects in the USA, India, Africa and across the GCC.',
    about: {
      heading: 'Steel fabrication for export',
      paragraphs: [
        'Our systems are set up to export. The same team that details, fabricates, welds and finishes steel for UAE projects prepares steel packages for clients abroad, with shop drawings approved before cutting and quality records kept for every piece.',
        `We use alternative routes for sending materials that do not pass through the Strait of Hormuz. We are part of ${ISLAND_TOWER}, with more than 30 years of steel fabrication experience behind us.`,
      ],
    },
    markets: {
      heading: 'Where we export',
      items: [
        { title: 'United States', desc: 'Fabricated structural steel for projects in the USA.' },
        { title: 'India', desc: 'Structural and custom steel fabrication for Indian projects.' },
        { title: 'Africa', desc: 'Steel packages for industrial and commercial projects across Africa.' },
        { title: 'Saudi Arabia & GCC', desc: 'We have supplied fabricated steel to Saudi Arabia, including work in Riyadh.' },
      ],
    },
    reasons: {
      heading: 'Set up to export',
      items: [
        { title: 'Drawings shared before cutting', desc: 'Our in-house team details every steel package in Tekla Structures and AutoCAD, and shop drawings are approved before fabrication starts, wherever the project is.' },
        { title: 'Fabricated to international codes', desc: 'Welding is carried out by certified welders to AWS D1.1 and ASME Section IX, with UT, MT, PT and RT testing available.' },
        { title: 'Quality records with the steel', desc: 'Our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015, and welds are logged against our quality control records.' },
        { title: 'Protected for the journey', desc: 'Sandblasting, industrial painting, protective coatings and galvanizing protect steel against corrosion, in transit and on site.' },
        { title: 'One team, one contact', desc: 'Estimation, detailing, fabrication, finishing and dispatch are handled by one company, so you deal with one point of contact for the whole package.' },
        { title: 'Alternative shipping routes', desc: 'We use alternative routes for sending materials that do not pass through the Strait of Hormuz.' },
      ],
    },
    faqs: {
      heading: 'Steel fabrication export: FAQs',
      items: [
        { q: 'Do you export fabricated steel outside the UAE?', a: 'Yes. We fabricate structural and custom steel in our workshop in Al Sajaa Industrial Area, Sharjah, and our systems are set up to export it to markets including the USA, India and Africa, as well as Saudi Arabia and the GCC.' },
        { q: 'Do your shipments go through the Strait of Hormuz?', a: 'No. We use alternative routes for sending materials that do not pass through the Strait of Hormuz.' },
        { q: 'Which standards do you fabricate to for export projects?', a: 'Our welders are certified to AWS D1.1 and ASME Section IX, and our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015. Tell us the specification for your project and we will confirm it before quoting.' },
        { q: 'Can you work from our drawings and specifications?', a: 'Yes. Send us your drawings, models or specifications. Our detailing team prepares shop drawings in Tekla Structures and AutoCAD for your approval before fabrication starts.' },
        { q: 'How do I get a quote for an export project?', a: 'Send us your drawings or specifications and the delivery location. We typically return a quote within 24 hours.' },
      ],
    },
  },
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
