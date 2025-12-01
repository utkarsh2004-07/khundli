import Link from 'next/link'
import { Sparkles, Zap, Star, Crown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tech Kundali
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8">
              Discover Your Tech Destiny Through AI-Powered Astrology
            </p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Uncover your Tech Zodiac, predict your career path, find your perfect tech stack,
              and reveal your coding destiny with our mystical AI engine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all tech-glow">
              Reveal My Tech Destiny
            </Link>
            <Link href="/demo" className="border border-purple-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-500/10 transition-all">
              See Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Your Tech Kundali Reveals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mystical-card tech-glow">
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Tech Zodiac Sign</h3>
              <p className="text-gray-300">
                Discover if you're a CodeWarrior, DataMystic, or CloudShaman based on your coding personality and birth details.
              </p>
            </div>

            <div className="mystical-card tech-glow">
              <Star className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Career Destiny</h3>
              <p className="text-gray-300">
                See your 1, 3, and 5-year tech career predictions with salary projections and role recommendations.
              </p>
            </div>

            <div className="mystical-card tech-glow">
              <Crown className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Learning Roadmap</h3>
              <p className="text-gray-300">
                Get personalized 30, 90, and 180-day learning paths aligned with your tech destiny.
              </p>
            </div>

            <div className="mystical-card tech-glow">
              <Sparkles className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Company Compatibility</h3>
              <p className="text-gray-300">
                Find which tech companies align with your cosmic coding energy and career goals.
              </p>
            </div>

            <div className="mystical-card tech-glow">
              <Zap className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Skill Horoscope</h3>
              <p className="text-gray-300">
                Daily and monthly predictions for your tech skills and learning opportunities.
              </p>
            </div>

            <div className="mystical-card tech-glow">
              <Star className="h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Premium Tools</h3>
              <p className="text-gray-300">
                Battle Destiny, Resume Analysis, and deep company matching for premium users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Discover Your Tech Destiny?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of developers who've unlocked their coding potential through Tech Astrology
          </p>
          <Link href="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 rounded-xl text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all tech-glow">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  )
}