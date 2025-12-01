'use client'

import { useState, useEffect } from 'react'
import { premium, auth } from '@/lib/api'
import { Swords, Crown, Lock, User, Zap } from 'lucide-react'
import Link from 'next/link'

export default function BattlePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [battleResult, setBattleResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [friendData, setFriendData] = useState({
    name: '',
    experienceLevel: '',
    currentSkills: [] as string[],
    techGoal: '',
    learningSpeed: '',
    behavior: ''
  })

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'Go', 'Rust',
    'Docker', 'Kubernetes', 'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Machine Learning'
  ]

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const userData = await auth.getMe()
      setUser(userData.user)
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const handleBattle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!friendData.name || !friendData.experienceLevel || !friendData.techGoal) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await premium.battleDestiny(friendData)
      setBattleResult(result)
    } catch (err: any) {
      setError(err.message || 'Battle analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSkillToggle = (skill: string) => {
    setFriendData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.includes(skill)
        ? prev.currentSkills.filter(s => s !== skill)
        : [...prev.currentSkills, skill]
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Swords className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <p className="text-purple-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (user.plan !== 'premium') {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Lock className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Premium Feature</h1>
          <p className="text-xl text-gray-300 mb-8">
            Battle Destiny is available for Premium users only
          </p>
          <div className="mystical-card mb-8">
            <h3 className="text-xl font-semibold mb-4">What you'll get with Battle Destiny:</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li>• Compare your tech destiny with friends</li>
              <li>• See who has better career prospects</li>
              <li>• Skill compatibility analysis</li>
              <li>• Learning speed comparison</li>
              <li>• Future salary projections</li>
              <li>• Collaborative project suggestions</li>
            </ul>
          </div>
          <Link
            href="/pricing"
            className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-3 rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Swords className="h-8 w-8 text-red-400 mr-3" />
            <h1 className="text-3xl font-bold">Battle Destiny</h1>
          </div>
          <p className="text-gray-300">
            Compare your tech destiny with a friend and see who has the cosmic advantage
          </p>
        </div>

        {!battleResult ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Your Profile */}
            <div className="mystical-card">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-blue-400 mr-2" />
                <h2 className="text-xl font-bold">Your Profile</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-blue-400">Name:</span> {user.fullName}</div>
                <div><span className="text-blue-400">Experience:</span> {user.experienceLevel}</div>
                <div><span className="text-blue-400">Goal:</span> {user.techGoal}</div>
                <div><span className="text-blue-400">Learning Speed:</span> {user.learningSpeed}</div>
                <div><span className="text-blue-400">Behavior:</span> {user.behavior}</div>
                <div>
                  <span className="text-blue-400">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.currentSkills?.map((skill: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-600/30 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Friend's Profile Form */}
            <form onSubmit={handleBattle} className="mystical-card space-y-4">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-red-400 mr-2" />
                <h2 className="text-xl font-bold">Friend's Profile</h2>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={friendData.name}
                  onChange={(e) => setFriendData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Experience Level *</label>
                <select
                  required
                  value={friendData.experienceLevel}
                  onChange={(e) => setFriendData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner (0-1 years)</option>
                  <option value="Intermediate">Intermediate (1-3 years)</option>
                  <option value="Advanced">Advanced (3-5 years)</option>
                  <option value="Expert">Expert (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tech Goal *</label>
                <select
                  required
                  value={friendData.techGoal}
                  onChange={(e) => setFriendData(prev => ({ ...prev, techGoal: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                >
                  <option value="">Select goal</option>
                  <option value="Get First Job">Get First Tech Job</option>
                  <option value="Switch Career">Switch to Tech Career</option>
                  <option value="Level Up">Level Up Current Role</option>
                  <option value="Start Startup">Start My Own Startup</option>
                  <option value="Freelance">Become Freelancer</option>
                  <option value="FAANG">Join FAANG Company</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Learning Speed</label>
                <select
                  value={friendData.learningSpeed}
                  onChange={(e) => setFriendData(prev => ({ ...prev, learningSpeed: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                >
                  <option value="">Select speed</option>
                  <option value="Slow">Slow & Steady</option>
                  <option value="Medium">Medium Pace</option>
                  <option value="Fast">Fast Learner</option>
                  <option value="Lightning">Lightning Fast</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Behavior Style</label>
                <select
                  value={friendData.behavior}
                  onChange={(e) => setFriendData(prev => ({ ...prev, behavior: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                >
                  <option value="">Select style</option>
                  <option value="Analytical">Analytical & Logical</option>
                  <option value="Creative">Creative & Innovative</option>
                  <option value="Collaborative">Collaborative & Social</option>
                  <option value="Independent">Independent & Self-driven</option>
                  <option value="Detail-oriented">Detail-oriented & Perfectionist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skills</label>
                <div className="grid grid-cols-2 gap-1">
                  {skillOptions.slice(0, 8).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-2 py-1 rounded text-xs transition-all ${
                        friendData.currentSkills.includes(skill)
                          ? 'bg-red-600 text-white'
                          : 'bg-black/30 border border-red-500/30 hover:border-red-400'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Analyzing Battle...</span>
                  </div>
                ) : (
                  'Start Battle!'
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Battle Results */}
            <div className="mystical-card text-center">
              <h2 className="text-3xl font-bold mb-6">Battle Results</h2>
              
              {battleResult.winner && (
                <div className="mb-8">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    Winner: {battleResult.winner}
                  </h3>
                  <p className="text-gray-300">{battleResult.winnerReason}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">{user.fullName}</h4>
                  {battleResult.userA && (
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Score: {battleResult.userA.score}/100</li>
                      <li>• Strengths: {battleResult.userA.strengths?.join(', ')}</li>
                      <li>• Projected Salary: {battleResult.userA.salaryProjection}</li>
                    </ul>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-3">{friendData.name}</h4>
                  {battleResult.userB && (
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Score: {battleResult.userB.score}/100</li>
                      <li>• Strengths: {battleResult.userB.strengths?.join(', ')}</li>
                      <li>• Projected Salary: {battleResult.userB.salaryProjection}</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setBattleResult(null)
                  setFriendData({
                    name: '',
                    experienceLevel: '',
                    currentSkills: [],
                    techGoal: '',
                    learningSpeed: '',
                    behavior: ''
                  })
                }}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
              >
                Start New Battle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}