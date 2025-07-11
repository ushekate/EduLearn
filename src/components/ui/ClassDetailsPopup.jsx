'use client';

import { X, Users, ClipboardList, Clock } from 'lucide-react';

export default function ClassDetailsPopup({ classData, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-lg relative overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X />
        </button>
        <h2 className="text-xl font-bold text-purple-700 mb-4">Class Details</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{classData.title}</h3>
            <p className="text-sm text-gray-500">{classData.course}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} /> {classData.time || '10:00 AM - 11:00 AM'}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} /> 24 Students Assigned
          </div>

          <div className="text-sm text-gray-700">
            <ClipboardList size={16} className="inline-block mr-1" /> Notes: <br />
            <p className="mt-1">{classData.notes || 'No notes added.'}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded">Take Attendance</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
