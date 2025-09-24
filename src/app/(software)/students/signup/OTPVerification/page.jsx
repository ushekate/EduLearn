'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import pbstudent from '@/lib/db';

export default function OTPVerification() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const otpId = searchParams.get('otpId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            // Verify OTP using authWithOTP
            await pbstudent.collection('students').authWithOTP(otpId, otp);

            alert('OTP verified successfully! You can now log in.');
            router.push('/students/signup/Success');
        } catch (err) {
            console.error('OTP verification failed:', err);
            setError('Invalid OTP or verification failed. Please try again.');
        }
    };

    const handleResendOTP = async () => {
        try {
            const otpResult = await pbstudent.collection('students').requestOTP(email);
            if (otpResult.otpId) {
                alert('A new OTP has been sent to your email.');
                router.push(
                    `/students/signup/OTPVerification?email=${encodeURIComponent(email)}&otpId=${encodeURIComponent(otpResult.otpId)}`
                );
            }
        } catch (err) {
            console.error('Resend OTP failed:', err);
            setError('Failed to resend OTP. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
            <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
                <div className="w-full text-black shadow-2xl px-8 py-4">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🔐</div>
                        <h2 className="text-xl font-bold ml-2">Verify OTP</h2>
                    </div>

                    <p className="text-sm text-center mb-4">
                        A 6-digit OTP was sent to <strong>{email}</strong>. Please enter it below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">OTP</label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="text-black w-full border rounded px-3 py-1 mt-1"
                                maxLength={6}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition"
                        >
                            Verify OTP
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOTP}
                            className="w-full bg-gray-500 text-white py-1 rounded hover:bg-gray-600 transition mt-2"
                        >
                            Resend OTP
                        </button>

                        <p className="text-sm text-center mt-2">
                            Back to <a href="/students/signup" className="text-purple-600 underline">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}