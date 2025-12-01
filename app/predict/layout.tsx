import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Career Prediction – Strengths, Roadmap & Company Fit | Tech Kundli',
  description: 'Discover your strengths, improvement areas, career destiny, learning roadmap, and company compatibility using AI-powered predictions.',
  keywords: 'career prediction, career roadmap, strengths and weaknesses, job compatibility, company match, AI job prediction, career prediction tool, learning roadmap generator, company compatibility checker',
  openGraph: {
    title: 'AI Career Prediction & Roadmap – Tech Kundli',
    description: 'Get personalized strengths, improvement areas, career destiny, and job compatibility using AI.',
    url: 'https://techkundli.pro/predict',
    images: [{
      url: 'https://techkundli.pro/og-predict.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli Career Prediction'
    }]
  }
}

export default function PredictLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="canonical" href="https://techkundli.pro/predict" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": "AI Career Prediction",
            "description": "Get AI-based career predictions: strengths, improvement areas, learning roadmap, and company compatibility.",
            "provider": {
              "@type": "Organization",
              "name": "Tech Kundli",
              "url": "https://techkundli.pro"
            }
          })
        }}
      />
      {children}
    </>
  )
}