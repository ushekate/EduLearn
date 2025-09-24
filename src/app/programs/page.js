'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/header/navbar';

export default function AboutUs() {
    const categories = [
        'Technology & Programming',
        'Science & Mathematics',
        'Arts & Design',
        'Business & Finance',
        'Test Preparation (JEE, NEET, SAT)',
    ];

    const features = [
        'Expert-led video sessions',
        'Hands-on assignments & quizzes',
        'Live Q&A and discussion forums',
        'Certifications upon completion',
    ];

    return (
        <main className="element min-h-screen text-white font-sans">
            {/* Navbar */}
            <Navbar />

            <div className="px-6 py-16 flex flex-col items-center text-center text-gray-800">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Explore Our Courses</h1>

                {/* Course Categories */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-600">Course Categories</h2>
                    <ul className="space-y-4 list-disc list-inside">
                        {categories.map((cat, index) => (
                            <li key={index} className="text-lg">
                                {cat}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Program Features */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-green-600">Program Features</h2>
                    <ul className="grid gap-6 md:grid-cols-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1" />
                                <span className="text-lg">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-blue-50 border border-blue-200 p-8 rounded-xl shadow-md max-w-3xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                        Not sure where to start?
                    </h3>
                    <p className="mb-6 text-gray-700 text-lg">
                        Take our Placement Quiz to find your ideal course!
                    </p>
                    <Link
                        href="/programs/Unnati"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-medium"
                    >
                        Take the Quiz
                    </Link>
                </section>
            </div>
        </main>
    );
}
