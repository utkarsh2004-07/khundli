'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react'

export default function PaymentSuccessPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const plan = searchParams.get('plan')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate a brief loading period
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const planDetails = {
        basic: {
            name: 'Basic Pro',
            price: '₹1',
            features: [
                '10 Resume Analyses',
                '10 Tech Predictions',
                '20 Interview Questions'
            ]
        },
        premium: {
            name: 'Premium Unlimited',
            price: '₹1',
            features: [
                'Unlimited Resume Analyses',
                'Unlimited Predictions',
                'Unlimited Interview Prep'
            ]
        }
    }

    const currentPlan = planDetails[plan as keyof typeof planDetails] || planDetails.basic

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <Loader2 className="h-16 w-16 text-purple-400 animate-spin mx-auto mb-4" />
                    <p className="text-xl text-gray-300">Processing your payment...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-2xl w-full">
                {/* Success Card */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-green-500/50 rounded-2xl p-8 md:p-12 text-center shadow-xl">
                    {/* Success Icon */}
                    <div className="mb-6">
                        <CheckCircle className="h-20 w-20 text-green-400 mx-auto animate-bounce" />
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Payment Successful! 🎉
                    </h1>

                    <p className="text-xl text-gray-300 mb-8">
                        Welcome to <span className="font-bold text-purple-400">{currentPlan.name}</span>
                    </p>

                    {/* Plan Details */}
                    <div className="bg-slate-900/50 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">Plan:</span>
                            <span className="text-white font-bold text-xl">{currentPlan.name}</span>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-400">Amount Paid:</span>
                            <span className="text-green-400 font-bold text-2xl">{currentPlan.price}</span>
                        </div>

                        <div className="border-t border-slate-700 pt-4">
                            <p className="text-sm text-gray-400 mb-3">You now have access to:</p>
                            <ul className="space-y-2">
                                {currentPlan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center justify-center text-green-400">
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                            Go to Dashboard
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>

                        <Link
                            href="/predict"
                            className="w-full inline-block bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                        >
                            Start Your First Prediction
                        </Link>
                    </div>

                    {/* Confirmation Note */}
                    <p className="mt-8 text-sm text-gray-400">
                        A confirmation email has been sent to your registered email address.
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Need help? <Link href="/settings" className="text-purple-400 hover:text-purple-300">Contact Support</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
