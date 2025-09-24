'use client';

import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import pbstudent from '@/lib/db';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    level: '',
    avatar: null,
  });
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('passwordConfirm', formData.confirm_password);
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('level', formData.level);
    if (formData.avatar) formDataToSend.append('profile_pic', formData.avatar); // Match schema field name

    try {
      // Create the student record
      await pbstudent.collection('students').create(formDataToSend);

      // Request OTP for the email
      const otpResult = await pbstudent.collection('students').requestOTP(formData.email);

      if (!otpResult.otpId) {
        throw new Error('Failed to generate OTP');
      }

      alert('Signup successful! Check your email for a 6-digit OTP.');

      // Redirect to OTP verification page
      router.push(
        `/students/signup/OTPVerification?email=${encodeURIComponent(formData.email)}&otpId=${encodeURIComponent(otpResult.otpId)}`
      );
    } catch (err) {
      console.error('Signup or OTP request failed:', err);
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
      <div className="bg-white rounded-xl mx-4 my-5 md:w-[30%] sm:w-full max-w-5xl overflow-hidden">
        <div className="w-full text-black shadow-2xl px-8 py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">🎓</div>
            <h2 className="text-xl font-bold ml-2">Sign-Up Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 text-black">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
                required
              />
              <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
                required
              />
              <div className="absolute right-3 top-9 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Student Level</label>
              <div className="relative">
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="appearance-none text-black w-full border rounded px-3 py-1 mt-1 pr-10 cursor-pointer"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 top-2 flex items-center">
                  <ChevronDown size={20} className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/png,image/vnd.mozilla.apng,image/jpeg"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setFormData({ ...formData, avatar: file });
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="text-black w-full border rounded px-3 py-1 mt-1"
              />
            </div>

            {/* <div className="flex items-center text-sm">
              <input type="checkbox" className="text-black mr-2" required />
              <span>
                I agree to the <a href="#" className="text-purple-600 underline">Terms and Conditions</a>
              </span>
            </div> */}

            <div className="flex items-center text-sm">
              <input type="checkbox" className="text-black mr-2" required />
              <span>
                I agree to the{' '}
                <Link href="/termsAndConditions" className="text-purple-600 underline">
                  Terms and Conditions
                </Link>
              </span>
            </div>

            <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
              Sign Up
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account? <a href="/students/login" className="text-purple-600 underline">Log In</a>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden sm:hidden md:flex flex-col justify-center items-center w-1/2 bg-transparent text-white px-4 pt-4">
        <div className="px-4">
          <h2 className="text-6xl font-bold mb-2">Welcome to</h2>
          <h3 className="text-6xl font-medium mb-2">student portal</h3>
          <p className="text-sm">Login to access your account</p>
        </div>
        <div className="flex justify-center items-center">
          <img src="/edulearnImage.png" alt="Student" className="w-[80%] h-[80%]" />
        </div>
      </div>
    </div>
  );
}

