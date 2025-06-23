'use client';

import { useState } from 'react';
import { Clock, UploadCloud, Link as LinkIcon, Code2, Database, ShieldCheck, Bell, Search, User, ClipboardList, BookOpen, Book, FileText, Megaphone, CalendarCheck2, Video, Image, ChevronDown } from 'lucide-react';

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const colorMap = {
    pink: 'pink',
    purple: 'purple',
  };


  const assignments = [
    {
      title: 'Advanced JavaScript',
      due: 'Due in 2 days (May 5, 2025)',
      desc: 'Implement a functional React component with hooks and state management.',
      marks: 50,
      color: 'purple',
      icon: <Code2 className="text-white" />,
    },
    {
      title: 'Database Design',
      due: 'Due in 5 days (May 8, 2025)',
      desc: 'Create an ERD and implement a normalized database schema.',
      marks: 50,
      color: 'pink',
      icon: <Database className="text-white" />,
    },
    {
      title: 'Network Security',
      due: 'Due in 7 days (May 10, 2025)',
      desc: 'Configure a secure network and document security measures.',
      marks: 50,
      color: 'purple',
      icon: <ShieldCheck className="text-white" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f9f5ff] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-2xl font-bold mb-6 text-black">Edulearn</h2>
        <nav className="space-y-4 text-sm">
          {[
            { icon: <User size={16} />, label: 'Dashboard' },
            { icon: <ClipboardList size={16} />, label: 'Assignment' },
            { icon: <BookOpen size={16} />, label: 'Reports' },
            { icon: <Book size={16} />, label: 'Courses' },
            { icon: <Clock size={16} />, label: 'Timetable' },
            { icon: <Image size={16} />, label: 'Gallery' },
            { icon: <FileText size={16} />, label: 'Lecture Notes' },
            { icon: <Megaphone size={16} />, label: 'Notices' },
            { icon: <Book size={16} />, label: 'Library' },
            { icon: <CalendarCheck2 size={16} />, label: 'Leaves' },
            { icon: <Video size={16} />, label: 'Meetings' }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Assignment' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>
      </aside>


      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">Assignment</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search Dashboard..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-400 text-gray-500 text-sm" />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
            <Bell className="h-5 w-5 text-gray-600" />
            <img src="/profileImage.png" alt="avatar" className="rounded-full w-8 h-8" />
            <ChevronDown className='h-5 w-5 text-gray-600' />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-6 border-b text-sm text-gray-500">
            {['Pending (3)', 'Submitted (2)', 'Graded (5)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-purple-600 text-purple-600 font-semibold' : 'border-transparent'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-3 gap-5 mt-6">
          {assignments.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${colorMap[item.color]}-500`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-black">{item.title}</h3>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Clock size={14} className="mr-1" />
                {item.due}
              </div>
              <p className="text-sm text-gray-700 mb-3">{item.desc}</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1 text-purple-600 cursor-pointer">
                  <LinkIcon size={14} /> View Resources
                </div>
                <span className="text-gray-500">Marks: {item.marks}</span>
              </div>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                <UploadCloud size={16} /> Upload Assignment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

