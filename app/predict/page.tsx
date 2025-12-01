'use client'

import { useState } from 'react'
import { predictions } from '@/lib/api'
import { extractTextFromFile } from '@/lib/documentParser'
import { Sparkles, Upload, Target, Briefcase, TrendingUp, Calendar, Zap, Star, Moon, Sun, ArrowRight, Building2 } from 'lucide-react'

export default function PredictPage() {
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

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    resumeText: '',
    targetCompanies: [] as string[],
    jobDescription: '',
    targetCompanyInput: ''
  })
  const [uploadError, setUploadError] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')
    setLoading(true)

    try {
      const text = await extractTextFromFile(file)
      setFormData(prev => ({ ...prev, resumeText: text }))
    } catch (error: any) {
      setUploadError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCompany = () => {
    if (formData.targetCompanyInput.trim()) {
      setFormData(prev => ({
        ...prev,
        targetCompanies: [...prev.targetCompanies, prev.targetCompanyInput.trim()],
        targetCompanyInput: ''
      }))
    }
  }

  const handleRemoveCompany = (company: string) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.filter(c => c !== company)
    }))
  }

  const handlePredict = async () => {
    if (!formData.resumeText) {
      alert('Please upload a resume or paste resume text first.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        resumeText: formData.resumeText,
        targetCompanies: formData.targetCompanies,
        jobDescription: formData.jobDescription,
        // AI will infer skills and goals from resume
        currentSkills: [],
        learningGoals: []
      }

      const response = await predictions.create(payload)
      setResult(response)
    } catch (error: any) {
      console.error('Prediction failed:', error)
      alert('Prediction failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Your Tech Kundali
            </h1>
            <p className="text-gray-400 text-lg">The stars have aligned for your tech destiny</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. Tech Zodiac Card */}
            <div className="mystical-card lg:col-span-1 border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-black">
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-purple-500/10 mb-4">
                  <Moon className="h-12 w-12 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{result.techZodiac?.sign}</h2>
                <p className="text-purple-300 text-sm mb-4">{result.techZodiac?.element} Element</p>
                <p className="text-gray-300 italic mb-6">"{result.techZodiac?.description}"</p>

                <div className="space-y-3 text-left">
                  <div>
                    <span className="text-green-400 text-sm font-semibold block mb-1">Strengths</span>
                    <div className="flex flex-wrap gap-2">
                      {result.techZodiac?.strengths?.map((s: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded border border-green-500/30">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-red-400 text-sm font-semibold block mb-1">Weaknesses</span>
                    <div className="flex flex-wrap gap-2">
                      {result.techZodiac?.weaknesses?.map((w: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-500/30">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Future Career Path */}
            <div className="mystical-card lg:col-span-2 border-blue-500/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
                <TrendingUp className="h-5 w-5" />
                Future Career Path
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>

                <div className="space-y-8 relative">
                  <div className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                      <span className="text-xs font-bold text-blue-300">1Y</span>
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-blue-900/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                      <h4 className="font-bold text-blue-200 mb-1">Next 1 Year</h4>
                      <p className="text-gray-300">{result.futureCareer?.oneYear}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-purple-500 flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                      <span className="text-xs font-bold text-purple-300">3Y</span>
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-purple-900/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <h4 className="font-bold text-purple-200 mb-1">In 3 Years</h4>
                      <p className="text-gray-300">{result.futureCareer?.threeYear}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-pink-900/50 border border-pink-500 flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                      <span className="text-xs font-bold text-pink-300">5Y</span>
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-pink-900/10 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                      <h4 className="font-bold text-pink-200 mb-1">In 5 Years</h4>
                      <p className="text-gray-300">{result.futureCareer?.fiveYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.5 Company Placement */}
            {result.companyPlacement && (
              <div className="mystical-card lg:col-span-3 border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 to-purple-950/30">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-indigo-300">
                  <Building2 className="h-5 w-5" />
                  Can You Get Into {formData.targetCompanies[0] || 'Target Company'}?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`text-4xl font-bold ${result.companyPlacement.canPlaceInTargetCompany ? 'text-green-400' : 'text-orange-400'}`}>
                          {result.companyPlacement.canPlaceInTargetCompany ? '✓ Yes!' : '⏳ Soon'}
                        </div>
                        <div className="text-2xl font-bold text-purple-400">{result.companyPlacement.fitScore}% Match</div>
                      </div>
                      <p className="text-gray-300">{result.companyPlacement.reasoning}</p>
                    </div>
                    <div className="p-3 rounded bg-blue-900/20 border border-blue-500/20">
                      <span className="text-blue-400 font-medium text-sm">Timeline: </span>
                      <span className="text-white">{result.companyPlacement.timeline}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Gaps to Fill:</h4>
                    <ul className="space-y-2">
                      {result.companyPlacement.gaps?.map((gap: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-red-400 mt-0.5">➤</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Skill Horoscope */}
            <div className="mystical-card lg:col-span-1 border-yellow-500/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-300">
                <Sun className="h-5 w-5" />
                Skill Horoscope
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded bg-yellow-900/10 border border-yellow-500/20">
                  <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider block mb-1">Today</span>
                  <p className="text-sm text-gray-300">{result.skillHoroscope?.today}</p>
                </div>
                <div className="p-3 rounded bg-orange-900/10 border border-orange-500/20">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">This Week</span>
                  <p className="text-sm text-gray-300">{result.skillHoroscope?.thisWeek}</p>
                </div>
                <div className="p-3 rounded bg-red-900/10 border border-red-500/20">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">This Month</span>
                  <p className="text-sm text-gray-300">{result.skillHoroscope?.thisMonth}</p>
                </div>
              </div>
            </div>

            {/* 4. Salary Graph */}
            <div className="mystical-card lg:col-span-2 border-green-500/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-300">
                <TrendingUp className="h-5 w-5" />
                Salary Projection (LPA)
              </h3>
              <div className="h-72 flex items-end justify-around gap-4 px-4 py-4 overflow-x-auto">
                {result.salaryProjection?.graphData ? (
                  (() => {
                    // Find the maximum salary to scale all bars proportionally
                    const maxSalary = Math.max(...result.salaryProjection.graphData.map((d: any) => d.salary));

                    return result.salaryProjection.graphData.map((data: any, i: number) => {
                      // Calculate height in pixels (max 200px, min 40px)
                      const maxHeight = 200;
                      const minHeight = 40;
                      const heightPx = Math.max((data.salary / maxSalary) * maxHeight, minHeight);

                      return (
                        <div key={i} className="flex flex-col items-center gap-2 w-full min-w-[60px] group">
                          <div className="text-green-400 font-bold text-base mb-1">
                            ₹{data.salary}L
                          </div>
                          <div
                            className="w-full max-w-[90px] bg-gradient-to-t from-green-900 via-green-600 to-green-400 rounded-t-lg transition-all duration-500 ease-out group-hover:from-green-800 group-hover:to-green-300 relative overflow-hidden shadow-lg"
                            style={{ height: `${heightPx}px` }}
                          >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                            <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold opacity-70">
                              {data.salary}L
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm font-semibold mt-1">{data.year}</div>
                        </div>
                      )
                    })
                  })()
                ) : (
                  <div className="text-gray-400">Graph data unavailable</div>
                )}
              </div>
              {result.salaryProjection?.reasoning && (
                <div className="mt-6 p-4 bg-green-900/10 rounded-lg border border-green-500/20">
                  <h4 className="text-green-400 font-semibold mb-3 text-sm">💡 Why This Salary?</h4>
                  <div className="space-y-2 text-xs text-gray-300">
                    <p><span className="text-green-400">Skills:</span> {result.salaryProjection.reasoning.basedOnSkills}</p>
                    <p><span className="text-blue-400">Learning:</span> {result.salaryProjection.reasoning.learningSpeed}</p>
                    <p><span className="text-purple-400">Market:</span> {result.salaryProjection.reasoning.marketTrend}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Market Predictions */}
            <div className="mystical-card lg:col-span-3 border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 to-blue-950/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-cyan-300">
                <Building2 className="h-5 w-5" />
                Real-Time Tech Market Predictions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 rotate-[-45deg]" /> Skills Rising
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.marketPredictions?.skillsRising?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-green-900/20 text-green-300 rounded-full text-sm border border-green-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Jobs Trending
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.marketPredictions?.jobsTrending?.map((job: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-900/20 text-blue-300 rounded-full text-sm border border-blue-500/20">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Tech Stack Forecast
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {result.marketPredictions?.techStackForecast || "AI integration and Edge computing are becoming standard requirements."}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setResult(null)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/25"
            >
              Consult the Stars Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Generate Your Tech Kundali
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your resume to reveal your cosmic tech destiny, future salary, and career path.
          </p>
        </div>

        <div className="mystical-card space-y-8 border-purple-500/20">
          {/* 1. Resume Upload */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Upload className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-orange-100">Upload Resume (Required)</h3>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-orange-500/50 transition-colors bg-white/5">
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer block">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <span className="text-gray-300 block mb-1">Click to upload PDF or DOCX</span>
                  <span className="text-gray-500 text-sm">or drag and drop</span>
                </label>
              </div>
              {formData.resumeText && (
                <div className="flex items-center gap-2 text-green-400 bg-green-900/20 p-3 rounded border border-green-500/20">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Resume loaded successfully ({formData.resumeText.length} chars)</span>
                </div>
              )}
              {uploadError && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded border border-red-500/20">
                  {uploadError}
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-500">OR PASTE TEXT</span>
                </div>
              </div>

              <textarea
                placeholder="Paste your resume text here if upload fails..."
                value={formData.resumeText}
                onChange={(e) => setFormData(prev => ({ ...prev, resumeText: e.target.value }))}
                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg h-32 resize-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-gray-300"
              />
            </div>
          </div>

          {/* 2. Target Companies */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-100">Target Companies (Optional)</h3>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Google, Microsoft, Startup..."
                value={formData.targetCompanyInput}
                onChange={(e) => setFormData(prev => ({ ...prev, targetCompanyInput: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCompany()}
                className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-gray-300"
              />
              <button
                onClick={handleAddCompany}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.targetCompanies.map((company, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-900/20 text-blue-300 rounded-full text-sm border border-blue-500/20">
                  {company}
                  <button onClick={() => handleRemoveCompany(company)} className="hover:text-white">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* 3. Job Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-pink-400" />
              <h3 className="text-lg font-semibold text-pink-100">Target Job Description (Optional)</h3>
            </div>
            <textarea
              placeholder="Paste the job description you're targeting to get specific gap analysis..."
              value={formData.jobDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg h-32 resize-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-gray-300"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading || !formData.resumeText}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-lg text-lg font-bold text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 animate-spin" />
                Consulting the Tech Cosmos...
              </span>
            ) : (
              'Generate My Tech Kundali'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}