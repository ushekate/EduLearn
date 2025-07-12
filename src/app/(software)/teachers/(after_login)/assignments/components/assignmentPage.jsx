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

