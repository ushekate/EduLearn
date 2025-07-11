'use client';

import { useEffect, useState } from 'react';
import pbstudent from '@/lib/db';

export default function LectureNotes() {
    const [activeTab, setActiveTab] = useState('All Subjects');
    const [allNotes, setAllNotes] = useState([]);
    const [subjects, setSubjects] = useState(['All Subjects']);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const records = await pbstudent.collection('lecture_notes').getFullList({ sort: '-created' });

                setAllNotes(records);

                const uniqueSubjects = Array.from(new Set(records.map((note) => note.subject)));
                setSubjects(['All Subjects', ...uniqueSubjects]);
            } catch (error) {
                console.error('Error fetching lecture notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const filteredNotes =
        activeTab === 'All Subjects'
            ? allNotes
            : allNotes.filter((note) => note.subject === activeTab);

    const getFileUrl = (note) => {
        return pbstudent.getFileUrl(note, note.type); // `type` is the file field
    };

    return (
        <div className="flex min-h-screen bg-background">
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Subject Tabs */}
                <div className="flex gap-3 flex-wrap mt-6">
                    {subjects.map((subject) => (
                        <button
                            key={subject}
                            onClick={() => setActiveTab(subject)}
                            className={`px-4 py-1 rounded-full text-sm transition ${activeTab === subject
                                ? 'bg-foreground text-white'
                                : 'bg-light-primary/20 text-black hover:bg-light-primary/50'
                                }`}
                        >
                            {subject.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {/* Notes List */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {filteredNotes.map((note, index) => (
                        <a
                            key={note.id || index}
                            href={getFileUrl(note)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg shadow-md border border-light-primary/40 hover:bg-gray-50 transition"
                        >
                            <h3 className="text-lg font-semibold text-foreground">{note.topic}</h3>
                            <p className="text-sm text-light-primary mt-1">Date: {note.date}</p>
                            <p className="text-sm text-light-primary/70 mt-1">File: {note.type}</p>
                            <p className="text-xs text-blue-600 mt-2 underline">Click to open</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}










// 'use client';

// import { useState } from 'react';

// const subjects = [
//     'All Subjects',
//     'Mathematics', 'Science', 'English', 'History', 'Geography',
//     'Marathi', 'Hindi', 'Computer_Science'
// ];

// const notes = {
//     Mathematics: [
//         { title: 'Algebra Basics', date: 'June 10', type: 'PDF' },
//         { title: 'Trigonometry', date: 'June 15', type: 'DOCX' },
//         { title: 'Calculus', date: 'June 20', type: 'DOCX' },
//         { title: 'Geometry', date: 'June 25', type: 'PDF' }
//     ],
//     Science: [
//         { title: 'Human Body Notes', date: 'June 8', type: 'PDF' },
//         { title: 'Physics Notes', date: 'June 13', type: 'DOCX' },
//         { title: 'Chemistry Notes', date: 'June 17', type: 'PDF' },
//         { title: 'Biology Notes', date: 'June 22', type: 'DOCX' }
//     ],
//     English: [
//         { title: 'Grammar Rules', date: 'June 12', type: 'PDF' },
//         { title: 'Literature Notes', date: 'June 18', type: 'DOCX' },
//     ],
//     History: [{ title: 'World War II Notes', date: 'June 5', type: 'PDF' }],
//     Geography: [{ title: 'Geography Notes', date: 'June 11', type: 'PDF' }],
//     Marathi: [
//         { title: 'Marathi Grammar', date: 'June 14', type: 'PDF' },
//         { title: 'Marathi Literature', date: 'June 21', type: 'DOCX' }
//     ],
//     Hindi: [
//         { title: 'Hindi Grammar', date: 'June 16', type: 'PDF' },
//         { title: 'Hindi Literature', date: 'June 23', type: 'DOCX' },
//         { title: 'Hindi Poetry', date: 'June 28', type: 'PDF' }
//     ],
//     Computer_Science: [
//         { title: 'Computer Science Basics', date: 'June 9', type: 'PDF' },
//         { title: 'Programming in Python', date: 'June 14', type: 'DOCX' },
//         { title: 'Data Structures', date: 'June 19', type: 'PDF' },
//         { title: 'Algorithms', date: 'June 24', type: 'DOCX' }
//     ]
// };

// export default function LectureNotes() {
//     const [activeTab, setActiveTab] = useState('All Subjects');
//     const filteredNotes = activeTab === 'All Subjects'
//         ? Object.values(notes).flat()
//         : notes[activeTab] || [];


//     return (
//         <div className="flex min-h-screen bg-background">

//             {/* Main Content */}
//             <div className="flex-1 p-6 overflow-y-auto">

//                 {/* Subject Tabs */}
//                 <div className="flex gap-3 flex-wrap mt-6">
//                     {subjects.map((subject) => (
//                         <button
//                             key={subject}
//                             onClick={() => setActiveTab(subject)}
//                             className={`px-4 py-1 rounded-full text-sm transition ${activeTab === subject
//                                 ? 'bg-foreground text-white'
//                                 : 'bg-light-primary/20 text-black hover:bg-light-primary/50'
//                                 }`}
//                         >
//                             {subject}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Notes List */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//                     {filteredNotes.map((note, index) => (
//                         <div
//                             key={index}
//                             className="bg-white p-4 rounded-lg shadow-md border border-light-primary/40"
//                         >
//                             <h3 className="text-lg font-semibold text-foreground">{note.title}</h3>
//                             <p className="text-sm text-light-primary mt-1">Date: {note.date}</p>
//                             <p className="text-sm text-light-primary/70 mt-1">Type: {note.type}</p>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </div>
//     );
// }
