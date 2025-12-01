'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/api'
import { Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await auth.login(formData)
      localStorage.setItem('tk_token', response.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to access your Tech Destiny</p>
        </div>

        <form onSubmit={handleSubmit} className="mystical-card space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                Create your destiny
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}