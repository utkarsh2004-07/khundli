import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Dashboard – Resume History & Career Insights | Tech Kundli',
  description: 'View your recent resume analysis, ATS scores, predictions used, job match history, and improvement progress.',
  openGraph: {
    title: 'Resume Dashboard – Tech Kundli',
    description: 'Track all your resume analysis, job match results, ATS scores and predictions in one dashboard.',
    url: 'https://techkundli.pro/dashboard',
    images: [{
      url: 'https://techkundli.pro/og-dashboard.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli Dashboard'
    }]
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="canonical" href="https://techkundli.pro/dashboard" />
      {children}
    </>
  )
}