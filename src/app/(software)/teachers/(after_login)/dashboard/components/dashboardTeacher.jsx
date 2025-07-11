'use client';

import { useState, useEffect } from 'react';
import {
    BookOpen, Users, CalendarDays, ClipboardList,
    PlusCircle, UploadCloud, X, Book, Code2, FileText, Notebook
} from 'lucide-react';
// import Link from 'next/link';
import pbstudent from '@/lib/db';

export default function TeachersDashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeCourses: 0,
        assignmentsPending: 0,
        todaysClasses: 0,
        upcoming: [],
        activities: [],
    });
    const [createAssignment, setCreateAssignment] = useState(false);
    const [addCourse, setAddCourse] = useState(false);
    const [uploadMaterial, setUploadMaterial] = useState(false);
    const [addClass, setAddClass] = useState(false);

    const toggleCreateAssignment = () => setCreateAssignment(!createAssignment);
    const toggleAddCourse = () => setAddCourse(!addCourse);
    const toggleUploadMaterial = () => setUploadMaterial(!uploadMaterial);
    const toggleAddClass = () => setAddClass(!addClass);
    const handleAssignment = () => {
        toggleCreateAssignment();
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData();
        formData.append('title', form.title.value);
        formData.append('subject', form.subject.value);
        formData.append('desc', form.description.value);
        formData.append('due_date', form.dueDate.value);
        formData.append('link', form.resourceLink.value);
        formData.append('marks', form.marks.valueAsNumber);

        // Debug: Show all FormData entries before sending
        console.log("FormData being sent:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const record = await pbstudent.collection('assignments').create(formData);
            console.log('Assignment created:', record);
            toggleCreateAssignment(); // Close modal
        } catch (err) {
            alert('Failed to create assignment. Check console for details.');
            console.error('Error creating assignment:', err);
        }
    };

    const [formAddCourseData, setFormAddCourseData] = useState({
        title: '',
        subject: '',
        board: '',
        icon: '',
        description: '',
        lectures: '',
        hours: ''
    });

    const subjects = ['Mathematics', 'English', 'Biology', 'Physics', 'Chemistry'];
    const boards = ['CBSE', 'ICSE', 'State Board'];
    const iconOptions = [
        { label: 'Book', value: 'Book', icon: <Book className="inline-block w-4 h-4 mr-2" /> },
        { label: 'Code', value: 'Code', icon: <Code2 className="inline-block w-4 h-4 mr-2" /> },
        { label: 'Text', value: 'Text', icon: <FileText className="inline-block w-4 h-4 mr-2" /> },
        { label: 'Notebook', value: 'Notebook', icon: <Notebook className="inline-block w-4 h-4 mr-2" /> }
    ];



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAddCourseData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();

        const {
            title, subject, board, icon,
            description, lectures, hours
        } = formAddCourseData;

        // Validate required numeric fields
        if (parseInt(lectures) <= 0 || parseInt(hours) <= 0) {
            alert("Lectures and Hours must be greater than 0");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('board', board);
        formData.append('icon', icon);
        formData.append('description', description);
        formData.append('lectures', parseInt(lectures));
        formData.append('hours', parseInt(hours));

        try {
            const record = await pbstudent.collection('new_courses').create(formData);
            console.log('Course added:', record);
            alert('Course added successfully!');
            toggleAddCourse();
            setFormAddCourseData({
                title: '',
                subject: '',
                board: '',
                icon: '',
                description: '',
                lectures: '',
                hours: ''
            });
        } catch (error) {
            console.error('Error adding course:', error?.response || error);
            alert('Failed to add course. Check console for error details.');
        }
    };

    // Upload Material

    const subjectOptions = ['Marathi', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'English'];

    const [formNotesData, setFormNotesData] = useState({
        subject: '',
        topic: '',
        date: '',
        file: null,
    });

    const handleChangeNotes = (e) => {
        const { name, value, files } = e.target;
        setFormNotesData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleNotesSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('subject', formNotesData.subject);
            form.append('topic', formNotesData.topic);
            form.append('date', formNotesData.date);
            form.append('type', formNotesData.file); // 'type' is the file field in PocketBase

            await pbstudent.collection('lecture_notes').create(form);
            alert('Material uploaded successfully!');
            toggleUploadMaterial();
        } catch (error) {
            console.error('Error uploading material:', error);
            alert('Upload failed');
        }
    };

    // Return nothing if modal is not open
    // if (!uploadMaterial) return null;

    // Format date for preview if available
    const formattedDate = formNotesData.date
        ? new Date(formNotesData.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        : '';


    useEffect(() => {
        const fetchData = async () => {
            const students = await pbstudent.collection('students').getFullList();
            const courses = await pbstudent.collection('courses').getFullList();
            const assignments = await pbstudent.collection('assignments').getFullList();
            const schedule = await pbstudent.collection('daily_timetable').getFullList();
            const today = new Date().toISOString().split('T')[0];

            setStats({
                totalStudents: students.length,
                activeCourses: courses.length,
                assignmentsPending: assignments.length,
                todaysClasses: schedule.filter(item => item.date === today).length,
                upcoming: schedule,
                activities: [
                    'Kasturi submitted Assignment 3 (Web Dev)',
                    'You received 2 new messages',
                ],
            });
        };
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <main className="flex-1 p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard title="Total Students" value={stats.totalStudents} icon={<Users />} color="bg-blue-100 text-blue-600" />
                    <StatCard title="Active Courses" value={stats.activeCourses} icon={<BookOpen />} color="bg-pink-100 text-pink-600" />
                    <StatCard title="Assignments Pending" value={stats.assignmentsPending} icon={<ClipboardList />} color="bg-yellow-100 text-yellow-600" />
                    <StatCard title="Today’s Classes" value={stats.todaysClasses} icon={<CalendarDays />} color="bg-green-100 text-green-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
                        {stats.upcoming.map((item, i) => (
                            <div key={i} className="grid lg:grid-cols-3 justify-between items-center -mr-60 mb-2">
                                <span>{item.subject} </span>
                                <span className=''> {item.time}</span>
                                <button className="text-sm text-white  bg-purple-500 w-20 py-1 rounded">Join Class</button>
                            </div>
                        ))}
                        <button onClick={toggleAddClass} className='text-sm text-white  bg-purple-500 w-20 py-1 rounded'>Add Class</button>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        {stats.activities.map((msg, i) => (
                            <p key={i} className="mb-2 text-sm text-gray-700">{msg}</p>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button onClick={toggleCreateAssignment} className="flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-600 hover:bg-purple-100 rounded">
                        <PlusCircle className="w-4 h-4" /> Create Assignment
                    </button>
                    <button onClick={toggleAddCourse} className="flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-600 hover:bg-purple-100 rounded">
                        <PlusCircle className="w-4 h-4" /> Add Course
                    </button>
                    <button onClick={toggleUploadMaterial} className="flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-600 hover:bg-purple-100 rounded">
                        <UploadCloud className="w-4 h-4" /> Upload Material
                    </button>
                </div>

                {addClass && (
                    <>
                        <div className='fixed inset-0 bg-black/60 z-40'></div>
                        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                            <button onClick={toggleAddClass} className="absolute top-3 right-3 text-light-primary hover:text-light-primary/80">
                                <X />
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Add Class</h3>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" name="title" id="title" className="mt-1 p-2 w-full border rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea name="description" id="description" rows="3" className="mt-1 p-2 w-full border rounded-md"></textarea>
                                </div>
                                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Add</button>
                            </form>
                        </div>
                    </>
                )}

                {createAssignment && (
                    <>
                        <div className='fixed inset-0 bg-black/60 z-40'></div>
                        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-xl shadow-lg mt-2">
                            <button onClick={toggleCreateAssignment} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                <X />
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Create Assignment</h3>

                            <form onSubmit={handleCreateAssignment}>
                                <div className="mb-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" name="title" id="title" className="mt-1 p-2 w-full border rounded-md" required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <select name="subject" id="subject" className="mt-1 p-2 w-full border rounded-md" required>
                                        <option value="">Select Subject</option>
                                        <option value="Marathi">Marathi</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Science">Science</option>
                                        <option value="Social Science">Social Science</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea name="description" id="description" rows="3" className="mt-1 p-2 w-full border rounded-md" required></textarea>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700">Resource Link</label>
                                    <input type="url" name="resourceLink" id="resourceLink" className="mt-1 p-2 w-full border rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
                                    <input type="number" name="marks" id="marks" className="mt-1 p-2 w-full border rounded-md" required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input type="date" name="dueDate" id="dueDate" className="mt-1 p-2 w-full border rounded-md" required />
                                </div>

                                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-full">Create</button>
                            </form>
                        </div>
                    </>
                )}

                {addCourse && (

                    <>
                        <div className='fixed inset-0 bg-black/60 z-40'></div>
                        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                            <button onClick={toggleAddCourse} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
                                <X />
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Add Course</h3>
                            <form onSubmit={handleAddCourse}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                    <input type="text" name="title" id="title" required onChange={handleChange} value={formAddCourseData.title} className="mt-1 p-2 w-full border rounded-md" />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Subject</label>
                                    <select name="subject" required onChange={handleChange} value={formAddCourseData.subject} className="mt-1 p-2 w-full border rounded-md">
                                        <option value="">Select Subject</option>
                                        {subjects.map((subj) => <option key={subj} value={subj}>{subj}</option>)}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Board</label>
                                    <select name="board" required onChange={handleChange} value={formAddCourseData.board} className="mt-1 p-2 w-full border rounded-md">
                                        <option value="">Select Board</option>
                                        {boards.map((b) => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Icon</label>
                                    <select
                                        name="icon"
                                        required
                                        onChange={handleChange}
                                        value={formAddCourseData.icon}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    >
                                        <option value="">Select Icon</option>
                                        {iconOptions.map(({ value, label }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea name="description" rows="3" onChange={handleChange} value={formAddCourseData.description} className="mt-1 p-2 w-full border rounded-md" required />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-sm font-medium">Lectures</label>
                                    <input type="number" name="lectures" required onChange={handleChange} value={formAddCourseData.lectures} className="mt-1 p-2 w-full border rounded-md" />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Hours</label>
                                    <input type="number" name="hours" required onChange={handleChange} value={formAddCourseData.hours} className="mt-1 p-2 w-full border rounded-md" />
                                </div>

                                <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Add</button>
                            </form>
                        </div>
                    </>
                )}

                {uploadMaterial && (

                    <>
                        <div className="fixed inset-0 bg-black/60 z-40" />
                        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md shadow-lg mt-6">
                            <button
                                onClick={toggleUploadMaterial}
                                className="absolute top-3 right-3 text-light-primary hover:text-light-primary/80"
                            >
                                <X />
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Upload Material</h3>
                            <form onSubmit={handleNotesSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        id="subject"
                                        className="mt-1 p-2 w-full border rounded-md"
                                        value={formNotesData.subject}
                                        onChange={handleChangeNotes}
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        {subjectOptions.map((subject) => (
                                            <option key={subject} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        id="topic"
                                        className="mt-1 p-2 w-full border rounded-md"
                                        value={formNotesData.topic}
                                        onChange={handleChangeNotes}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="mt-1 p-2 w-full border rounded-md"
                                        value={formNotesData.date}
                                        onChange={handleChangeNotes}
                                        required
                                    />
                                    {formattedDate && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Selected Date: <strong>{formattedDate}</strong>
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                        File
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="mt-1 p-2 w-full border rounded-md"
                                        onChange={handleChangeNotes}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                                >
                                    Upload
                                </button>
                            </form>
                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className={`rounded-xl p-4 shadow ${color} flex items-center justify-between`}>
            <div>
                <h4 className="text-sm font-medium">{title}</h4>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="text-4xl opacity-50">{icon}</div>
        </div>
    );
}
