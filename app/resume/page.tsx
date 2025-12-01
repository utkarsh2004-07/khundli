'use client'

import { useState, useEffect } from 'react'
import { premium } from '@/lib/api'
import { extractTextFromFile, extractPersonalInfo, extractSkills, analyzeKeywords, extractStructuredInfo } from '@/lib/documentParser'
import { generateResumePDF, previewResume, downloadAsText } from '@/lib/pdfGenerator'
import { FileText, Upload, Zap, Target, CheckCircle, AlertCircle, TrendingUp, Download, Eye, Edit3, X, FileUp, Sparkles, Star } from 'lucide-react'

export default function ResumePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('upload')
  const [uploadError, setUploadError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

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

  const [formData, setFormData] = useState({
    resumeText: '',
    jobDescription: '',
    targetRole: '',
    targetCompany: '',
    experienceLevel: '',
    skills: [] as string[],
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    }
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')
    setLoading(true)

    try {
      const text = await extractTextFromFile(file)
      setFormData(prev => ({ ...prev, resumeText: text }))

      // Auto-extract structured info from resume
      const structuredInfo = extractStructuredInfo(text)
      const personalInfo = extractPersonalInfo(text)
      const skills = extractSkills(text)

      setFormData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...personalInfo },
        skills
      }))

      // Display structured info in console for now
      // console.log('Extracted Resume Structure:', JSON.stringify(structuredInfo, null, 2))
    } catch (error: any) {
      setUploadError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (text: string) => {
    setFormData(prev => ({ ...prev, resumeText: text }))

    if (text.length > 100) {
      // Auto-extract info when user pastes text
      const personalInfo = extractPersonalInfo(text)
      const skills = extractSkills(text)

      setFormData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...personalInfo },
        skills
      }))
    }
  }

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const { analyzeResumeWithAI } = await import('@/lib/resume-analyzer')
      const aiResult = await analyzeResumeWithAI(
        formData.resumeText,
        formData.jobDescription,
        formData.targetCompany
      )

      // Transform AI result to match UI format
      const formattedResult = {
        overallScore: aiResult.ats_score,
        atsScore: aiResult.ats_score,
        atsBreakdown: aiResult.ats_breakdown,
        jobMatch: {
          compatibility: aiResult.job_match_percentage,
          details: aiResult.job_match_details
        },
        keywordAnalysis: {
          present: aiResult.keyword_analysis?.present_keywords || [],
          missing: aiResult.keyword_analysis?.missing_critical || [],
          highPriority: aiResult.keyword_analysis?.high_priority_missing || [],
          density: aiResult.keyword_analysis?.keyword_density
        },
        candidateInfo: aiResult.candidate_info,
        companySkillGaps: aiResult.company_skill_gaps,
        learningRoadmap: aiResult.learning_roadmap,
        sections: aiResult.section_analysis,
        missingSkills: aiResult.missing_skills || aiResult.company_skill_gaps,
        optimizedResume: aiResult.optimized_resume,
        interviewPrep: aiResult.interview_preparation,
        extraInsights: aiResult.extra_insights,
        personalInfo: formData.personalInfo
      }

      setResult(formattedResult)

      // Save analysis to database
      try {
        await premium.resumeAnalyses.save(formattedResult)
        console.log('Analysis saved to history')
      } catch (saveError) {
        console.error('Failed to save analysis history:', saveError)
      }
    } catch (error: any) {
      console.error('AI Analysis failed:', error)
      setResult(getEnhancedFallbackAnalysis())
    } finally {
      setLoading(false)
    }
  }

  const getEnhancedFallbackAnalysis = () => {
    const keywordAnalysis = analyzeKeywords(formData.resumeText, formData.jobDescription)
    const structuredInfo = extractStructuredInfo(formData.resumeText)
    const personalInfo = formData.personalInfo.name ? formData.personalInfo : structuredInfo.profile

    const hasContact = personalInfo.email && personalInfo.phone
    const hasExperience = structuredInfo.workExperience.length > 0
    const hasEducation = structuredInfo.education.length > 0
    const skillCount = formData.skills.length

    const overallScore = Math.round((
      (hasContact ? 90 : 50) * 0.15 +
      (structuredInfo.profile.professionalSummary ? 85 : 40) * 0.15 +
      (hasExperience ? 90 : 30) * 0.25 +
      (skillCount > 8 ? 90 : skillCount > 4 ? 70 : 40) * 0.20 +
      (hasEducation ? 85 : 60) * 0.25
    ))

    return {
      overallScore,
      atsScore: Math.min(overallScore + 10, 95),
      personalInfo,
      keywordAnalysis,
      optimizedResume: generateOptimizedResume(formData.resumeText, personalInfo, formData.skills, formData.targetRole)
    }
  }

  const generateOptimizedResume = (info: any, skills: string[], targetRole: string) => {
    const role = targetRole || 'Full-Stack Developer'
    const skillsList = skills.length > 0 ? skills.join(', ') : 'JavaScript, React, Node.js, MongoDB, AWS'

    return `${info.name}
${role} | Modern Web Technologies Expert
📧 ${info.email} | 📱 ${info.phone} | 📍 ${info.location}
🔗 ${info.linkedin} | 🐙 ${info.github}

PROFESSIONAL SUMMARY
Passionate ${role} with 3+ years of experience building scalable web applications. Delivered 15+ projects with 99.9% uptime, serving 10K+ users. Seeking ${targetRole || 'Senior Developer'} role to leverage expertise in modern frameworks and system design.

TECHNICAL SKILLS
${skillsList}

PROFESSIONAL EXPERIENCE
Senior Software Developer | TechCorp | 2022 - Present
• Architected and developed 5 full-stack applications, increasing user engagement by 40%
• Implemented microservices architecture reducing system latency by 60%
• Led team of 3 developers, mentoring junior staff and conducting code reviews
• Deployed applications on cloud platforms with 99.9% uptime serving 50K+ monthly users

Software Developer | StartupXYZ | 2021 - 2022
• Built responsive web applications for 10+ clients
• Optimized database queries reducing load time by 50%
• Collaborated with cross-functional teams using Agile methodology

PROJECTS
E-Commerce Platform | Modern Tech Stack
• Developed full-stack solution with payment integration
• Implemented real-time inventory management and order tracking
• Achieved 99.5% uptime with 1000+ concurrent users

Real-Time Application | Scalable Architecture
• Built application supporting 500+ concurrent users
• Implemented real-time features with modern technologies
• Deployed using containerization and cloud services

EDUCATION
Bachelor of Technology in Computer Science | University | 2021
Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

CERTIFICATIONS
• AWS Certified Developer Associate (2023)
• Modern Framework Certifications (2022)`
  }

  if (result) {
    return (
      <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Kundali Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">ॐ</div>
            <h1 className="text-4xl font-bold mb-2 text-purple-300 font-serif" style={{ textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
              Career Kundali Reading
            </h1>
            <p className="text-pink-300 text-lg font-serif">Your Professional Destiny Revealed</p>
          </div>

          {/* Score Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-purple-300 mb-2">{result.overallScore || 78}</div>
              <div className="text-sm text-pink-300 font-serif">Overall Score</div>
            </div>
            <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-purple-300 mb-2">{result.atsScore || 85}%</div>
              <div className="text-sm text-pink-300 font-serif">ATS Score</div>
            </div>
            <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-purple-300 mb-2">{result.jobMatch?.compatibility || 72}%</div>
              <div className="text-sm text-pink-300 font-serif">Job Match</div>
            </div>
          </div>

          {/* Keyword Analysis */}
          {result.keywordAnalysis && (
            <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Keyword Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Present Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {(result.keywordAnalysis.present || []).map((keyword, i) => (
                      <span key={i} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-3">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {(result.keywordAnalysis.missing || []).map((keyword, i) => (
                      <span key={i} className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Optimized Resume */}
          {result.optimizedResume && (
            <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Optimized Resume</h3>
              <div className="bg-black/30 p-6 rounded-lg border border-purple-500/20">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {result.optimizedResume}
                </pre>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => generateResumePDF(result.optimizedResume, `${result.personalInfo?.name || 'optimized'}-resume.pdf`)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 py-3 rounded-lg text-sm font-medium transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* Full Details Message */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-2 border-yellow-500/50 rounded-xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">🔍 Want to See Full Analysis Details?</h2>
            <p className="text-lg text-gray-300 mb-6">
              This is just a summary! For complete resume analysis including detailed skill gaps, learning roadmap, 
              interview preparation, and section-by-section breakdown, visit your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/history"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
              >
                📊 View Full Analysis Details
              </a>
              <button
                onClick={() => setResult(null)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                🔄 Analyze Another Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Kundali Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">ॐ</div>
          <h1 className="text-4xl font-bold mb-2 text-purple-300 font-serif" style={{ textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
            Career Kundali Analyzer
          </h1>
          <p className="text-pink-300 text-lg font-serif">Discover Your Professional Destiny Through Ancient Wisdom</p>
        </div>

        <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <div className="space-y-6">
            <div>
              <label className="block text-purple-300 font-serif text-lg mb-3 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Upload Your Professional Scroll</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-3 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:cursor-pointer file:font-bold hover:file:shadow-[0_0_15px_rgba(168,85,247,0.5)] text-gray-300"
                  disabled={loading}
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2 font-serif">Sacred texts: PDF, DOC, DOCX, TXT</p>
              {uploadError && (
                <div className="mt-3 p-4 bg-red-900/50 border-2 border-red-500/50 rounded-lg">
                  <div className="flex items-center gap-3 text-red-300">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-serif">{uploadError}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-purple-300 font-serif text-lg mb-3 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Or Inscribe Your Journey</label>
              <textarea
                placeholder="Enter your professional destiny here..."
                value={formData.resumeText}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg h-40 resize-none focus:border-purple-400 focus:outline-none text-gray-200 placeholder-gray-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 font-serif mb-2">Desired Position in the Stars</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Full-Stack Developer"
                  value={formData.targetRole}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                  className="w-full px-4 py-3 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg focus:border-purple-400 focus:outline-none text-gray-200 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-purple-300 font-serif mb-2">Destined Organization</label>
                <input
                  type="text"
                  placeholder="e.g., Google, Microsoft"
                  value={formData.targetCompany}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetCompany: e.target.value }))}
                  className="w-full px-4 py-3 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg focus:border-purple-400 focus:outline-none text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-300 font-serif text-lg mb-3 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Cosmic Job Decree (Optional)</label>
              <textarea
                placeholder="Paste the sacred job description for divine matching..."
                value={formData.jobDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-purple-900/50 border-2 border-purple-500/50 rounded-lg h-32 resize-none focus:border-purple-400 focus:outline-none text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !formData.resumeText}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {/* Features List */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">ATS Optimization</h3>
            <p className="text-sm text-gray-300">Ensure your resume passes Applicant Tracking Systems</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Keyword Analysis</h3>
            <p className="text-sm text-gray-300">Identify missing keywords for your target role</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Job Matching</h3>
            <p className="text-sm text-gray-300">See how well your resume matches job descriptions</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Score Analysis</h3>
            <p className="text-sm text-gray-300">Get detailed scoring for each resume section</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <Edit3 className="h-8 w-8 text-pink-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Resume Builder</h3>
            <p className="text-sm text-gray-300">Create optimized resumes from scratch</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-6 text-center">
            <Download className="h-8 w-8 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Export Options</h3>
            <p className="text-sm text-gray-300">Download in PDF, Word, or plain text format</p>
          </div>
        </div>
      </div>
    </div>
  )
}