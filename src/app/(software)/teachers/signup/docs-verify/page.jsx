'use client';

import { useState } from 'react';
import pbstudent from '@/lib/db';

export default function DocumentVerification() {
  const [form, setForm] = useState({
    aadhar_card: null,
    pan_card: null,
    qualification_certificate: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();

    Object.entries(form).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const userId = pbstudent.authStore.model.id;
      await pbstudent.collection('teachers').update(userId, formData);
      setSuccess('Documents uploaded successfully.');
    } catch (err) {
      setError(err.message || 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">Document Verification</h2>
          <p className="text-center text-sm text-gray-500">
            Upload your documents to complete your teacher profile.
          </p>

          <div>
            <label className="block text-sm font-medium mb-1">Aadhar Card (PDF or Image)</label>
            <input
              type="file"
              name="aadhar_card"
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PAN Card</label>
            <input
              type="file"
              name="pan_card"
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Qualification Certificate</label>
            <input
              type="file"
              name="qualification_certificate"
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Submit Documents
          </button>
        </form>
      </div>

      {/* Right: Image and Text Section */}
      <div className="w-full md:w-1/2 bg-green-50 flex flex-col items-center justify-center p-10 text-center">
        <img
          src="/gallaryImages/profileImage.png"
          alt="Teacher Verification"
          className="w-48 h-48 mb-6"
        />
        <h3 className="text-3xl font-semibold text-green-800 mb-2">Verify Your Identity</h3>
        <p className="text-gray-700 text-sm max-w-md">
          To maintain the quality and trust of our education platform, we require all teachers to
          verify their identity with valid documentation. This process is quick, secure, and
          necessary before gaining access to your dashboard.
        </p>
      </div>
    </div>
  );
}
