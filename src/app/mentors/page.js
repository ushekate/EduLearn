'use client'
import React from 'react';
import Image from 'next/image';
import Navbar from '../components/header/navbar';
import Footer from '../components/Bottom/footer';

export default function AboutUs() {
    const mentors = [
        // {
        //     name: 'Dr. Pratik Singh',
        //     title: 'Business Analyst',
        //     experience: '5+ years',
        //     image: '/gallaryImages/UserBoy.png',
        // },
        {
            name: 'Prof. Unnati Shekate',
            title: 'Full Stack Developer',
            experience: '4+ years',
            image: '/gallaryImages/UserGirl.png',
        },
        // {
        //     name: 'Prof. Devanshu Umbare',
        //     title: 'UI/UX Designer',
        //     experience: '4+ years',
        //     image: '/gallaryImages/UserBoy.png',
        // },
        {
            name: 'Prof. Kasturi Tare',
            title: 'Web Developer',
            experience: '4+ years',
            image: '/gallaryImages/UserGirl.png',
        },
        // {
        //     name: 'Prof. Sahas Kamble',
        //     title: 'Full Stack Developer',
        //     experience: '4+ years',
        //     image: '/gallaryImages/UserBoy.png',
        // },
        // {
        //     name: 'Prof. Rohan Bhagit',
        //     title: 'Graphics Designer',
        //     experience: '4+ years',
        //     image: '/gallaryImages/UserBoy.png',
        // },
        {
            name: 'Er. Avinash Patil',
            title: 'AutoCAD Trainer',
            experience: '4+ years',
            image: '/gallaryImages/UserBoy.png',
        }
    ];

    return (
        <main className="element min-h-screen text-white font-sans">
            {/* Navbar */}
            <Navbar />

            <div className="px-6 flex flex-col items-center text-center text-gray-800">
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Meet Our Mentors</h1>
                    <p className="text-lg text-gray-600">Learn from Experts, Get Inspired for Life</p>
                </section>

                {/* Mentor Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {mentors.map((mentor, index) => (
                        <div key={index} className="card">
                            <div className="card-inner">
                                {/* Front Side */}
                                <div className="card-front">
                                    <div className="w-28 h-28 mx-auto mb-2 border rounded-full overflow-hidden">
                                        <Image
                                            src={mentor.image}
                                            alt={mentor.name}
                                            width={112}
                                            height={112}
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-center">{mentor.name}</h3>
                                    <p className="text-sm text-gray-600 text-center">{mentor.title}</p>
                                </div>

                                {/* Back Side */}
                                <div className="card-back">
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold">{mentor.name}</h3>
                                        <p className="text-sm">Experience: {mentor.experience}</p>
                                        <p className="text-sm">Expertise: {mentor.title}</p>
                                        <p className="text-xs mt-2">“Empowering learners to grow & succeed.”</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        // <div
                        //     key={index}
                        //     className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 hover:shadow-xl transition-all"
                        // >
                        //     <div className="w-32 h-32 mx-auto mb-4 border rounded-full overflow-hidden">
                        //         <Image
                        //             src={mentor.image}
                        //             alt={mentor.name}
                        //             width={128}
                        //             height={128}
                        //             className="object-cover"
                        //         />
                        //     </div>
                        //     <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        //     <p className="text-sm text-gray-600">{mentor.title}</p>
                        //     <p className="text-sm text-gray-500">{mentor.experience}</p>
                        // </div>
                    ))}
                </section>

                {/* Why Learn From Us */}
                <section className="bg-white py-10 px-6 rounded-xl shadow-md max-w-4xl mx-auto mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Why Learn From Us?</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                        <li>Personalized guidance</li>
                        <li>1:1 mentoring support</li>
                        <li>Practical experience sharing</li>
                    </ul>
                </section>

                {/* Testimonials / Quote */}
                <section className="text-center max-w-3xl mx-auto">
                    <blockquote className="text-xl italic text-gray-600">
                        “EduLearn mentors don’t just teach – they transform lives.”
                    </blockquote>
                </section>
            </div>

            <Footer />

            <style jsx>{`
                .card {
                    width: 220px;
                    height: 280px;
                    perspective: 1000px;
                    margin: auto;
                }

                .card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                }

                .card:hover .card-inner {
                    transform: rotateY(180deg);
                }

                .card-front,
                .card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 1rem;
                }

                .card-front {
                    z-index: 2;
                }

                .card-back {
                    background-color: #8b5cf6;
                    color: white;
                    transform: rotateY(180deg);
                }

                
                .animate-fade-up {
                    animation: fadeUp 0.8s ease-out both;
                }
                .animate-fade-left {
                    animation: fadeLeft 0.8s ease-out both;
                }
                .animate-fade-right {
                    animation: fadeRight 0.8s ease-out both;
                }
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes fadeRight {
                    from {
                        opacity: 0;
                        transform: translateX(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>


        </main>
    );
}
