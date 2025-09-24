'use client';

import { useState } from 'react';
import pbstudent from '@/lib/db';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequestOTP = async () => {
    try {
      await pbstudent.collection('teachers').requestVerification(email);
      setMessage('Verification link sent to your email.');
      router.push('/teachers/signup/components/docs-verify');
    } catch (err) {
      setError(err.message || 'Failed to send verification email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleRequestOTP}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Send Verification Link
        </button>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
