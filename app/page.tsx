import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  Engage,
  ExploreMore,
  SelectedWork,
  ServicesStrip,
  WhatWeDoSection,
  WhoWeAre,
} from '@/components/home/home-sections'

export const metadata: Metadata = {
  title: { absolute: 'Western Premium | Reliable equipment. Lasting value.' },
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
      <Engage />
    </>
  )
}
