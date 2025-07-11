'use client';

import { useState } from 'react';
import {
  FolderOpen, Pencil, Trash2, BookOpen, Users, 
  LayoutDashboard, ClipboardList, CalendarDays, FileText, MessageCircle, BarChart, Settings, LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Progress } from "@/components/ui/Progress";
import Link from 'next/link';

// const menu = [
//   { icon: <LayoutDashboard />, label: 'Dashboard', href: '#' },
//   { icon: <BookOpen />, label: 'My Courses', href: '#' },
//   { icon: <Users />, label: 'My Students', href: '#' },
//   { icon: <ClipboardList />, label: 'Assignments', href: '#' },
//   { icon: <CalendarDays />, label: 'Schedule', href: '#' },
//   { icon: <FileText />, label: 'Gradebook', href: '#' },
//   { icon: <MessageCircle />, label: 'Messages', href: '#' },
//   { icon: <BarChart />, label: 'Reports', href: '#' },
//   { icon: <Settings />, label: 'Settings', href: '#' },
// ];

const mockCourses = [
  {
    id: 1,
    title: "Web Development Basics",
    subject: "Computer Science",
    grade: "Grade 9",
    students: 24,
    progress: 60,
    nextClass: "8th July, 11:00 AM",
    status: "Active",
  },
  {
    id: 2,
    title: "Algebra Foundations",
    subject: "Math",
    grade: "Grade 8",
    students: 30,
    progress: 40,
    nextClass: "9th July, 9:00 AM",
    status: "Active",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterSubject ? course.subject === filterSubject : true) &&
    (filterGrade ? course.grade === filterGrade : true) &&
    (filterStatus ? course.status === filterStatus : true)
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-background-2 shadow p-4 flex flex-col">
        <h2 className="text-xl font-bold text-purple-600 mb-6">EduLearn</h2>
        {menu.map((item, i) => (
          <Link key={i} href={item.href} className="flex items-center gap-2 text-gray-700 hover:text-purple-600 mb-4">
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
        <button className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-700">
          <LogOut /> Logout
        </button>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            {/* <h1 className="text-3xl font-bold text-foreground">📚 My Courses</h1> */}
            <p className="text-muted-foreground text-sm">Dashboard &gt; My Courses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">📥 Import Template</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#8B5CF6] hover:bg-[#7c4ae4] text-white">➕ Create New Course</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <h2 className="text-lg font-bold mb-4">Create New Course</h2>
                <div className="space-y-3">
                  <Input placeholder="Course Title" />
                  <Input placeholder="Subject" />
                  <Input placeholder="Grade Level" />
                  <Input placeholder="Description" />
                  <Input type="file" />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[#8B5CF6] text-white">Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
          <Input
            placeholder="🔍 Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Select onValueChange={setFilterSubject}>
            <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterGrade}>
            <SelectTrigger><SelectValue placeholder="Grade" /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 8 }, (_, i) => (
                <SelectItem key={i + 5} value={`Grade ${i + 5}`}>Grade {i + 5}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Cards */}
        {filteredCourses.length === 0 ? (
          <div className="text-center p-10 border rounded-md border-dashed">
            <div className="text-3xl">📭</div>
            <p className="text-xl font-semibold mt-2">You haven’t created any courses yet.</p>
            <Button className="mt-4 bg-[#8B5CF6] text-white">Create Course</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="rounded-xl border bg-white shadow hover:shadow-lg p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">{course.title}</h3>
                  <span className="text-xs px-1 py-1 rounded-full bg-purple-100 text-purple-700">
                    {course.subject}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{course.grade}</p>
                <p className="text-sm text-muted-foreground">{course.students} Enrolled</p>
                <Progress value={course.progress} className="h-2 bg-gray-200" />
                <p className="text-sm text-muted-foreground">Next Class: {course.nextClass}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm"><FolderOpen className="w-4 h-4 mr-1" />Open</Button>
                  <Button variant="outline" size="sm"><Pencil className="w-4 h-4 mr-1" />Edit</Button>
                  <Button variant="outline" size="sm"><BookOpen className="w-4 h-4 mr-1" />Assignments</Button>
                  <Button variant="outline" size="sm"><Users className="w-4 h-4 mr-1" />Students</Button>
                  <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

