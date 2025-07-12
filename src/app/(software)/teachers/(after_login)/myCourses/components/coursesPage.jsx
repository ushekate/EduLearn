'use client';

import { useEffect, useState } from 'react';
import {
  FolderOpen, Pencil, Trash2, BookOpen, Users,
  Book, Code2, Notebook, FileText,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Progress } from "@/components/ui/Progress";
// import Link from 'next/link';
import pbstudent from '@/lib/db';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const records = await pbstudent.collection('new_courses').getFullList({ sort: '-created' });
        setCourses(records);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);
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


  // Add New Course

  // const [addCourse, setAddCourse] = useState(false);

  // const toggleAddCourse = () => setAddCourse(!addCourse);

  const [formAddCourseData, setFormAddCourseData] = useState({
    title: '',
    subject: '',
    board: '',
    icon: '',
    description: '',
    lectures: '',
    hours: ''
  });

  const subjects = ['Mathematics', 'English', 'Biology', 'Physics', 'Chemistry'];
  const boards = ['CBSE', 'ICSE', 'State Board'];
  const iconOptions = [
    { label: 'Book', value: 'Book', icon: <Book className="inline-block w-4 h-4 mr-2" /> },
    { label: 'Code', value: 'Code', icon: <Code2 className="inline-block w-4 h-4 mr-2" /> },
    { label: 'Text', value: 'Text', icon: <FileText className="inline-block w-4 h-4 mr-2" /> },
    { label: 'Notebook', value: 'Notebook', icon: <Notebook className="inline-block w-4 h-4 mr-2" /> }
  ];



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAddCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const {
      title, subject, board, icon,
      description, lectures, hours
    } = formAddCourseData;

    // Validate required numeric fields
    if (parseInt(lectures) <= 0 || parseInt(hours) <= 0) {
      alert("Lectures and Hours must be greater than 0");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('board', board);
    formData.append('icon', icon);
    formData.append('description', description);
    formData.append('lectures', parseInt(lectures));
    formData.append('hours', parseInt(hours));

    try {
      const record = await pbstudent.collection('new_courses').create(formData);
      console.log('Course added:', record);
      alert('Course added successfully!');
      toggleAddCourse();
      setFormAddCourseData({
        title: '',
        subject: '',
        board: '',
        icon: '',
        description: '',
        lectures: '',
        hours: ''
      });
    } catch (error) {
      console.error('Error adding course:', error?.response || error);
      alert('Failed to add course. Check console for error details.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl p-2 font-bold text-foreground">All Courses</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">📥 Import Template</Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-2 bg-[#8B5CF6] hover:bg-[#7c4ae4] text-white"><Plus size={20} /> Create New Course</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogTitle className="text-lg font-semibold mb-4">Add Course</DialogTitle>
                <form onSubmit={handleAddCourse}>
                  <div className="mb-3">
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" id="title" required onChange={handleChange} value={formAddCourseData.title} className="mt-1 p-2 w-full border rounded-md" />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Subject</label>
                    <select name="subject" required onChange={handleChange} value={formAddCourseData.subject} className="mt-1 p-2 w-full border rounded-md">
                      <option value="">Select Subject</option>
                      {subjects.map((subj) => <option key={subj} value={subj}>{subj}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Board</label>
                    <select name="board" required onChange={handleChange} value={formAddCourseData.board} className="mt-1 p-2 w-full border rounded-md">
                      <option value="">Select Board</option>
                      {boards.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Icon</label>
                    <select name="icon" required onChange={handleChange} value={formAddCourseData.icon} className="mt-1 p-2 w-full border rounded-md">
                      <option value="">Select Icon</option>
                      {iconOptions.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea name="description" rows="3" onChange={handleChange} value={formAddCourseData.description} className="mt-1 p-2 w-full border rounded-md" required />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium">Lectures</label>
                    <input type="number" name="lectures" required onChange={handleChange} value={formAddCourseData.lectures} className="mt-1 p-2 w-full border rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Hours</label>
                    <input type="number" name="hours" required onChange={handleChange} value={formAddCourseData.hours} className="mt-1 p-2 w-full border rounded-md" />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Add</button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <Input
            placeholder="🔍 Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Select onValueChange={setFilterSubject}>
            <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Marathi">Marathi</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
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
                <div className='flex justify-between'>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm bg-background p-1 px-2 rounded-full">{course.board}</p>
                </div>
                <p className="text-sm">{course.subject}</p>

                <p className="text-sm">{course.description}</p>
                {/* <Progress value={course.progress} className="h-2 bg-gray-200" /> */}
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

