'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, Crown, Sparkles, Zap, X, Loader2 } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    // Check if user is logged in
    const token = localStorage.getItem('tk_token')
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8787'}/api/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(() => setUser(null))
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async (planType: 'basic' | 'premium') => {
    const token = localStorage.getItem('tk_token')
    if (!token) {
      router.push('/login?redirect=/pricing')
      return
    }

    setLoading(planType)

    try {
      // Create order
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8787'}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ planType })
      })

      if (!orderRes.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderRes.json()

      // Configure Razorpay options
      const options = {
        key: 'rzp_test_RmiEgx4rUdrcQO', // Your test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Tech Kundali',
        description: `${planType === 'basic' ? 'Basic' : 'Premium'} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Payment successful, verify on backend
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8787'}/api/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })

            if (verifyRes.ok) {
              router.push('/payment-success?plan=' + planType)
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          } catch (error) {
            console.error('Verification error:', error)
            alert('Payment verification failed. Please contact support.')
          } finally {
            setLoading(null)
          }
        },
        prefill: {
          name: user?.fullName || '',
          email: user?.email || ''
        },
        theme: {
          color: '#9333ea'
        },
        modal: {
          ondismiss: function () {
            setLoading(null)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setLoading(null)
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: 0,
      icon: Sparkles,
      color: 'purple',
      features: [
        '1 Resume Analysis',
        '1 Tech Prediction',
        '5 Interview Questions',
        'Basic Career Insights',
        'Tech Zodiac Sign',
        'Limited Company Matching'
      ],
      limitations: [
        'No resume gap analysis',
        'Limited predictions',
        'Basic features only'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Pro',
      price: 69,
      period: '', // One-time / Credit pack
      icon: Zap,
      color: 'blue',
      popular: true,
      features: [
        '10 Resume Analyses',
        '10 Tech Predictions',
        '20 Interview Questions',
        'Advanced Career Insights',
        'Resume Gap Analysis',
        'Learning Roadmap'
      ],
      limitations: []
    },
    {
      id: 'premium',
      name: 'Premium Unlimited',
      price: 99,
      period: '/month',
      icon: Crown,
      color: 'yellow',
      features: [
        'Unlimited Resume Analyses',
        'Unlimited Tech Predictions',
        'Unlimited Interview Questions',
        'Full Tech Kundali',
        'Company Compatibility',
        'Battle Destiny Mode',
        'Priority Support'
      ],
      limitations: []
    }
  ]

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock your tech destiny with AI-powered career insights and resume analysis
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isCurrentPlan = user?.plan === plan.id

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 backdrop-blur-sm border-2 transition-all hover:scale-105 ${plan.popular
                  ? 'bg-gradient-to-br from-blue-900/80 to-purple-900/80 border-blue-500 shadow-xl shadow-blue-500/20'
                  : 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      CURRENT PLAN
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon className={`h-12 w-12 text-${plan.color}-400 mx-auto mb-4`} />
                  <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                    {plan.price > 0 && <span className="text-gray-400">/year</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={`lim-${i}`} className="flex items-start opacity-50">
                      <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {plan.id === 'free' ? (
                  <Link
                    href={user ? '/dashboard' : '/signup'}
                    className="w-full block text-center bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-colors text-white"
                  >
                    {user ? 'Go to Dashboard' : 'Get Started Free'}
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePayment(plan.id as 'basic' | 'premium')}
                    disabled={loading !== null || isCurrentPlan}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${isCurrentPlan
                      ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                      : plan.popular
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      }`}
                  >
                    {loading === plan.id ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Processing...
                      </>
                    ) : isCurrentPlan ? (
                      'Current Plan'
                    ) : (
                      `Upgrade to ${plan.name}`
                    )}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-purple-400 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-300">We accept all major credit/debit cards, UPI, and net banking through Razorpay.</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 mb-2">Can I upgrade or downgrade anytime?</h4>
              <p className="text-gray-300">Yes, you can upgrade your plan anytime. Downgrades take effect at the end of your billing cycle.</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 mb-2">Is my payment information secure?</h4>
              <p className="text-gray-300">Absolutely! All payments are processed securely through Razorpay with industry-standard encryption.</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-400 mb-2">What happens when I reach my limit?</h4>
              <p className="text-gray-300">You'll be notified and can upgrade your plan to continue using the service without interruption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}