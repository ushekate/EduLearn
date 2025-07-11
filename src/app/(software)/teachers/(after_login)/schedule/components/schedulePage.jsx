'use client';

import { useState, useEffect } from 'react';
import {
  CalendarDays, PlusCircle, Users, Clock, Bell, X, BookOpen,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import Calendar from '@/components/ui/Calendar';
// import UpcomingSidebar from '@/components/ui/UpcomingSidebar';
// import ClassModal from '@/components/ui/ClassModal';
// import ClassDetailsPopup from '@/components/ui/ClassDetailsPopup';

// Lazy load calendar component
const Calendar = dynamic(() => import('@/components/ui/Calendar'), { ssr: false });
const UpcomingSidebar = dynamic(() => import('@/components/ui/UpcomingSidebar'));
const ClassModal = dynamic(() => import('@/components/ui/ClassModal'));
const ClassDetailsPopup = dynamic(() => import('@/components/ui/ClassDetailsPopup'));

const viewModes = ['Day', 'Week', 'Month'];

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState('Week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleAddClass = () => setShowClassModal(true);
  const handleClassClick = (classData) => setSelectedClass(classData);
  const handleClosePopup = () => setSelectedClass(null);

  return (
    <div className="p-4 bg-[var(--background)] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-purple-600" /> Schedule
          </h1> */}
          <p className="text-sm text-gray-500">Dashboard &gt; Schedule</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleAddClass} className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-md shadow">
            <PlusCircle size={18} /> Add Class
          </button>
          <button onClick={() => setSelectedDate(new Date())} className="bg-white border px-4 py-2 rounded-md shadow">Today</button>
          <div className="flex gap-1 border rounded-md overflow-hidden">
            {viewModes.map((mode) => (
              <button
                key={mode}
                className={`px-3 py-2 text-sm ${viewMode === mode ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4"> */}
        {/* <div className="lg:col-span-3 bg-white rounded-md shadow p-4">
          <Calendar
            view={viewMode.toLowerCase()}
            date={selectedDate}
            onDateChange={setSelectedDate}
            onEventClick={handleClassClick}
          />
        </div> */}

        {/* Sidebar */}
        <UpcomingSidebar />
      {/* </div> */}

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-sm text-gray-700">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Web Dev</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Science</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> English</span>
      </div>

      {/* Sidebar */}
      {/* <UpcomingSidebar /> */}

      <div className='grid grid-cols-1 gap-4 mt-4'>
        <div className="lg:col-span-3 bg-white rounded-md shadow p-4">
          <Calendar
            view={viewMode.toLowerCase()}
            date={selectedDate}
            onDateChange={setSelectedDate}
            onEventClick={handleClassClick}
          />
        </div>
      </div>

      {/* Modals */}
      {showClassModal && <ClassModal onClose={() => setShowClassModal(false)} />}
      {selectedClass && <ClassDetailsPopup classData={selectedClass} onClose={handleClosePopup} />}
    </div>
  );
}
