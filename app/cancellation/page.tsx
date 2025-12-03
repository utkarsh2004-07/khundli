import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cancellation & Refund Policy - Tech Kundli',
    description: 'Cancellation and Refund Policy for Tech Kundli services',
}

export default function CancellationPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mystical-card tech-glow">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Cancellation & Refund Policy
                </h1>
                <p className="text-sm text-purple-300/60 mb-8">Last updated on Dec 2nd 2025</p>

                <div className="prose prose-invert prose-purple max-w-none space-y-6 text-purple-100/90">
                    <p>
                        UTKARSH SINGH believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Cancellations will be considered only if the request is made within Same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>

                        <li>UTKARSH SINGH does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>

                        <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within Same day of receipt of the products.</li>

                        <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within Same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>

                        <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>

                        <li>In case of any Refunds approved by the UTKARSH SINGH, it'll take 1-2 days for the refund to be processed to the end customer.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
