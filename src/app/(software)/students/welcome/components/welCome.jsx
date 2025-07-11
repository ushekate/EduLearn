'use client';
import { ArrowRight, Building, CalendarCheck, ChartLine, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { FaRocket } from "react-icons/fa6";


export default function Welcome() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
            <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl">

                {/* Left Form Section */}
                <div className="w-full text-black shadow-2xl p-8">
                    <div>
                        <div className='rounded-full p-2 bg-purple-200 w-fit mb-4'>
                            <FaRocket size={25} className='text-purple-600' />
                        </div>
                        <div className="flex">
                            <h2 className="text-2xl font-bold mb-1">Welcome to Edulearn!</h2>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm text-gray-500">
                                Your gateway to Innovative learning experiences and academic excellence.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className='flex rounded bg-purple-100 p-2 gap-2 mb-4'>
                            <div><Building size={30} className='mt-2' /></div>
                            <div className="">
                                <p>Institution:</p>
                                <p className='text-xl font-medium'>EduTech Learning Institute</p>
                            </div>
                        </div>

                        <div className='flex rounded bg-purple-100 p-2 gap-2'>
                            <div><Mail size={30} className='mt-2' /></div>
                            <div className="">
                                <p>Contact:</p>
                                <p className='text-xl font-medium'>support@edutech.com</p>
                            </div>
                        </div>
                    </div>


                    <div className='mt-8'>
                        <h2 className='text-lg font-bold mb-2'>Quick Links</h2>
                        <div>
                            <div className='flex justify-between rounded bg-purple-200 p-2 mb-4'>
                                <div className='flex gap-2'>
                                    <ChartLine />
                                    <p>Dashboard</p>
                                </div>
                                <div>
                                    <button>
                                        <a href="/students/dashboard">
                                            <ArrowRight />
                                        </a>
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between rounded bg-purple-200 p-2'>
                                <div className='flex gap-2'>
                                    <CalendarCheck />
                                    <p>Assignments</p>
                                </div>
                                <div>
                                    <button>
                                        <a href="/students/assignments">
                                            <ArrowRight />
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Right Welcome Section */}
            <div className="hidden  md:flex flex-col justify-center items-center w-1/2 bg-trasparent text-white px-4 pt-4">
                <div className='p-4'>
                    <h2 className="text-6xl font-bold mb-2">Welcome to</h2>
                    <h3 className="text-6xl font-medium mb-2">student portal</h3>
                    <p className="text-sm">Login to access your account</p>
                </div>

                {/* Placeholder illustration */}
                <div className='flex justify-center items-center'>
                    <img src="/edulearnImage.png" alt="Student" className="h-[80%] w-[80%]" />
                </div>
            </div>

        </div>
    );
}
