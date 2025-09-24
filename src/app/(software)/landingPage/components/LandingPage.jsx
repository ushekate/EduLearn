'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BookOpen, GraduationCap, User, Users, Video, FileText, Award } from 'lucide-react';
import QuoteCarousel from './QuoteCarousel';
import Navbar from '@/app/components/header/navbar';
import Footer from '@/app/components/Bottom/footer';


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

  const blogPosts = [
    {
      title: '5 Study Hacks to Ace Online Learning',
      description: 'Boost your productivity and focus while studying remotely.',
    },
    {
      title: 'Top Programming Languages to Learn in 2025',
      description: 'Stay ahead in tech by mastering the most in-demand skills.',
    },
    {
      title: 'How EduLearn Students Landed Jobs at Google & Amazon',
      description: 'Read inspiring success stories of our top achievers.',
    },
    {
      title: 'Balancing School & Online Courses: A Parent’s Guide',
      description: 'Tips for parents to support their child’s learning journey.',
    },
  ];

  const resources = [
    {
      title: 'Video Tutorials',
      icon: <Video className="w-6 h-6 text-blue-600" />,
      description: 'Step-by-step learning through visual content.',
    },
    {
      title: 'eBooks & PDFs',
      icon: <FileText className="w-6 h-6 text-green-600" />,
      description: 'Downloadable study material and reference guides.',
    },
    {
      title: 'Industry News',
      icon: <BookOpen className="w-6 h-6 text-orange-600" />,
      description: 'Stay updated with the latest trends and developments.',
    },
    {
      title: 'Success Stories',
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      description: 'Get inspired by real stories from EduLearn students.',
    },
  ];

  return (
    <main className="min-h-screen text-white font-sans">
      <div className='element1'>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-10 py-16 pb-50 text-white">
        {/* Left content */}
        <div>
          <p className="mb-2 text-sm">Your Online Learning Partner</p>
          <QuoteCarousel />

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
      </div>
      <div className="bg-gray-200 px-6 flex flex-col items-center text-center py-20 text-gray-800">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Learning Resources & Blogs
          </h1>
          <p className="text-lg text-gray-600">
            Stay Updated with the Latest in Education & Technology
          </p>
        </section>

        {/* Blog Posts */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-black">Featured Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="element2 p-6 rounded-xl shadow hover:scale-105  transition">
                <h3 className="text-xl font-semibold text-black mb-2">{post.title}</h3>
                <p className="text-gray-800">{post.description}</p>
                <button className="mt-4 text-blue-600 hover:underline">Read More →</button>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-black">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="mr-4">{resource.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{resource.title}</h4>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
