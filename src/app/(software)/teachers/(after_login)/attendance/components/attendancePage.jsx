'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card, CardContent } from '@/components/ui/Card';
import pbstudent from '@/lib/db'; // Your PocketBase client
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Fetch students on load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await pbstudent.collection('students').getFullList({
          sort: 'first_name',
        });
        const studentData = res.map((s) => ({
          id: s.id,
          name: `${s.first_name} ${s.last_name}`,
        }));
        setStudents(studentData);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };
    fetchStudents();
  }, []);

  // Fetch existing attendance for selected date
  useEffect(() => {
    const fetchAttendance = async () => {
      const newAttendance = {};
      for (const student of students) {
        try {
          const existing = await pbstudent
            .collection('attendance')
            .getFirstListItem(
              `student_id="${student.id}" && date="${date}"`,
              { $autoCancel: false }
            );
          newAttendance[student.id] = existing?.status === 'Present';
        } catch (e) {
          newAttendance[student.id] = false; // Default Absent if not found
        }
      }
      setAttendance(newAttendance);
    };

    if (students.length > 0) {
      fetchAttendance();
    }
  }, [students, date]);

  const handleCheckboxChange = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkAll = (value) => {
    const updated = {};
    students.forEach((s) => (updated[s.id] = value));
    setAttendance(updated);
  };

  const saveToPocketBase = async () => {
    try {
      for (const studentId of Object.keys(attendance)) {
        const status = attendance[studentId] ? 'Present' : 'Absent';

        try {
          const existing = await pbstudent
            .collection('attendance')
            .getFirstListItem(`student_id="${studentId}" && date="${date}"`, {
              $autoCancel: false,
            });

          // Update if already exists
          await pbstudent.collection('attendance').update(existing.id, {
            status,
          });
        } catch (e) {
          // Create new if not exists
          await pbstudent.collection('attendance').create({
            student_id: studentId,
            status,
            date,
          });
        }
      }

      alert('Attendance saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save attendance.');
    }
  };

  const exportToExcel = () => {
    const data = students.map((s) => ({
      Name: s.name,
      Date: date,
      Status: attendance[s.id] ? 'Present' : 'Absent',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `attendance-${date}.xlsx`);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="p-6 mx-auto min-h-screen bg-[var(--background)]">
      <h1 className="text-2xl font-bold mb-4">Student Attendance</h1>

      <div className="flex items-center gap-4 mb-4 bg-white p-4 rounded-xl shadow-sm">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="max-w-[150px]"
        />
        <Input
          placeholder="Search student by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <button
          onClick={saveToPocketBase}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save Attendance
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Export Excel
        </button>
      </div>

      <div className="mb-2 flex gap-2">
        <button
          onClick={() => handleMarkAll(true)}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          Mark All Present
        </button>
        <button
          onClick={() => handleMarkAll(false)}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Mark All Absent
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">
                  <Checkbox
                    checked={attendance[student.id] || false}
                    onCheckedChange={() => handleCheckboxChange(student.id)}
                  />
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => setSelectedStudentId(student.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              Attendance for {selectedStudent.name}
            </h2>
            <p>Date: {date}</p>
            <p>
              Status:{' '}
              <span
                className={
                  attendance[selectedStudent.id] ? 'text-green-600' : 'text-red-600'
                }
              >
                {attendance[selectedStudent.id] ? 'Present' : 'Absent'}
              </span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
