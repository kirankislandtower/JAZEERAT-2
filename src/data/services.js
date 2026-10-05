// Single source of truth for the 10 service pages.
// Used by Services.jsx, ServiceDetail.jsx, the home "What We Do" cards and
// scripts/prerender-meta.mjs (build-time SEO tags). Plain data only — icons are
// mapped from `icon` keys inside the components.
//
// FAQ answers only restate facts already published on this site.

export const SERVICE_GROUPS = [
  { key: 'design', label: 'Design & Engineering' },
  { key: 'cutting', label: 'Cutting & Machining' },
  { key: 'fabrication', label: 'Fabrication' },
  { key: 'site', label: 'Finishing & Site' },
]

// Old URLs that were renamed for SEO. Vercel 301-redirects these (vercel.json);
// ServiceDetail also redirects them client-side so local dev behaves the same.
export const SERVICE_SLUG_ALIASES = {
  'fabrication-facility': 'structural-steel-fabrication',
  'advanced-machinery': 'plate-bending-rolling',
  'cnc-laser-cutting': 'cnc-laser-plasma-cutting',
}

export const SERVICES = [
  {
    slug: 'estimation-takeoff',
    icon: 'ruler',
    group: 'design',
    title: 'Estimation & Material Takeoff',
    seoTitle: 'Steel Estimation & Material Takeoff UAE | JAH Steel',
    metaDescription:
      'Steel estimation and material takeoff (MTO) from your drawings or Tekla model: accurate tonnage, nesting and cost plans for UAE contractors.',
    h1: 'Steel Estimation & Material Takeoff Services in the UAE',
    label: 'Design capabilities',
    desc: 'We provide accurate estimation and material takeoff services through detailed drawing and specification analysis. Our precise quantity calculations support cost control, efficient procurement, reduced waste, and effective project planning.',
    intro:
      'Accurate steel quantities decide whether a tender wins and whether the job makes money. Our estimation team in Sharjah prepares material takeoffs from your drawings or Tekla model, with tonnage by member, nesting plans to cut scrap, and a cost breakdown you can tender with.',
    spec: 'Accurate MTO & estimation',
    video: '/assets/about-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9079.webp',
    overviewHeading: 'Takeoffs you can tender with.',
    overview:
      'Our dedicated estimation team provides contractors with rapid, precise quantity takeoffs. We analyze design drawings to optimize steel nesting and reduce scrap percentages, ensuring competitive bidding and transparent material costs.',
    capabilities: [
      'Detail-level Material Takeoffs (MTO)',
      'Advanced Steel Nesting & Scrap Optimization',
      'Cost Planning & Value Engineering',
      'Preliminary Connection Design Assumptions',
      'Logistics & Freight Cost Modeling',
    ],
    machinery: [
      { name: 'Tekla Structures', cap: 'Automated 3D quantity extraction' },
      { name: 'PowerFab', cap: 'Material allocation & tracking' },
    ],
    standards: 'AISC Code of Standard Practice',
    faqs: [
      {
        q: 'What do you need from me to prepare a steel takeoff?',
        a: 'Send your structural drawings (PDF or DWG) or a Tekla/IFC model, together with the project specification. The more complete the drawings, the more precise the quantities.',
      },
      {
        q: 'What does your material takeoff include?',
        a: 'Detail-level quantities by member, nesting plans to reduce scrap, cost planning and value-engineering notes, and logistics and freight cost modelling.',
      },
      {
        q: 'How quickly can I get a cost estimate?',
        a: 'Send us your drawings and our team aims to return a cost estimate within 24 hours.',
      },
    ],
    related: ['structural-design-engineering', 'design-detailing'],
  },
  {
    slug: 'structural-design-engineering',
    icon: 'pen',
    group: 'design',
    title: 'Structural Design & Engineering',
    seoTitle: 'Structural Steel Design & Engineering UAE | JAH Steel',
    metaDescription:
      'Structural steel design in the UAE: analysis, connection design and value engineering for warehouses, mezzanines, canopies and complex structures.',
    h1: 'Structural Steel Design & Engineering in the UAE',
    label: 'Design capabilities',
    desc: 'Our experienced structural engineers deliver innovative steel design solutions, including structural analysis, complex and iconic structures, and value engineering. We optimize performance, safety, material efficiency, and constructability for successful project execution.',
    intro:
      'Our structural engineers design steel structures that are safe, economical and simple to fabricate. Because design, detailing and fabrication happen in the same Sharjah workshop, every member is sized with the shop floor in mind, which reduces tonnage and site rework.',
    spec: 'Innovative steel design',
    video: '/assets/about-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9084.webp',
    overviewHeading: 'Designed to be built.',
    overview:
      'We offer full-scale structural design services tailored to commercial, industrial, and architectural projects. Our engineering team leverages cutting-edge analysis software to optimize member sizes, reduce overall tonnage, and verify structural integrity against seismic and wind loads.',
    capabilities: [
      'Comprehensive Structural Analysis',
      'Wind & Seismic Load Modeling',
      'Value Engineering for Tonnage Reduction',
      'Connection Design Verification',
      'Design Calculations & Drawings',
    ],
    machinery: [
      { name: 'STAAD.Pro Connect', cap: 'Advanced 3D structural analysis' },
      { name: 'ETABS & SAP2000', cap: 'Seismic & wind load simulations' },
    ],
    standards: 'AISC 360-16 / IBC / ASCE 7',
    faqs: [
      {
        q: 'Can you value-engineer an existing steel design?',
        a: 'Yes. Value engineering for tonnage reduction is one of our core services: we review member sizes and connections to cut steel weight while keeping the structure safe and buildable.',
      },
      {
        q: 'Which software do you use for structural analysis?',
        a: 'Our engineers use STAAD.Pro Connect for 3D structural analysis and ETABS and SAP2000 for seismic and wind load simulations.',
      },
      {
        q: 'Which design codes do you work to?',
        a: 'We design to AISC 360-16, IBC and ASCE 7, or to the codes named in your project specification.',
      },
    ],
    related: ['design-detailing', 'estimation-takeoff'],
  },
  {
    slug: 'design-detailing',
    icon: 'pen',
    group: 'design',
    title: 'Steel Detailing & Shop Drawings',
    seoTitle: 'Tekla Steel Detailing Services in UAE | JAH Steel',
    metaDescription:
      'Steel detailing in Tekla Structures and AutoCAD: 3D models, fabrication and erection drawings, and connection details for UAE projects.',
    h1: 'Steel Detailing & Shop Drawings (Tekla)',
    label: 'Design capabilities',
    desc: 'Using Tekla Structures and AutoCAD, we develop accurate 3D models, fabrication drawings, erection drawings, and connection details. With PowerFab for project tracking and production management, we ensure seamless coordination from design through fabrication and installation.',
    intro:
      'Good shop drawings are the difference between steel that bolts together on site and steel that gets cut and re-welded. Our detailing team builds a full Tekla 3D model of your structure, checks it for clashes, and issues fabrication and erection drawings plus NC files that feed our CNC machines directly.',
    spec: 'Tekla & AutoCAD detailing',
    video: '/assets/services-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9079.webp',
    overviewHeading: 'A digital twin before the first cut.',
    overview:
      'Before manufacturing begins, our engineering department constructs a complete "digital twin" of the structure. We utilize Tekla Structures to detail connections, cross-verify drawing dimensions, and perform automated clash detection between steelwork and MEP systems.',
    capabilities: [
      '3D BIM Modeling (Tekla Structures)',
      'Fabrication & Erection Shop Drawings',
      'CNC Data Generation (NC/DXF files)',
      'Architecturally Exposed Structural Steel (AESS) Detailing',
      'Clash Detection & Resolution',
    ],
    machinery: [
      { name: 'Tekla Structures Licenses', cap: 'BIM modeling & shop detailing' },
      { name: 'AutoCAD', cap: 'Drafting & 2D verification' },
    ],
    standards: 'AISC Code of Standard Practice / BS EN 1090-2',
    faqs: [
      {
        q: 'What is the difference between shop drawings and erection drawings?',
        a: 'Shop (fabrication) drawings show each member with every cut, hole and weld so it can be made in the workshop. Erection drawings show where each marked member goes on site and how it connects.',
      },
      {
        q: 'Do you produce CNC files from the model?',
        a: 'Yes. Our Tekla models generate NC and DXF files that go straight to our CNC cutting and drilling machines, so parts match the drawings without manual marking.',
      },
      {
        q: 'Can you detail architecturally exposed steel (AESS)?',
        a: 'Yes. AESS detailing is one of our core capabilities, used on architectural facade and balcony steelwork.',
      },
    ],
    related: ['structural-design-engineering', 'cnc-laser-plasma-cutting'],
  },
  {
    slug: 'structural-steel-fabrication',
    icon: 'factory',
    group: 'fabrication',
    title: 'Structural Steel Fabrication',
    seoTitle: 'Structural Steel Fabrication in Sharjah | JAH Steel',
    metaDescription:
      'Portal frames, trusses, columns and beams cut, welded and painted in our Sharjah workshop, delivered site-ready across Dubai and the UAE.',
    h1: 'Structural Steel Fabrication in Sharjah',
    label: 'Fabrication capabilities',
    desc: 'Our modern fabrication facility combines advanced technology with a skilled workforce of engineers, supervisors, fabricators, welders, and quality inspectors. We deliver high-quality structural steel components through efficient production processes and strict quality control.',
    intro:
      'We fabricate structural steel for warehouses, industrial buildings, high-rise facades and infrastructure in our workshop in Al Sajaa Industrial Area, Sharjah. Members are cut from Tekla NC files, assembled in heavy-lift bays, welded to code, then blasted and coated before dispatch.',
    spec: 'Modern integrated workshop',
    video: '/assets/services-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9087.webp',
    overviewHeading: 'From raw stock to site-ready steel.',
    overview:
      'Our integrated facility is laid out to keep projects moving. Materials move seamlessly from raw stock to CNC processing, assembly, welding, and finally into our surface treatment bays.',
    capabilities: [
      'High-Volume Structural Steel Output',
      'Organised Material Flow From Stock to Dispatch',
      'Dedicated Heavy-Lift Assembly Bays',
      'Non-Destructive Testing (NDT) of Critical Welds',
      'Blasting & Coating Before Dispatch',
    ],
    machinery: [
      { name: 'Overhead Gantry Cranes', cap: 'Heavy-lift handling of structural assemblies' },
      { name: 'Assembly Bays', cap: 'Fit-up and welding of structural members' },
    ],
    standards: 'ISO 9001:2015 / ISO 14001:2015 certified',
    faqs: [
      {
        q: 'What structural steel do you fabricate?',
        a: 'Portal frames, trusses, columns, beams, steel decks and heavy structural assemblies, pre-assembled where possible for site-ready installation.',
      },
      {
        q: 'Where is your fabrication workshop?',
        a: 'Our workshop is in Al Sajaa Industrial Area, Sharjah. We deliver fabricated steel to sites in Dubai, across the UAE and the wider MENA region.',
      },
      {
        q: 'How large can the members be?',
        a: 'Send us the member lengths and weights from your drawings and we will confirm handling and transport before we quote.',
      },
    ],
    related: ['welding-qc', 'delivery-installation'],
  },
  {
    slug: 'plate-bending-rolling',
    icon: 'wrench',
    group: 'cutting',
    title: 'Plate Bending, Rolling & Drilling',
    seoTitle: 'Plate Bending & Rolling Services in Sharjah | JAH Steel',
    metaDescription:
      'Press brake bending, plate rolling and CNC beam drilling in Sharjah for structural and custom steel parts. Send a drawing for a quote.',
    h1: 'Plate Bending, Rolling & Drilling Services in Sharjah',
    label: 'Machining capabilities',
    desc: 'Equipped with CNC laser cutting, press brake, plate rolling, band saw cutting, MIG welding, ARC welding, and supporting fabrication equipment, we ensure precision, efficiency, and consistent quality in every project.',
    intro:
      'Need plates bent, rolled or drilled to drawing? Our Sharjah workshop runs heavy-duty press brakes, plate rolling machines and a CNC multi-spindle beam drill line, fed directly from Tekla NC files.',
    spec: 'Precision CNC & welding tech',
    video: '/assets/services-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9084.webp',
    overviewHeading: 'Model to machine, without retyping.',
    overview:
      'We continuously invest in top-tier fabrication technology to ensure every cut, bend, and weld is exact. By integrating our 3D detailing software directly with our CNC machine floor, we eliminate human transcription errors and vastly accelerate production timelines.',
    capabilities: [
      'Direct NC-to-Machine Processing',
      'Heavy Plate Rolling & Forming',
      'Multi-Axis CNC Beam Drilling',
      'Press-Brake Folding',
      'Band Saw Cutting',
    ],
    machinery: [
      { name: 'CNC Multi-Spindle Drill Line', cap: 'High-speed beam drilling & coping' },
      { name: 'Heavy-Duty Press Brakes', cap: 'Complex plate folding & forming' },
      { name: 'Plate Rolling Machines', cap: 'Cylindrical & conical forming' },
    ],
    standards: 'AWS D1.1 / ASME Section IX',
    faqs: [
      {
        q: 'Can you roll plates into cylinders and cones?',
        a: 'Yes. Our plate rolling machines form both cylindrical and conical shapes for tanks, hoppers and structural parts.',
      },
      {
        q: 'Can you work directly from my DXF or NC files?',
        a: 'Yes. Our press brakes, rolling machines and drill line run from NC/DXF data, which removes manual transcription errors.',
      },
      {
        q: 'Do you drill and cope structural beams?',
        a: 'Yes. Our CNC multi-spindle drill line handles high-speed beam drilling and coping.',
      },
    ],
    related: ['cnc-laser-plasma-cutting', 'custom-fabrication'],
  },
  {
    slug: 'cnc-laser-plasma-cutting',
    icon: 'flame',
    group: 'cutting',
    title: 'CNC Laser & Plasma Cutting',
    seoTitle: 'CNC Laser & Plasma Cutting Services in Sharjah | JAH Steel',
    metaDescription:
      'CNC fiber laser and plasma cutting in Sharjah: clean dross-free edges for gusset plates, base plates and architectural profiles. Quote in 24 hours.',
    h1: 'CNC Laser & Plasma Cutting Services in Sharjah',
    label: 'Cutting capabilities',
    desc: 'Our CNC laser and plasma cutting delivers high-precision cuts with clean finishes and minimal material waste, enabling the production of complex steel components with superior quality.',
    intro:
      'We cut mild steel plate with CNC fiber laser and CNC plasma in our Sharjah workshop. Laser gives clean, dross-free edges for gusset plates and architectural profiles; plasma handles thick base plates and structural parts at production speed.',
    spec: 'High-precision finishes',
    video: '/assets/services-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9079.webp',
    overviewHeading: 'Clean edges, ready to weld.',
    overview:
      'Our fiber laser cutting machines provide unmatched precision for intricate steel components, gusset plates, and architectural metalwork. The laser leaves an exceptionally clean, dross-free edge that typically needs no secondary grinding before welding or finishing.',
    capabilities: [
      'High-Speed Fiber Laser Cutting',
      'Intricate Architectural Metal Profiles',
      'Thick Plate Piercing & Slicing',
      'Dross-Free Edge Quality',
      'Automated Nesting for Scrap Reduction',
    ],
    machinery: [
      { name: 'High-Power Fiber Lasers', cap: 'Clean-edge cutting of mild steel plate' },
      { name: 'CNC Plasma Cutting', cap: 'Thick plate at production speed' },
    ],
    standards: 'ISO 9013 Thermal Cutting Quality',
    faqs: [
      {
        q: 'How thick can you cut?',
        a: 'Laser handles thinner plate and plasma handles thicker plate. Send us your plate thicknesses and we will confirm the right process before we quote.',
      },
      {
        q: 'Laser or plasma: which do I need?',
        a: 'Laser suits thinner plate and detailed profiles that need a clean, dross-free edge. Plasma is faster and more economical for thick plate such as base plates and stiffeners.',
      },
      {
        q: 'Do you nest parts to reduce scrap?',
        a: 'Yes. Automated nesting places parts on each sheet to reduce scrap and material cost.',
      },
    ],
    related: ['plate-bending-rolling', 'design-detailing'],
  },
  {
    slug: 'custom-fabrication',
    icon: 'boxes',
    group: 'fabrication',
    title: 'Custom Steel Fabrication',
    seoTitle: 'Custom Steel Fabrication in UAE | JAH Steel',
    metaDescription:
      'Custom steel fabrication in the UAE: mezzanines, catwalks, staircases, tanks, hoppers, canopies and architectural metalwork built to your drawings.',
    h1: 'Custom Steel Fabrication in the UAE',
    label: 'Fabrication capabilities',
    desc: 'We provide customized steel fabrication solutions including tanks, platforms, architectural structures, and specialized metal works, delivering durable and precise solutions tailored to client requirements.',
    intro:
      'Beyond standard frames, we build steelwork to your exact drawing: mezzanines and catwalks, staircases, storage tanks and hoppers, canopies and architectural features. Everything is detailed, fabricated and finished in our Sharjah workshop.',
    spec: 'Bespoke steel solutions',
    video: '/assets/about-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9087.webp',
    overviewHeading: 'Built to your drawing, not a catalogue.',
    overview:
      'Beyond standard structural frames, our team excels in highly customized, bespoke fabrication. From complex spiral staircases and architectural canopies to heavy-duty industrial hoppers, we adapt our expertise to meet unique geometric and load-bearing requirements.',
    capabilities: [
      'Architectural Canopies & Facades',
      'Industrial Storage Tanks & Hoppers',
      'Custom Mezzanines & Catwalks',
      'Complex Tubular Structures',
      'Stainless Steel & Aluminum Specialties',
    ],
    machinery: [
      { name: 'TIG & MIG Welding Stations', cap: 'Specialized alloy welding' },
      { name: 'Section Bending Rolls', cap: 'Curved structural profiles' },
    ],
    standards: 'AESS Custom Guidelines / AWS D1.1',
    faqs: [
      {
        q: 'Do you fabricate mezzanine floors and catwalks?',
        a: 'Yes. Custom mezzanines and catwalks are part of our bespoke fabrication work, detailed and fabricated in our Sharjah workshop.',
      },
      {
        q: 'Can you make steel staircases and canopies?',
        a: 'Yes. We fabricate staircases, including spiral staircases, as well as architectural canopies and facade steelwork.',
      },
      {
        q: 'Do you work with stainless steel and aluminium?',
        a: 'Yes. Our TIG and MIG welding stations handle stainless steel and aluminium as well as mild steel.',
      },
    ],
    related: ['structural-steel-fabrication', 'surface-finishing'],
  },
  {
    slug: 'welding-qc',
    icon: 'shield',
    group: 'fabrication',
    title: 'Welding & Quality Control',
    seoTitle: 'Structural Steel Welding Services in Sharjah | JAH Steel',
    metaDescription:
      'Structural welding by certified welders to AWS D1.1 and ASME IX, with UT, MT, PT and RT testing and full traceability on every joint.',
    h1: 'Structural Welding Services & Quality Control in Sharjah',
    label: 'Fabrication capabilities',
    desc: 'Our qualified welding team applies advanced welding techniques and strict inspection procedures to ensure strong, reliable, and high-quality fabricated structures that meet project specifications and industry standards.',
    intro:
      'Every joint we weld is planned, done and checked to code. Our welders work to approved procedures in our Sharjah workshop, while inspectors check fit-up, pre-heat and each pass before NDT confirms the weld.',
    spec: 'Strict inspection protocols',
    video: '/assets/services-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9084.webp',
    overviewHeading: 'Quality built in, not inspected in.',
    overview:
      "Quality isn't just inspected at the end—it is built into every phase. Our welding inspectors monitor joint fit-up, pre-heat temperatures, and weld passes. All critical welds undergo rigorous Non-Destructive Testing (NDT) to confirm weld quality.",
    capabilities: [
      'FCAW, SMAW, GMAW, & SAW Welding',
      'Ultrasonic Testing (UT) & Radiography (RT)',
      'Magnetic Particle (MT) & Dye Penetrant (PT)',
      'Weld Procedure Specification (WPS) Development',
      'Traceability & Mill Certificate Logging',
    ],
    machinery: [
      { name: 'Submerged Arc Welding (SAW) Tractors', cap: 'High-deposition continuous welding' },
      { name: 'Ultrasonic Testing Equipment', cap: 'Volumetric flaw detection' },
    ],
    standards: 'AWS D1.1 / ASME Section IX',
    faqs: [
      {
        q: 'Which welding processes do you use?',
        a: 'FCAW, SMAW, GMAW and submerged arc welding (SAW), selected for each joint under a written weld procedure specification (WPS).',
      },
      {
        q: 'Which codes do your welders work to?',
        a: 'Our welding follows AWS D1.1 and ASME Section IX.',
      },
      {
        q: 'What weld testing do you carry out?',
        a: 'Critical welds undergo non-destructive testing: ultrasonic (UT), radiography (RT), magnetic particle (MT) and dye penetrant (PT), with mill certificates logged for traceability.',
      },
    ],
    related: ['structural-steel-fabrication', 'surface-finishing'],
  },
  {
    slug: 'surface-finishing',
    icon: 'ruler',
    group: 'site',
    title: 'Surface Finishing',
    seoTitle: 'Steel Painting & Galvanizing in UAE | JAH Steel',
    metaDescription:
      'Sandblasting, industrial painting, protective coatings and hot-dip galvanizing that protect steel against corrosion in the Gulf climate.',
    h1: 'Steel Surface Finishing: Blasting, Painting & Galvanizing',
    label: 'Finishing capabilities',
    desc: 'We provide professional surface protection solutions including industrial painting, protective coatings, and hot-dip galvanizing (HDG) to enhance durability, corrosion resistance, and long-term performance.',
    intro:
      'Steel in the UAE faces strong UV, high humidity and coastal salt, so surface protection decides how long a structure lasts. We blast steel in our Sharjah workshop and apply epoxy and polyurethane paint systems, intumescent fire protection, or coordinate hot-dip galvanizing, then test film thickness and adhesion before dispatch.',
    spec: 'Protective coatings & HDG',
    video: '/assets/contact-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9079.webp',
    overviewHeading: 'Protection made for the Gulf climate.',
    overview:
      'Steel in the MENA region faces extreme UV, high humidity, and coastal salinity. We apply rigorous surface preparation (up to SA 2.5) followed by multi-coat epoxy/polyurethane systems or Hot-Dip Galvanizing to protect the structure for a long service life.',
    capabilities: [
      'Steel Shot Blasting (SA 2.5 / SA 3)',
      'Airless Spray Application of Epoxies & PU',
      'Intumescent Fireproofing Coatings',
      'Hot-Dip Galvanizing (HDG) Coordination',
      'Dry Film Thickness (DFT) & Adhesion Testing',
    ],
    machinery: [
      { name: 'Shot Blasting', cap: 'Uniform surface profile preparation' },
      { name: 'Paint Bays', cap: 'Airless spray application of coating systems' },
    ],
    standards: 'ISO 12944 / SSPC-SP10 / ASTM A123',
    faqs: [
      {
        q: 'Painting or galvanizing: which should I choose?',
        a: 'Hot-dip galvanizing gives long-lasting corrosion protection for exposed and coastal steel. Multi-coat epoxy and polyurethane systems suit steel that needs a specific colour or finish. We apply the system your specification calls for.',
      },
      {
        q: 'What surface preparation do you apply before painting?',
        a: 'Steel is shot blasted to SA 2.5 or SA 3 before coating, then dry film thickness and adhesion are tested.',
      },
      {
        q: 'Do you apply fire protection coatings?',
        a: 'Yes. We apply intumescent fireproofing coatings on structural steel.',
      },
    ],
    related: ['welding-qc', 'delivery-installation'],
  },
  {
    slug: 'delivery-installation',
    icon: 'truck',
    group: 'site',
    title: 'Steel Erection & Installation',
    seoTitle: 'Steel Structure Erection Company UAE | JAH Steel',
    metaDescription:
      'Steel structure erection across the UAE: phased delivery, crane lifting, bolting and site installation by our own erection teams.',
    h1: 'Steel Structure Erection & Installation in the UAE',
    label: 'Logistics capabilities',
    desc: 'Our experienced installation teams provide safe and efficient steel erection services, ensuring accurate assembly, quality workmanship, and timely project completion from fabrication to final installation.',
    intro:
      'We deliver fabricated steel phase by phase to match your erection sequence, then install it with our own teams. From over-dimensional transport and crane lifting to bolt tensioning and final plumb surveys, the company that fabricated the steel stands behind its installation.',
    spec: 'Safe & efficient erection',
    video: '/assets/contact-hero.mp4',
    poster: '/assets/assetsJazeerat/IMG_9087.webp',
    overviewHeading: 'Delivered in the order you build.',
    overview:
      'Fabrication is only half the job. We ensure that fabricated steel is safely transported and erected on-site. By matching the fabrication schedule with the erection sequences, we load and deliver members phase-by-phase, avoiding site congestion and ensuring structural alignment.',
    capabilities: [
      'Phased Site Delivery & Logistics Planning',
      'Over-dimensional (ODC) Transport',
      'Site Erection & Heavy Crane Lifting',
      'High-Strength Bolt Tightening & Tensioning',
      'Final Plumb Surveys & Handover',
    ],
    machinery: [
      { name: 'Heavy Flatbed Trailers', cap: 'Phased transport to site' },
      { name: 'Calibrated Hydraulic Torque Wrenches', cap: 'Bolt pre-tensioning verification' },
    ],
    standards: 'AISC Erection Tolerances',
    faqs: [
      {
        q: 'Do you install the steel you fabricate?',
        a: 'Yes. Our own installation teams handle site erection, crane lifting, bolting and the final plumb survey before handover.',
      },
      {
        q: 'Can you deliver in phases to match our site programme?',
        a: 'Yes. We match the fabrication schedule to your erection sequence and deliver members phase by phase to avoid site congestion.',
      },
      {
        q: 'Can you move over-dimensional steel members?',
        a: 'Yes. We plan and carry out over-dimensional (ODC) transport on heavy flatbed trailers.',
      },
    ],
    related: ['structural-steel-fabrication', 'welding-qc'],
  },
]

export const SERVICES_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]))
