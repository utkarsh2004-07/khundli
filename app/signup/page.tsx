'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/api'
import { Sparkles } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    experienceLevel: '',
    currentSkills: [] as string[],
    interests: [] as string[],
    techGoal: '',
    learningSpeed: '',
    behavior: '',
    country: 'India'
  })

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'Go', 'Rust',
    'Docker', 'Kubernetes', 'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Machine Learning'
  ]

  const interestOptions = [
    'Web Development', 'Mobile Apps', 'AI/ML', 'DevOps', 'Blockchain', 'Game Development',
    'Data Science', 'Cybersecurity', 'Cloud Computing', 'IoT', 'AR/VR'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await auth.signup(formData)
      localStorage.setItem('tk_token', response.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Create Your Tech Destiny</h1>
          <p className="text-gray-300">Tell us about yourself to reveal your Tech Kundali</p>
        </div>

        <form onSubmit={handleSubmit} className="mystical-card space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Experience Level *</label>
              <select
                required
                value={formData.experienceLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner (0-1 years)</option>
                <option value="Intermediate">Intermediate (1-3 years)</option>
                <option value="Advanced">Advanced (3-5 years)</option>
                <option value="Expert">Expert (5+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Learning Speed *</label>
              <select
                required
                value={formData.learningSpeed}
                onChange={(e) => setFormData(prev => ({ ...prev, learningSpeed: e.target.value }))}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
              >
                <option value="">Select speed</option>
                <option value="Slow">Slow & Steady</option>
                <option value="Medium">Medium Pace</option>
                <option value="Fast">Fast Learner</option>
                <option value="Lightning">Lightning Fast</option>
              </select>
            </div>
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

          <div>
            <label className="block text-sm font-medium mb-2">Tech Goal *</label>
            <select
              required
              value={formData.techGoal}
              onChange={(e) => setFormData(prev => ({ ...prev, techGoal: e.target.value }))}
              className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
            >
              <option value="">Select your goal</option>
              <option value="Get First Job">Get First Tech Job</option>
              <option value="Switch Career">Switch to Tech Career</option>
              <option value="Level Up">Level Up Current Role</option>
              <option value="Start Startup">Start My Own Startup</option>
              <option value="Freelance">Become Freelancer</option>
              <option value="FAANG">Join FAANG Company</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Behavior Style *</label>
            <select
              required
              value={formData.behavior}
              onChange={(e) => setFormData(prev => ({ ...prev, behavior: e.target.value }))}
              className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
            >
              <option value="">Select style</option>
              <option value="Analytical">Analytical & Logical</option>
              <option value="Creative">Creative & Innovative</option>
              <option value="Collaborative">Collaborative & Social</option>
              <option value="Independent">Independent & Self-driven</option>
              <option value="Detail-oriented">Detail-oriented & Perfectionist</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Your Destiny...' : 'Reveal My Tech Kundali'}
          </button>
        </form>
      </div>
    </div>
  )
}