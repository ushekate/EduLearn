'use client';

import React from 'react';
import Navbar from '../components/header/navbar';
import { CheckCircle } from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            features: ['5 free courses', 'No certification'],
            bg: 'bg-gray-100',
        },
        {
            name: 'Pro',
            price: '₹499/month',
            features: ['Unlimited courses', 'Certification', 'Mentor support'],
            bg: 'bg-blue-100',
        },
        {
            name: 'Elite',
            price: '₹999/month',
            features: ['All Pro features', '1:1 mentoring', 'Priority support'],
            bg: 'bg-yellow-100',
        },
    ];

    return (
        <main className="element min-h-screen text-white font-sans">
            {/* Navbar */}
            <Navbar />

            <div className="px-6 flex flex-col items-center text-center text-gray-800">
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Transparent & Affordable Pricing
                    </h1>
                    <p className="text-lg text-gray-600">Choose a Plan That Fits Your Goals</p>
                </section>

                {/* Pricing Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl shadow-md text-center border hover:shadow-xl transition-all ${plan.bg}`}
                        >
                            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-4">{plan.price}</p>
                            <ul className="text-left mb-6 space-y-2 text-gray-700">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <CheckCircle /> <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition">
                                Choose {plan.name}
                            </button>
                        </div>
                    ))}
                </section>

                {/* Footer Quote */}
                <section className="text-center text-gray-600 text-lg">
                    <p>“No hidden fees. Cancel anytime.”</p>
                </section>
            </div>
        </main>
    );
}
