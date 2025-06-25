'use client';

import { useState } from 'react';
import {
    Bell,
    Book,
    BookOpen,
    CalendarCheck2,
    ChevronDown,
    ClipboardList,
    Clock,
    FileText,
    Image as ImageIcon,
    Megaphone,
    Search,
    User,
    Video
} from 'lucide-react';

const subjects = [
    'All Subjects',
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Marathi', 'Hindi', 'Computer_Science'
];

const notes = {
    Mathematics: [
        { title: 'Algebra Basics', date: 'June 10', type: 'PDF' },
        { title: 'Trigonometry', date: 'June 15', type: 'DOCX' },
        { title: 'Calculus', date: 'June 20', type: 'DOCX' },
        { title: 'Geometry', date: 'June 25', type: 'PDF' }
    ],
    Science: [
        { title: 'Human Body Notes', date: 'June 8', type: 'PDF' },
        { title: 'Physics Notes', date: 'June 13', type: 'DOCX' },
        { title: 'Chemistry Notes', date: 'June 17', type: 'PDF' },
        { title: 'Biology Notes', date: 'June 22', type: 'DOCX' }
    ],
    English: [
        { title: 'Grammar Rules', date: 'June 12', type: 'PDF' },
        { title: 'Literature Notes', date: 'June 18', type: 'DOCX' },
    ],
    History: [{ title: 'World War II Notes', date: 'June 5', type: 'PDF' }],
    Geography: [{ title: 'Geography Notes', date: 'June 11', type: 'PDF' }],
    Marathi: [
        { title: 'Marathi Grammar', date: 'June 14', type: 'PDF' },
        { title: 'Marathi Literature', date: 'June 21', type: 'DOCX' }
    ],
    Hindi: [
        { title: 'Hindi Grammar', date: 'June 16', type: 'PDF' },
        { title: 'Hindi Literature', date: 'June 23', type: 'DOCX' },
        { title: 'Hindi Poetry', date: 'June 28', type: 'PDF' }
    ],
    Computer_Science: [
        { title: 'Computer Science Basics', date: 'June 9', type: 'PDF' },
        { title: 'Programming in Python', date: 'June 14', type: 'DOCX' },
        { title: 'Data Structures', date: 'June 19', type: 'PDF' },
        { title: 'Algorithms', date: 'June 24', type: 'DOCX' }
    ]
};

export default function LectureNotes() {
    const [activeTab, setActiveTab] = useState('Mathematics');

    return (
        <div className="flex min-h-screen bg-[#f9f5ff]">

            {/* Sidebar */}
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
                            { icon: <ImageIcon size={16} />, label: 'Gallery' },
                            { icon: <FileText size={16} />, label: 'Lecture Notes' },
                            { icon: <Megaphone size={16} />, label: 'Notices' },
                            { icon: <Book size={16} />, label: 'Library' },
                            { icon: <CalendarCheck2 size={16} />, label: 'Leaves' },
                            { icon: <Video size={16} />, label: 'Meetings' }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Lecture Notes' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}
                            >
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </div>

            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-purple-600">Lecture Notes</h1>
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

                {/* Subject Tabs */}
                <div className="flex gap-3 flex-wrap mt-6">
                    {subjects.map((subject) => (
                        <button
                            key={subject}
                            onClick={() => setActiveTab(subject)}
                            className={`px-4 py-1 rounded-full text-sm transition ${activeTab === subject
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>

                {/* Notes List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    {(notes[activeTab] || []).map((note, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl bg-white shadow hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-2 text-purple-600 mb-2">
                                <FileText size={18} />
                                <h3 className="font-semibold">{note.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600">Date: {note.date}</p>
                            <p className="text-xs text-gray-500">Type: {note.type}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



















// 'use client';

// import { useState } from 'react';
// import { Book, BookOpen, CalendarCheck2, ClipboardList, Clock, FileText, Image, Megaphone, User, Video } from 'lucide-react';

// const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Marathi', 'Hindi', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics'];

// const notes = {
//     Mathematics: [
//         { title: 'Algebra Basics', date: 'June 10', type: 'PDF' },
//         { title: 'Trigonometry', date: 'June 15', type: 'DOCX' },
//         { title: 'Calculus', date: 'June 20', type: 'DOCX' },
//         { title: 'Geometry', date: 'June 25', type: 'PDF' }
//     ],
//     Science: [{ title: 'Human Body Notes', date: 'June 8', type: 'PDF' },
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
//     Marathi: [{ title: 'Marathi Grammar', date: 'June 14', type: 'PDF' },
//         { title: 'Marathi Literature', date: 'June 21', type: 'DOCX' }
//     ],
//     Hindi: [{ title: 'Hindi Grammar', date: 'June 16', type: 'PDF' },
//         { title: 'Hindi Literature', date: 'June 23', type: 'DOCX' },
//         { title: 'Hindi Poetry', date: 'June 28', type: 'PDF' }
//     ]
// };

// export default function LectureNotes() {
//     const [activeTab, setActiveTab] = useState('Math');
//     const [selectedCategory, setSelectedCategory] = useState('All Subjects');

//     return (
//         <div className='flex min-h-screen bg-[#f9f5ff]'>

//             <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col justify-between p-4">
//                 <div>
//                     <h2 className="text-xl font-bold mb-6">Edulearn</h2>
//                     <nav className="space-y-4 text-sm">
//                         {[
//                             { icon: <User size={16} />, label: 'Dashboard' },
//                             { icon: <ClipboardList size={16} />, label: 'Assignment' },
//                             { icon: <BookOpen size={16} />, label: 'Reports' },
//                             { icon: <Book size={16} />, label: 'Courses' },
//                             { icon: <Clock size={16} />, label: 'Timetable' },
//                             { icon: <Image size={16} />, label: 'Gallery' },
//                             { icon: <FileText size={16} />, label: 'Lecture Notes' },
//                             { icon: <Megaphone size={16} />, label: 'Notices' },
//                             { icon: <Book size={16} />, label: 'Library' },
//                             { icon: <CalendarCheck2 size={16} />, label: 'Leaves' },
//                             { icon: <Video size={16} />, label: 'Meetings' }
//                         ].map((item, idx) => (
//                             <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${item.label === 'Reports' ? 'bg-purple-100 text-purple-600 border-l-4 font-medium' : 'text-gray-700'}`}>
//                                 {item.icon}
//                                 {item.label}
//                             </div>
//                         ))}
//                     </nav>
//                 </div>
//             </aside>


//             <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">Lecture Notes</h2>
//                 <div className="flex gap-3 mt-6">
//                     {subjects.map((subject) => (
//                         <button
//                             key={subject}
//                             onClick={() => setActiveTab(subject)}
//                             className={`px-4 py-1 rounded-full text-sm ${activeTab === subject
//                                     ? 'bg-purple-600 text-white'
//                                     : 'bg-gray-200 text-gray-700'
//                                 }`}
//                         >
//                             {subject}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="grid grid-cols-3 gap-5 mt-6">
//                     {notes
//                     .filter((c) => selectedCategory === 'All Subjects' || c.category === selectedCategory)
//                     .map((note, idx) => (
//                         <div
//                             key={idx}
//                             className="p-4 rounded-xl bg-white shadow hover:shadow-md transition"
//                         >
//                             <div className="flex items-center gap-2 text-purple-600 mb-2">
//                                 <FileText size={18} />
//                                 <h3 className="font-semibold">{note.title}</h3>
//                             </div>
//                             <p className="text-sm text-gray-600">Date: {note.date}</p>
//                             <p className="text-xs text-gray-500">Type: {note.type}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


