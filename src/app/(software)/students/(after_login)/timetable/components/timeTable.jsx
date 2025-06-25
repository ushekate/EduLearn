'use client';

import { useEffect, useState } from 'react';
import { Calendar, Video, User, Search, Bell, PlusCircle, Users, ClipboardList, BookOpen, Book, Clock, Image, FileText, Megaphone, CalendarCheck2, ChevronDown } from 'lucide-react';

export default function TimeTablePage() {
    const [timetableData, setTimetableData] = useState([]);

    useEffect(() => {
        // Fetch or simulate data dynamically
        async function fetchTimetable() {
            // Simulating API response
            const data = await Promise.resolve([
                { day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: 'R-201', type: 'online' },
                { day: 'Monday', time: '10:15 AM - 11:15 AM', subject: 'Science', teacher: 'Mr. Verma', room: 'R-202', type: 'online' },
                { day: 'Tuesday', time: '09:00 AM - 10:00 AM', subject: 'English', teacher: 'Mrs. Meena', room: 'R-201', type: 'online' },
                { day: 'Tuesday', time: '10:15 AM - 11:15 AM', subject: 'History', teacher: 'Mr. Gupta', room: 'R-203', type: 'online' },
                { day: 'Wednesday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: 'R-201', type: 'online' },
                { day: 'Wednesday', time: '10:15 AM - 11:15 AM', subject: 'Science', teacher: 'Mr. Verma', room: 'R-202', type: 'online' },
                { day: 'Wednesday', time: '11:30 AM - 12:30 PM', subject: 'Computer Science', teacher: 'Mrs. Khanna', room: 'Lab-101', type: 'online' },
                { day: 'Thursday', time: '09:00 AM - 10:00 AM', subject: 'English', teacher: 'Mrs. Meena', room: 'R-201', type: 'online' },
                { day: 'Thursday', time: '10:15 AM - 11:15 AM', subject: 'Geography', teacher: 'Mr. Singh', room: 'R-204', type: 'online' },
                { day: 'Friday', time: '09:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: 'R-201', type: 'online' },
                { day: 'Friday', time: '10:15 AM - 11:15 AM', subject: 'Physical Education', teacher: 'Mr. Kumar', room: 'Playground', type: 'offline' },
            ]);
            setTimetableData(data);
        }
        fetchTimetable();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f9f5ff]">
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
                        <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Timetable' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
                            {item.icon}
                            {item.label}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* <aside className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">EduPanel</h2>
        <nav className="space-y-4 text-sm">
          {['Dashboard', 'Assignments', 'Reports', 'Courses', 'Timetable', 'Gallery', 'Lecture Notes', 'Notices', 'Library', 'Leaves', 'Meetings'].map((item) => (
            <div key={item} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item === 'Timetable' ? 'bg-purple-100 text-purple-600 font-medium' : 'text-gray-700'}`}>
              <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
              {item}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between p-3 bg-purple-100 text-purple-700 rounded-lg text-xs">
          <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p>Sarah Johnson</p>
            <p className="text-gray-600">Class X-B</p>
          </div>
        </div>
      </aside> */}

            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-purple-600">Dashboard</h1>
                        <p className='text-sm text-gray-500'>Check your scheduled classes and subjects for the week.</p>
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

            <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                    {['Week', 'Month', 'Year'].map((label) => (
                        <button key={label} className={`px-4 py-1 text-sm rounded-full ${label === 'Week' ? 'bg-purple-600 text-white' : 'bg-white border text-gray-600'}`}>{label}</button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <button className="flex items-center gap-1 px-3 py-1 rounded bg-white border text-gray-600"><span>&lt;</span> <span>June 23 - 29, 2025</span> <Calendar size={14} /> <span>&gt;</span></button>
                    <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded">Today</button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded flex items-center gap-1"><PlusCircle size={14} /> Add Class</button>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-600 border-b">
                        <tr>
                            <th className="py-3 px-4">Day</th>
                            <th className="py-3 px-4">Time Slot</th>
                            <th className="py-3 px-4">Subject</th>
                            <th className="py-3 px-4">Teacher</th>
                            <th className="py-3 px-4">Room</th>
                            <th className="py-3 px-4">Join Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetableData.map((row, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 font-medium text-gray-700">{row.day}</td>
                                <td className="py-2 px-4 text-gray-600">{row.time}</td>
                                <td className="py-2 px-4 text-gray-600">{row.subject}</td>
                                <td className="py-2 px-4 text-gray-600">{row.teacher}</td>
                                <td className="py-2 px-4 text-gray-600">{row.room}</td>
                                <td className="py-2 px-4">
                                    {row.type === 'online' ? (
                                        <button className="flex items-center gap-1 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                            <Video size={14} /> Join
                                        </button>
                                    ) : (
                                        <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                            <Users size={14} /> In-person
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-sm font-medium text-gray-600">Upcoming Classes</div>
        </div>
    </div >
  );
}

