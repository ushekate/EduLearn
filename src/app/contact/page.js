'use client';

import React from 'react';
import Navbar from '../components/header/navbar';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BookOpen, GraduationCap, Mail, Phone, University, User, Users } from 'lucide-react';
import Footer from '../components/Bottom/footer';

export default function AboutUs() {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
        // You can integrate this with PocketBase, EmailJS, or your backend here
        setForm({ name: '', email: '', subject: '', message: '' });
    };

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
            {/* Navbar */}
            <Navbar />

            <section className="flex flex-col items-center text-center text-gray-800">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Get in Touch</h1>

                <div className="grid md:grid-cols-2 gap-10 mx-auto">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-xl min-w-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Details & Map */}
                    <div className="space-y-6 min-w-md">
                        <div className="bg-white p-6 shadow-md rounded-xl space-y-4">
                            <h2 className="text-2xl font-semibold text-blue-600">Contact Details</h2>
                            <p><strong className="flex justify-center gap-2"><University />EduLearn HQ</strong><br /><span className=''>2nd Floor, Knowledge Park, Mumbai, India</span></p>
                            <p><strong className="flex justify-center gap-2"><Phone />+91 98765 43210</strong></p>
                            <p><strong className="flex justify-center gap-2"><Mail />support@edulearn.com</strong></p>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.322496449222!2d73.10552657466877!3d19.224771847286235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be795db1132d721%3A0x4084164d4a6d662c!2sFortune%20Heights!5e0!3m2!1sen!2sin!4v1754133379356!5m2!1sen!2sin"
                                width="100%"
                                height="260"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="EduLearn Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
