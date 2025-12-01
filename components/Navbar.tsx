'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/api'
import { User, LogOut, Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('tk_token')
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }
      const userData = await auth.getMe()
      setUser(userData.user)
    } catch {
      setUser(null)
      localStorage.removeItem('tk_token')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    auth.logout()
    setUser(null)
    window.location.href = '/'
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="border-b border-purple-500/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/dnk1sml4q/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1764597947/usnxak4odzc6syuzqkm7.png"
                alt="TechKundali.pro"
                width={48}
                height={48}
                className="rounded-full ring-2 ring-purple-400/50 hover:ring-purple-300 transition-all"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
            ) : user ? (
              <>
                <Link href="/dashboard" className="text-purple-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/predict" className="text-purple-300 hover:text-white transition-colors">
                  Predict
                </Link>
                <Link href="/resume" className="text-purple-300 hover:text-white transition-colors">
                  Resume
                </Link>
                <Link href="/interview-hub" className="text-purple-300 hover:text-white transition-colors">
                  Interview Hub
                </Link>
                <Link href="/pricing" className="text-purple-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <div className="flex items-center space-x-3 pl-4 border-l border-purple-500/30">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-purple-300">{user.fullName}</span>
                    {user.plan === 'premium' && (
                      <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-semibold">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-purple-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-purple-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/30 bg-black/40 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
                </div>
              ) : user ? (
                <>
                  <div className="px-3 py-2 border-b border-purple-500/30 mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-purple-400" />
                      <span className="text-sm text-purple-300">{user.fullName}</span>
                      {user.plan === 'premium' && (
                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-semibold">
                          PREMIUM
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/predict" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Predict
                  </Link>
                  <Link href="/resume" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Resume
                  </Link>
                  <Link href="/interview-hub" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Interview Hub
                  </Link>
                  <Link href="/pricing" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Pricing
                  </Link>
                  <button
                    onClick={() => { handleLogout(); closeMobileMenu(); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMobileMenu} className="block px-3 py-2 text-purple-300 hover:text-white hover:bg-purple-500/10 rounded-md transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" onClick={closeMobileMenu} className="block mx-3 my-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}