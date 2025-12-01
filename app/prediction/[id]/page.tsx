'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { predictions } from '@/lib/api'
import {
  Sparkles, Star, TrendingUp, Calendar, Heart,
  Building, Zap, Crown, Lock, ArrowLeft
} from 'lucide-react'

export default function PredictionDetailPage() {
  const params = useParams()
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      loadPrediction(params.id as string)
    }
  }, [params.id])

  const loadPrediction = async (id: string) => {
    try {
      const result = await predictions.getById(id)
      setPrediction(result)
    } catch (err: any) {
      setError(err.message || 'Failed to load prediction')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-purple-300">Loading your tech destiny...</p>
        </div>
      </div>
    )
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Prediction Not Found</h2>
          <p className="text-gray-300 mb-4">{error || 'This prediction does not exist'}</p>
          <Link href="/history" className="text-purple-400 hover:text-purple-300">
            ← Back to History
          </Link>
        </div>
      </div>
    )
  }

  const LockedSection = ({ title }: { title: string }) => (
    <div className="mystical-card border-yellow-500/50">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Lock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">Unlock this feature with TechKundali Premium</p>
          <Link href="/pricing" className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all">
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/history" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to History
          </Link>
          <h1 className="text-3xl font-bold mb-2">Your Tech Kundali</h1>
          <p className="text-gray-300">
            Generated on {new Date(prediction.meta?.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Tech Zodiac */}
          {prediction.techZodiac && (
            <div className="mystical-card">
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold">Tech Zodiac Sign</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-2">
                    {prediction.techZodiac.sign}
                  </h3>
                  <p className="text-gray-300 mb-4">{prediction.techZodiac.description}</p>
                  <div className="text-sm">
                    <span className="text-purple-400">Element:</span> {prediction.techZodiac.element}
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {prediction.techZodiac.strengths?.map((strength: string, i: number) => (
                        <li key={i}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Areas to Improve</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {prediction.techZodiac.weaknesses?.map((weakness: string, i: number) => (
                        <li key={i}>• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Future Career */}
          {prediction.futureCareer && (
            <div className="mystical-card">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold">Career Destiny</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold text-blue-300 mb-2">1 Year</h3>
                  <p className="text-gray-300">{prediction.futureCareer.oneYear}</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-blue-300 mb-2">3 Years</h3>
                  <p className="text-gray-300">{prediction.futureCareer.threeYear}</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-blue-300 mb-2">5 Years</h3>
                  <p className="text-gray-300">{prediction.futureCareer.fiveYear}</p>
                </div>
              </div>
            </div>
          )}

          {/* Learning Roadmap */}
          {prediction.learningRoadmap && (
            <div className="mystical-card">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold">Learning Roadmap</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-green-300 mb-3">30 Days</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {prediction.learningRoadmap.thirtyDays?.map((item: any, i: number) => (
                      <li key={i} className="mb-2">
                        <div className="font-medium text-green-400">• {typeof item === 'string' ? item : item.skill}</div>
                        {item.resources && (
                          <div className="text-xs text-gray-400 ml-4 mt-1">
                            {item.resources.join(', ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-300 mb-3">90 Days</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {prediction.learningRoadmap.ninetyDays?.map((item: any, i: number) => (
                      <li key={i} className="mb-2">
                        <div className="font-medium text-blue-400">• {typeof item === 'string' ? item : item.skill}</div>
                        {item.resources && (
                          <div className="text-xs text-gray-400 ml-4 mt-1">
                            {item.resources.join(', ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-300 mb-3">180 Days</h3>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {prediction.learningRoadmap.oneEightyDays?.map((item: any, i: number) => (
                      <li key={i} className="mb-2">
                        <div className="font-medium text-purple-400">• {typeof item === 'string' ? item : item.skill}</div>
                        {item.resources && (
                          <div className="text-xs text-gray-400 ml-4 mt-1">
                            {item.resources.join(', ')}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Company Compatibility */}
          {prediction.companyCompatibility && (
            <div className="mystical-card">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold">Company Compatibility</h2>
              </div>
              <div className="space-y-4">
                {prediction.companyCompatibility.map((company: any, i: number) => (
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
          )}

          {/* Premium Locked Sections */}
          {prediction.techKundaliChart?.locked && (
            <LockedSection title="Full Tech Kundali Chart" />
          )}

          {prediction.resumeGapAnalysis?.locked && (
            <LockedSection title="Resume Gap Analysis" />
          )}

          {prediction.techChakraAlignment?.locked && (
            <LockedSection title="Tech Chakra Alignment" />
          )}
        </div>
      </div>
    </div>
  )
}