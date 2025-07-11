'use client';

import { useEffect, useState } from 'react';
import { Search, Download, BarChart3, Eye, Mail, Trash2 } from 'lucide-react';
import pbstudent from '@/lib/db';
import Link from 'next/link';

export default function MyStudentsPage() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ grade: '' });
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await pbstudent.collection('students').getFullList();
        setStudents(res);
        setFiltered(res);

        const gradeList = [...new Set(res.map(s => s.level))];
        setGrades(gradeList);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribe = pbstudent.collection('students').subscribe('*', () => {
      fetchData();
    });

    return () => {
      pbstudent.collection('students').unsubscribe('*');
    };
  }, []);

  useEffect(() => {
    let data = [...students];

    if (search) {
      data = data.filter(
        s =>
          (`${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase())) ||
          s.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.grade) {
      data = data.filter(s => s.level === filters.grade);
    }

    setFiltered(data);
  }, [search, filters, students]);

  const getAvatarUrl = (s) => {
    return s.profile_pic
      ? `${pbstudent.baseUrl}/api/files/students/${s.id}/${s.profile_pic}`
      : '/profileImage.png';
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <button className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600">
            <Download className="inline-block w-4 h-4 mr-1" /> Download Report
          </button>
          <button className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600">
            <BarChart3 className="inline-block w-4 h-4 mr-1" /> Performance Overview
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex-1 flex items-center bg-white rounded px-3 border shadow-sm">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full py-1 h-10 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            onChange={(e) => setFilters(f => ({ ...f, grade: e.target.value }))}
            className="border rounded px-2 py-1 h-10"
          >
            <option value="">All Students</option>
            {grades.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading students...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && filtered.length === 0 ? (
        <div className="text-center p-10 bg-muted rounded-lg">
          <p className="text-lg">🧑‍🎓 You haven’t added any students yet.</p>
          <div className="mt-4 space-x-2">
            <Link href="/my-courses" className="underline text-purple-600">Go to My Courses</Link>
            <button className="ml-2 underline text-pink-500">Invite Students</button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm bg-green-100">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Student Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={getAvatarUrl(s)}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <button className="text-purple-600 hover:underline">
                      {s.first_name} {s.last_name}
                    </button>
                  </td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.level}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700"><Eye size={16} /></button>
                    <button className="text-pink-500 hover:text-pink-700"><Mail size={16} /></button>
                    <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




















// 'use client';

// import { useEffect, useState } from 'react';
// import { Search, Download, BarChart3, Eye, Mail, Trash2 } from 'lucide-react';
// import pbstudent from '@/lib/db';
// import Link from 'next/link';

// export default function MyStudentsPage() {
//     const [students, setStudents] = useState([]);
//     const [filtered, setFiltered] = useState([]);
//     const [search, setSearch] = useState('');
//     const [filters, setFilters] = useState({ course: '', grade: '', status: '' });
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await pbstudent.collection('students').getFullList({ expand: 'course' });
//             setStudents(res);
//             setFiltered(res);
//             const courseList = [...new Set(res.map(s => s.expand?.course?.name || ''))];
//             setCourses(courseList);
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         let data = [...students];
//         if (search) {
//             data = data.filter(s =>
//                 s.name.toLowerCase().includes(search.toLowerCase()) ||
//                 s.email.toLowerCase().includes(search.toLowerCase())
//             );
//         }
//         if (filters.course) {
//             data = data.filter(s => s.expand?.course?.name === filters.course);
//         }
//         if (filters.grade) {
//             data = data.filter(s => s.grade === filters.grade);
//         }
//         if (filters.status) {
//             data = data.filter(s => s.status === filters.status);
//         }
//         setFiltered(data);
//     }, [search, filters, students]);

//     return (
//         <div className="min-h-screen bg-[var(--background)] p-6 space-y-6">
//             <div className="flex items-center justify-end">
//                 <div className="flex gap-2">
//                     <button className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600">
//                         <Download className="inline-block w-4 h-4 mr-1" /> Download Report
//                     </button>
//                     <button className="bg-pink-500 text-white px-3 py-2 rounded hover:bg-pink-600">
//                         <BarChart3 className="inline-block w-4 h-4 mr-1" /> Performance Overview
//                     </button>
//                 </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
//                 <div className="flex-1 flex items-center bg-white rounded px-3 border shadow-sm">
//                     <Search className="w-4 h-4 text-gray-400 mr-2" />
//                     <input
//                         type="text"
//                         placeholder="Search by name or email"
//                         className="w-full py-1 h-10 outline-none"
//                         value={search}
//                         onChange={e => setSearch(e.target.value)}
//                     />
//                 </div>
//                 <div className="flex gap-3">
//                     <select
//                         onChange={e => setFilters(f => ({ ...f, course: e.target.value }))}
//                         className="border rounded px-2 py-1 h-10">
//                         <option value="">All Courses</option>
//                         {courses.map(c => (
//                             <option key={c}>{c}</option>
//                         ))}
//                     </select>
//                     <select
//                         onChange={e => setFilters(f => ({ ...f, grade: e.target.value }))}
//                         className="border rounded px-2 py-1 h-10">
//                         <option value="">All Grades</option>
//                         {[9, 10, 11, 12].map(g => (
//                             <option key={g}>{g}</option>
//                         ))}
//                     </select>
//                     <select
//                         onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
//                         className="border rounded px-2 py-1 h-10">
//                         <option value="">All Status</option>
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                         <option value="archived">Archived</option>
//                     </select>
//                 </div>
//             </div>

//             {filtered.length === 0 ? (
//                 <div className="text-center p-10 bg-muted rounded-lg">
//                     <p className="text-lg">🧑‍🎓 You haven’t added any students to your courses yet.</p>
//                     <div className="mt-4 space-x-2">
//                         <Link href="/my-courses" className="underline text-purple-600">Go to My Courses</Link>
//                         <button className="ml-2 underline text-pink-500">Invite Students</button>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto rounded border">
//                     <table className="w-full text-sm bg-green-100">
//                         <thead className="bg-gray-100 text-gray-600">
//                             <tr>
//                                 <th className="px-4 py-2 text-left">Student Name</th>
//                                 <th className="px-4 py-2 text-left">Course</th>
//                                 <th className="px-4 py-2 text-left">Grade</th>
//                                 <th className="px-4 py-2 text-left">Attendance</th>
//                                 <th className="px-4 py-2 text-left">Avg. Score</th>
//                                 <th className="px-4 py-2 text-left">Status</th>
//                                 <th className="px-4 py-2 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filtered.map(s => (
//                                 <tr key={s.id} className="border-t hover:bg-gray-50">
//                                     <td className="px-4 py-2 flex items-center gap-2">
//                                         <img
//                                             src={s.avatar || '/profileImage.png'}
//                                             alt="avatar"
//                                             className="w-8 h-8 rounded-full"
//                                         />
//                                     </td>
//                                     <td className="px-4 py-2">{s.expand?.course?.name || '-'}</td>
//                                     <td className="px-4 py-2">{s.grade}</td>
//                                     <td className="px-4 py-2">{s.attendance || '—'}</td>
//                                     <td className="px-4 py-2">{s.avg_score || '—'}</td>
//                                     <td className="px-4 py-2">
//                                         <span className={`px-2 py-1 text-xs rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-600' :
//                                                 s.status === 'inactive' ? 'bg-red-100 text-red-600' :
//                                                     'bg-yellow-100 text-yellow-600'
//                                             }`}>
//                                             {s.status
//                                                 ? s.status.charAt(0).toUpperCase() + s.status.slice(1)
//                                                 : 'Unknown'
//                                             }

//                                             {/* {s.status.charAt(0).toUpperCase() + s.status.slice(1)} */}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-2 flex gap-2">
//                                         <button className="text-blue-500 hover:text-blue-700"><Eye size={16} /></button>
//                                         <button className="text-pink-500 hover:text-pink-700"><Mail size={16} /></button>
//                                         <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }
