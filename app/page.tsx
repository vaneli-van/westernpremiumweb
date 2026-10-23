import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  Clients,
  Engage,
  Reach,
  ExploreMore,
  SelectedWork,
  ServicesStrip,
  WhatWeDoSection,
  WhoWeAre,
} from '@/components/home/home-sections'

export const metadata: Metadata = {
  title: { absolute: 'IT and Industrial Equipment Supplier in Ghana | Western Premium' },
  description:
    'Western Premium supplies enterprise IT, industrial spares and MRO equipment to UN agencies, mining, energy and public institutions in Ghana, West Africa and beyond.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <WhoWeAre />
      <WhatWeDoSection />
      <ExploreMore />
      <SelectedWork />
      <Reach />
      <Clients />
      <Engage />
    </>
  )
}
