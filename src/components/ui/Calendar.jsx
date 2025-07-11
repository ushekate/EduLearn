'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Algebra – Linear Equations',
    course: 'Mathematics',
    date: new Date(),
    time: '10:00 AM - 11:00 AM',
    color: 'bg-purple-500',
  },
  {
    id: 2,
    title: 'Photosynthesis Basics',
    course: 'Science',
    date: new Date(),
    time: '12:00 PM - 1:00 PM',
    color: 'bg-yellow-400',
  },
];

export default function Calendar({ view = 'week', date, onDateChange, onEventClick }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  return (
    <div>
      {view === 'month' && (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="border p-2 rounded-md min-h-[100px]">
              <div className="text-xs text-gray-500 mb-1">{i + 1}</div>
              {events
                .filter(ev => ev.date.getDate() === i + 1)
                .map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => onEventClick?.(ev)}
                    className={`text-xs text-white px-2 py-1 rounded mb-1 cursor-pointer ${ev.color}`}
                  >
                    {ev.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {view === 'week' && (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="border p-2 rounded-md">
              <div className="font-semibold text-sm">{format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i), 'EEEE')}</div>
              <div className="text-xs text-gray-500 mb-1">{format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i), 'dd MMM')}</div>
              {events.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => onEventClick?.(ev)}
                  className={`text-xs text-white px-2 py-1 rounded mb-1 mt-1 cursor-pointer ${ev.color}`}
                >
                  {ev.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {view === 'day' && (
        <div className="space-y-4">
          {events.map(ev => (
            <div
              key={ev.id}
              onClick={() => onEventClick?.(ev)}
              className="p-4 rounded-md shadow bg-white border cursor-pointer hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-purple-700">{ev.title}</h4>
                  <p className="text-xs text-gray-500">{ev.course}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={14} /> {ev.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
