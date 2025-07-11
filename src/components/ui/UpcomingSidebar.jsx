'use client';

import { useEffect, useState } from 'react';
import { Users, CalendarDays, Clock } from 'lucide-react';

const mockUpcoming = [
  {
    id: 1,
    title: 'Algebra – Linear Equations',
    course: 'Mathematics',
    time: 'July 8, 10:00 AM – 11:00 AM',
    students: 24,
  },
  {
    id: 2,
    title: 'Photosynthesis Basics',
    course: 'Science',
    time: 'July 8, 12:00 PM – 1:00 PM',
    students: 19,
  },
];

export default function UpcomingSidebar() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setUpcoming(mockUpcoming);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h3 className="text-md font-semibold mb-4 flex items-center gap-2">
        <Clock size={18} className="text-purple-600" /> Upcoming Classes
      </h3>
      <div className="space-y-4">
        {upcoming.map(item => (
          <div key={item.id} className="border rounded-md p-3 hover:shadow-sm">
            <h4 className="text-sm font-bold text-purple-700">{item.title}</h4>
            <p className="text-xs text-gray-500 mb-1">{item.course}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CalendarDays size={14} /> {item.time}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
              <Users size={14} /> {item.students} Students
            </div>
            <button className="mt-2 text-xs text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md">Join Class</button>
          </div>
        ))}
      </div>
    </div>
  );
}
