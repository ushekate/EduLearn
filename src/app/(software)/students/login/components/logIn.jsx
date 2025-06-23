'use client';
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
            <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">

                {/* Left Form Section */}
                <div className="w-full text-black shadow-2xl p-8">
                    <div className="flex items-center justify-center">
                        <h2 className="text-xl font-bold ml-2">Welcome Back</h2>
                    </div>
                    <div className="mb-6">
                        <p className="text-sm text-center text-gray-500">
                            Sign In to access your learning dashboard
                        </p>
                    </div>

                    <form className="space-y-4 text-black">
                        <div>
                            <label className="block text-sm font-medium">Email or Username</label>
                            <input type="email" placeholder="Enter your email or username" className="text-black w-full border rounded px-3 py-2 mt-1" />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium">Password</label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="text-black w-full border rounded px-3 py-2 mt-1" />
                            <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <div>
                                    <input type="checkbox" className="mr-2" name="" id="remember" />
                                </div>
                                <label htmlFor="remember" className="text-sm mt-0.5 text-gray-500">Remember Me</label>
                            </div>
                            <div>
                                <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition">
                            <a href="/students/welcome">Log In</a>
                        </button>

                        <p className="text-sm text-center mt-2">
                            Don't have an account? <a href="/students/signup" className="text-purple-600 underline">Sign Up</a>
                        </p>
                    </form>
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
                    <img src="/edulearnImage.png" alt="Student" className="w-[80%] h-[80%]" />
                </div>
            </div>

        </div>
    );
}
