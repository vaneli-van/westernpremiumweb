/**
 * Centralised, editable company content.
 * Assets that have not yet been supplied are set to `null`; components render a
 * clearly labelled placeholder (or omit the link) until a real value is provided.
 */

export const company = {
  brandName: 'Western Premium',
  legalName: 'Western Premium Company Limited',
  founded: '2015',
  city: 'Accra',
  country: 'Ghana',
  description:
    'Western Premium Company Limited is an indigenous Ghanaian enterprise supply and infrastructure company supplying IT equipment, industrial spares and operational essentials.',
  purpose:
    'To improve the lifecycle of our clients’ assets through the supply and service of quality IT and maintenance, repair and operations equipment and consumables.',
  phone: '+233 55 283 6232',
  phoneHref: 'tel:+233552836232',
  email: 'samuel@westernpremium.com.gh',
  address: {
    street: 'E86 Champagne Street',
    locality: 'East Airport',
    city: 'Accra',
    country: 'Ghana',
    countryCode: 'GH',
  },
  websiteDomain: 'westernpremium.co',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://westernpremium.co',

  /** Registrar-General registration number. Renders as [REG_NUMBER] while null. */
  registrationNumber: null as string | null,
  /** Business hours. Renders as [BUSINESS_HOURS] while null. */
  businessHours: 'Monday to Friday, 08:00 to 17:00 GMT' as string | null,
  /** Machine-readable opening hours for search engines. Keep in step with businessHours. */
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  /** Countries listed as served in search-engine data. */
  areaServed: ['Ghana', 'West Africa'],
  /** WhatsApp number in international format, digits only, used for wa.me links. */
  whatsappNumber: '233552836232',
  whatsappMessage: 'Hello Western Premium, I would like to request a quotation.',
  /**
   * Typical turnaround for a quotation, e.g. 'within 2 business days'. Shown beside calls to action
   * once confirmed; while null it is hidden, except on the contact page where it shows as [RESPONSE_TIME].
   */
  quoteResponseTime: null as string | null,
  /** Inbox that receives quotation form notifications. */
  enquiriesEmail: 'samuel@westernpremium.com.gh',
  /** Sender for form emails. The domain must be verified in Resend before emails will send. */
  formSender: 'Western Premium <enquiries@westernpremium.com.gh>',

  logoSrc: '/brand/western-premium-logo.svg',
  logoReversedSrc: '/brand/western-premium-logo-reversed.svg',
  /** Path to the company profile PDF in /public once supplied, e.g. '/documents/western-premium-company-profile.pdf'. */
  profilePdf: null as string | null,
}

export const whatsappHref = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(company.whatsappMessage)}`

/**
 * Brands named in delivered assignments. Presented as products supplied, not as partnerships.
 * Do not describe any as an authorised partner unless that status is confirmed in writing.
 */
export const suppliedBrands = {
  eyebrow: 'Products supplied',
  title: 'Brands from our delivered orders.',
  note: 'Products we have supplied to clients. Listing a brand does not indicate an authorised partnership.',
  names: ['Samsung', 'HP', 'Apple', 'Canon', 'ABB', 'Jungheinrich'],
}

export const assetOneAfrica = {
  name: 'Asset One Africa',
  relationship: 'sister company',
  /** Official website address, to be supplied. Links are omitted while null. */
  url: null as string | null,
}

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Experience', href: '/experience' },
  { label: 'Asset One Africa', href: '/asset-one-africa' },
] as const

/* ------------------------------------------------------------------ */
/* Solutions                                                          */
/* ------------------------------------------------------------------ */

export type SolutionId = 'enterprise-it' | 'technology-operations' | 'industrial-mro' | 'asset-governance'

export type Solution = {
  id: SolutionId
  title: string
  /** One-line summary used on the homepage cards. */
  summary: string
  /** Explanatory copy on the Solutions page. */
  paragraphs: string[]
  examples: string[]
  enquireLabel: string
  image?: { src: string; alt: string }
  affiliated?: boolean
}

export const solutionsPage = {
  eyebrow: 'What we supply',
  title: 'Solutions',
  intro:
    'Four capabilities, one coordinated process. Each engagement is scoped around your specification, quantities, delivery location and timeline.',
  metaDescription:
    'Enterprise IT infrastructure, technology operations support, industrial and MRO supply, and asset governance and reporting through sister company Asset One Africa.',
  examplesHeading: 'Examples',
  processEyebrow: 'How we deliver',
  processTitle: 'One process across every capability.',
  processIntro:
    'Whichever capability your requirement falls under, the order follows the same four steps from specification to delivery.',
}

export const solutions: Solution[] = [
  {
    id: 'enterprise-it',
    title: 'Enterprise IT infrastructure',
    summary: 'End-user hardware, printers, networking, structured cabling and related power equipment.',
    paragraphs: [
      'We supply the end-user hardware, printers, networking equipment, structured cabling and related power equipment that organisations use to run their workplaces. Requirements range from individual devices to orders delivered across several sites.',
      'Equipment is sourced to your specification from manufacturers’ authorised channels in Ghana, the UK, the UAE and the US. Where an item is unavailable or an alternative is proposed, it is raised for your approval before it is ordered.',
      'Installation is included where it forms part of the agreed requirement, and is scheduled alongside delivery.',
    ],
    examples: [
      'Laptops, desktops and tablets',
      'Printers, copiers and scanners',
      'Networking equipment',
      'Structured cabling',
      'Related power equipment, such as UPS units and surge protection',
      'Supply and installation according to the agreed requirement',
    ],
    enquireLabel: 'Enquire about Enterprise IT Infrastructure',
    image: { src: '/images/network.png', alt: 'Network switches and structured cabling in a server rack' },
  },
  {
    id: 'technology-operations',
    title: 'Technology operations support',
    summary: 'Consumables, replacement parts, software licences and warranty coordination.',
    paragraphs: [
      'Equipment is only useful while it stays in service. We supply the consumables, replacement parts, accessories and software licences that support devices throughout their working life.',
      'For consumables such as toner, ink and labelling supplies, recurring supply arrangements can be agreed with you, based on the equipment in use and the quantities you expect to need.',
      'Where equipment is covered by a manufacturer’s warranty or after-sales arrangement, we coordinate the applicable process with the supplier.',
    ],
    examples: [
      'Toner and ink',
      'Printer and labelling consumables',
      'Replacement parts and accessories',
      'Software licences',
      'Applicable warranty and after-sales coordination',
    ],
    enquireLabel: 'Enquire about Technology Operations Support',
    image: { src: '/images/hero-equipment.png', alt: 'New laptops, tablets and boxed toner cartridges' },
  },
  {
    id: 'industrial-mro',
    title: 'Industrial and MRO supply',
    summary: 'Industrial spares, electrical components, PPE and specialist equipment sourced to specification.',
    paragraphs: [
      'Maintenance, repair and operations (MRO) supply covers the spares, components and essentials that keep sites, warehouses and facilities running. We source industrial spares, electrical components and switches, equipment batteries and personal protective equipment.',
      'Specialist equipment is sourced against the specification you provide, including the make, model, rating or standard where these are stated.',
      'Maintenance and installation are provided only within confirmed capabilities and the scope agreed for each engagement.',
    ],
    examples: [
      'Industrial spares',
      'Electrical components and switches',
      'Equipment batteries',
      'Personal protective equipment',
      'Facility and operational essentials',
      'Specialist equipment sourced against client specifications',
    ],
    enquireLabel: 'Enquire about Industrial and MRO Supply',
    image: { src: '/images/industrial.png', alt: 'Industrial changeover switch and electrical components on a workbench' },
  },
  {
    id: 'asset-governance',
    title: 'Asset governance and reporting',
    summary: 'Asset tracking and reporting through our sister company, Asset One Africa.',
    paragraphs: [
      'Organisations that manage physical assets need a dependable record of what they hold, where each asset is located and who is responsible for it. Asset tracking keeps that record current over time. Asset reporting turns it into information that supports budgeting, audit and replacement planning.',
      'Asset tracking and reporting are provided through our sister company, Asset One Africa. Western Premium supplies the equipment, and Asset One Africa supports the organisation in tracking and reporting on its assets.',
    ],
    examples: [],
    enquireLabel: 'Discuss Your Asset Requirements',
    affiliated: true,
  },
]

export const assetGovernance = {
  eyebrow: 'Through our sister company',
  comparisonHeading: 'How the two companies work together',
  columns: [
    {
      name: 'Western Premium',
      items: [
        'Enterprise IT and industrial equipment supply',
        'Procurement and sourcing coordination',
        'Logistics and delivery coordination',
        'Installation and after-sales support where included',
      ],
    },
    {
      name: 'Asset One Africa',
      items: [
        'Asset tracking solutions',
        'Asset reporting solutions',
        'Scope defined around the organisation’s requirements',
      ],
    },
  ],
  scopeStatement: 'Requirements and delivery scope are discussed for each engagement.',
  secondaryLabel: 'About Asset One Africa',
}

export const solutionOptions = [
  { value: 'enterprise-it', label: 'Enterprise IT Infrastructure' },
  { value: 'technology-operations', label: 'Technology Operations Support' },
  { value: 'industrial-mro', label: 'Industrial and MRO Supply' },
  { value: 'asset-governance', label: 'Asset Governance and Reporting' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const satisfies readonly { value: SolutionId | 'not-sure'; label: string }[]

export const timelineOptions = [
  { value: 'within-2-weeks', label: 'Within 2 weeks' },
  { value: 'within-1-month', label: 'Within 1 month' },
  { value: '1-to-3-months', label: '1 to 3 months' },
  { value: 'flexible', label: 'Flexible' },
] as const

/* ------------------------------------------------------------------ */
/* Contact and quotation form                                         */
/* ------------------------------------------------------------------ */

export const contactPage = {
  title: 'Request a Quote',
  eyebrow: 'Contact',
  intro:
    'Share your specifications, quantities, delivery location and required timeline. Our team will develop a quotation around your scope.',
  metaDescription:
    'Request a quotation from Western Premium. Share your specifications, quantities, delivery location and timeline, or contact our Accra office directly.',
  reachHeading: 'How to reach us',
  labels: {
    phone: 'Telephone',
    whatsapp: 'WhatsApp',
    whatsappAction: 'Message us on WhatsApp',
    email: 'Enquiries email',
    address: 'Registered address',
    hours: 'Business hours',
  },
  mapTitle: 'Map showing the Western Premium office in East Airport, Accra',
  mapLink: 'Open in Google Maps',
  newTab: '(opens in a new tab)',
  includeHeading: 'What to include in your enquiry',
  includeItems: [
    'Specifications or part numbers',
    'Quantities',
    'Delivery location',
    'Required timeline',
    'Any bill of quantities or tender documents',
  ],
}

export const quoteForm = {
  requiredLegend: 'Required',
  labels: {
    fullName: 'Full name',
    organisation: 'Organisation',
    email: 'Work email',
    phone: 'Telephone',
    solution: 'Solution of interest',
    requirement: 'Requirement description',
    quantity: 'Quantity',
    deliveryLocation: 'Delivery location',
    timeline: 'Required timeline',
    attachment: 'Specification or bill of quantities',
  },
  requiredLegendSr: 'Fields marked with an asterisk are required.',
  placeholders: {
    phone: '+233',
    solution: 'Select a solution',
    timeline: 'Select a timeline',
    quantity: 'For example, 50 units',
    deliveryLocation: 'City or site',
  },
  hints: {
    requirement: 'Include item descriptions, specifications, brands or models where relevant.',
    attachment: 'PDF, XLSX or DOCX. One file, 10 MB maximum.',
  },
  requirementMax: 2000,
  consentLead: 'I agree to Western Premium processing the details above to respond to my enquiry, as described in the',
  consentLink: 'Privacy Notice',
  honeypotLabel: 'Leave this field empty',
  freeMailWarning:
    'This looks like a personal email address. A work address helps us confirm your organisation, but you can still send your enquiry.',
  errors: {
    fullName: 'Enter your full name.',
    organisation: 'Enter your organisation.',
    email: 'Enter your work email.',
    emailFormat: 'Enter a valid email address, such as name@company.com.',
    phone: 'Enter a valid telephone number, or leave this blank.',
    solution: 'Select the solution you are interested in.',
    requirement: 'Describe your requirement in a little more detail.',
    requirementMax: 'Keep the description to 2,000 characters or fewer.',
    deliveryLocation: 'Enter the delivery location.',
    timeline: 'Select a timeline from the list.',
    attachmentType: 'Attach a PDF, XLSX or DOCX file.',
    attachmentSize: 'The attachment must be 10 MB or smaller.',
    consent: 'Confirm that we may process your details to respond to your enquiry.',
  },
  submit: 'Send Quotation Request',
  sending: 'Sending...',
  sendingAnnouncement: 'Sending your quotation request.',
  success: {
    heading: 'Thank you.',
    body: 'Thank you. Your enquiry has been received and a member of our team will respond within two working days.',
    referenceLabel: 'Your reference number',
  },
  failure: {
    heading: 'Your enquiry has not been sent.',
    alternatives: 'Please try again, or contact us directly by telephone or email.',
    generic: 'We could not send your enquiry.',
    invalid: 'Some details need correcting. Please review the highlighted fields.',
    rateLimited: 'We have received several enquiries from your connection in the last hour. Please try again later.',
    verification: 'We could not confirm that this enquiry was sent by a person.',
    upload: 'We could not upload your attachment.',
    notConfigured: 'The quotation form is not yet connected to its email service.',
  },
  fallback: {
    heading: 'Send us your requirement',
    body: 'Email your specification, quantities, delivery location and timeline to our sales team, or message us on WhatsApp. Attach any bill of quantities or tender documents to the email.',
    emailAction: 'Email the sales team',
    whatsappAction: 'Message us on WhatsApp',
    phoneLabel: 'Or call',
  },
  attachmentUnavailable:
    'To share a specification or bill of quantities, email it to the sales team and quote the reference number you receive after sending this form.',
  banners: {
    turnstile: 'Form backend not configured: Turnstile key missing',
    resend: 'Form backend not configured: Resend key missing',
    blob: 'Form backend not configured: Blob storage token missing. Attachments are disabled.',
  },
  email: {
    internalSubject: 'Quotation request',
    internalHeading: 'New quotation request',
    attachmentNote: 'Private file in Vercel Blob storage. Sign in to Vercel to open it.',
    notProvided: 'Not provided',
    none: 'None',
    ackSubject: 'We have received your enquiry',
    ackGreeting: 'Dear',
    ackBody:
      'Thank you for contacting Western Premium. Your enquiry has been received and a member of our team will respond within two working days.',
    ackSummaryHeading: 'What you sent us',
    ackContactHeading: 'Contact us',
    ackSignOff: 'Western Premium Company Limited',
  },
}

/* ------------------------------------------------------------------ */
/* Organisations and sectors                                          */
/* ------------------------------------------------------------------ */

export type Organisation = {
  name: string
  /** Shown instead of the name until publication is approved. */
  anonymisedLabel: string
  /** Set to true once permission to publish the name is confirmed. */
  publicationApproved: boolean
  /** Set to true once an approved logo asset has been supplied. */
  logoApproved: boolean
}

export const organisations = {
  wfp: {
    name: 'World Food Programme',
    anonymisedLabel: 'International humanitarian agency',
    publicationApproved: false,
    logoApproved: false,
  },
  unhrd: {
    name: 'UNHRD',
    anonymisedLabel: 'Humanitarian response depot',
    publicationApproved: false,
    logoApproved: false,
  },
  care: {
    name: 'CARE Ghana',
    anonymisedLabel: 'International non-governmental organisation',
    publicationApproved: false,
    logoApproved: false,
  },
  pmiEvolve: {
    name: 'PMI Evolve Ghana',
    anonymisedLabel: 'Public health programme',
    publicationApproved: false,
    logoApproved: false,
  },
  jhpiego: {
    name: 'Jhpiego',
    anonymisedLabel: 'International health organisation',
    publicationApproved: false,
    logoApproved: false,
  },
  mdf: {
    name: 'Minerals Development Fund',
    anonymisedLabel: 'Minerals sector development fund',
    publicationApproved: false,
    logoApproved: false,
  },
  miif: {
    name: 'Minerals Income Investment Fund',
    anonymisedLabel: 'Minerals sector investment fund',
    publicationApproved: false,
    logoApproved: false,
  },
  anglogoldMalaria: {
    name: 'AngloGold Ashanti Malaria Control',
    anonymisedLabel: 'Mining sector health programme',
    publicationApproved: false,
    logoApproved: false,
  },
  modec: {
    name: 'MODEC Production Services Ghana',
    anonymisedLabel: 'Offshore production services company',
    publicationApproved: false,
    logoApproved: false,
  },
  vra: {
    name: 'Volta River Authority',
    anonymisedLabel: 'National power utility',
    publicationApproved: false,
    logoApproved: false,
  },
  daystar: {
    name: 'Daystar Power',
    anonymisedLabel: 'Commercial power provider',
    publicationApproved: false,
    logoApproved: false,
  },
  absa: {
    name: 'Absa Bank Ghana',
    anonymisedLabel: 'Pan-African bank',
    publicationApproved: false,
    logoApproved: false,
  },
  ernestChemists: {
    name: 'Ernest Chemists',
    anonymisedLabel: 'Pharmaceutical company',
    publicationApproved: false,
    logoApproved: false,
  },
  fairgreen: {
    name: 'Fairgreen Limited',
    anonymisedLabel: 'Commercial organisation',
    publicationApproved: false,
    logoApproved: false,
  },
} satisfies Record<string, Organisation>

export type OrganisationId = keyof typeof organisations

/** The name to display publicly, respecting the publication flag. */
export function organisationLabel(id: OrganisationId) {
  const org: Organisation = organisations[id]
  return org.publicationApproved ? org.name : org.anonymisedLabel
}

export const sectorsPage = {
  eyebrow: 'Who we supply',
  title: 'Sectors',
  intro:
    'Western Premium supplies organisations whose operations depend on equipment arriving to specification, on time and with the documentation their procurement processes require.',
  metaDescription:
    'Typical requirements and procurement characteristics across UN, development and public institutions, mining and minerals, energy, power, oil and gas, and banking and commercial organisations.',
  itemsHeading: 'Typically supplied',
  organisationsHeading: 'Organisations supplied',
  disclaimer:
    'Organisation names are listed to describe our supply experience. Their inclusion does not imply endorsement, an exclusive relationship or a current contract. Some organisations are described by sector until permission to publish their names has been confirmed.',
  experienceLabel: 'View selected experience',
}

export const sectors: {
  id: string
  title: string
  /** Short group name used on the Experience page. */
  groupTitle: string
  /** One-line summary used on the homepage. */
  description: string
  /** Typical requirements and procurement characteristics, shown on the Sectors page. */
  paragraphs: string[]
  typicalItems: string[]
  organisationIds: OrganisationId[]
}[] = [
  {
    id: 'development',
    title: 'UN, development and public institutions',
    groupTitle: 'UN and development',
    description:
      'Field technology, workplace equipment and specialist procurement for programmes and institutions with structured procurement processes.',
    paragraphs: [
      'Programmes and institutions in this sector buy equipment for field operations, registration exercises, warehousing and programme offices. A single requirement can combine specialist items with routine consumables, and delivery is often to field locations outside Accra.',
      'Procurement usually runs through formal tenders or long-term agreements. Specifications are applied strictly, and quotations, delivery notes and invoices are expected to match the order exactly.',
    ],
    typicalItems: [
      'Field technology, such as tablets and accessories',
      'ID and registration equipment',
      'Warehouse and logistics equipment',
      'Laboratory and medical-adjacent equipment',
      'Consumables',
    ],
    organisationIds: ['wfp', 'unhrd', 'care', 'pmiEvolve', 'jhpiego'],
  },
  {
    id: 'mining',
    title: 'Mining and minerals',
    groupTitle: 'Mining and minerals',
    description: 'Workplace technology, consumables and operational supplies for funds and organisations in the minerals sector.',
    paragraphs: [
      'Mining and minerals organisations need workplace technology for their offices alongside industrial spares, equipment batteries, electrical components and protective equipment for operational sites.',
      'Suppliers are normally required to complete vendor registration before an order is placed. Deliveries to site follow the organisation’s health, safety and environment (HSE) requirements, including its access and handling procedures.',
    ],
    typicalItems: [
      'Workplace IT',
      'Industrial spares',
      'Personal protective equipment',
      'Equipment batteries',
      'Electrical components',
    ],
    organisationIds: ['mdf', 'miif', 'anglogoldMalaria'],
  },
  {
    id: 'energy',
    title: 'Energy, power, oil and gas',
    groupTitle: 'Energy, power, oil and gas',
    description: 'Specialist equipment, printing and labelling, electrical components and supplies for energy and power operators.',
    paragraphs: [
      'Energy, power, oil and gas operators require specialist printing and labelling equipment and electrical switchgear components, as well as the workplace technology and consumables used across their facilities.',
      'Deliveries may be to offshore or remote sites, so logistics are planned around access and handover arrangements. Orders are commonly accompanied by the compliance documentation the operator specifies.',
    ],
    typicalItems: [
      'Specialist printing and labelling equipment',
      'Electrical switchgear components',
      'Workplace technology',
      'Consumables',
    ],
    organisationIds: ['modec', 'vra', 'daystar'],
  },
  {
    id: 'commercial',
    title: 'Banking and commercial organisations',
    groupTitle: 'Banking and commercial',
    description: 'End-user hardware, printing and recurring consumables for banks and commercial businesses.',
    paragraphs: [
      'Banks and commercial organisations need end-user hardware, printers and copiers, networking equipment and a steady supply of consumables across their offices and branches.',
      'Orders are often delivered to several branches at once, and equipment may need asset tags applied before it is deployed. Consumables are commonly supplied on a recurring basis.',
    ],
    typicalItems: ['End-user hardware', 'Printers and copiers', 'Consumables', 'Networking equipment'],
    organisationIds: ['absa', 'ernestChemists', 'fairgreen'],
  },
]

/* ------------------------------------------------------------------ */
/* Experience                                                         */
/* ------------------------------------------------------------------ */

export const experiencePage = {
  eyebrow: 'Experience',
  title: 'Selected Experience',
  intro:
    'Selected organisations and assignments supplied by Western Premium. Listings describe the requirement and the agreed scope. They do not indicate endorsement, exclusive relationships or current contracts.',
  metaDescription:
    'Selected organisations and assignments supplied by Western Premium across UN and development, mining and minerals, energy and power, and banking and commercial sectors.',
  organisationsHeading: 'Organisations supplied',
  organisationsNote:
    'Some organisations are described by sector until permission to publish their names has been confirmed.',
  assignmentsHeading: 'Selected assignments',
  footnote: 'Further references are available on request as part of a formal tender or prequalification process.',
}

export type AssignmentStatus = 'Delivered' | 'Contract awarded'

export type Assignment = {
  id: string
  /** Organisation whose publication flag governs the client name. Null for grouped entries. */
  organisationId: OrganisationId | null
  /** Client name as published once approved, e.g. a country office. */
  clientName: string
  /** Optional override for the anonymised label, e.g. to keep a country office distinct. */
  anonymisedClient?: string
  title: string
  year?: string
  sector: string
  status: AssignmentStatus
  description: string[]
  /** Grouped entries: one sentence per organisation, rendered as "{detail} for {organisation}." */
  parts?: { organisationId: OrganisationId; detail: string }[]
}

export const assignments: Assignment[] = [
  {
    id: 'wfp-ghana-tablets',
    organisationId: 'wfp',
    clientName: 'World Food Programme Ghana',
    anonymisedClient: 'International humanitarian agency, Ghana',
    title: 'Field technology',
    year: '2024',
    sector: 'UN and development',
    status: 'Delivered',
    description: [
      'Supply of 1,200 Samsung Galaxy Tab A9 tablets, with adapters, covers and screen protectors.',
      'The requirement was supplied across multiple orders.',
    ],
  },
  {
    id: 'mdf-workplace',
    organisationId: 'mdf',
    clientName: 'Minerals Development Fund',
    title: 'Workplace equipment',
    year: '2025',
    sector: 'Mining and minerals',
    status: 'Delivered',
    description: [
      'A single order for workplace equipment.',
      'The scope covered 20 HP Envy laptops, iPhones, Canon A3 copiers, shredders and toners.',
    ],
  },
  {
    id: 'unhrd-warehouse',
    organisationId: 'unhrd',
    clientName: 'UNHRD',
    title: 'Warehouse and electrical equipment',
    year: '2024',
    sector: 'UN and development',
    status: 'Delivered',
    description: [
      'Supply assignments covering warehouse and electrical equipment.',
      'The scope included a Jungheinrich electric forklift battery and ABB 400A changeover switches.',
    ],
  },
  {
    id: 'wfp-iraq-food-processing',
    organisationId: 'wfp',
    clientName: 'WFP Iraq',
    anonymisedClient: 'International humanitarian agency, Iraq',
    title: 'Specialist food-processing equipment',
    year: '2026',
    sector: 'UN and development',
    status: 'Contract awarded',
    description: [
      'Contract awarded in August 2026 for grading, dry-cleaning and vacuum machines for Najaf.',
      'The awarded scope includes delivery duty paid, freight, customs, assembly and commissioning.',
    ],
  },
  {
    id: 'specialist-procurement',
    organisationId: null,
    clientName: 'Various',
    title: 'Specialist procurement',
    sector: 'Various sectors',
    status: 'Delivered',
    description: ['Specialist items sourced against client specifications.'],
    parts: [
      { organisationId: 'jhpiego', detail: 'Sequencing equipment and autoclaves' },
      { organisationId: 'wfp', detail: 'ID-card printers and consumables' },
      { organisationId: 'modec', detail: 'Specialist printing and labelling equipment' },
    ],
  },
]

/** Client label for an assignment, respecting the organisation's publication flag. */
export function assignmentClient(a: Assignment) {
  if (!a.organisationId) return a.clientName
  const org: Organisation = organisations[a.organisationId]
  if (org.publicationApproved) return a.clientName
  return a.anonymisedClient ?? org.anonymisedLabel
}

/** Full description sentences, including grouped parts with flag-respecting names. */
export function assignmentDescription(a: Assignment) {
  const parts = (a.parts ?? []).map((p) => {
    const org: Organisation = organisations[p.organisationId]
    const anonymised = org.anonymisedLabel.toLowerCase()
    const label = org.publicationApproved ? org.name : `${/^[aeiou]/.test(anonymised) ? 'an' : 'a'} ${anonymised}`
    return `${p.detail} for ${label}.`
  })
  return [...a.description, ...parts]
}

/* ------------------------------------------------------------------ */
/* Process, principles and people                                     */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    title: 'Define the requirement',
    short: 'We review what you need and where it needs to go.',
    detail: 'Review specifications, quantities, delivery location, timeline and installation needs.',
  },
  {
    title: 'Source and quote',
    short: 'We obtain pricing and prepare a clear quotation.',
    detail: 'Obtain supplier pricing and prepare a quotation covering the agreed equipment and delivery scope.',
  },
  {
    title: 'Procure and coordinate',
    short: 'We manage purchasing, logistics and customs.',
    detail:
      'Following purchase-order confirmation, coordinate purchasing, logistics and customs where required.',
  },
  {
    title: 'Deliver and support',
    short: 'We deliver, install where included and follow up.',
    detail: 'Arrange delivery, installation where included, invoicing and applicable after-sales coordination.',
  },
]

export const sourcingNetwork = ['Ghana', 'United Kingdom', 'United Arab Emirates', 'United States']

export const principles = [
  {
    title: 'Understand the requirement',
    body: 'We start with your specification, quantities, location and timeline, and ask questions early rather than assume.',
  },
  {
    title: 'Communicate clearly',
    body: 'Quotations, lead times and scope are stated plainly, and we keep you informed as an order progresses.',
  },
  {
    title: 'Source to specification',
    body: 'We procure the items you specified, and raise any alternative for your approval before it is ordered.',
  },
  {
    title: 'Coordinate delivery carefully',
    body: 'Purchasing, freight, customs and delivery are managed as one sequence, aligned to your site and schedule.',
  },
  {
    title: 'Support the agreed scope',
    body: 'Installation and after-sales coordination are provided where they form part of the agreed scope.',
  },
]

export type Leader = {
  name: string
  role: string
  /** Approved biography. Not rendered while null. */
  bio: string | null
  /** Path to an approved portrait in /public. */
  portrait: string | null
}

/** Set to true to show a labelled portrait slot for leaders without an approved photograph. */
export const showPortraitPlaceholders = false

export const leadership: Leader[] = [
  { name: 'Samuel Van-Segbefia', role: 'Managing Director', bio: null, portrait: null },
  { name: 'Munnira Sheikh', role: 'Head of Operations', bio: null, portrait: null },
  { name: 'Richard Agbagli-Addison', role: 'Sales and Business Development Manager', bio: null, portrait: null },
  { name: 'Desmond Asime', role: 'Finance Manager', bio: null, portrait: null },
]

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const aboutPage = {
  title: 'About Western Premium',
  statement: 'An indigenous Ghanaian company, built around institutional procurement.',
  metaDescription:
    'Western Premium Company Limited is an indigenous Ghanaian company in Accra supplying IT equipment, industrial spares and operational essentials to institutional and commercial buyers.',
  story: [
    `Western Premium Company Limited was founded in ${company.city} in ${company.founded}. It is an indigenous Ghanaian company that supplies IT equipment, industrial spares and operational essentials to organisations in Ghana and, where a contract requires it, beyond.`,
    'From the start, the company has supplied institutional buyers: development programmes, public bodies, energy and mining organisations, banks and commercial businesses. Their procurement processes call for accuracy against specification, complete documentation and delivery as agreed, and the company’s working methods have been shaped around those requirements.',
    'Over time, the work has extended from recurring consumables to substantial equipment orders, specialist procurement and cross-border contracts. Items are sourced through a network of established suppliers in Ghana, the United Kingdom, the United Arab Emirates and the United States, coordinated from the office in Accra. Western Premium does not operate offices outside Ghana.',
    `The company’s purpose is ${company.purpose.charAt(0).toLowerCase()}${company.purpose.slice(1)}`,
  ],
  principlesEyebrow: 'Operating principles',
  principlesTitle: 'How we work with every client.',
  leadershipEyebrow: 'Leadership',
  leadershipTitle: 'The team responsible for your requirement.',
  detailsEyebrow: 'Company details',
  detailsTitle: 'For supplier registration and due diligence.',
}

/* ------------------------------------------------------------------ */
/* Asset One Africa                                                   */
/* ------------------------------------------------------------------ */

export const assetOneAfricaPage = {
  eyebrow: 'Sister company',
  title: 'Asset One Africa',
  heading: 'Complementary expertise across the asset lifecycle.',
  intro:
    'Western Premium and its sister company, Asset One Africa, offer complementary capabilities for organisations managing physical assets. Western Premium focuses on equipment supply, procurement coordination and related support. Asset One Africa provides asset tracking and reporting solutions, with scope agreed around client requirements.',
  metaDescription:
    'Western Premium and its sister company, Asset One Africa, offer complementary capabilities: equipment supply and procurement coordination alongside asset tracking and reporting.',
  supportingMessage:
    'Discuss your equipment requirements and asset-information needs with our team so we can identify the appropriate scope of support.',
  actionLabel: 'Discuss Your Asset Requirements',
  externalLabel: 'Visit Asset One Africa',
}

/* ------------------------------------------------------------------ */
/* Privacy                                                            */
/* ------------------------------------------------------------------ */

export const privacyNotice = {
  title: 'Privacy Notice',
  lastUpdated: '20 October 2026',
  /** Retention period for enquiry records, e.g. 'two years'. Renders as [RETENTION_PERIOD] while null. */
  retentionPeriod: null as string | null,
  /** Data Protection Commission registration number. Renders as [DPC_REGISTRATION] while null. */
  dpcRegistration: null as string | null,
  collected: [
    'Your name',
    'Your organisation',
    'Your work email address',
    'Your telephone number, if you provide it',
    'The details of your requirement',
    'Any attachments you upload, such as a specification or bill of quantities',
  ],
  processors: [
    'An email delivery provider, which sends your enquiry to our team.',
    'A file storage provider, which holds any attachments you upload.',
    'A security service, which checks that enquiries are sent by a person rather than an automated program.',
  ],
  rights: [
    'Access the personal data we hold about you',
    'Ask us to correct personal data that is inaccurate or incomplete',
    'Ask us to delete your personal data',
  ],
}
