import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  AffiliationFeature,
  BrandsRow,
  FactsBand,
  HomeCta,
  SectorIndex,
  SelectedWork,
  ServicesStrip,
  Statement,
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
      <Statement />
      <FactsBand />
      <SectorIndex />
      <AffiliationFeature />
      <SelectedWork />
      <BrandsRow />
      <HomeCta />
    </>
  )
}
