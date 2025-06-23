'use client';

import { useState } from 'react';
import { Search, Bell, User, CalendarDays, ClipboardList, BookOpen, Clock, Image, FileText, Megaphone, Book, CalendarCheck2, Video, Calculator, ChevronDown } from 'lucide-react';

export default function StudentDashboardPage() {
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
                        <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Dashboard' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
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
                    <h1 className="text-2xl font-bold text-purple-600">Dashboard</h1>
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

                {/* Stats Boxes */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                    {[
                        { label: 'Attendance', value: '85%', icon: <User size={20} />, color: 'purple' },
                        { label: 'Courses', value: '6', icon: <BookOpen size={20} />, color: 'pink' },
                        { label: 'Assignments', value: '12', icon: <ClipboardList size={20} />, color: 'purple' },
                        { label: 'Events', value: '4', icon: <CalendarDays size={20} />, color: 'pink' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{item.label}</p>
                                <p className={`text-xl font-bold text-${item.color}-600`}>{item.value}</p>
                            </div>
                            <div className={`p-2 bg-${item.color}-100 rounded-full text-${item.color}-600`}>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Upcoming Classes & Recent Notices */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {/* Upcoming Classes */}

                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="text-lg font-semibold text-black mb-4">Upcoming Classes</h3>
                        {[{
                            title: 'Web Development', time: '09:00 AM - 10:30 AM', color: 'purple', icon: <CodeIcon />, join: 'Join'
                        }, {
                            title: 'Mathematics', time: '11:00 AM - 12:30 PM', color: 'pink', icon: <Calculator />, join: 'Join'
                        }].map((cls, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 mb-3 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full bg-${cls.color}-100 text-${cls.color}-600`}>
                                        {cls.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-black">{cls.title}</p>
                                        <p className="text-xs text-gray-500">{cls.time}</p>
                                    </div>
                                </div>
                                <button className={`text-white px-3 py-1 rounded-full text-sm bg-${cls.color}-500`}>{cls.join}</button>
                            </div>
                        ))}
                    </div>

                    {/* Recent Notices */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h3 className="text-lg font-semibold text-black mb-4">Recent Notices</h3>
                        <div className="space-y-3">
                            <div className="border border-purple-400 p-3 rounded-lg">
                                <p className="text-purple-600 font-semibold text-sm">Semester Registration</p>
                                <p className="text-xs text-gray-500">Last date for semester registration is April 15, 2025</p>
                            </div>
                            <div className="border border-pink-400 p-3 rounded-lg">
                                <p className="text-pink-600 font-semibold text-sm">Sports Day</p>
                                <p className="text-xs text-gray-500">Annual sports day will be held on December 20, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Progress */}
                <div className="bg-white p-5 rounded-xl shadow mt-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Course Progress</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { title: 'Web Development', percent: 75, color: 'purple' },
                            { title: 'Database Management', percent: 60, color: 'pink' },
                            { title: 'Data Structures', percent: 90, color: 'purple' },
                        ].map((course, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <div className='flex justify-between mb-2'>
                                    <p className="text-sm font-medium mb-2 text-black">{course.title}</p>
                                    <p className={`text-${course.color}-600 text-right text-sm mt-1 font-semibold`}>{course.percent}%</p>
                                </div>
                                <div className="relative h-2 rounded-full bg-gray-300">
                                    <div
                                        className={`absolute top-0 left-0 h-full rounded-full bg-${course.color}-500`}
                                        style={{ width: `${course.percent}%` }}
                                    ></div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper icon
function CodeIcon({ color }) {
    const colorMap = {
        purple: 'text-purple-600',
        pink: 'text-pink-600',
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${colorMap[color]}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
    );
}
