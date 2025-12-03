'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, apiFetch } from '@/lib/api'
import { User, Mail, Calendar, Globe, Target, Zap, Crown, TrendingUp, Sparkles } from 'lucide-react'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [usage, setUsage] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            const [userData, usageData] = await Promise.all([
                auth.getMe(),
                apiFetch('/api/usage')
            ])
            setUser(userData.user)
            setUsage(usageData)
        } catch (error) {
            console.error('Failed to load user data:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-purple-300">Loading your profile...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const getPlanBadge = (plan: string) => {
        const badges = {
            free: { bg: 'bg-gray-600', text: 'FREE', icon: User },
            basic: { bg: 'bg-purple-600', text: 'BASIC', icon: Target },
            premium: { bg: 'bg-gradient-to-r from-yellow-600 to-orange-600', text: 'PREMIUM', icon: Crown }
        }
        const badge = badges[plan as keyof typeof badges] || badges.free
        const Icon = badge.icon
        return (
            <div className={`${badge.bg} px-4 py-2 rounded-lg flex items-center gap-2 text-white font-bold`}>
                <Icon className="h-5 w-5" />
                {badge.text}
            </div>
        )
    }

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="mystical-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{user.fullName}</h1>
                            <p className="text-gray-300 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {user.email}
                            </p>
                        </div>
                        {getPlanBadge(user.plan || 'free')}
                    </div>

                    {user.plan !== 'free' && user.subscriptionExpiresAt && (
                        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <p className="text-sm text-gray-300">
                                <strong>Subscription expires:</strong> {formatDate(user.subscriptionExpiresAt)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Personal Info */}
                <div className="mystical-card">
                    <div className="flex items-center mb-4">
                        <User className="h-6 w-6 text-blue-400 mr-2" />
                        <h2 className="text-2xl font-bold">Personal Information</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-400">Date of Birth</p>
                            <p className="text-lg flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-purple-400" />
                                {formatDate(user.dob)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Gender</p>
                            <p className="text-lg">{user.gender || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Country</p>
                            <p className="text-lg flex items-center gap-2">
                                <Globe className="h-4 w-4 text-green-400" />
                                {user.country || 'Not specified'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Member Since</p>
                            <p className="text-lg">{formatDate(user.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Tech Profile */}
                <div className="mystical-card">
                    <div className="flex items-center mb-4">
                        <Zap className="h-6 w-6 text-yellow-400 mr-2" />
                        <h2 className="text-2xl font-bold">Tech Profile</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Experience Level</p>
                                <div className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                                    {user.experienceLevel || 'Not specified'}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Learning Speed</p>
                                <div className="px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                                    {user.learningSpeed || 'Not specified'}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Tech Goal</p>
                                <div className="px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                                    <Target className="h-4 w-4" />
                                    {user.techGoal || 'Not specified'}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Behavior Style</p>
                                <div className="px-3 py-2 bg-pink-500/20 border border-pink-500/30 rounded-lg">
                                    {user.behavior || 'Not specified'}
                                </div>
                            </div>
                        </div>

                        {user.currentSkills && user.currentSkills.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Current Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {user.currentSkills.map((skill: string) => (
                                        <span key={skill} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.interests && user.interests.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Interests</p>
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest: string) => (
                                        <span key={interest} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Usage Statistics */}
                {usage && (
                    <div className="mystical-card">
                        <div className="flex items-center mb-4">
                            <TrendingUp className="h-6 w-6 text-green-400 mr-2" />
                            <h2 className="text-2xl font-bold">Usage Statistics</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Predictions</p>
                                <p className="text-2xl font-bold text-purple-400">
                                    {usage.predictions?.used || 0}
                                    {usage.predictions?.limit !== Infinity && (
                                        <span className="text-sm text-gray-400"> / {usage.predictions?.limit}</span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {usage.predictions?.remaining === 'unlimited'
                                        ? 'Unlimited'
                                        : `${usage.predictions?.remaining} remaining`}
                                </p>
                            </div>

                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Resume Analyses</p>
                                <p className="text-2xl font-bold text-blue-400">
                                    {usage.resumeAnalyses?.used || 0}
                                    {usage.resumeAnalyses?.limit !== Infinity && (
                                        <span className="text-sm text-gray-400"> / {usage.resumeAnalyses?.limit}</span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {usage.resumeAnalyses?.remaining === 'unlimited'
                                        ? 'Unlimited'
                                        : `${usage.resumeAnalyses?.remaining} remaining`}
                                </p>
                            </div>

                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Interview Questions</p>
                                <p className="text-2xl font-bold text-green-400">
                                    {usage.interviewQuestions?.used || 0}
                                    {usage.interviewQuestions?.limit !== Infinity && (
                                        <span className="text-sm text-gray-400"> / {usage.interviewQuestions?.limit}</span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {usage.interviewQuestions?.remaining === 'unlimited'
                                        ? 'Unlimited'
                                        : `${usage.interviewQuestions?.remaining} remaining`}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/settings')}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all"
                    >
                        Edit Profile
                    </button>
                    {user.plan === 'free' && (
                        <button
                            onClick={() => router.push('/pricing')}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition-all"
                        >
                            Upgrade Plan
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
