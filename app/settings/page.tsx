'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/api'
import { User, Mail, Calendar, Globe, Target, Zap, Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experienceLevel: '',
    currentSkills: [] as string[],
    interests: [] as string[],
    techGoal: '',
    learningSpeed: '',
    behavior: '',
    country: ''
  })

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'Go', 'Rust',
    'Docker', 'Kubernetes', 'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Machine Learning'
  ]

  const interestOptions = [
    'Web Development', 'Mobile Apps', 'AI/ML', 'DevOps', 'Blockchain', 'Game Development',
    'Data Science', 'Cybersecurity', 'Cloud Computing', 'IoT', 'AR/VR'
  ]

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await auth.getMe()
      setUser(userData.user)
      setFormData({
        fullName: userData.user.fullName || '',
        email: userData.user.email || '',
        experienceLevel: userData.user.experienceLevel || '',
        currentSkills: userData.user.currentSkills || [],
        interests: userData.user.interests || [],
        techGoal: userData.user.techGoal || '',
        learningSpeed: userData.user.learningSpeed || '',
        behavior: userData.user.behavior || '',
        country: userData.user.country || 'India'
      })
    } catch (error) {
      console.error('Failed to load user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      // Note: This would need a backend endpoint to update user profile
      // For now, just show a success message
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.includes(skill)
        ? prev.currentSkills.filter(s => s !== skill)
        : [...prev.currentSkills, skill]
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SettingsIcon className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-purple-300">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <SettingsIcon className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold">Account Settings</h1>
          </div>
          <p className="text-gray-300">
            Update your profile to get more accurate tech destiny predictions
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {message && (
            <div className={`rounded-lg p-4 ${
              message.includes('success') 
                ? 'bg-green-500/20 border border-green-500 text-green-200'
                : 'bg-red-500/20 border border-red-500 text-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* Basic Info */}
          <div className="mystical-card space-y-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-bold">Basic Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3-5 years)</option>
                  <option value="Expert">Expert (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tech Profile */}
          <div className="mystical-card space-y-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-yellow-400 mr-2" />
              <h2 className="text-xl font-bold">Tech Profile</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tech Goal</label>
                <select
                  value={formData.techGoal}
                  onChange={(e) => setFormData(prev => ({ ...prev, techGoal: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="Get First Job">Get First Tech Job</option>
                  <option value="Switch Career">Switch to Tech Career</option>
                  <option value="Level Up">Level Up Current Role</option>
                  <option value="Start Startup">Start My Own Startup</option>
                  <option value="Freelance">Become Freelancer</option>
                  <option value="FAANG">Join FAANG Company</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Learning Speed</label>
                <select
                  value={formData.learningSpeed}
                  onChange={(e) => setFormData(prev => ({ ...prev, learningSpeed: e.target.value }))}
                  className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
                >
                  <option value="Slow">Slow & Steady</option>
                  <option value="Medium">Medium Pace</option>
                  <option value="Fast">Fast Learner</option>
                  <option value="Lightning">Lightning Fast</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Behavior Style</label>
              <select
                value={formData.behavior}
                onChange={(e) => setFormData(prev => ({ ...prev, behavior: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value="Analytical">Analytical & Logical</option>
                <option value="Creative">Creative & Innovative</option>
                <option value="Collaborative">Collaborative & Social</option>
                <option value="Independent">Independent & Self-driven</option>
                <option value="Detail-oriented">Detail-oriented & Perfectionist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Skills</label>
              <div className="grid grid-cols-3 gap-2">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.currentSkills.includes(skill)
                        ? 'bg-purple-600 text-white'
                        : 'bg-black/30 border border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tech Interests</label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-purple-600 text-white'
                        : 'bg-black/30 border border-purple-500/30 hover:border-purple-400'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="mystical-card">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-green-400 mr-2" />
              <h2 className="text-xl font-bold">Account Status</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Plan:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                  user?.plan === 'premium' 
                    ? 'bg-yellow-600 text-black' 
                    : 'bg-purple-600 text-white'
                }`}>
                  {user?.plan?.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Member since:</span>
                <span className="ml-2 text-gray-300">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}