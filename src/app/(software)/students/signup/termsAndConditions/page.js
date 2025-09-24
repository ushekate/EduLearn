'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-300 to-purple-800 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 bg-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-200 text-purple-700 p-2 rounded-full mr-3">📜</div>
            <h1 className="text-2xl font-bold text-purple-800">Terms and Conditions</h1>
          </div>
          <p className="text-sm text-purple-600 mt-2">Last updated: September 12, 2025</p>
        </div>

        <div className="px-8 py-6 text-gray-800 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-sm leading-relaxed">
              Welcome to EduLearn, an online education platform designed for students from 5th to 12th grade. By accessing or using our website (the "Service"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. User Eligibility</h2>
            <p className="text-sm leading-relaxed">
              You must be at least 13 years old to use the Service. Students under 18 must have parental consent. By signing up, you confirm that you meet these requirements and that all information provided is accurate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Account and Security</h2>
            <p className="text-sm leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials. EduLearn is not liable for unauthorized access due to your negligence. Notify us immediately of any suspected breach.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Use of Service</h2>
            <p className="text-sm leading-relaxed">
              The Service is for educational purposes only. You agree not to:
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                <li>Upload harmful or illegal content.</li>
                <li>Impersonate others or misuse the platform.</li>
                <li>Attempt to hack or disrupt the Service.</li>
                <li>Share your account with others.</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              All content on EduLearn, including lessons, materials, and designs, is owned by EduLearn or its licensors. You may not reproduce, distribute, or modify it without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Privacy</h2>
            <p className="text-sm leading-relaxed">
              Your privacy is important. Please review our <Link href="/privacy-policy" className="text-purple-600 underline">Privacy Policy</Link> for details on how we collect and use your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to suspend or terminate your account for violations of these terms. You may close your account at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Disclaimer and Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              EduLearn provides the Service "as is." We disclaim all warranties and are not liable for any indirect damages. Educational content is for guidance only; consult professionals for specific advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
            <p className="text-sm leading-relaxed">
              These terms are governed by the laws of [Your Jurisdiction, e.g., United States]. Any disputes will be resolved in [Your Jurisdiction] courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
            <p className="text-sm leading-relaxed">
              We may update these terms periodically. Continued use of the Service after changes constitutes acceptance.
            </p>
          </section>

          <div className="border-t pt-4 mt-6">
            <p className="text-sm text-gray-500">
              If you have questions, contact us at <a href="mailto:support@edulearn.com" className="text-purple-600 underline">support@edulearn.com</a>.
            </p>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 text-center">
          <Link href="/students/signup" className="text-purple-600 underline hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}