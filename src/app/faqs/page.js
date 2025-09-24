'use client';

import React, { useState } from 'react';
import Navbar from '../components/header/navbar';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is EduLearn?',
    answer:
      'EduLearn is an online learning platform offering high-quality courses, live mentorship, and certifications.',
  },
  {
    question: 'Do I get a certificate after completing a course?',
    answer: 'Yes, all Pro and Elite plans include verified certificates.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade, downgrade, or cancel anytime.',
  },
  {
    question: 'Are the mentors verified?',
    answer: 'Yes, all mentors undergo a strict screening and training process.',
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <main className="element min-h-screen bg-white text-gray-800 font-sans">
      {/* Navbar */}
      <Navbar />

      <div className="px-6 py-16 max-w-3xl mx-auto">
        {/* Page Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything You Need to Know Before You Enroll
          </p>
        </section>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center w-full text-lg font-medium text-gray-900">
                  {item.question}
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-700">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
