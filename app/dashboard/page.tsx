'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { auth, predictions } from '@/lib/api'
import { Sparkles, Zap, Star, Crown, Calendar, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  // Zodiac wheel and planetary symbols for Kundali background
  const zodiacSigns = [
    { symbol: '♈', name: 'Aries', angle: 0, color: '#FF6B6B' },
    { symbol: '♉', name: 'Taurus', angle: 30, color: '#4ECDC4' },
    { symbol: '♊', name: 'Gemini', angle: 60, color: '#FFE66D' },
    { symbol: '♋', name: 'Cancer', angle: 90, color: '#95E1D3' },
    { symbol: '♌', name: 'Leo', angle: 120, color: '#FFB84D' },
    { symbol: '♍', name: 'Virgo', angle: 150, color: '#A8E6CF' },
    { symbol: '♎', name: 'Libra', angle: 180, color: '#FF8B94' },
    { symbol: '♏', name: 'Scorpio', angle: 210, color: '#C06C84' },
    { symbol: '♐', name: 'Sagittarius', angle: 240, color: '#6C5CE7' },
    { symbol: '♑', name: 'Capricorn', angle: 270, color: '#A29BFE' },
    { symbol: '♒', name: 'Aquarius', angle: 300, color: '#74B9FF' },
    { symbol: '♓', name: 'Pisces', angle: 330, color: '#81ECEC' }
  ]

  const planets = [
    { symbol: '☉', name: 'Sun', color: '#FFD700' },
    { symbol: '☽', name: 'Moon', color: '#E8E8E8' },
    { symbol: '♂', name: 'Mars', color: '#FF4757' },
    { symbol: '☿', name: 'Mercury', color: '#48DBFB' },
    { symbol: '♃', name: 'Jupiter', color: '#FFA502' },
    { symbol: '♀', name: 'Venus', color: '#FFB8B8' },
    { symbol: '♄', name: 'Saturn', color: '#5F27CD' },
    { symbol: '☊', name: 'Rahu', color: '#341F97' },
    { symbol: '☋', name: 'Ketu', color: '#EE5A6F' }
  ]

  const [user, setUser] = useState<any>(null)
  const [recentPredictions, setRecentPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const [userRes, predictionsRes] = await Promise.all([
        auth.getMe(),
        predictions.getAll()
      ])
      setUser(userRes.user)
      setRecentPredictions(predictionsRes.predictions.slice(0, 3))
    } catch (error) {
      console.error('Dashboard load error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-purple-300">Loading your destiny...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Kundali Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Rotating Zodiac Wheel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] animate-[spin_60s_linear_infinite] scale-[0.4] md:scale-100 transition-transform duration-500">
          {zodiacSigns.map((sign, i) => {
            const radius = 450
            const angle = (i * 30) * (Math.PI / 180)
            const x = radius * Math.cos(angle)
            const y = radius * Math.sin(angle)
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 text-6xl font-bold opacity-70"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  color: sign.color,
                  textShadow: `0 0 30px ${sign.color}, 0 0 60px ${sign.color}`,
                  animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`
                }}
              >
                {sign.symbol}
              </div>
            )
          })}
        </div>

        {/* Diamond Kundali Chart Pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rotate-45 opacity-40 border-4 border-purple-400 animate-[spin_120s_linear_infinite_reverse] scale-[0.4] md:scale-100 transition-transform duration-500">
          <div className="w-full h-full border-2 border-pink-400 grid grid-cols-3 grid-rows-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-purple-300/50" />
            ))}
          </div>
        </div>

        {/* Floating Planetary Symbols */}
        {planets.map((planet, i) => (
          <div
            key={i}
            className="absolute text-3xl md:text-5xl opacity-70 font-bold"
            style={{
              left: `${10 + (i * 11)}%`,
              top: `${20 + (i % 3) * 25}%`,
              color: planet.color,
              textShadow: `0 0 25px ${planet.color}, 0 0 50px ${planet.color}`,
              animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.2}s infinite`
            }}
          >
            {planet.symbol}
          </div>
        ))}

        {/* Mandala Patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 md:w-60 md:h-60 opacity-30">
          <div className="w-full h-full rounded-full border-4 border-purple-400 animate-[spin_30s_linear_infinite]">
            <div className="w-full h-full rounded-full border-4 border-pink-400 scale-75 origin-center animate-[spin_30s_linear_infinite_reverse]" />
          </div>
        </div>
        <div className="absolute bottom-10 left-10 w-32 h-32 md:w-60 md:h-60 opacity-30">
          <div className="w-full h-full rounded-full border-4 border-purple-400 animate-[spin_20s_linear_infinite]">
            <div className="w-full h-full rounded-full border-4 border-pink-400 scale-75 origin-center animate-[spin_20s_linear_infinite_reverse]" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.fullName}
          </h1>
          <p className="text-gray-300">
            Your tech destiny awaits. Explore your cosmic coding journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="mystical-card text-center">
            <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold">Plan</h3>
            <p className="text-purple-300 capitalize">{user?.plan}</p>
          </div>
          <div className="mystical-card text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="font-semibold">Predictions</h3>
            <p className="text-yellow-300">{recentPredictions.length}</p>
          </div>
          <div className="mystical-card text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold">Experience</h3>
            <p className="text-green-300">{user?.experienceLevel}</p>
          </div>
          <div className="mystical-card text-center">
            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold">Goal</h3>
            <p className="text-blue-300">{user?.techGoal}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/predict" className="mystical-card hover:scale-105 transition-transform">
            <Sparkles className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Generate New Kundali</h3>
            <p className="text-gray-300">Reveal your latest tech destiny and career predictions</p>
          </Link>

          <Link href="/history" className="mystical-card hover:scale-105 transition-transform">
            <Calendar className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">View History</h3>
            <p className="text-gray-300">Browse your past predictions and track your journey</p>
          </Link>

          {user?.plan === 'premium' ? (
            <Link href="/resume" className="mystical-card hover:scale-105 transition-transform">
              <Crown className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resume Analysis</h3>
              <p className="text-gray-300">Get deep insights into your resume gaps</p>
            </Link>
          ) : (
            <Link href="/pricing" className="mystical-card hover:scale-105 transition-transform border-yellow-500/50">
              <Crown className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upgrade to Premium</h3>
              <p className="text-gray-300">Unlock advanced features and deeper insights</p>
            </Link>
          )}
        </div>

        {/* Recent Predictions */}
        <div className="mystical-card">
          <h2 className="text-2xl font-bold mb-6">Recent Predictions</h2>
          {recentPredictions.length > 0 ? (
            <div className="space-y-4">
              {recentPredictions.map((prediction: any) => (
                <Link
                  key={prediction.id}
                  href={`/prediction/${prediction.id}`}
                  className="block p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-purple-300">{prediction.tech_zodiac}</h3>
                      <p className="text-gray-300 text-sm">{prediction.summary}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(prediction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-300 mb-4">No predictions yet</p>
              <Link
                href="/predict"
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Generate Your First Kundali
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}