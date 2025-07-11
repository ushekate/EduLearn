'use client';

import { useEffect, useState } from 'react';
import {
  User, BookOpen, ClipboardList, CalendarDays,
  Calculator, Code as CodeIcon
} from 'lucide-react';
import pbstudent from '@/lib/db';



const classColors = {
  purple: {
    bgLight: 'bg-background',
    text: 'text-foreground',
    btn: 'bg-foreground hover:bg-foreground/80',
  },
  pink: {
    bgLight: 'bg-secondary',
    text: 'text-primary',
    btn: 'bg-primary hover:bg-primary/80',
  },
};

export default function StudentDashboardPage() {
  const [stats, setStats] = useState({
    attendance: '--',
    courses: 0,
    assignments: 0,
    events: 0,
  });
  const [courseProgress, setCourseProgress] = useState([]);
  const classes = [
    {
      title: 'Web Development',
      time: '09:00 AM - 10:30 AM',
      color: 'purple',
      icon: <CodeIcon />,
      join: 'Join',
    },
    {
      title: 'Mathematics',
      time: '11:00 AM - 12:30 PM',
      color: 'pink',
      icon: <Calculator />,
      join: 'Join',
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      const studentId = pbstudent.authStore.model?.id;
      if (!studentId) return;

      try {
        const attendanceRes = await pbstudent.collection('attendance').getFirstListItem(`student="${studentId}"`);
        const coursesRes = await pbstudent.collection('courses').getList(1, 100, {
          filter: `student="${studentId}"`,
        });

        const courseProgressData = coursesRes.items.map((course, idx) => ({
          title: course.title,
          percent: course.progress || 0,
          color: idx % 2 === 0 ? 'purple' : 'pink', // Alternate colors
        }));

        setCourseProgress(courseProgressData);

        const assignmentsRes = await pbstudent.collection('assignments').getList(1, 100, { filter: `student="${studentId}"` });
        const eventsRes = await pbstudent.collection('events').getList(1, 100, { filter: `student="${studentId}"` });

        setStats({
          attendance: attendanceRes?.percentage + '%',
          courses: coursesRes.totalItems,
          assignments: assignmentsRes.totalItems,
          events: eventsRes.totalItems,
        });
      } catch (error) {
        console.log('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-background font-sans text-black">
      <div className="flex-1 p-4 md:p-6 w-full">

        {/* Stats Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Attendance', value: stats.attendance, icon: <User size={20} />, color: 'purple' },
            { label: 'Courses', value: stats.courses, icon: <BookOpen size={20} />, color: 'pink' },
            { label: 'Assignments', value: stats.assignments, icon: <ClipboardList size={20} />, color: 'purple' },
            { label: 'Events', value: stats.events, icon: <CalendarDays size={20} />, color: 'pink' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-sm text-light-primary">{item.label}</p>
                <p className={`text-xl font-bold text-${item.color}-600`}>{item.value}</p>
              </div>
              <div className={`p-2 bg-${item.color}-100 rounded-full text-${item.color}-600`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Classes & Recent Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Upcoming Classes */}

          <div className="bg-white p-4 md:p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-black">Upcoming Classes</h3>
            {classes.map((cls, idx) => {
              const color = classColors[cls.color];
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 md:p-4 mb-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${color.bgLight} ${color.text}`}>
                      {cls.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">{cls.title}</p>
                      <p className="text-xs text-light-primary">{cls.time}</p>
                    </div>
                  </div>
                  <button
                    className={`text-white px-3 py-1 rounded-full text-sm ${color.btn}`}
                  >
                    {cls.join}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Recent Notices */}
          <div className="bg-white p-4 md:p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4 text-black">Recent Notices</h3>
            <div className="space-y-3">
              <div className="border border-foreground p-3 rounded-lg">
                <p className="text-foreground font-semibold text-sm">Semester Registration</p>
                <p className="text-xs text-light-primary">Last date for semester registration is April 15, 2025</p>
              </div>
              <div className="border border-primary p-3 rounded-lg">
                <p className="text-primary font-semibold text-sm">Sports Day</p>
                <p className="text-xs text-light-primary">Annual sports day will be held on December 20, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Progress */}

        <div className="bg-white p-4 md:p-5 rounded-xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-4 text-black">Course Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseProgress.map((course, idx) => {
              const barColor = idx % 2 === 0 ? 'bg-purple-500 text-purple-600' : 'bg-pink-500 text-pink-600';
              return (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-black">{course.title}</p>
                    <p className={`text-sm font-semibold ${idx % 2 === 0 ? 'text-foreground' : 'text-primary'}`}>
                      {course.percent}%
                    </p>
                  </div>
                  <div className="relative h-2 rounded-full bg-gray-300">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full ${barColor.split(' ')[0]}`}
                      style={{ width: `${course.percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

