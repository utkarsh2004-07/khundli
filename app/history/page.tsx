'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { predictions, premium } from '@/lib/api'
import { Calendar, Star, Eye, Sparkles, FileText, CheckCircle, Target } from 'lucide-react'

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'predictions' | 'resumes'>('predictions')
  const [predictionList, setPredictionList] = useState<any[]>([])
  const [resumeList, setResumeList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const [predResult, resumeResult] = await Promise.all([
        predictions.getAll().catch(() => ({ predictions: [] })),
        premium.resumeAnalyses.getAll().catch(() => ({ analyses: [] }))
      ])

      setPredictionList(predResult.predictions || [])
      setResumeList(resumeResult.analyses || [])
    } catch (err: any) {
      console.error('Failed to load history:', err)
      setError('Failed to load history data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-purple-300">Loading your history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Your Tech Journey</h1>
          <p className="text-gray-300">
            Track your predictions and resume improvements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab('predictions')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'predictions'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Predictions
            </button>
            <button
              onClick={() => setActiveTab('resumes')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'resumes'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Resume Analyses
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mb-6">
            {error}
          </div>
        )}

        {activeTab === 'predictions' ? (
          predictionList.length > 0 ? (
            <div className="space-y-6">
              {predictionList.map((prediction: any) => (
                <div key={prediction.id} className="mystical-card hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <h3 className="text-xl font-semibold text-purple-300">
                          {prediction.tech_zodiac}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-2">{prediction.summary}</p>
                      <p className="text-sm text-purple-400 font-medium">
                        Destiny Role: {prediction.destiny_role}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-400 text-sm mb-2 justify-end">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(prediction.created_at).toLocaleDateString()}
                      </div>
                      <Link
                        href={`/prediction/${prediction.id}`}
                        className="inline-flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mystical-card text-center py-12">
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Predictions Yet</h3>
              <p className="text-gray-300 mb-6">
                Your tech destiny awaits! Generate your first Tech Kundali.
              </p>
              <Link
                href="/predict"
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Generate Prediction
              </Link>
            </div>
          )
        ) : (
          resumeList.length > 0 ? (
            <div className="space-y-6">
              {resumeList.map((analysis: any) => (
                <div key={analysis.id} className="mystical-card hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <h3 className="text-xl font-semibold text-blue-300">
                          {analysis.candidateName}
                        </h3>
                      </div>
                      {analysis.targetCompany && (
                        <p className="text-gray-300 mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          Target: {analysis.targetCompany}
                        </p>
                      )}
                      <div className="flex gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-300">ATS Score: <span className="text-green-400 font-bold">{analysis.atsScore}/100</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-gray-300">Job Match: <span className="text-purple-400 font-bold">{analysis.jobMatch}%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-400 text-sm mb-4 justify-end">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </div>
                      <Link
                        href={`/resume-analysis/${analysis.id}`}
                        className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Analysis</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mystical-card text-center py-12">
              <FileText className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Resume Analyses Yet</h3>
              <p className="text-gray-300 mb-6">
                Optimize your resume to land your dream job!
              </p>
              <Link
                href="/resume"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Analyze Resume
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}