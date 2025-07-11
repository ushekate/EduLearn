'use client';

import { useEffect, useState } from 'react';
import { Download, UploadCloud, PlusCircle, Filter, FileText } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Sheet } from '@/components/ui/Sheet';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { GradeColor, calculateAverage, getGrade } from '@/lib/grades';

export default function GradebookPage() {
  const [selectedCourse, setSelectedCourse] = useState('Mathematics');
  const [students, setStudents] = useState([
    {
      name: 'Kasturi Tare',
      scores: [85, 90, 88, 92],
      feedback: '👍 Great work',
    },
    {
      name: 'Unnati Shekate',
      scores: [70, 68, 72, 75],
      feedback: 'Needs improvement',
    },
  ]);
  const [showDetails, setShowDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-screen p-6 bg-[var(--background)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          {/* <h1 className="text-2xl font-bold">🗂 Gradebook</h1> */}
          <p className="text-sm text-gray-500">Dashboard &gt; Gradebook</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option>Mathematics</option>
            <option>Biology</option>
          </Select>
          <Button className='bg-gray-100' variant="outline"><UploadCloud className="w-4 h-4 mr-1" /> Import</Button>
          <Button className='bg-gray-100' variant="outline"><Download className="w-4 h-4 mr-1" /> Export</Button>
          <Button className='bg-gray-100' variant="outline"><FileText className="w-4 h-4 mr-1" /> Report</Button>
          <Button onClick={() => setShowModal(true)}><PlusCircle className="w-4 h-4 mr-1" /> Add Assessment</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input placeholder="Search student name..." className="w-full md:w-64 bg-white" />
        <Select><option>All Grades</option><option>A</option><option>B</option><option>C</option></Select>
        <Select><option>Sort: Highest Score</option><option>Lowest Score</option><option>Name A-Z</option></Select>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 p-4 rounded-md">📈 Class Average: 82.5%</div>
        <div className="bg-pink-100 p-4 rounded-md">🧑‍🎓 Top Performer: Kasturi Tare</div>
        <div className="bg-red-100 p-4 rounded-md">📉 Lowest Score: 55%</div>
      </div>

      {/* Grade Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-md bg-secondary">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-2 text-left">Student</th>
              <th className="p-2">Assignment 1</th>
              <th className="p-2">Assignment 2</th>
              <th className="p-2">Test 1</th>
              <th className="p-2">Final Exam</th>
              <th className="p-2">Average %</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const average = calculateAverage(student.scores);
              const grade = getGrade(average);
              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowDetails(student)}
                >
                  <td className="p-2 font-medium">{student.name}</td>
                  {student.scores.map((s, i) => (
                    <td key={i} className="p-2 text-center">{s}</td>
                  ))}
                  <td className="p-2 text-center">{average.toFixed(2)}</td>
                  <td className={`p-2 text-center font-bold text-${GradeColor[grade]}`}>{grade}</td>
                  <td className="p-2" title={student.feedback}>{student.feedback}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Assessment Modal */}
      {showModal && (
        <Dialog onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Add New Assessment</h2>
            <Input placeholder="Assessment Title" className="mb-2" />
            <Select className="mb-2">
              <option>Assignment</option>
              <option>Quiz</option>
              <option>Midterm</option>
              <option>Final</option>
            </Select>
            <Input type="date" className="mb-2" />
            <Input placeholder="Max Score" className="mb-2" />
            <Input placeholder="Weightage % (optional)" className="mb-2" />
            <Input placeholder="Description" className="mb-2" />
            <Button className="w-full">Create Assessment</Button>
          </div>
        </Dialog>
      )}

      {/* Student Detail Panel */}
      {showDetails && (
        <Sheet onClose={() => setShowDetails(null)}>
          <div className="p-4">
            <h2 className="text-lg font-bold">👤 {showDetails.name}</h2>
            <p>Email: example@email.com</p>
            <p>Total Attendance: 92%</p>
            <div className="mt-4">
              <h3 className="font-semibold">Grades:</h3>
              <ul>
                {showDetails.scores.map((s, i) => (
                  <li key={i}>Assessment {i + 1}: {s}</li>
                ))}
              </ul>
              <h3 className="font-semibold mt-2">Feedback:</h3>
              <p>{showDetails.feedback}</p>
              <Button className="mt-4">📎 Download Report Card</Button>
            </div>
          </div>
        </Sheet>
      )}
    </div>
  );
}
