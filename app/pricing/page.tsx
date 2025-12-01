'use client'

import Link from 'next/link'
import { Check, Crown, Sparkles, Zap, Gift } from 'lucide-react'

export default function PricingPage() {
  // const freeFeatures = [
  //   'Tech Zodiac Sign',
  //   'Tech Fate Number',
  //   'Tech Elements',
  //   'Daily Skill Horoscope',
  //   'Basic Career Summary',
  //   '30-day Learning Roadmap',
  //   'Salary Projection (1 year)',
  //   'Market Predictions',
  //   'Love Compatibility',
  //   'Basic Company Matching'
  // ]

  // const premiumFeatures = [
  //   'Everything in Free',
  //   'Full Tech Kundali Chart',
  //   '3-year + 5-year Career Predictions',
  //   '90 + 180-day Roadmaps',
  //   'Resume Gap Analysis',
  //   'Full Company Compatibility',
  //   'Skill Chakra Alignment',
  //   'Tech Mahadasha & Sade Saati',
  //   'Battle Destiny (Compare users)',
  //   'Monthly Horoscope',
  //   'Premium Tools & Analytics',
  //   'Priority Support'
  // ]

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <Gift className="h-20 w-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Affordable Pricing for Career & Resume Tools
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400">
            🎉 Everything is FREE! 🎉
          </h2>
          <p className="text-2xl text-gray-300 mb-8">
            All premium features are completely free for a limited time!
          </p>
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-green-400 mb-4">🚀 Launch Special Offer</h2>
            <p className="text-xl text-gray-200 mb-6">
              We're celebrating our launch by giving everyone access to ALL features absolutely FREE!
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">✨ Full Tech Kundali</div>
                <div className="text-gray-300">Complete analysis & predictions</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">📊 Resume Analysis</div>
                <div className="text-gray-300">AI-powered optimization</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">🎯 Interview Prep</div>
                <div className="text-gray-300">Complete preparation guide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-12">
          <h3 className="text-4xl font-bold mb-6 text-white">
            Start Your Tech Journey Today!
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            No credit card required. No hidden fees. Just pure tech astrology magic! ✨
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-12 py-4 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-500/20"
          >
            🎯 Get Started FREE Now!
          </Link>
        </div>

        {/* Limited Time Notice */}
        <div className="mt-12 bg-gradient-to-r from-red-600/20 to-pink-600/20 border-2 border-red-500/50 rounded-xl p-6">
          <p className="text-lg text-red-300">
            ⏰ <strong>Limited Time Offer:</strong> Enjoy all premium features for free during our launch period. 
            Sign up now to secure your access!
          </p>
        </div>
      </div>

      {/* Commented out original pricing content */}
      {/* 
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="mystical-card border-purple-500/50">
            <div className="text-center mb-6">
              <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Free Destiny</h2>
              <div className="text-3xl font-bold mb-2">₹0</div>
              <p className="text-gray-300">Forever free</p>
            </div>
            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="w-full block text-center bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      */}
    </div>
  )
}