'use client';

import { useEffect, useState } from 'react';
import pbstudent from '@/lib/db';
import * as LucideIcons from 'lucide-react';

export default function NewCoursesPage() {
    const [newCourses, setNewCourses] = useState([]);

    const fetchNewCourses = async () => {
        const records = await pbstudent.collection('new_courses').getFullList({ sort: '-created' });
        setNewCourses(records);
    };

    useEffect(() => {
        fetchNewCourses();
    }, []);

    const renderIcon = (name, size = 40, color = 'text-foreground', bg = 'bg-foreground/15') => {
        const Icon = LucideIcons[name] || LucideIcons.BookOpen;
        return <Icon size={size} className={`${color} ${bg} p-2.5 rounded`} />;
    };

    return (
        <div className="min-h-screen bg-background px-4 py-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">All Teacher Added Courses</h1>
                <p className="text-light-primary text-sm">Browse all new courses curated by our expert teachers across subjects and grades.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {newCourses.map((course, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`w-10 h-10 rounded flex items-center justify-center`}>
                                {renderIcon(course.icon, 40, 'text-primary', 'bg-primary/20')}
                            </div>
                            <p className="text-xs text-gray-500">{course.subject || 'General'}</p>
                        </div>
                        <h3 className="text-base font-semibold text-black mb-1">{course.title}</h3>
                        <p className="text-sm text-light-primary mb-2">
                            {course.description || `Overview of ${course.title}`}
                        </p>
                        <div className="flex justify-between text-xs text-light-primary/80 mb-2">
                            <span>{course.lectures || 0} Lectures</span>
                            <span>{course.hours || 0} Hours</span>
                        </div>
                        <button className="w-full py-2 mt-2 rounded-lg text-sm bg-foreground text-white">
                            View Course
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
