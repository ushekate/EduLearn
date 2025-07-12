'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const courses = ['Mathematics', 'Science', 'English'];
const modes = ['Online', 'Offline', 'Hybrid'];
const repeats = ['Daily', 'Weekly'];

export default function ClassModal({ onClose }) {
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    date: '',
    time: '',
    duration: '',
    mode: 'Online',
    location: '',
    repeat: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded-md p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X />
        </button>
        <h2 className="text-xl font-bold text-purple-700 mb-4">Add / Edit Class</h2>
        <form className="space-y-4">
          <select name="course" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Select Course</option>
            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <input type="text" name="title" placeholder="Topic/Title" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <input type="date" name="date" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <input type="time" name="time" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <input type="text" name="duration" placeholder="Duration (e.g. 1 hr 30 mins)" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <select name="mode" onChange={handleChange} className="w-full border rounded px-3 py-2">
            {modes.map(m => <option key={m}>{m}</option>)}
          </select>
          <input type="text" name="location" placeholder="Location / Join Link" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <select name="repeat" onChange={handleChange} className="w-full border rounded px-3 py-2">
            {repeats.map(r => <option key={r}>{r}</option>)}
          </select>
          <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
