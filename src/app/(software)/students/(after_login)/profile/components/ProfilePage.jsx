'use client';

import { useEffect, useState } from 'react';
import pbstudent from '@/lib/db';

export default function StudentProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = pbstudent.authStore.model;
        if (authUser) {
          const fullUser = await pbstudent.collection('students').getOne(authUser.id);
          setUser(fullUser);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const student = {
    dob: "26/07/2019",
    gender: "Male",
    guardian: "Smith Doe",
    contact: "987-654-3210",
    address: "1341 Poplar Street, Chicago, IL 60606",
    hobbies: "Dance, Music, Playing Cricket"
  };

  const subjects = [
    { name: 'Hindi', practical: 36, written: 40, grade: 'B' },
    { name: 'Gujarati', practical: 45, written: 49, grade: 'A' },
    { name: 'English', practical: 38, written: 39, grade: 'B' },
    { name: 'Maths', practical: 44, written: 47, grade: 'A' },
    { name: 'Science', practical: 34, written: 26, grade: 'C' },
    { name: 'Social Science', practical: 48, written: 50, grade: 'A' },
  ];

  const totalPractical = subjects.reduce((acc, s) => acc + s.practical, 0);
  const totalWritten = subjects.reduce((acc, s) => acc + s.written, 0);
  const totalScore = totalPractical + totalWritten;

  return (
    <div className="min-h-screen bg-background p-6 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={user.profile_pic
                    ? `${pbstudent.baseUrl}/api/files/students/${user.id}/${user.profile_pic}`
                    : '/profileImage.png'}
                  alt="profile"
                  className="w-24 h-24 rounded-full border-2 border-purple-400"
                />
                <div className="mt-2">
                  <div className="text-lg font-semibold">{user.first_name} {user.last_name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <div>
                      <p className="font-medium">Stu ID</p>
                      <p>5563</p>
                    </div>
                    <div>
                      <p className="font-medium">Class</p>
                      <p>{user.level}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
             <div>
               <p className="font-semibold">Date of Birth</p>
               <p>{student.dob}</p>
             </div>
             <div>
               <p className="font-semibold">Gender</p>
               <p>{student.gender}</p>
             </div>
             <div>
               <p className="font-semibold">Guardian</p>
               <p>{student.guardian}</p>
             </div>
             <div>
               <p className="font-semibold">Guardian Contact</p>
               <p>{student.contact}</p>
             </div>
             <div className="col-span-2">
               <p className="font-semibold">Address</p>
               <p>{student.address}</p>
             </div>
             <div className="col-span-2">
               <p className="font-semibold">Hobbies</p>
               <p>{student.hobbies}</p>
             </div>
           </div>
              {/* <div className="text-sm space-y-2">
                <div>
                  <p className="font-semibold">Date of Birth</p>
                  <p>{student.dob}</p>
                </div>
                <div>
                  <p className="font-semibold">Gender</p>
                  <p>{student.gender}</p>
                </div>
                <div>
                  <p className="font-semibold">Guardian</p>
                  <p>{student.guardian}</p>
                </div>
                <div>
                  <p className="font-semibold">Guardian Contact</p>
                  <p>{student.contact}</p>
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p>{student.address}</p>
                </div>
                <div>
                  <p className="font-semibold">Hobbies</p>
                  <p>{student.hobbies}</p>
                </div>
              </div> */}
            </div>
          )}
        </div>

        {/* Attendance Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <div className="border rounded px-2 py-1 text-sm">
              <span>Monthly</span>
            </div>
          </div>
          <p className="text-yellow-600 font-medium mb-2">Average: 70%</p>
          <div className="w-full h-40 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
            <p>Attendance Chart Placeholder</p>
          </div>
        </div>

        {/* Result Sheet + Grades (Inline) */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Result Sheet */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Result Sheet</h3>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Class 12th</option>
              </select>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Subject</th>
                  <th>Practical</th>
                  <th>Written</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{s.name}</td>
                    <td>{s.practical}/50</td>
                    <td>{s.written}/50</td>
                    <td>{s.practical + s.written}/100</td>
                    <td>{s.grade}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td>Total</td>
                  <td>{totalPractical}/300</td>
                  <td>{totalWritten}/300</td>
                  <td>{totalScore}/600</td>
                  <td>B</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Grades Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Grades</h3>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Overall</option>
              </select>
            </div>
            <div className="w-full h-40 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
              <p>Grades Donut Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

