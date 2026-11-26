// Plain-HTML body text for /about, /facilities and /contact, written into the
// prerendered HTML by scripts/prerender-meta.mjs so crawlers that don't run
// JavaScript (Bing, AI search crawlers, link previews) read the real page
// instead of just the H1.
//
// This copies the text shown by src/pages/About.jsx, Facilities.jsx and
// Contact.jsx. When you change the copy on one of those pages, update the
// matching entry here too.
//
// Each section: { heading, paragraphs?, list?, cards?: [{ title, desc }] }
// Plain JS only (no JSX): the build script imports this file under Node.

export const STATIC_BODIES = {
  '/about': [
    {
      paragraphs: [
        'Jazeerat Al Hadeed (JAH Steel) is a steel fabrication company with its head office in Al Qusais, Dubai and its machine workshop in Al Sajaa Industrial Area, Sharjah. We were established in 2019 after acquiring Carlton Steel Works LLC, and today we deliver structural steel fabrication, CNC cutting and machining across the UAE and MENA region. We are part of Island Tower Group.',
      ],
    },
    {
      heading: 'One Sharjah workshop, full steel fabrication capability',
      cards: [
        { title: 'Structural steel fabrication', desc: 'Structural steel components fabricated and assembled for industrial and commercial projects.' },
        { title: 'Design & detailing', desc: 'Shop drawings, connection details and material take-offs prepared before fabrication starts.' },
        { title: 'CNC plasma & laser cutting', desc: 'Structural and architectural steel plate cut on CNC plasma and laser systems.' },
        { title: 'CNC machining & machine workshop', desc: 'In-house machining and machine workshop work for precision steel components.' },
        { title: 'Welding & quality control', desc: 'Welding to code, with every joint logged against our quality control record.' },
        { title: 'Steel delivery & installation', desc: 'Transport, crane rigging and structural steel erection across the UAE and MENA region.' },
      ],
    },
    {
      heading: 'Our values',
      cards: [
        { title: 'Teamwork', desc: 'Each person takes responsibility for their work, and teams collaborate to deliver accurate solutions.' },
        { title: 'Quality', desc: 'Capable machinery, established processes and an efficient team stand behind every delivery.' },
        { title: 'Value', desc: 'A customer-centric company that offers competitive pricing and value for money.' },
        { title: 'Innovation', desc: 'We look for the most efficient solution for each client and keep improving our processes.' },
        { title: 'Integrity', desc: 'Honest, open and transparent in all our dealings. The trust of our clients comes first.' },
      ],
    },
    {
      heading: 'Certified management systems',
      list: ['ISO 9001:2015 Quality Management System', 'ISO 14001:2015 Environmental Management System'],
      paragraphs: ['Certified by Otabu Certification for the manufacturing and installation of structural metal parts.'],
    },
    {
      heading: 'Our mission',
      paragraphs: [
        'To become a leader in the industrial construction industry serving the MENA region through automation, seamless collaboration, continuous improvement, commitment and rapid customisation.',
      ],
    },
    {
      heading: 'Our vision',
      paragraphs: ['To become a global leader in the industrial construction industry and the first choice for all our clients.'],
    },
    {
      heading: 'The teams behind every steel package',
      cards: [
        { title: 'Sales & estimation', desc: 'Enquiries go straight to our estimation team, who work with design and production to prepare a quick, accurate quote using Tekla and Tekla PowerFab.' },
        { title: 'Design & detailing', desc: 'Our designers and Tekla draughtsmen study the project scope and produce the BIM models and fabrication drawings.' },
        { title: 'Project management', desc: 'A project manager and project engineer plan timelines and resources in Primavera P6 and keep clients updated.' },
        { title: 'Production', desc: 'A production manager coordinates every workstation. The team includes machine operators, steel fabricators, pipe fitters and third-party certified 6G welders.' },
        { title: 'Site erection & installation', desc: 'Our site team handles on-site erection and installation, and can produce on-site mock-ups and carry out maintenance work.' },
      ],
      paragraphs: ['Jazeerat Al Hadeed is part of Island Tower Group, under the same ownership and management.'],
    },
    {
      heading: 'Precision steel. Real purpose.',
      paragraphs: [
        'We exist to close the gap between engineering drawings and fabricated steel. Every drawing that enters our Sharjah workshop is detailed, cut, welded and checked against its quality control record before it leaves for site. Clients across the UAE and MENA region rely on that discipline for structural steel fabrication, CNC cutting and machining.',
      ],
      cards: [
        { title: 'Build without compromise', desc: 'Our mission is to fabricate structural steel exactly as it is detailed, whether the job is a small platform or a large industrial structure. We hold every joint to the same quality standard on every project.' },
        { title: 'Empower every project', desc: 'From design and detailing to delivery, we give project teams one steel fabrication partner for CNC cutting, machining, welding, finishing and installation, reducing the coordination between separate suppliers that delays site work.' },
        { title: 'Raise the regional standard', desc: 'The UAE and MENA construction market deserves fabricators who log tolerances and keep inspection records. We are building that expectation into every delivery so that precision becomes the norm, not the premium.' },
      ],
    },
    {
      heading: 'Our journey: Sharjah steelwork since 1983',
      cards: [
        { title: 'Sharjah workshop', desc: 'Carlton Steel Works LLC, a steel workshop in Sharjah, has been operating since 1983.' },
        { title: 'Established', desc: 'Jazeerat Al Hadeed is established after acquiring Carlton Steel Works LLC.' },
        { title: 'Years of experience', desc: 'Over 30 years of steel fabrication and machine workshop experience, serving projects across the UAE and MENA region.' },
        { title: 'Integrated workshop', desc: 'Design and detailing, CNC plasma and laser cutting, machining, welding, and delivery and installation from one facility in Sharjah.' },
      ],
    },
  ],

  '/facilities': [
    {
      paragraphs: [
        'Our 7,000 m² shop floor in Al Sajaa Industrial Area, Sharjah brings cutting, machining, welding, blasting, coating and dispatch under one roof, so steel moves from raw stock to site-ready assemblies without leaving the facility.',
      ],
    },
    {
      heading: 'Inside our workshop',
      cards: [
        { title: 'CNC plasma cutting', desc: 'High-capacity plate cutting for structural steel profiles and architectural components.' },
        { title: 'CNC laser & fiber cutting', desc: 'Fine-detail cutting for precision work, openings, and intricate fabrication pieces.' },
        { title: 'CNC machine workshop', desc: 'Drilling, boring, and machining with digital tolerance control in one facility.' },
        { title: 'Welding bays', desc: 'Dedicated welding stations with third-party certified 6G welders and multi-process capability.' },
        { title: 'Surface finishing', desc: 'Shot blasting, priming, painting and protective coating optimised for MENA climates.' },
        { title: 'Logistics & storage', desc: 'Site-ready staging, secure storage and coordinated transport from the workshop.' },
      ],
    },
    {
      heading: 'What our workshop delivers',
      list: [
        'Design, detailing, supply, fabrication and on-site erection of heavy and light steel structures',
        'Pre-engineered buildings (PEBs) and hot rolled steel structures',
        'Warehouses, factories, showrooms, cold stores and data centres',
        'Storage tanks, silos and pressure vessels',
        'Pipeline and pipe support works for district cooling plants',
        'Loading platforms, MEP platforms, riser frames and handrails',
        'Industrial gratings and sub-station fabrication and installation',
        'Filter housings and skids for pumps and filter systems',
        'Sheet metal works',
        'General machining: lathe, milling, drilling, rolling, bending, pressing, shearing and CNC work',
        'Hot-dip galvanizing, sandblasting and spray painting',
      ],
    },
    {
      heading: 'Workshop machinery',
      list: ['Steel rolling machines', 'Lathe machine', 'Milling machines', 'Pipe bending machines', 'MIG welding machines', 'Arc welding machines'],
    },
    {
      heading: 'Quality on the shop floor',
      paragraphs: [
        'Quality control runs through every process. Raw materials, tools and consumables come from verified suppliers, and our quality control engineer inspects materials before production starts. An in-house maintenance technician inspects our machinery, tools and equipment on a periodic programme. Our quality management system is certified to ISO 9001:2015.',
        'Clients are welcome to visit the workshop and see our processes first-hand. Send us a drawing and we will send back a quote, typically within 24 hours.',
      ],
    },
  ],

  '/contact': [
    {
      paragraphs: [
        'Send us your drawings and project details. Our estimation team replies with a quote, typically within 24 hours.',
      ],
    },
    {
      heading: 'Contact details',
      list: [
        'Head office: Damascus Street, Al Qusais, Dubai, UAE',
        'Workshop: P.O. Box 61204, Al Sajaa Industrial Area, Sharjah, UAE',
        'WhatsApp: +971 54 305 8357',
        'Phone: +971 54 305 8357',
        'Phone 2: +971 55 145 3288',
        'Email: info@jahsteel.ae',
        'Hours: Mon – Fri, 08:30 – 18:00 · Sat, 08:30 – 14:00 · Sun closed',
      ],
    },
    {
      heading: 'Where we work',
      paragraphs: [
        'We fabricate in our workshop in Sharjah and deliver and erect steel across the UAE and the MENA region.',
      ],
      links: [
        ['/steel-fabrication-dubai', 'Steel fabrication in Dubai'],
        ['/steel-structure-erection-abu-dhabi', 'Steel structure erection in Abu Dhabi'],
        ['/steel-fabrication-export', 'Steel fabrication export from the UAE'],
      ],
    },
  ],
}
