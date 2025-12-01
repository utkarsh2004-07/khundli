import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tech Kundli – AI Resume Analysis, ATS Score & Career Predictions',
  description: 'Analyze your resume using AI. Get ATS score, job match %, career strengths, weaknesses, salary predictions, and interview questions. Improve your resume instantly.',
  keywords: 'AI resume analysis, ATS score checker, resume scanner, job match score, resume improvement, salary prediction, job domain prediction, interview question practice',
  authors: [{ name: 'Tech Kundli' }],
  creator: 'Tech Kundli',
  publisher: 'Tech Kundli',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techkundli.pro',
    siteName: 'Tech Kundli',
    title: 'AI Resume Analysis & ATS Score – Tech Kundli',
    description: 'Get instant resume analysis, ATS score, job match, salary prediction, and career insights using AI.',
    images: [{
      url: 'https://techkundli.pro/og-home.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli - AI Resume Analysis'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Analysis & ATS Score – Tech Kundli',
    description: 'Get instant resume analysis, ATS score, job match, salary prediction, and career insights using AI.',
    images: ['https://techkundli.pro/og-home.png']
  },
  verification: {
    google: 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://techkundli.pro" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tech Kundli",
              "url": "https://techkundli.pro",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://techkundli.pro/?search={query}",
                "query-input": "required name=query"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}