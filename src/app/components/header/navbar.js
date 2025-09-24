'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { BookOpen, GraduationCap, Menu, User, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

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

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY && currentY > 50) {
                // Scrolling down
                setShowNavbar(false);
            } else {
                // Scrolling up
                setShowNavbar(true);
            }

            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    return (
        <header className={`flex justify-between items-center px-10 py-4 mb-12 z-50 transition-transform duration-500 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            <nav className="absolute top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/20 flex justify-between items-center px-6 py-1 h-auto">
                {/* Logo */}
                <div className="flex items-center pt-2 px-2">
                    <Image
                        src="/icons/EduLearn.png"
                        width={150}
                        height={60}
                        alt="Logo"
                    />
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
                    </button>
                </div>

                {/* Nav Links */}
                <div
                    className={`absolute md:static top-20 right-0 w-3/4 md:w-auto transition-all duration-300 ease-in-out z-40
            ${menuOpen ? 'flex flex-col bg-white backdrop-blur-md shadow-lg rounded-l-lg p-6' : 'hidden'}
            md:flex md:flex-row md:items-center md:bg-transparent md:shadow-none md:p-0 space-y-4 md:space-y-0 md:space-x-10`}
                >
                    {[
                        { text: 'Home', href: '/landingPage' },
                        { text: 'About Us', href: '/about' },
                        // { text: 'Programs', href: '/programs' },
                        { text: 'Mentors', href: '/mentors' },
                        // { text: 'Pricing', href: '/pricing' },
                        { text: 'Contact Us', href: '/contact' },
                        // { text: 'FAQs', href: '/faqs' },
                        { text: 'Quiz', href: '/quiz' }
                    ].map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            className={`cursor-pointer text-lg font-semibold transition-all duration-200 hover:underline ${pathname === item.href
                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-orange-300 underline'
                                    : 'text-black'
                                }`}
                        >
                            {item.text}
                        </Link>

                        // <Link
                        //     key={i}
                        //     href={item.href}
                        //     className={`cursor-pointer text-lg font-semibold transition-all duration-200 hover:underline hover:text-primary ${pathname === item.href ? 'text-primary underline' : 'text-foreground'
                        //         }`}
                        // >
                        //     {item.text}
                        // </Link>
                    ))}

                    {/* Login Button with Dropdown */}
                    <div className="relative pl-20" ref={dropdownRef}>
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

                </div>
            </nav>
        </header>
    )
}


