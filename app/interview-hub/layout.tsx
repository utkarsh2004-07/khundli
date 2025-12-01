import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interview Questions Hub – Company Interview Prep | Tech Kundli',
  description: 'Practice real interview questions asked by top companies. Prepare for technical and HR rounds using AI-curated questions.',
  keywords: 'interview questions, company interview questions, job interview preparation, technical interview, HR interview, interview questions practice, company interview questions list, ai interview preparation tool',
  openGraph: {
    title: 'Interview Hub – Practice Real Company Questions',
    description: 'Access AI-collected interview questions from companies and practice for your next job.',
    url: 'https://techkundli.pro/interview-hub',
    images: [{
      url: 'https://techkundli.pro/og-interview.png',
      width: 1200,
      height: 630,
      alt: 'Tech Kundli Interview Hub'
    }]
  }
}

export default function InterviewHubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="canonical" href="https://techkundli.pro/interview-hub" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Interview Questions Hub",
            "description": "Practice real company interview questions for technical and HR rounds.",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Company Interview Questions"
              }
            ]
          })
        }}
      />
      {children}
    </>
  )
}