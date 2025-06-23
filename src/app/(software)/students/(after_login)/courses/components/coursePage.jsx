'use client';

import { Search, BookOpen, Atom, BookText, Code2, History, Play, FileText, HelpCircle, DownloadCloud, Bell, Users, User, ClipboardList, Book, Clock, Image, Megaphone, CalendarCheck2, Video, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Courses');

    const categories = ['All Courses', 'CBSE', 'State Boards', 'IB', 'AP', 'University'];
    

    const courses = [
        {
            title: 'Advanced Mathematics', board: 'CBSE', lectures: 24, hours: 12, progress: 75, icon: <BookText />, status: 'Continue Learning'
        },
        {
            title: 'Physics Fundamentals', board: 'IB', lectures: 18, hours: 9, progress: 45, icon: <Atom />, status: 'Continue Learning'
        },
        {
            title: 'Organic Chemistry', board: 'AP', lectures: 20, hours: 15, progress: 0, icon: <BookOpen />, status: 'Start Course'
        },
        {
            title: 'World History', board: 'University', lectures: 30, hours: 20, progress: 90, icon: <History />, status: 'Continue Learning'
        },
        {
            title: 'Computer Science', board: 'University', lectures: 25, hours: 18, progress: 60, icon: <Code2 />, status: 'Continue Learning'
        },
        {
            title: 'English Literature', board: 'State Board', lectures: 22, hours: 14, progress: 0, icon: <BookText />, status: 'Start Course'
        },
    ];

    const features = [
        { title: 'Video Lectures', desc: 'High-quality video content with expert instructors', icon: <Play size={18} className="text-purple-600" /> },
        { title: 'Lecture Notes', desc: 'Comprehensive notes and study materials', icon: <FileText size={18} className="text-pink-600" /> },
        { title: 'Interactive Quizzes', desc: 'Test your knowledge with practice questions', icon: <HelpCircle size={18} className="text-purple-600" /> },
        { title: 'Offline Access', desc: 'Download content for offline learning', icon: <DownloadCloud size={18} className="text-pink-600" /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#f9f5ff]">
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
                        <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Courses' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
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
                    <div>
                        <h1 className="text-2xl font-bold text-purple-600">Courses</h1>
                        <p className="text-sm text-gray-500">Explore our comprehensive course library</p>
                    </div>
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

                {/* Highlight Section */}
                <div className="bg-purple-500 text-white p-6 mt-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Unlock Your Learning Potential</h2>
                    <p className="text-sm mb-4">Access a comprehensive library of courses tailored to school curricula, college syllabi, and degree programs. Learn at your own pace with interactive content and offline capabilities.</p>
                    <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium">Explore All Courses</button>
                </div>

                {/* Category Filter */}
                <div className="flex gap-3 mt-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1 rounded-full text-sm border ${selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-3 gap-5 mt-6">
                    {courses
                        .filter((c) => selectedCategory === 'All Courses' || c.board === selectedCategory)
                        .map((course, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                                        {course.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-black">{course.title}</h3>
                                        <p className="text-xs text-gray-500">{course.board}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">Comprehensive overview of {course.title.toLowerCase()}.</p>
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>{course.lectures} Lectures</span>
                                    <span>{course.hours} Hours</span>
                                </div>
                                <div className="text-xs text-gray-600 mb-1">Progress</div>
                                <div className="relative w-full h-2 bg-gray-300 rounded-full mb-2">
                                    <div className="absolute top-0 left-0 h-2 rounded-full bg-pink-500" style={{ width: `${course.progress}%` }}></div>
                                </div>
                                <button className={`w-full ${course.progress === 0 ? 'bg-pink-500' : 'bg-purple-500'} text-white py-2 rounded-lg text-sm`}>
                                    {course.status}
                                </button>
                            </div>
                        ))}
                </div>

                {/* Features Section */}
                <div className="bg-white rounded-xl shadow p-6 mt-8">
                    <h3 className="text-lg font-semibold text-black mb-4">Course Features</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="mb-2">{feature.icon}</div>
                                <p className="text-sm font-medium text-black mb-1">{feature.title}</p>
                                <p className="text-xs text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

