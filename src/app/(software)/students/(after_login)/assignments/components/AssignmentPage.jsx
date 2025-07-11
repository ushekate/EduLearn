'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Clock, UploadCloud, Link as LinkIcon,
  Code2, Database, ShieldCheck
} from 'lucide-react';
import pbstudent from '@/lib/db';

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [assignments, setAssignments] = useState([]);
  const [uploaded, setUploaded] = useState({});
  const fileInputs = useRef({});

  const iconMap = {
    'Web Dev': <Code2 className="text-white" />,
    'Database': <Database className="text-white" />,
    'Security': <ShieldCheck className="text-white" />,
  };

  const colorMap = {
    'Web Dev': 'bg-purple-600',
    'Database': 'bg-pink-600',
    'Security': 'bg-blue-600',
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const results = await pbstudent.collection('assignments').getFullList({
          sort: '-due_date',
        });
        setAssignments(results);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const tabs = ['All', 'Web Dev', 'Database', 'Security', 'Marathi', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'English'];

  const filteredAssignments =
    activeTab === 'All'
      ? assignments
      : assignments.filter(item => item.subject === activeTab);

  const handleUploadClick = (id) => {
    if (fileInputs.current[id]) {
      fileInputs.current[id].click();
    }
  };

  const handleFileChange = async (event, assignmentId) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('doc', file); // Assuming 'doc' is the file field in the assignments collection

      const updated = await pbstudent.collection('assignments').update(assignmentId, formData);

      setUploaded((prev) => ({ ...prev, [assignmentId]: true }));
      alert('Upload successful!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed.');
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <div className="flex-1 p-6">

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-6 border-b text-sm text-light-primary">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-foreground text-foreground font-semibold' : 'border-transparent'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredAssignments.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-5">
              {/* Top */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[item.subject] || 'bg-gray-500'}`}>
                  {iconMap[item.subject] || <Code2 className="text-white" />}
                </div>
                <h3 className="text-base font-semibold text-black">{item.title}</h3>
              </div>

              {/* Date */}
              <div className="flex items-center text-xs text-light-primary/80 mb-2">
                <Clock size={14} className="mr-1" />
                Due on {new Date(item.due_date).toLocaleDateString()}
              </div>

              {/* Description */}
              <p className="text-sm text-light-primary mb-3">{item.desc}</p>

              {/* Resource + Marks */}
              <div className="flex items-center justify-between text-sm mb-3">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 ${colorMap[item.subject] || 'text-primary'} text-sm`}>
                    <LinkIcon size={14} /> View Resources
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No resource</span>
                )}
                <span className="text-gray-500">Marks: {item.marks}</span>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={(el) => fileInputs.current[item.id] = el}
                className="hidden"
                onChange={(e) => handleFileChange(e, item.id)}
              />

              {/* Upload Button */}
              <button
                onClick={() => handleUploadClick(item.id)}
                disabled={uploaded[item.id]}
                className={`w-full ${colorMap[item.subject] || 'bg-primary'} hover:opacity-90 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50`}
              >
                <UploadCloud size={16} /> {uploaded[item.id] ? 'Uploaded' : 'Upload Assignment'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




















// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import {
//   Clock, UploadCloud, Link as LinkIcon,
//   Code2, Database, ShieldCheck
// } from 'lucide-react';
// import pbstudent from '@/lib/db';

// export default function AssignmentPage() {
//   const [activeTab, setActiveTab] = useState('All');
//   const [assignments, setAssignments] = useState([]);
//   const [uploaded, setUploaded] = useState({});
//   const fileInputs = useRef({}); // store multiple file input refs

//   const iconMap = {
//     'Web Dev': <Code2 className="text-white" />,
//     'Database': <Database className="text-white" />,
//     'Security': <ShieldCheck className="text-white" />,
//   };

//   const colorMap = {
//     'Web Dev': 'bg-purple-600',
//     'Database': 'bg-pink-600',
//     'Security': 'bg-blue-600',
//   };

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const results = await pbstudent.collection('assignments').getFullList({
//           sort: '-due_date',
//         });
//         setAssignments(results);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const tabs = ['All', 'Web Dev', 'Database', 'Security', 'Marathi', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'English'];

//   const filteredAssignments =
//     activeTab === 'All'
//       ? assignments
//       : assignments.filter(item => item.subject === activeTab);

//   const handleUploadClick = (id) => {
//     if (fileInputs.current[id]) {
//       fileInputs.current[id].click(); // manually trigger input
//     }
//   };

//   const handleFileChange = async (event, assignmentId) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('assignmentId', assignmentId); // optional

//       // Replace with your own logic if needed
//       await pbstudent.collection('submissions').create(formData);

//       setUploaded((prev) => ({ ...prev, [assignmentId]: true }));
//       alert('Upload successful!');
//     } catch (err) {
//       console.error('Upload error:', err);
//       alert('Upload failed.');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-background font-sans">
//       <div className="flex-1 p-6">

//         {/* Tabs */}
//         <div className="mt-6">
//           <div className="flex gap-6 border-b text-sm text-light-primary">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-foreground text-foreground font-semibold' : 'border-transparent'}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Assignment Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
//           {filteredAssignments.map((item) => (
//             <div key={item.id} className="bg-white rounded-xl shadow p-5">
//               {/* Top */}
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[item.subject] || 'bg-gray-500'}`}>
//                   {iconMap[item.subject] || <Code2 className="text-white" />}
//                 </div>
//                 <h3 className="text-base font-semibold text-black">{item.title}</h3>
//               </div>

//               {/* Date */}
//               <div className="flex items-center text-xs text-light-primary/80 mb-2">
//                 <Clock size={14} className="mr-1" />
//                 Due on {new Date(item.due_date).toLocaleDateString()}
//               </div>

//               {/* Description */}
//               <p className="text-sm text-light-primary mb-3">{item.desc}</p>

//               {/* Resource + Marks */}
//               <div className="flex items-center justify-between text-sm mb-3">
//                 {item.link ? (
//                   <a href={item.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 ${colorMap[item.subject] || 'text-primary'} text-sm`}>
//                     <LinkIcon size={14} /> View Resources
//                   </a>
//                 ) : (
//                   <span className="text-gray-400 text-sm">No resource</span>
//                 )}
//                 <span className="text-gray-500">Marks: {item.marks}</span>
//               </div>

//               {/* Hidden file input */}
//               <input
//                 type="file"
//                 ref={(el) => fileInputs.current[item.id] = el}
//                 className="hidden"
//                 onChange={(e) => handleFileChange(e, item.id)}
//               />

//               {/* Upload Button */}
//               <button
//                 onClick={() => handleUploadClick(item.id)}
//                 disabled={uploaded[item.id]}
//                 className={`w-full ${colorMap[item.subject] || 'bg-primary'} hover:opacity-90 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50`}
//               >
//                 <UploadCloud size={16} /> {uploaded[item.id] ? 'Uploaded' : 'Upload Assignment'}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




















// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Clock, UploadCloud, Link as LinkIcon,
//   Code2, Database, ShieldCheck
// } from 'lucide-react';
// import pbstudent from '@/lib/db';

// export default function AssignmentPage() {
//   const [activeTab, setActiveTab] = useState('All');
//   const [assignments, setAssignments] = useState([]);

//   const iconMap = {
//     'Web Dev': <Code2 className="text-white" />,
//     'Database': <Database className="text-white" />,
//     'Security': <ShieldCheck className="text-white" />,
//   };

//   const colorMap = {
//     'Web Dev': 'bg-purple-600',
//     'Database': 'bg-pink-600',
//     'Security': 'bg-blue-600',
//   };

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const results = await pbstudent.collection('assignments').getFullList({
//           sort: '-due_date',
//         });

//         setAssignments(results);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const tabs = ['All', 'Web Dev', 'Database', 'Security', 'Marathi','Mathematics','Science','Social Science','Hindi','English'];
//   const filteredAssignments =
//     activeTab === 'All'
//       ? assignments
//       : assignments.filter(item => item.subject === activeTab);

//   return (
//     <div className="flex min-h-screen bg-background font-sans">
//       <div className="flex-1 p-6">

//         {/* Tabs */}
//         <div className="mt-6">
//           <div className="flex gap-6 border-b  text-sm text-light-primary">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-2 border-b-2 transition-colors ${activeTab === tab ? 'border-foreground text-foreground font-semibold' : 'border-transparent'}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Assignment Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
//           {filteredAssignments.map((item, idx) => (
//             <div key={idx} className="bg-white rounded-xl shadow p-5">
//               {/* Top */}
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[item.subject] || 'bg-gray-500'}`}>
//                   {iconMap[item.subject] || <Code2 className="text-white" />}
//                 </div>
//                 <h3 className="text-base font-semibold text-black">{item.title}</h3>
//               </div>

//               {/* Date */}
//               <div className="flex items-center text-xs text-light-primary/80 mb-2">
//                 <Clock size={14} className="mr-1" />
//                 Due on {new Date(item.due_date).toLocaleDateString()}
//               </div>

//               {/* Description */}
//               <p className="text-sm text-light-primary mb-3">{item.desc}</p>

//               {/* Resource + Marks */}
//               <div className="flex items-center justify-between text-sm mb-3">
//                 {item.link ? (
//                   <a href={item.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 justify-center ${colorMap[item.subject] || 'text-primary'} text-sm`}>
//                     <LinkIcon size={14} /> View Resources
//                   </a>
//                 ) : (
//                   <span className="text-gray-400 text-sm">No resource</span>
//                 )}
//                 <span className="text-gray-500">Marks: {item.marks}</span>
//               </div>

//               {/* Upload Button */}
//               <button className={`w-full ${colorMap[item.subject] || 'bg-primary'} hover:opacity-90 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2`}>
//                 <UploadCloud size={16} /> Upload Assignment
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

