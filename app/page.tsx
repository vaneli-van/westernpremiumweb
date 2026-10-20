import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import {
  AffiliationPanel,
  DeliveryProcess,
  Introduction,
  SectorExperience,
  SelectedAssignments,
  SolutionsOverview,
  SuppliedBrands,
} from '@/components/home/home-sections'
import { ClosingCta } from '@/components/site/page-primitives'

export const metadata: Metadata = {
  title: { absolute: 'Western Premium | Reliable equipment. Lasting value.' },
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <SolutionsOverview />
      <SectorExperience />
      <SelectedAssignments />
      <SuppliedBrands />
      <AffiliationPanel />
      <DeliveryProcess />
      <ClosingCta />
    </>
  )
}
