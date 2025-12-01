import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resume Analysis & ATS Score Checker | Tech Kundli',
  description: 'Upload your resume to get ATS score, job match %, keyword analysis, missing skills, optimized resume version, and detailed ATS breakdown.',
  keywords: 'ATS score, resume analysis, resume checker, AI resume review, job match, keyword analysis, ai resume analysis, resume checker online, ats score checker, ats resume scan, resume analysis tool, job match resume tool, resume keyword analysis, resume improvement suggestions, ai resume scanner, resume optimization tool',
  openGraph: {
    title: 'AI Resume Scanner & ATS Score – Tech Kundli',
    description: 'Analyze your resume for ATS compatibility, job match, missing keywords, and skill gaps.',
    url: 'https://techkundli.pro/resume',
    images: [{
      url: 'https://techkundli.pro/og-resume.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli Resume Analysis'
    }]
  }
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="canonical" href="https://techkundli.pro/resume" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tech Kundli Resume Analyzer",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "AI-powered resume analysis tool providing ATS score, job match percentage, keyword insights, missing skills and optimized resume suggestions.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "url": "https://techkundli.pro/resume"
          })
        }}
      />
      {children}
    </>
  )
}