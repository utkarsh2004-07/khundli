'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { premium } from '@/lib/api'
import { generateResumePDF, downloadAsText } from '@/lib/pdfGenerator'
import { FileText, CheckCircle, Target, Zap, AlertCircle, TrendingUp, Download, Eye, Edit3, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResumeAnalysisPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        if (params.id) {
            loadAnalysis(params.id as string)
        }
    }, [params.id])

    const loadAnalysis = async (id: string) => {
        try {
            const data = await premium.resumeAnalyses.getById(id)

            // Handle legacy raw data format if necessary
            // If data has snake_case keys (like ats_score) but missing camelCase keys (like atsScore)
            if (data.ats_score !== undefined && data.atsScore === undefined) {
                // Transform raw data to UI format
                setResult({
                    overallScore: data.ats_score,
                    atsScore: data.ats_score,
                    atsBreakdown: data.ats_breakdown,
                    jobMatch: {
                        compatibility: data.job_match_percentage,
                        details: data.job_match_details
                    },
                    keywordAnalysis: {
                        present: data.keyword_analysis?.present_keywords || [],
                        missing: data.keyword_analysis?.missing_critical || [],
                        highPriority: data.keyword_analysis?.high_priority_missing || [],
                        density: data.keyword_analysis?.keyword_density
                    },
                    candidateInfo: data.candidate_info,
                    companySkillGaps: data.company_skill_gaps,
                    learningRoadmap: data.learning_roadmap,
                    sections: data.section_analysis,
                    missingSkills: data.missing_skills || data.company_skill_gaps,
                    optimizedResume: data.optimized_resume,
                    interviewPrep: data.interview_preparation,
                    extraInsights: data.extra_insights,
                    personalInfo: data.candidate_info // Fallback as raw data doesn't have personalInfo
                })
            } else {
                setResult(data)
            }
        } catch (err: any) {
            console.error('Failed to load analysis:', err)
            setError('Failed to load analysis results')
        } finally {
            setLoading(false)
        }
    }

    // Helper to ensure data is always an array
    const ensureArray = (data: any): any[] => {
        if (Array.isArray(data)) return data
        if (!data) return []
        // If it's an object with numeric keys (like an array-like object), convert to array
        if (typeof data === 'object' && Object.keys(data).some(k => !isNaN(Number(k)))) {
            return Object.values(data)
        }
        return []
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-purple-300">Loading analysis results...</p>
                </div>
            </div>
        )
    }

    if (error || !result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-300 mb-4">{error || 'Analysis not found'}</p>
                    <Link
                        href="/history"
                        className="text-purple-400 hover:text-purple-300 underline"
                    >
                        Return to History
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/history"
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to History
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
                    <p className="text-gray-300">
                        Analysis from {new Date(result.meta?.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                </div>

                {/* Score Overview */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="mystical-card text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">{result.overallScore || result.atsScore || 0}/100</div>
                        <div className="text-sm text-gray-300">Overall Score</div>
                    </div>
                    <div className="mystical-card text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">{result.atsScore || 0}/100</div>
                        <div className="text-sm text-gray-300">ATS Compatibility</div>
                    </div>
                    <div className="mystical-card text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">{result.jobMatch?.compatibility || 0}/100</div>
                        <div className="text-sm text-gray-300">Job Match</div>
                    </div>
                </div>

                {/* Dynamic Content-Fit Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                    {/* Candidate Info */}
                    {result.candidateInfo && (
                        <div className="mystical-card hover:scale-[1.02] transition-transform duration-300">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                Candidate Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div><span className="text-blue-400 font-medium">Name:</span> {result.candidateInfo.name}</div>
                                <div><span className="text-blue-400 font-medium">Email:</span> {result.candidateInfo.email}</div>
                                <div><span className="text-blue-400 font-medium">Phone:</span> {result.candidateInfo.phone}</div>
                                <div><span className="text-blue-400 font-medium">Current Role:</span> {result.candidateInfo.current_role}</div>
                                <div><span className="text-blue-400 font-medium">Experience:</span> {result.candidateInfo.experience_years}</div>
                                {result.candidateInfo.skills && (
                                    <div className="mt-3">
                                        <span className="text-blue-400 font-medium">Skills by Category:</span>
                                        {Object.entries(result.candidateInfo.skills).map(([category, skills]: [string, any]) => (
                                            ensureArray(skills).length > 0 && (
                                                <div key={category} className="mt-2">
                                                    <span className="text-yellow-400 capitalize text-xs">{category.replace('_', ' ')}:</span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {ensureArray(skills).map((skill: string, i: number) => (
                                                            <span key={i} className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs hover:bg-green-600/30 transition-colors">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ATS Breakdown */}
                    {result.atsBreakdown && (
                        <div className="mystical-card hover:scale-[1.02] transition-transform duration-300">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                                <CheckCircle className="h-5 w-5 text-blue-400" />
                                ATS Score Breakdown
                            </h3>
                            <div className="space-y-3">
                                {Object.entries(result.atsBreakdown).map(([category, score]: [string, any]) => (
                                    <div key={category} className="flex justify-between items-center group">
                                        <span className="capitalize text-sm group-hover:text-white transition-colors">{category.replace('_', ' ')}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${score >= 16 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                                        score >= 12 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                                            'bg-gradient-to-r from-red-400 to-red-500'
                                                        }`}
                                                    style={{ width: `${(score / 20) * 100}%` }}
                                                />
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${score >= 16 ? 'bg-green-600/20 text-green-300' :
                                                score >= 12 ? 'bg-yellow-600/20 text-yellow-300' :
                                                    'bg-red-600/20 text-red-300'
                                                }`}>
                                                {score}/20
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Job Match Details */}
                    {result.jobMatch?.details && (
                        <div className="mystical-card hover:scale-[1.02] transition-transform duration-300">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                <Target className="h-5 w-5 text-purple-400" />
                                Job Match Details
                            </h3>
                            <div className="space-y-3">
                                {Object.entries(result.jobMatch.details).map(([category, score]: [string, any]) => (
                                    <div key={category} className="flex justify-between items-center group">
                                        <span className="capitalize text-sm group-hover:text-white transition-colors">{category.replace('_', ' ')}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                                        score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                                            'bg-gradient-to-r from-red-400 to-red-500'
                                                        }`}
                                                    style={{ width: `${score}%` }}
                                                />
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${score >= 80 ? 'bg-green-600/20 text-green-300' :
                                                score >= 60 ? 'bg-yellow-600/20 text-yellow-300' :
                                                    'bg-red-600/20 text-red-300'
                                                }`}>
                                                {score}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Keyword Analysis */}
                    <div className="mystical-card lg:col-span-2 xl:col-span-3 hover:scale-[1.01] transition-transform duration-300">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            Keyword Analysis
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Present Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {ensureArray(result.keywordAnalysis?.present).map((keyword: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-xs hover:bg-green-600/30 transition-colors border border-green-500/20">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Missing Keywords
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {ensureArray(result.keywordAnalysis?.missing).map((keyword: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-xs hover:bg-red-600/30 transition-colors border border-red-500/20">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {ensureArray(result.keywordAnalysis?.highPriority).length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                                        🔥 High Priority
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {ensureArray(result.keywordAnalysis.highPriority).map((keyword: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-orange-600/20 text-orange-300 rounded-full text-xs font-medium hover:bg-orange-600/30 transition-colors border border-orange-500/20 animate-pulse">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {result.keywordAnalysis?.density && (
                            <div className="mt-4 text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                                <span className="text-sm text-gray-400">Keyword Density: </span>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">{result.keywordAnalysis.density}%</span>
                            </div>
                        )}
                    </div>

                    {/* Company Skill Gaps */}
                    <div className="mystical-card lg:col-span-2 hover:scale-[1.01] transition-transform duration-300">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                            <TrendingUp className="h-5 w-5 text-red-400" />
                            Missing Technologies & Skills
                        </h3>
                        <div className="space-y-3">
                            {ensureArray(result.companySkillGaps).map((gap: any, i: number) => (
                                <div key={i} className="border border-red-500/30 rounded-lg p-4 hover:border-red-500/50 transition-colors bg-gradient-to-br from-red-950/20 to-transparent">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-red-400 text-lg">{gap.skill}</span>
                                        <span className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                                            Priority: {gap.priority}/10
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{gap.importance}</p>
                                    <div className="text-xs text-yellow-400 mb-2 flex items-center gap-2">
                                        ⏱️ <span>Time to Learn: <span className="font-medium">{gap.time_to_learn}</span></span>
                                    </div>
                                    {gap.resources && (
                                        <div className="mt-2">
                                            <span className="text-blue-400 text-xs font-medium">📚 Resources:</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {ensureArray(gap.resources).map((resource: string, j: number) => (
                                                    <span key={j} className="text-xs text-gray-300 bg-blue-600/10 px-2 py-1 rounded border border-blue-500/20">
                                                        {resource}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Learning Roadmap */}
                    <div className="mystical-card xl:col-span-1 hover:scale-[1.01] transition-transform duration-300">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            <TrendingUp className="h-5 w-5 text-blue-400" />
                            Learning Roadmap
                        </h3>
                        <div className="space-y-4">
                            {ensureArray(result.learningRoadmap).map((item: any, i: number) => (
                                <div key={i} className="border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 transition-colors bg-gradient-to-br from-blue-950/20 to-transparent">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-blue-400">{item.skill}</span>
                                        <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs border border-blue-500/20">
                                            {item.current_level} → {item.target_level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{item.why_important}</p>
                                    <div className="text-xs text-yellow-400 mb-2">
                                        ⏱️ Timeline: <span className="font-medium">{item.timeline}</span>
                                    </div>
                                    {item.learning_path && (
                                        <div className="mt-2">
                                            <span className="text-purple-400 text-xs font-medium">🛤️ Path:</span>
                                            <ul className="text-xs text-gray-300 mt-1 space-y-1">
                                                {ensureArray(item.learning_path).map((step: string, j: number) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-purple-400">•</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {item.resources && (
                                        <div className="mt-2">
                                            <span className="text-orange-400 text-xs font-medium">📚 Resources:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {ensureArray(item.resources).map((resource: string, j: number) => (
                                                    <span key={j} className="text-xs text-gray-300 bg-orange-600/10 px-2 py-1 rounded border border-orange-500/20">
                                                        {resource}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {ensureArray(item.practice_projects).length > 0 && (
                                        <div className="mt-2">
                                            <span className="text-green-400 text-xs font-medium">🚀 Projects:</span>
                                            <ul className="text-xs text-gray-300 mt-1">
                                                {ensureArray(item.practice_projects).map((project: string, j: number) => (
                                                    <li key={j} className="flex items-start gap-2">
                                                        <span className="text-green-400">•</span>
                                                        <span>{project}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {ensureArray(item.certifications).length > 0 && (
                                        <div className="mt-2">
                                            <span className="text-pink-400 text-xs font-medium">🏆 Certifications:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {ensureArray(item.certifications).map((cert: string, j: number) => (
                                                    <span key={j} className="px-2 py-1 bg-pink-600/20 text-pink-300 rounded text-xs border border-pink-500/20">
                                                        {cert}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Interview Preparation */}
                            {result.interviewPrep && (
                                <div className="mt-6 border border-purple-500/30 rounded-lg p-4 bg-gradient-to-br from-purple-950/20 to-transparent">
                                    <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                                        🎯 Interview Preparation
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <span className="text-red-400 font-medium text-xs">Technical Questions:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {ensureArray(result.interviewPrep.technical_questions).map((q: string, i: number) => (
                                                    <span key={i} className="text-xs text-gray-300 bg-red-600/10 px-2 py-1 rounded border border-red-500/20">
                                                        {q}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-blue-400 font-medium text-xs">System Design:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {ensureArray(result.interviewPrep.system_design_topics).map((topic: string, i: number) => (
                                                    <span key={i} className="text-xs text-gray-300 bg-blue-600/10 px-2 py-1 rounded border border-blue-500/20">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-green-400 font-medium text-xs">Coding Practice:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {ensureArray(result.interviewPrep.coding_practice).map((practice: string, i: number) => (
                                                    <span key={i} className="text-xs text-gray-300 bg-green-600/10 px-2 py-1 rounded border border-green-500/20">
                                                        {practice}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-yellow-400 font-medium text-xs">Company Tips:</span>
                                            <ul className="mt-1 space-y-1">
                                                {ensureArray(result.interviewPrep.company_specific_tips).map((tip: string, i: number) => (
                                                    <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                                                        <span className="text-yellow-400">•</span>
                                                        <span>{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Extra Insights */}
                            <div className="mt-4 p-4 bg-gradient-to-br from-purple-950/20 to-transparent border border-purple-500/20 rounded-lg">
                                <h4 className="font-semibold text-purple-400 mb-2 text-sm">💡 Key Insights</h4>
                                <ul className="text-sm space-y-1">
                                    {ensureArray(result.extraInsights).map((insight: string, i: number) => (
                                        <li key={i} className="text-gray-300 flex items-start gap-2">
                                            <span className="text-purple-400 font-bold">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Optimized Resume */}
                    <div className="mystical-card lg:col-span-2 xl:col-span-3 hover:scale-[1.01] transition-transform duration-300">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            <Edit3 className="h-5 w-5 text-purple-400" />
                            Optimized Resume
                        </h3>
                        <div className="bg-black/30 p-6 rounded-lg border border-purple-500/20">
                            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                                {result.optimizedResume}
                            </pre>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <button
                                onClick={() => generateResumePDF(result.optimizedResume, `${result.personalInfo?.name || 'optimized'}-resume.pdf`)}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-green-500/20"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                            <button
                                onClick={() => downloadAsText(result.optimizedResume, `${result.personalInfo?.name || 'optimized'}-resume.txt`)}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                            >
                                <FileText className="h-4 w-4" />
                                Download TXT
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/resume"
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors inline-block"
                    >
                        Analyze Another Resume
                    </Link>
                </div>
            </div>
        </div>
    )
}
