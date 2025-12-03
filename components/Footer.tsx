import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="border-t border-purple-500/30 bg-black/20 backdrop-blur-sm mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Tech Kundli
                        </h3>
                        <p className="text-sm text-purple-300/80">
                            AI-powered career predictions and resume analysis
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-purple-300/80">
                                <Phone className="h-4 w-4" />
                                <a href="tel:8459225202" className="hover:text-purple-300 transition-colors">
                                    8459225202
                                </a>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-purple-300/80">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:us59908@gmail.com" className="hover:text-purple-300 transition-colors">
                                    us59908@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-purple-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/predict" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Predict
                                </Link>
                            </li>
                            <li>
                                <Link href="/resume" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Resume
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/interview-hub" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Interview Hub
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-purple-400">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cancellation" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Cancellation & Refund
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-sm text-purple-300/80 hover:text-purple-300 transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    {/* <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-purple-400">Address</h3>
                        <p className="text-sm text-purple-300/80 leading-relaxed">
                            B/107 Sidddheshwar apt.<br />
                            Opp. Nadhbrahma Soc.<br />
                            Achole Road, Alkapuri<br />
                            Vasai Nalasopara East<br />
                            Palghar, Maharashtra 401209
                        </p>
                    </div> */}
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-purple-500/20">
                    <p className="text-center text-sm text-purple-300/60">
                        © {new Date().getFullYear()} UTKARSH SINGH. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
