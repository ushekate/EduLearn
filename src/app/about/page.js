'use client';

import React from 'react';
import Navbar from '../components/header/navbar';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BookOpen, CheckCircle, GraduationCap, HeartHandshake, Lightbulb, Target, User, Users } from 'lucide-react';
import Footer from '../components/Bottom/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AboutUs() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const [isOpen, setIsOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim() !== '') {
      router.push(`/about/${studentName}`);
    }
  };


  return (
    <main className="min-h-screen text-white font-sans">
      <div className='element'>
        {/* Navbar */}
        <Navbar />
        <div className="px-6 py-27 flex flex-col items-center text-center text-gray-800">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
            Empowering Learning Through Innovation
          </h1>

          {/* Intro Content */}
          <p className="max-w-3xl text-lg md:text-xl mb-12">
            EduLearn is committed to transforming education by making quality learning accessible to all.
            With a wide range of expert-led courses, personalized mentorship, and interactive content,
            we aim to ignite curiosity and help learners achieve their dreams.
          </p>

          {/* What We Offer Section */}
          <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Card */}
            <div className="p-6 shadow-md border rounded-2xl bg-gradient-to-r from-blue-50 to-white hover:shadow-lg transition-all">
              <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">1200+ Courses</h2>
              <p className="text-sm text-gray-600">Explore a vast library of expert-led courses across multiple disciplines.</p>
            </div>

            {/* Instructors Card */}
            <div className="p-6 shadow-md border rounded-2xl bg-gradient-to-r from-purple-50 to-white hover:shadow-lg transition-all">
              <GraduationCap className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">400+ Instructors</h2>
              <p className="text-sm text-gray-600">Learn from certified and passionate educators and professionals.</p>
            </div>

            {/* Learners Card */}
            <div className="p-6 shadow-md border rounded-2xl bg-gradient-to-r from-green-50 to-white hover:shadow-lg transition-all">
              <Users className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">20,000+ Learners</h2>
              <p className="text-sm text-gray-600">Join a thriving community of learners achieving their goals every day.</p>
            </div>
          </section>
        </div>
      </div>


      <div className='elements px-6 py-5 pb-20 flex flex-col items-center text-center text-gray-800'>
        {/* --- OUR MISSION --- */}
        <section className="w-full max-w-5xl my-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Our Mission</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Our mission is to bridge the educational gap by delivering affordable, engaging, and personalized learning experiences to everyone,
            everywhere. We strive to foster a global community where knowledge and skills fuel lifelong success.
          </p>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="w-full max-w-5xl mt-16">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Why Choose EduLearn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl border shadow-sm bg-white hover:shadow-md transition">
              <Lightbulb className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Innovative Learning</h3>
              <p className="text-sm text-gray-600">Interactive tools, quizzes, and real-world projects to enhance practical learning.</p>
            </div>
            <div className="p-6 rounded-2xl border shadow-sm bg-white hover:shadow-md transition">
              <HeartHandshake className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mentorship Support</h3>
              <p className="text-sm text-gray-600">One-on-one guidance from industry mentors to help you grow and stay motivated.</p>
            </div>
            <div className="p-6 rounded-2xl border shadow-sm bg-white hover:shadow-md transition">
              <Target className="h-10 w-10 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Career-Focused</h3>
              <p className="text-sm text-gray-600">Courses designed to build job-ready skills and unlock new career opportunities.</p>
            </div>
          </div>
        </section>
      </div>


      <div className="element px-6 py-10 flex flex-col items-center text-center text-gray-800">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Explore Our Courses</h1>

        {/* Course Categories */}
        <section className="mb-10">
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
        {/* <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-green-600">Program Features</h2>
                    <ul className="grid gap-6 md:grid-cols-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1" />
                                <span className="text-lg">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </section> */}

        {/* CTA Section */}
        <section className="text-center bg-blue-50 border border-blue-200 p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Not sure where to start?
          </h3>
          <p className="mb-6 text-gray-700 text-lg">
            Take our Placement Quiz to find your ideal course!
          </p>
          <button
            // href="/about/Unnati"
            onClick={() => setIsOpen(true)}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-medium"
          >
            Take the Quiz
          </button>

          {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Student Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                placeholder="Your name"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        </section>
      </div>
      <Footer />
    </main>
  );
}
