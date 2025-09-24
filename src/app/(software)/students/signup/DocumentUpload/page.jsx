'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import pbstudent from '@/lib/db';

export default function DocumentUpload() {
  const [formData, setFormData] = useState({
    idProof: null,
    addressProof: null,
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the student record based on email
      const record = await pbstudent.collection('students').getFirstListItem(`email="${email}"`);
      if (!record.verified) throw new Error('Email not verified yet.');

      // Create FormData for file upload
      const formDataToSend = new FormData();
      if (formData.idProof) {
        formDataToSend.append('idProof', formData.idProof); // Append the file
      }
      if (formData.addressProof) {
        formDataToSend.append('addressProof', formData.addressProof); // Append the file
      }

      // Update the record with the new files
      await pbstudent.collection('students').update(record.id, formDataToSend);

      alert('Documents uploaded successfully!');
      router.push('/students/signup/components/success');
    } catch (err) {
      console.log(err);
      setError('Failed to upload documents. Ensure email is verified. Check console.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
      <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
        <div className="w-full text-black shadow-2xl px-8 py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">📑</div>
            <h2 className="text-xl font-bold ml-2">Upload Documents</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">ID Proof</label>
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                onChange={(e) => setFormData({ ...formData, idProof: e.target.files[0] })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address Proof</label>
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                onChange={(e) => setFormData({ ...formData, addressProof: e.target.files[0] })}
                className="text-black w-full border rounded px-3 py-1 mt-1"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
              Submit Documents
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}










// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function DocumentUpload() {
//   const [formData, setFormData] = useState({
//     idProof: null,
//     addressProof: null,
//   });
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const record = await pbstudent.collection('students').getFirstListItem(`email="${email}"`);
//       if (!record.verified) throw new Error('Email not verified yet.');
//       const formDataToSend = new FormData();
//       if (formData.idProof) formDataToSend.append('idProof', formData.idProof);
//       if (formData.addressProof) formDataToSend.append('addressProof', formData.addressProof);

//       await pbstudent.collection('students').update(record.id, formDataToSend);
//       alert('Documents uploaded successfully!');
//       router.push('/students/signup/components/success');
//     } catch (err) {
//       console.log(err);
//       setError('Failed to upload documents. Ensure email is verified. Check console.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">📑</div>
//             <h2 className="text-xl font-bold ml-2">Upload Documents</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">ID Proof</label>
//               <input
//                 type="file"
//                 accept="image/png,image/vnd.mozilla.apng,image/jpeg,application/pdf"
//                 onChange={(e) => setFormData({ ...formData, idProof: e.target.files[0] })}
//                 className="text-black w-full border rounded px-3 py-1 mt-1"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Address Proof</label>
//               <input
//                 type="file"
//                 accept="image/png,image/vnd.mozilla.apng,image/jpeg,application/pdf"
//                 onChange={(e) => setFormData({ ...formData, addressProof: e.target.files[0] })}
//                 className="text-black w-full border rounded px-3 py-1 mt-1"
//               />
//             </div>
//             {error && <p className="text-red-600 text-sm">{error}</p>}
//             <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
//               Submit Documents
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }













// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import pbstudent from '@/lib/db';

// export default function DocumentUpload() {
//   const [formData, setFormData] = useState({
//     idProof: null,
//     addressProof: null,
//   });
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get('email');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const record = await pbstudent.collection('students').getFirstListItem(`email="${email}"`);
//       const formDataToSend = new FormData();
//       if (formData.idProof) formDataToSend.append('idProof', formData.idProof);
//       if (formData.addressProof) formDataToSend.append('addressProof', formData.addressProof);

//       await pbstudent.collection('students').update(record.id, formDataToSend);
//       alert('Documents uploaded successfully!');
//       router.push('/students/signup/components/success');
//     } catch (err) {
//       console.log(err);
//       setError('Failed to upload documents. Check console.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-300 to-purple-800">
//       <div className="bg-white rounded-xl mx-4 my-10 w-[30%] max-w-5xl overflow-hidden">
//         <div className="w-full text-black shadow-2xl px-8 py-4">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-purple-100 text-purple-700 p-2 rounded-full">📑</div>
//             <h2 className="text-xl font-bold ml-2">Upload Documents</h2>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">ID Proof</label>
//               <input
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => setFormData({ ...formData, idProof: e.target.files[0] })}
//                 className="text-black w-full border rounded px-3 py-1 mt-1"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Address Proof</label>
//               <input
//                 type="file"
//                 accept="image/*,application/pdf"
//                 onChange={(e) => setFormData({ ...formData, addressProof: e.target.files[0] })}
//                 className="text-black w-full border rounded px-3 py-1 mt-1"
//               />
//             </div>
//             {error && <p className="text-red-600 text-sm">{error}</p>}
//             <button type="submit" className="w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition">
//               Submit Documents
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }