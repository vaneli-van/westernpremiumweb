import type { SolutionId } from '@/content/company'

/**
 * Dedicated landing pages for each supplied capability, at /solutions/{slug}.
 * Each page targets the searches a buyer would type for that capability.
 * Copy stays within facts already published on the site: no invented brands, certifications or figures.
 * Asset governance is covered by /assetone and has no page here.
 */
export type SolutionPage = {
  slug: string
  solutionId: SolutionId
  /** Browser-tab and search result title, before " | Western Premium". Keep under 45 characters. */
  seoTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  image: { src: string; alt: string }
  sections: { heading: string; paragraphs: string[] }[]
  supplyHeading: string
  supplyGroups: { heading: string; items: string[] }[]
  buyersHeading: string
  buyers: string[]
  /** Case study slugs shown as proof on the page. */
  caseStudies: string[]
  faqs: { q: string; a: string }[]
}

const sourcing =
  'Equipment is sourced through established suppliers and manufacturers’ authorised channels in Ghana, the UK, the UAE and the US. If an item is unavailable or we propose an alternative, it is raised for your approval before it is ordered.'

const crossBorder =
  'We deliver across Ghana and have supplied organisations in Sierra Leone, Liberia, South Africa and Iraq. Delivery terms, documentation and timelines are agreed with you for each order.'

const quoteFaq = {
  q: 'What do you need from us to prepare a quotation?',
  a: 'Your specification or item list, the quantities, the delivery location and the date you need the items by. A tender document, bill of quantities or purchase requisition is fine. You can attach it to the quote form or send it to sales@westernpremium.com.gh.',
}

export const solutionPages: SolutionPage[] = [
  {
    slug: 'enterprise-it',
    solutionId: 'enterprise-it',
    seoTitle: 'Enterprise IT Equipment Supplier in Ghana',
    metaDescription:
      'Laptops, desktops, tablets, printers, networking, structured cabling and UPS units supplied to specification for organisations in Ghana and West Africa. Request a quote from Western Premium.',
    eyebrow: 'Enterprise IT infrastructure',
    h1: 'Enterprise IT equipment supplier in Ghana',
    intro:
      'Western Premium supplies the computers, printers, networking and power equipment that organisations need to run their offices, field teams and sites, sourced to your specification and delivered with the documentation your procurement process requires.',
    image: { src: '/images/wwd-network-cabinet.jpg', alt: 'Network cabinet with switches and structured cabling' },
    sections: [
      {
        heading: 'From a single order to a multi-site rollout',
        paragraphs: [
          'Requirements range from a handful of replacement laptops to rollouts of hundreds of devices delivered across several locations. For larger requirements we split supply into scheduled orders, so each delivery is matched to its purchase order and quantities reconcile at every stage.',
          sourcing,
        ],
      },
      {
        heading: 'Supplied to specification, installed where agreed',
        paragraphs: [
          'We work from your stated make, model and configuration, or from a performance specification where you have not fixed a brand. Where installation forms part of the agreed requirement, such as network cabinets, structured cabling or UPS units, it is scheduled alongside delivery.',
          crossBorder,
        ],
      },
    ],
    supplyHeading: 'What we supply',
    supplyGroups: [
      { heading: 'End-user devices', items: ['Laptops and desktops', 'Tablets and mobile phones', 'Monitors, docking stations and peripherals'] },
      { heading: 'Print and document equipment', items: ['Printers and multifunction copiers, including A3', 'Scanners', 'Shredders'] },
      { heading: 'Networking and cabling', items: ['Switches, routers and wireless access points', 'Network cabinets and racks', 'Structured cabling'] },
      { heading: 'Power protection', items: ['UPS units', 'Surge protection', 'Related power equipment'] },
    ],
    buyersHeading: 'Who buys from us',
    buyers: [
      'UN agencies and development programmes',
      'Public institutions',
      'Mining and minerals organisations',
      'Energy, power, oil and gas operators',
      'Banks and commercial businesses',
    ],
    caseStudies: ['wfp-ghana-field-technology', 'mdf-workplace-equipment'],
    faqs: [
      quoteFaq,
      {
        q: 'Can you supply a specific brand and model?',
        a: 'Yes. We source against the make and model in your specification. If that exact item is unavailable in the time you need it, we tell you before ordering and propose an equivalent for your approval.',
      },
      {
        q: 'Do you deliver outside Accra and outside Ghana?',
        a: 'Yes. We deliver to sites across Ghana and have supplied organisations in Sierra Leone, Liberia, South Africa and Iraq. Delivery terms are agreed for each order.',
      },
      {
        q: 'Do you install the equipment?',
        a: 'Installation is included where it is part of the agreed requirement, for example network cabinets, cabling and UPS units. The scope is confirmed in the quotation.',
      },
    ],
  },
  {
    slug: 'technology-operations',
    solutionId: 'technology-operations',
    seoTitle: 'Toner, IT Spares and Software Licences Ghana',
    metaDescription:
      'Toner, ink, printer consumables, replacement parts, accessories and software licences for organisations in Ghana, with recurring supply arrangements and warranty coordination. Request a quote.',
    eyebrow: 'Technology operations support',
    h1: 'Toner, IT spares and software licences for organisations in Ghana',
    intro:
      'Equipment only helps while it stays in service. Western Premium supplies the consumables, replacement parts, accessories and software licences that keep your devices working, and coordinates warranty claims with the manufacturer where they apply.',
    image: { src: '/images/wwd-consumables-store.jpg', alt: 'Store shelves stocked with boxed toner cartridges and IT consumables' },
    sections: [
      {
        heading: 'Recurring supply, planned around your equipment',
        paragraphs: [
          'For toner, ink and labelling supplies, we can agree a recurring supply arrangement based on the printers and devices you run and the quantities you expect to use, so stock arrives before it runs out rather than after.',
          sourcing,
        ],
      },
      {
        heading: 'Parts, licences and warranty coordination',
        paragraphs: [
          'We supply replacement parts and accessories matched to the models you operate, and software licences for the products your teams rely on. Where equipment is still under a manufacturer’s warranty or after-sales arrangement, we coordinate the applicable process with the supplier on your behalf.',
          crossBorder,
        ],
      },
    ],
    supplyHeading: 'What we supply',
    supplyGroups: [
      { heading: 'Consumables', items: ['Original toner and ink cartridges', 'Printer and labelling consumables', 'Drums, fusers and maintenance kits'] },
      { heading: 'Parts and accessories', items: ['Replacement parts', 'Chargers, batteries and cables', 'Cases, keyboards and peripherals'] },
      { heading: 'Software', items: ['Software licences', 'Licence renewals'] },
      { heading: 'After-sales', items: ['Warranty claim coordination', 'Manufacturer after-sales coordination'] },
    ],
    buyersHeading: 'Who buys from us',
    buyers: [
      'UN agencies and development programmes',
      'Public institutions',
      'Mining and minerals organisations',
      'Energy, power, oil and gas operators',
      'Banks and commercial businesses',
    ],
    caseStudies: ['mdf-workplace-equipment', 'wfp-ghana-field-technology'],
    faqs: [
      quoteFaq,
      {
        q: 'Can you set up a recurring toner supply?',
        a: 'Yes. Tell us the printer models you run and your typical usage, and we agree quantities and a delivery schedule with you.',
      },
      {
        q: 'Do you supply original or compatible cartridges?',
        a: 'We supply what your specification calls for. Where you require original manufacturer cartridges, that is what we source.',
      },
      {
        q: 'Can you help with a warranty claim?',
        a: 'Where equipment is covered by a manufacturer’s warranty or after-sales arrangement, we coordinate the claim with the supplier.',
      },
    ],
  },
  {
    slug: 'industrial-mro',
    solutionId: 'industrial-mro',
    seoTitle: 'Industrial Spares and MRO Supplier in Ghana',
    metaDescription:
      'Industrial spares, electrical components and switches, batteries, PPE and specialist equipment sourced to specification for mines, energy sites, warehouses and facilities in Ghana and beyond.',
    eyebrow: 'Industrial and MRO supply',
    h1: 'Industrial spares and MRO supplier in Ghana',
    intro:
      'Maintenance, repair and operations (MRO) supply covers the spares, components and essentials that keep sites, warehouses and facilities running. Western Premium sources them against your specification, including make, model, rating or standard, and delivers them with full documentation.',
    image: { src: '/images/wwd-specialist-pump.jpg', alt: 'Industrial pump and specialist spares ready for dispatch' },
    sections: [
      {
        heading: 'Sourced against your specification',
        paragraphs: [
          'Industrial buyers usually know exactly what they need: a part number, a rating, a standard. We source against that specification and confirm any deviation with you before ordering, so what arrives on site is what your engineers asked for.',
          sourcing,
        ],
      },
      {
        heading: 'Specialist equipment, delivered where it is needed',
        paragraphs: [
          'Beyond routine spares, we source specialist equipment for specific operational needs, from warehouse and electrical equipment for a humanitarian depot to food-processing equipment delivered duty paid and commissioned in Najaf, Iraq. Maintenance and installation are provided only within confirmed capabilities and the scope agreed for each engagement.',
          crossBorder,
        ],
      },
    ],
    supplyHeading: 'What we supply',
    supplyGroups: [
      { heading: 'Electrical', items: ['Electrical components and switches', 'Changeover switches and switchgear', 'Cables and accessories'] },
      { heading: 'Spares and batteries', items: ['Industrial spares', 'Equipment batteries', 'Pumps and specialist parts'] },
      { heading: 'Safety', items: ['Personal protective equipment', 'Site safety essentials'] },
      { heading: 'Facility and specialist', items: ['Warehouse and facility equipment', 'Operational essentials', 'Specialist equipment to client specification'] },
    ],
    buyersHeading: 'Who buys from us',
    buyers: [
      'Mining and minerals operations',
      'Energy, power, oil and gas operators',
      'UN agencies, humanitarian depots and development programmes',
      'Public institutions and facilities',
      'Manufacturing and commercial sites',
    ],
    caseStudies: ['unhrd-warehouse-electrical', 'wfp-iraq-food-processing'],
    faqs: [
      quoteFaq,
      {
        q: 'Can you source a part from a part number or data sheet?',
        a: 'Yes. Send the part number, data sheet or nameplate details and we source against them. If only an equivalent is available, we confirm it with you before ordering.',
      },
      {
        q: 'Do you supply PPE in bulk?',
        a: 'Yes. Personal protective equipment is supplied to the sizes, standards and quantities in your requirement.',
      },
      {
        q: 'Do you deliver to mine sites and outside Ghana?',
        a: 'We deliver to sites across Ghana and have delivered equipment to Sierra Leone, Liberia, South Africa and Iraq. Delivery terms are agreed for each order.',
      },
    ],
  },
]

export function findSolutionPage(slug: string) {
  return solutionPages.find((p) => p.slug === slug)
}

export function solutionPageFor(id: SolutionId) {
  return solutionPages.find((p) => p.solutionId === id)
}
