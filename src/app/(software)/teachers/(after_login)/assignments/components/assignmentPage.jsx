'use client';

import { useEffect, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import pbstudent from '@/lib/db';

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);

    // Fetch assignments
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const result = await pbstudent.collection('assignments').getFullList({
                    sort: '-created'
                });
                setAssignments(result);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };
        fetchAssignments();
    }, []);

    // Delete record
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            try {
                await pbstudent.collection('assignments').delete(id);
                setAssignments(prev => prev.filter(a => a.id !== id));
                alert('Deleted successfully');
            } catch (error) {
                console.error("Delete error:", error);
                alert('Failed to delete');
            }
        }
    };

    // Update marks
    const handleMarksUpdate = async (id, value) => {
        try {
            await pbstudent.collection('assignments').update(id, {
                marks: Number(value),
            });
            alert('Marks updated!');
        } catch (error) {
            console.error("Error updating marks:", error);
            alert('Failed to update marks');
        }
    };

    // Get file URL
    const getFileUrl = (record, fileName) => {
        return pbstudent.files.getUrl(record, fileName);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-4">
            <h1 className="text-xl font-semibold mb-4">Submitted Assignments</h1>

            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full table-auto border border-foreground">
                    <thead className="bg-gray-100 text-left text-sm">
                        <tr>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Submission Date</th>
                            <th className="px-4 py-2">Due Date</th>
                            <th className="px-4 py-2">Marks</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((a) => (
                            <tr key={a.id} className="border-t text-sm">
                                <td className="px-4 py-2">{a.title}</td>
                                <td className="px-4 py-2">{a.sub_date}</td>
                                <td className="px-4 py-2">{a.due_date}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            defaultValue={a.marks}
                                            className="border p-1 w-16 rounded"
                                            onBlur={(e) => handleMarksUpdate(a.id, e.target.value)}
                                        />
                                        <span className="text-gray-600 text-sm">/ {a.total || 100}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 flex gap-2 items-center">
                                    {a.doc ? (
                                        <button
                                            title="View"
                                            onClick={() => window.open(getFileUrl(a, a.doc), '_blank')}
                                        >
                                            <Eye className="w-4 h-4 text-blue-600" />
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-400">No file</span>
                                    )}
                                    <button title="Delete" onClick={() => handleDelete(a.id)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {assignments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                                    No assignments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}





















// 'use client';

// import { useState, useEffect } from 'react';
// import {
//     PlusCircle, Download, Eye, Edit, Trash2,
//     FileText, X
// } from 'lucide-react';
// import { useMemo } from 'react';
// import pbstudent from '@/lib/db';

// const dummyAssignments = [
//     {
//         id: 1,
//         title: 'Algebra Quiz',
//         course: 'Mathematics',
//         dueDate: '2025-07-09',
//         total: 30,
//         submitted: 24,
//         graded: 12,
//         status: 'Open',
//     },
//     {
//         id: 2,
//         title: 'Photosynthesis Assignment',
//         course: 'Biology',
//         dueDate: '2025-07-05',
//         total: 28,
//         submitted: 20,
//         graded: 18,
//         status: 'Closed',
//     },
//     {
//         id: 3,
//         title: 'History Timeline',
//         course: 'Social Studies',
//         dueDate: '2025-07-12',
//         total: 25,
//         submitted: 19,
//         graded: 10,
//         status: 'Open',
//     },
//     {
//         id: 4,
//         title: 'Grammar Test',
//         course: 'English',
//         dueDate: '2025-07-03',
//         total: 32,
//         submitted: 32,
//         graded: 32,
//         status: 'Closed',
//     },
//     {
//         id: 5,
//         title: 'Periodic Table Project',
//         course: 'Chemistry',
//         dueDate: '2025-07-15',
//         total: 30,
//         submitted: 12,
//         graded: 5,
//         status: 'Draft',
//     },
//     {
//         id: 6,
//         title: 'Programming Basics Quiz',
//         course: 'Computer Science',
//         dueDate: '2025-07-20',
//         total: 27,
//         submitted: 0,
//         graded: 0,
//         status: 'Draft',
//     },
// ];


// export default function AssignmentsPage() {
//     const [assignments, setAssignments] = useState([]);
//     const [courseFilter, setCourseFilter] = useState('');
//     const [titleFilter, setTitleFilter] = useState('');
//     const [dueFilter, setDueFilter] = useState('');
//     const [statusFilter, setStatusFilter] = useState('');
//     const [sortBy, setSortBy] = useState('new');

//     // Assignments
//     const [createAssignment, setCreateAssignment] = useState(false);

//     const toggleCreateAssignment = () => setCreateAssignment(!createAssignment);
//     const handleAssignment = () => {
//         toggleCreateAssignment();
//     };

//     const handleCreateAssignment = async (e) => {
//         e.preventDefault();
//         const form = e.target;

//         const formData = new FormData();
//         formData.append('title', form.title.value);
//         formData.append('subject', form.subject.value);
//         formData.append('desc', form.description.value);
//         formData.append('due_date', form.dueDate.value);
//         formData.append('link', form.resourceLink.value);
//         formData.append('marks', form.marks.valueAsNumber);

//         // Debug: Show all FormData entries before sending
//         console.log("FormData being sent:");
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }

//         try {
//             const record = await pbstudent.collection('assignments').create(formData);
//             console.log('Assignment created:', record);
//             alert('Assignment created successfully!');
//             toggleCreateAssignment(); // Close modal
//         } catch (err) {
//             alert('Failed to create assignment. Check console for details.');
//             console.error('Error creating assignment:', err);
//         }
//     };

//     // Get today's date for comparison
//     const today = new Date().toISOString().split("T")[0];

//     // Filter + Sort logic
//     const filteredAssignments = useMemo(() => {
//         let result = [...assignments];

//         if (courseFilter) {
//             result = result.filter(a => a.course === courseFilter);
//         }

//         if (titleFilter) {
//             result = result.filter(a => a.title.toLowerCase().includes(titleFilter.toLowerCase()));
//         }

//         if (dueFilter === 'upcoming') {
//             result = result.filter(a => a.dueDate >= today);
//         } else if (dueFilter === 'past') {
//             result = result.filter(a => a.dueDate < today);
//         }

//         if (statusFilter) {
//             result = result.filter(a => a.status === statusFilter);
//         }

//         switch (sortBy) {
//             case 'new':
//                 result.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
//                 break;
//             case 'old':
//                 result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
//                 break;
//             case 'submissions':
//                 result.sort((a, b) => b.submitted - a.submitted);
//                 break;
//             case 'az':
//                 result.sort((a, b) => a.course.localeCompare(b.course));
//                 break;
//         }

//         return result;
//     }, [assignments, courseFilter, titleFilter, dueFilter, statusFilter, sortBy]);

//     useEffect(() => {
//         setAssignments(dummyAssignments);
//     }, []);

//     return (
//         <div className="min-h-screen bg-[var(--background)] p-4 md:p-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 mb-6">

//                 <div className="flex flex-col md:flex-row gap-2">
//                     <button onClick={handleAssignment} className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-1">
//                         <PlusCircle className="w-4 h-4" /> Create Assignment
//                     </button>
//                     <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-1">
//                         <Download className="w-4 h-4" /> Import from Template
//                     </button>
//                 </div>
//             </div>

//             {createAssignment && (
//                     <>
//                         <div className='fixed inset-0 bg-black/60 z-40'></div>
//                         <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-xl shadow-lg mt-2">
//                             <button onClick={toggleCreateAssignment} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
//                                 <X />
//                             </button>
//                             <h3 className="text-lg font-semibold mb-4">Create Assignment</h3>

//                             <form onSubmit={handleCreateAssignment}>
//                                 <div className="mb-2">
//                                     <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                                     <input type="text" name="title" id="title" className="mt-1 p-2 w-full border rounded-md" required />
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
//                                     <select name="subject" id="subject" className="mt-1 p-2 w-full border rounded-md" required>
//                                         <option value="">Select Subject</option>
//                                         <option value="Marathi">Marathi</option>
//                                         <option value="Hindi">Hindi</option>
//                                         <option value="Computer Science">Computer Science</option>
//                                         <option value="Maths">Maths</option>
//                                         <option value="Science">Science</option>
//                                         <option value="Social Science">Social Science</option>
//                                         <option value="English">English</option>
//                                     </select>
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                                     <textarea name="description" id="description" rows="3" className="mt-1 p-2 w-full border rounded-md" required></textarea>
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700">Resource Link</label>
//                                     <input type="url" name="resourceLink" id="resourceLink" className="mt-1 p-2 w-full border rounded-md" />
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
//                                     <input type="number" name="marks" id="marks" className="mt-1 p-2 w-full border rounded-md" required />
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
//                                     <input type="date" name="dueDate" id="dueDate" className="mt-1 p-2 w-full border rounded-md" required />
//                                 </div>

//                                 <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-full">Create</button>
//                             </form>
//                         </div>
//                     </>
//                 )}


//             {/* Filters */}
//             <div className="bg-white p-4 rounded-md shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <select
//                     value={titleFilter}
//                     onChange={(e) => setTitleFilter(e.target.value)}
//                     className="border px-3 py-2 rounded-md"
//                 >
//                     <option value="">All Titles</option>
//                     <option value="Grammar Test">Grammar Test</option>
//                     <option value="Algebra Quiz">Algebra Quiz</option>
//                     <option value="History Timeline">History Timeline</option>
//                     <option value="Periodic Table Project">Periodic Table</option>
//                     <option value="Photosynthesis">Photosynthesis</option>
//                     <option value="Programming Quiz">Programming Quiz</option>
//                 </select>

//                 <select
//                     value={dueFilter}
//                     onChange={(e) => setDueFilter(e.target.value)}
//                     className="border px-3 py-2 rounded-md"
//                 >
//                     <option value="">Due Date</option>
//                     <option value="upcoming">Upcoming</option>
//                     <option value="past">Past Due</option>
//                 </select>

//                 <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="border px-3 py-2 rounded-md"
//                 >
//                     <option value="">Status</option>
//                     <option value="Draft">Draft</option>
//                     <option value="Open">Published</option>
//                     <option value="Closed">Closed</option>
//                 </select>

//                 <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="border px-3 py-2 rounded-md"
//                 >
//                     <option value="new">Newest First</option>
//                     <option value="old">Oldest First</option>
//                     <option value="submissions">Most Submissions</option>
//                     <option value="az">Course A-Z</option>
//                 </select>
//             </div>

//             {/* Assignments Table */}
//             <div className="hidden md:block">
//                 <table className="w-full table-auto border rounded-md">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="px-4 py-2 text-left">Title</th>
//                             <th className="px-4 py-2 text-left">Course</th>
//                             <th className="px-4 py-2 text-left">Due Date</th>
//                             <th className="px-4 py-2 text-left">Total Submissions</th>
//                             <th className="px-4 py-2 text-left">Graded</th>
//                             <th className="px-4 py-2 text-left">Status</th>
//                             <th className="px-4 py-2 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredAssignments.map(a => (
//                             <tr key={a.id} className="border-t">
//                                 <td className="px-4 py-2">{a.title}</td>
//                                 <td className="px-4 py-2">{a.course}</td>
//                                 <td className="px-4 py-2">{a.dueDate}</td>
//                                 <td className="px-4 py-2">{a.submitted}/{a.total}</td>
//                                 <td className="px-4 py-2">{a.graded}</td>
//                                 <td className="px-4 py-2">
//                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === 'Open'
//                                         ? 'bg-green-100 text-green-800'
//                                         : a.status === 'Draft'
//                                             ? 'bg-gray-200 text-gray-600'
//                                             : 'bg-red-100 text-red-600'
//                                         }`}>{a.status}</span>
//                                 </td>
//                                 <td className="px-4 py-2 flex gap-2">
//                                     <button title="View"><Eye className="w-4 h-4 text-blue-600" /></button>
//                                     <button title="Edit"><Edit className="w-4 h-4 text-yellow-600" /></button>
//                                     <button title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden grid gap-4">
//                 {assignments.map(a => (
//                     <div key={a.id} className="bg-white rounded-lg p-4 shadow">
//                         <div className="flex justify-between items-center">
//                             <h2 className="text-lg font-semibold">{a.title}</h2>
//                             <span className={`text-xs px-2 py-1 rounded-full ${a.status === 'Open'
//                                 ? 'bg-green-100 text-green-800'
//                                 : a.status === 'Draft'
//                                     ? 'bg-gray-200 text-gray-600'
//                                     : 'bg-red-100 text-red-600'
//                                 }`}>{a.status}</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground mb-1">{a.course}</p>
//                         <p className="text-sm mb-2">Due: {a.dueDate}</p>
//                         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
//                             <div className="h-full bg-purple-500" style={{ width: `${(a.submitted / a.total) * 100}%` }}></div>
//                         </div>
//                         <p className="text-xs text-muted-foreground mb-2">{a.submitted} of {a.total} submitted</p>
//                         <div className="flex gap-2">
//                             <button title="View"><Eye className="w-4 h-4 text-blue-600" /></button>
//                             <button title="Grade"><FileText className="w-4 h-4 text-green-600" /></button>
//                             <button title="Edit"><Edit className="w-4 h-4 text-yellow-600" /></button>
//                             <button title="Delete"><Trash2 className="w-4 h-4 text-red-600" /></button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
