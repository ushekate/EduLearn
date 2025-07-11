'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BookOpen, GraduationCap, User, Users } from 'lucide-react';

export default function Home() {
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

  return (
    <main className="element min-h-screen text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 relative">
        <div className="text-2xl font-bold">
          <span className="flex gap-2 items-center text-black">
            <GraduationCap size={40} className="fill-black" /> EduLearn
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="text-lime-300 border-b-2 border-lime-300 pb-1">Home</a>
          <a href="#">Programs</a>
          <a href="#">Mentors</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>

        {/* Login Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowLoginDropdown(prev => !prev)}
            className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          >
            <span className="bg-lime-400 w-5 h-5 rounded-full grid place-content-center text-black">
              <User size={18} />
            </span>
            Log In
          </button>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg z-50 overflow-hidden">
              <a href="/students/login" className="block px-2 py-2 text-sm hover:text-lime-400">👨‍🎓 Student Login</a>
              <a href="/teachers/login" className="block px-2 py-2 text-sm hover:text-lime-400">👩‍🏫 Teacher Login</a>
              <a href="/parents/login" className="block px-2 py-2 text-sm hover:text-lime-400">👨‍👩‍👧 Parents Login</a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10 py-16 text-white">
        {/* Left content */}
        <div>
          <p className="mb-2 text-sm">Your Online Learning Partner</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Learn, Grow, and Achieve with <br />
            <span className="text-lime-300">Expert</span> Guidance
          </h1>
          <p className="mb-6 text-sm text-white/90 max-w-lg">
            Access high-quality courses anytime, anywhere, and take control of your learning journey with ease.
          </p>

          {/* Reviews */}
          <div className="flex items-center mt-8 space-x-4">
            <div className="flex -space-x-2">
              <Image src="/profileImage.png" alt="student1" width={32} height={32} className="rounded-full border-2 border-white" />
              <Image src="/AnimeImage.jpeg" alt="student2" width={32} height={32} className="rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Student Review</p>
              <p className="text-xs text-white/70">Based on more than 10,000 feedbacks</p>
            </div>
            <div className="bg-black text-lime-300 px-2 py-1 rounded-full text-sm font-bold">4.8</div>
          </div>
        </div>

        {/* Right image and stats */}
        <div className="relative flex justify-center items-center">
          <Image
            src="/student.png"
            alt="student thumbs up"
            width={600}
            height={750}
            className="rounded-xl"
          />
          {/* Stats */}
          <div className="absolute top-1 right-34 bg-white/10 backdrop-blur-md p-3 rounded-md">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <div>
                <p className="text-sm">Total Courses</p>
                <p className="font-semibold">1200+</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 right-20 bg-white/10 backdrop-blur-md p-3 rounded-md">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <div>
                <p className="text-sm">Total Instructors</p>
                <p className="font-semibold">400+</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-40 left-8 bg-white/10 backdrop-blur-md p-3 rounded-md">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <div>
                <p className="text-sm">Total Students</p>
                <p className="font-semibold">20,000+</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
