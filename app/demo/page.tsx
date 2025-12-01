import Link from 'next/link'
import { Sparkles, Star, TrendingUp, Calendar, Building, Heart, Zap, Crown } from 'lucide-react'

export default function DemoPage() {
  const demoData = {
    techZodiac: {
      sign: "CodeWarrior",
      element: "Fire",
      description: "Born to debug and conquer the digital realm. Your cosmic coding energy burns bright with passion for problem-solving and innovation.",
      strengths: ["Rapid problem solving", "Leadership in tech teams", "Innovation mindset"],
      weaknesses: ["Impatience with legacy systems", "May rush through documentation"]
    },
    futureCareer: {
      oneYear: "Senior Full-Stack Developer at a growing startup",
      threeYear: "Tech Lead at a mid-size company, leading a team of 5-8 developers",
      fiveYear: "CTO of a successful startup or Principal Engineer at a major tech company"
    },
    learningRoadmap: {
      thirtyDays: ["Master React 18 features", "Learn TypeScript advanced patterns", "Build a full-stack project"],
      ninetyDays: ["System design fundamentals", "Microservices architecture", "Cloud deployment (AWS/GCP)"],
      oneEightyDays: ["Advanced algorithms", "Team leadership skills", "Open source contributions"]
    },
    companyCompatibility: [
      {
        company: "Google",
        compatibility: 92,
        reasoning: "Your problem-solving skills and innovation mindset align perfectly with Google's culture of technical excellence"
      },
      {
        company: "Netflix",
        compatibility: 87,
        reasoning: "Your rapid development style matches Netflix's fast-paced, high-performance environment"
      },
      {
        company: "Stripe",
        compatibility: 84,
        reasoning: "Your attention to code quality and scalability fits Stripe's engineering standards"
      }
    ],
    salaryProjection: {
      current: "8 LPA",
      oneYear: "15 LPA",
      threeYear: "28 LPA",
      fiveYear: "45 LPA"
    },
    techFateNumber: {
      number: 7,
      meaning: "The Innovator",
      description: "Destined to create breakthrough solutions that change how people interact with technology"
    },
    loveCompatibility: {
      bestMatch: "DataScientist",
      compatibility: 94,
      description: "Perfect balance of logic and creativity. You complement each other's analytical and innovative sides."
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Tech Kundali Demo</h1>
          <p className="text-xl text-gray-300 mb-6">
            See what your Tech Destiny could reveal
          </p>
          <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-8">
            <p className="text-yellow-200">
              🌟 This is a sample prediction. Sign up to get your personalized Tech Kundali!
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Tech Zodiac */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold">Tech Zodiac Sign</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">
                  {demoData.techZodiac.sign}
                </h3>
                <p className="text-gray-300 mb-4">{demoData.techZodiac.description}</p>
                <div className="text-sm">
                  <span className="text-purple-400">Element:</span> {demoData.techZodiac.element}
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {demoData.techZodiac.strengths.map((strength, i) => (
                      <li key={i}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-2">Areas to Improve</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {demoData.techZodiac.weaknesses.map((weakness, i) => (
                      <li key={i}>• {weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Future Career */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Career Destiny</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-blue-300 mb-2">1 Year</h3>
                <p className="text-gray-300">{demoData.futureCareer.oneYear}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-blue-300 mb-2">3 Years</h3>
                <p className="text-gray-300">{demoData.futureCareer.threeYear}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-blue-300 mb-2">5 Years</h3>
                <p className="text-gray-300">{demoData.futureCareer.fiveYear}</p>
              </div>
            </div>
          </div>

          {/* Learning Roadmap */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold">Learning Roadmap</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-green-300 mb-3">30 Days</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {demoData.learningRoadmap.thirtyDays.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-300 mb-3">90 Days</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {demoData.learningRoadmap.ninetyDays.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-300 mb-3">180 Days</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {demoData.learningRoadmap.oneEightyDays.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Company Compatibility */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold">Company Compatibility</h2>
            </div>
            <div className="space-y-4">
              {demoData.companyCompatibility.map((company, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{company.company}</h3>
                    <p className="text-sm text-gray-300">{company.reasoning}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{company.compatibility}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Projection */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-2xl font-bold">Salary Projection</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-400 mb-2">Current</h3>
                <p className="text-xl font-bold text-green-300">{demoData.salaryProjection.current}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-400 mb-2">1 Year</h3>
                <p className="text-xl font-bold text-green-300">{demoData.salaryProjection.oneYear}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-400 mb-2">3 Years</h3>
                <p className="text-xl font-bold text-green-300">{demoData.salaryProjection.threeYear}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-400 mb-2">5 Years</h3>
                <p className="text-xl font-bold text-green-300">{demoData.salaryProjection.fiveYear}</p>
              </div>
            </div>
          </div>

          {/* Tech Fate Number */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold">Tech Fate Number</h2>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-yellow-400 mb-2">{demoData.techFateNumber.number}</div>
              <h3 className="text-xl font-semibold mb-2">{demoData.techFateNumber.meaning}</h3>
              <p className="text-gray-300">{demoData.techFateNumber.description}</p>
            </div>
          </div>

          {/* Love Compatibility */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-pink-400 mr-3" />
              <h2 className="text-2xl font-bold">Love Compatibility</h2>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-300 mb-2">
                Best Match: {demoData.loveCompatibility.bestMatch}
              </h3>
              <div className="text-3xl font-bold text-pink-400 mb-2">
                {demoData.loveCompatibility.compatibility}%
              </div>
              <p className="text-gray-300">{demoData.loveCompatibility.description}</p>
            </div>
          </div>

          {/* Premium Features Preview */}
          <div className="mystical-card border-yellow-500/50">
            <div className="text-center py-8">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">🔮 Full Tech Kundali Chart</h4>
                  <p className="text-sm text-gray-300">Complete cosmic analysis with detailed charts</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">📄 Resume Gap Analysis</h4>
                  <p className="text-sm text-gray-300">AI-powered resume optimization</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">⚔️ Battle Destiny</h4>
                  <p className="text-sm text-gray-300">Compare your tech destiny with friends</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">🏢 Deep Company Analysis</h4>
                  <p className="text-sm text-gray-300">Detailed compatibility with all companies</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all"
              >
                Unlock Premium Features
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Real Tech Destiny?</h2>
            <p className="text-xl text-gray-300 mb-8">
              This is just a sample. Your personalized Tech Kundali will be unique to you!
            </p>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 rounded-xl text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all tech-glow"
            >
              Create My Real Tech Kundali
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}