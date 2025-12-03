import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Shipping & Delivery Policy - Tech Kundli',
    description: 'Shipping and Delivery Policy for Tech Kundli services',
}

export default function ShippingPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mystical-card tech-glow">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Shipping & Delivery Policy
                </h1>
                <p className="text-sm text-purple-300/60 mb-8">Last updated on Dec 2nd 2025</p>

                <div className="prose prose-invert prose-purple max-w-none space-y-6 text-purple-100/90">
                    <p>
                        For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.
                    </p>

                    <p>
                        Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
                    </p>

                    <p>
                        UTKARSH SINGH is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
                    </p>

                    <p>
                        Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
                    </p>

                    <p>
                        For any issues in utilizing our services you may contact our helpdesk:
                    </p>

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 my-6">
                        <h3 className="text-xl font-semibold text-purple-300 mb-4">Contact Us</h3>
                        <div className="space-y-2">
                            <p className="flex items-center space-x-2">
                                <span className="text-purple-400 font-medium">Phone:</span>
                                <a href="tel:8459225202" className="text-purple-300 hover:text-white transition-colors">
                                    8459225202
                                </a>
                            </p>
                            <p className="flex items-center space-x-2">
                                <span className="text-purple-400 font-medium">Email:</span>
                                <a href="mailto:us59908@gmail.com" className="text-purple-300 hover:text-white transition-colors">
                                    us59908@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
