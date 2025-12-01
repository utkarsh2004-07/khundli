import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing – AI Resume Analysis & Career Tools | Tech Kundli',
  description: 'Choose the best plan for resume analysis, ATS score checking, interview preparation, and complete AI-powered career tools.',
  openGraph: {
    title: 'Pricing – Tech Kundli Career Tools',
    description: 'Affordable pricing for AI-powered resume analysis, career predictions, and interview preparation tools.',
    url: 'https://techkundli.pro/pricing',
    images: [{
      url: 'https://techkundli.pro/og-pricing.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli Pricing'
    }]
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="canonical" href="https://techkundli.pro/pricing" />
      {children}
    </>
  )
}