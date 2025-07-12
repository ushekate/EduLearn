'use client';

import { useState } from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sheet, SheetContent } from '@/components/ui/Sheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { Download, Upload, Plus, BarChart3 } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

const mockCourses = ['Mathematics', 'Science', 'History'];
const mockStudents = [
  {
    name: 'Kasturi Tare',
    photo: '/profileImage.png',
    email: 'kasturi0505@email.com',
    attendance: '92%',
    grades: [85, 90, 88, 92],
    feedback: '👍 Great work',
  },
  {
    name: 'Unnati Shekate',
    photo: '/AnimeImage.jpeg',
    email: 'unnati43@email.com',
    attendance: '80%',
    grades: [70, 68, 72, 75],
    feedback: 'Needs improvement',
  },
];

export default function GradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [students] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const calculateAverage = (grades) => {
    const sum = grades.reduce((acc, cur) => acc + cur, 0);
    return (sum / grades.length).toFixed(2);
  };

  const getGradeLetter = (avg) => {
    if (avg >= 85) return 'A';
    if (avg >= 70) return 'B';
    if (avg >= 55) return 'C';
    return 'D/F';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-yellow-500';
      case 'C': return 'text-orange-500';
      default: return 'text-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Gradebook</h1>
          {/* <p className="text-sm text-gray-500">Dashboard &gt; Gradebook</p> */}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* <Select onValueChange={setSelectedCourse} defaultValue={selectedCourse}>
            {mockCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </Select>
          <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button> */}
          <Button variant="outline"><BarChart3 className="mr-2 h-4 w-4" /> Performance</Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Add Assessment</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogTitle className="text-lg font-semibold mb-4">Add New Assessment</DialogTitle>
              <form className="space-y-3">
                <Input placeholder="Assessment Title" />
                <select className="w-full border rounded px-3 py-2">
                  <option>Assignment</option>
                  <option>Quiz</option>
                  <option>Midterm</option>
                  <option>Final</option>
                </select>
                <Input type="date" />
                <Input type="number" placeholder="Max Score" />
                <Input type="number" placeholder="Weightage % (optional)" />
                <textarea placeholder="Description" className="w-full border rounded px-3 py-2"></textarea>
                <Input type="file" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Publish Scores Now</span>
                </label>
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full rounded-lg bg-white">
          <thead className="bg-foreground text-white sticky top-0">
            <tr>
              <th className="p-3 text-left font-semibold">Student Name</th>
              <th className="p-3 text-left">Assignment 1</th>
              <th className="p-3 text-left">Assignment 2</th>
              <th className="p-3 text-left">Test 1</th>
              <th className="p-3 text-left">Final Exam</th>
              <th className="p-3 text-left">Average %</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const avg = calculateAverage(s.grades);
              const grade = getGradeLetter(avg);
              return (
                <tr key={i} className="hover:bg-purple-50 cursor-pointer" onClick={() => { setSelectedStudent(s); setOpenSheet(true); }}>
                  <td className="p-3">{s.name}</td>
                  {s.grades.map((g, j) => <td key={j} className="p-3"><Input defaultValue={g} type="number" className="w-20" /></td>)}
                  <td className="p-3">{avg}</td>
                  <td className={`p-3 font-bold ${getGradeColor(grade)}`}>{grade}</td>
                  <td className="p-3"><Input defaultValue={s.feedback} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Student Detail Sheet */}
      {openSheet && (
        <Sheet onClose={() => setOpenSheet(false)}>
          <SheetContent onClose={() => setOpenSheet(false)} side="right" className="w-[400px]">
            {selectedStudent && (
              <div className="p-4">
                <img src={selectedStudent.photo} alt="Student" className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
                <p className="text-sm text-gray-500">{selectedStudent.email}</p>
                <p className="text-sm">Attendance: {selectedStudent.attendance}</p>

                <h3 className="mt-4 font-bold">Grades</h3>
                <ul className="list-disc pl-4">
                  {selectedStudent.grades.map((g, i) => <li key={i}>Assessment {i + 1}: {g}</li>)}
                </ul>

                <h3 className="mt-4 font-bold">Feedback</h3>
                <p>{selectedStudent.feedback}</p>

                <Button className="mt-4 w-full">📎 Download Report</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
