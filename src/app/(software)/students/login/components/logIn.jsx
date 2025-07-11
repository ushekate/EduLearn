'use client';
import { Eye, EyeOff, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import pbstudent from "@/lib/db";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await pbstudent.collection('students').authWithPassword(email, password);

            if (rememberMe) {
                localStorage.setItem('rememberEmail', email);
            } else {
                localStorage.removeItem('rememberEmail');
            }

            router.push('/students/welcome');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetMessage('');
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });

            const data = await res.json();

            if (res.ok) {
                setResetMessage('✅ Reset link sent to your email.');
                setResetEmail('');
            } else {
                setResetMessage(`❌ ${data.error}`);
            }
        } catch (err) {
            console.error(err);
            setResetMessage('❌ Failed to send reset email. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800 relative">

            {/* Forgot Password Modal */}
            {showReset && (
                <div className="absolute z-10 bg-black/80 inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg relative">
                        <button onClick={() => {
                            setShowReset(false);
                            setResetMessage('');
                        }} className="absolute right-3 top-3 text-gray-500 hover:text-black">
                            <X />
                        </button>
                        <h2 className="text-lg font-semibold mb-3">Reset Your Password</h2>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <input
                                type="email"
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Enter your registered email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                            >
                                Send Reset Link
                            </button>
                            {resetMessage && <p className="text-sm text-center text-green-600">{resetMessage}</p>}
                        </form>
                    </div>
                </div>
            )}

            {/* Login Form */}
            <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden z-0">
                <div className="w-full text-black shadow-2xl p-8">
                    <div className="flex items-center justify-center">
                        <h2 className="text-xl font-bold ml-2">Welcome Back</h2>
                    </div>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Sign In to access your learning dashboard
                    </p>

                    <form onSubmit={handleLogin} autoComplete="on" className="space-y-4 text-black">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email or Username</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email or username"
                                className="text-black w-full border rounded px-3 py-2 mt-1"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="text-black w-full border rounded px-3 py-2 mt-1"
                                autoComplete="current-password"
                                required
                            />
                            <div
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="remember" className="text-sm mt-0.5 text-gray-500">Remember Me</label>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowReset(true)}
                                    className="text-sm text-purple-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
                        >
                            Log In
                        </button>

                        <p className="text-sm text-center mt-2">
                            Don't have an account? <a href="/students/signup" className="text-purple-600 underline">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Section Image */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white px-4 pt-4">
                <div className='p-4'>
                    <h2 className="text-6xl font-bold mb-2">Welcome to</h2>
                    <h3 className="text-6xl font-medium mb-2">student portal</h3>
                    <p className="text-sm">Login to access your account</p>
                </div>
                <div className='flex justify-center items-center'>
                    <img src="/edulearnImage.png" alt="Student" className="w-[80%] h-[80%]" />
                </div>
            </div>
        </div>
    );
}
