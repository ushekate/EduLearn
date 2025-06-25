'use client';

import { useEffect, useState } from 'react';
import { Search, Bell, Filter, Users,  User, ClipboardList, BookOpen, Book, Clock, Images, FileText, CalendarCheck2, Video, Megaphone, Image, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
  const [scores, setScores] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simulated fetch
    const fetchData = async () => {
      const marks = await Promise.resolve([
        { subject: 'Mathematics', exam: 'Midterm', score: '85/100', grade: 'A', date: '12 May' },
        { subject: 'Science', exam: 'Unit Test 1', score: '22/25', grade: 'A+', date: '04 May' },
        { subject: 'English', exam: 'Final Exam', score: '70/100', grade: 'B', date: '18 Jun' },
      ]);

      const chart = await Promise.resolve([
        { year: '2016', value: 10000 },
        { year: '2017', value: 20000 },
        { year: '2018', value: 40000 },
        { year: '2019', value: 50000 },
        { year: '2020', value: 15000 },
        { year: '2021', value: 22000 },
        { year: '2022', value: 37000 },
        { year: '2023', value: 52000 },
      ]);

      setScores(marks);
      setChartData(chart);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f9f5ff]">

        <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col justify-between p-4">
                <div>
                    <h2 className="text-xl font-bold mb-6 text-black">Edulearn</h2>
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
                            <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Reports' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>


      <div className="flex-1 p-6">
        {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-purple-600">Reports</h1>
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


        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="text-gray-600 font-medium">Filters:</span>
            <select className="border px-2 py-1 rounded">
              <option>Term: All</option>
            </select>
            <select className="border px-2 py-1 rounded">
              <option>Subject: All</option>
            </select>
            <select className="border px-2 py-1 rounded">
              <option>Date: Last 30d</option>
            </select>
          </div>
          <div>
            <h2 className="font-semibold text-sm mb-2">Academic Performance Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#a855f7" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <h2 className="font-semibold text-sm mb-2 text-pink-700">Exam & Assessment Scores</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Subject</th>
                <th>Exam Type</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-${score.subject === 'Mathematics' ? 'pink' : score.subject === 'Science' ? 'blue' : 'yellow'}-400`}></span>
                    {score.subject}
                  </td>
                  <td>{score.exam}</td>
                  <td>{score.score}</td>
                  <td>
                    <span className="bg-gray-100 text-xs px-2 py-0.5 rounded text-green-700">
                      {score.grade}
                    </span>
                  </td>
                  <td>{score.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-purple-600 text-xs font-medium mt-2 cursor-pointer">View All Exams ↓</div>
        </div>
      </div>
    </div>
  );
}

