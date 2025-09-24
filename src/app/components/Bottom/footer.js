'use client'

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 pb-6">
      <div className="bg-primary w-full px-4 py-20 flex flex-col justify-center items-center text-center">
                <h1 className="text-white text-2xl sm:text-3xl font-sans font-semibold">We Are Here To Talk</h1>
                <p className="text-gray-300 mt-3 max-w-xl">
                    Have questions about our services? Our expert team is here to help you with any inquiries.
                </p>
                <Link href="/contact">
                    <button className="text-light-primary bg-white py-1.5 px-4 mt-4 rounded-md">
                        Contact Us
                    </button>
                </Link>
            </div>
      <div className="max-w-full pt-10 text-white mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About EduLearn */}
        <div>
          <h3 className="text-xl font-bold mb-4">EduLearn</h3>
          <p className="text-sm leading-relaxed">
            EduLearn is your trusted online learning platform offering live mentorship, certification, and real-world projects to help you upskill.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/programs" className="hover:text-primary">Programs</Link></li>
            <li><Link href="/mentors" className="hover:text-primary">Mentors</Link></li>
            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link href="/blogs" className="hover:text-primary">Blogs</Link></li>
            <li><Link href="/faqs" className="hover:text-primary">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="flex gap-2 text-sm"><MapPin size={16} className="mt-1" /> Mumbai, India</p>
          <p className="flex gap-2 text-sm"><Mail size={16} className="mt-1" /> <a href="mailto:support@edulearn.com" className="hover:text-primary">support@edulearn.com</a></p>
          <p className="flex gap-2 text-sm"><Phone size={16} className="mt-1" /> +91 98765 43210</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-primary text-xl"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-primary text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SKZ TECH. All rights reserved.
      </div>
    </footer>
  );
}
