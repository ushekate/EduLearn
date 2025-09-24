'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
      <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
        <div className="w-full text-black shadow-2xl px-8 py-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 text-green-700 p-2 rounded-full">✅</div>
            <h2 className="text-xl font-bold ml-2">Registration Successful</h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm mb-4">Congratulations! Your registration is complete.</p>
          <button
            onClick={() => router.push('/students/login')}
            className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}