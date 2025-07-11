'use client';

import { useEffect, useState } from 'react';
import pbstudent from '@/lib/db';
import * as LucideIcons from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Courses');
    const [courses, setCourses] = useState([]);
    const [features, setFeatures] = useState([]);
    const router = useRouter();

    const categories = ['All Courses', 'CBSE', 'State Boards', 'IB', 'AP', 'University'];

    const fetchCourses = async () => {
        const records = await pbstudent.collection('courses').getFullList({ sort: '-created' });
        setCourses(records);
    };

    const fetchFeatures = async () => {
        const records = await pbstudent.collection('course_features').getFullList({ sort: '-created' });
        setFeatures(records);
    };

    useEffect(() => {
        fetchCourses();
        fetchFeatures();
    }, []);

    const renderIcon = (name, size = 40, color = 'text-foreground', bg = 'bg-foreground/15') => {
        const Icon = LucideIcons[name] || LucideIcons.BookText;
        return <Icon size={size} className={`${color} ${bg} p-2.5 rounded`} />;
    };

    const getStatusButton = (progress) => {
        if (progress === 0) return { label: 'Start Course', classes: 'bg-white text-foreground border border-foreground' };
        if (progress >= 100) return { label: 'Completed', classes: 'bg-green-500 text-white' };
        return { label: 'Continue Learning', classes: 'bg-foreground text-white' };
    };

    return (
        <div className="flex min-h-screen bg-background flex-col px-4 py-6 lg:px-8">
            {/* Header */}
            <div className="bg-foreground text-white p-6 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-2">Unlock Your Learning Potential</h2>
                <p className="text-sm mb-4">Access a comprehensive library of courses tailored to school curricula, college syllabi, and degree programs.</p>
                <button onClick={() => router.push('/students/courses/all')} className="bg-white text-foreground px-4 py-2 rounded-lg text-sm font-medium">Explore All Courses</button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1 rounded-full text-sm border transition ${selectedCategory === cat ? 'bg-foreground text-white' : 'bg-white text-light-primary'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses
                    .filter(course => selectedCategory === 'All Courses' || course.board === selectedCategory)
                    .map((course, idx) => {
                        const button = getStatusButton(course.progress);
                        return (
                            <div key={idx} className="bg-white rounded-xl shadow p-5 transition hover:shadow-lg">
                                <div className="flex items-center justify-between mb-2">
                                    {/* <div className="w-10 h-10 rounded-full flex items-center justify-center"> */}
                                    <div className={`w-10 h-10 rounded flex items-center justify-center`}>
                                        {renderIcon(course.icon, 40, `${idx % 2 === 0 ? 'text-foreground bg-foreground/20' : 'text-primary bg-primary/20'}`)}
                                    </div>
                                    <p className="text-xs text-gray-500">{course.board}</p>
                                </div>
                                <h3 className="text-base font-semibold text-black mb-1">{course.title}</h3>
                                <p className="text-sm text-light-primary mb-2">{course.description || `Overview of ${course.title}`}</p>
                                <div className="flex justify-between text-xs text-light-primary/80 mb-2">
                                    <span>{course.lectures} Lectures</span>
                                    <span>{course.hours} Hours</span>
                                </div>
                                <div className="text-xs text-light-primary mb-1">Progress</div>
                                <div className="relative w-full h-2 bg-light-primary/30 rounded-full mb-2">
                                    <div className="absolute top-0 left-0 h-2 rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                                </div>
                                <button className={`w-full py-2 rounded-lg text-sm ${button.classes}`}>
                                    {button.label}
                                </button>
                            </div>
                        );
                    })}
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow p-6 mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">Course Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <div className="mb-2">{renderIcon(feature.icon)}</div>
                            <p className="text-sm font-medium text-black mb-1">{feature.title}</p>
                            <p className="text-xs text-light-primary">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
