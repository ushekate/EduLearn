'use client';
import { useState } from 'react';
import { Calendar, Search, Bell, ArrowRight, RefreshCw, Pin } from 'lucide-react';

const noticesData = [
  {
    date: '10 July 2025',
    title: 'Mid-Term Exam starts from 01 Aug. Timetable uploaded in Exam section. Please check.',
    category: 'Exam Notice',
    status: 'Read',
    link: null,
  },
  {
    date: '08 July 2025',
    title: "School will remain closed on 09 July for Guru Purnima.",
    category: 'Holiday Announcement',
    status: 'Unread',
    link: null,
  },
  {
    date: '06 July 2025',
    title: 'Forms open for inter-school sports competition. Deadline: 12 July.',
    category: 'Annual Sports Registration',
    status: 'Unread',
    link: 'https://forms.google.com',
  },
  {
    date: '04 July 2025',
    title: 'PTM scheduled for 15 July from 9:00 AM to 12:00 PM. Attendance is mandatory.',
    category: 'Parent Teacher Meeting',
    status: 'Read',
    link: null,
  },
  {
    date: '01 July 2025',
    title: 'This is a reminder to pay the quarterly fees before 10th July. Late payment will incur additional charges.',
    category: 'Fee Reminder',
    status: 'Read',
    link: null,
  },
];

export default function NoticesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const categories = [
    'All Categories',
    'Exam Notice',
    'Holiday Announcement',
    'Annual Sports Registration',
    'Parent Teacher Meeting',
    'Fee Reminder',
  ];

  const filteredNotices = noticesData.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || notice.category === category;

    const date = new Date(notice.date);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    const matchesDate =
      (!fromDate || date >= fromDate) && (!toDate || date <= toDate);

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background px-4 md:px-10 py-6">
      {/* <h1 className="text-2xl font-bold text-purple-700 mb-6">Notices</h1> */}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative">
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg border border-light-primary text-light-primary text-sm" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          {/* <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full md:w-60 border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>

        <select
          className="border rounded px-3 py-2 text-light-primary"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-2 items-center">
          {/* <Calendar className="h-5 w-5 text-gray-500" /> */}
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="border rounded px-2 py-1 text-light-primary"
          />
          <span>-</span>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="border rounded px-2 py-1 text-light-primary"
          />
        </div>

        <button
          onClick={() => {
            setSearch('');
            setCategory('All Categories');
            setDateRange({ from: '', to: '' });
          }}
          className="flex gap-2 bg-background/80 text-foreground font-medium px-4 py-2 rounded hover:bg-background"
        >
          <RefreshCw size={18} className='mt-0.5' />Reset
        </button>
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {filteredNotices.map((notice, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <span className="flex gap-2 text-sm font-semibold text-foreground"><Pin size={18} className='mt-0.5' />{notice.date}</span>
              <span className="bg-background text-foreground text-xs font-medium px-2 py-1 rounded">
                {notice.category}
              </span>
            </div>
            <p className="mt-2 text-light-primary">{notice.title}</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className={`font-medium ${notice.status === 'Read' ? 'text-green-600' : 'text-red-600'}`}>
                {notice.status}
              </span>
              {notice.link ? (
                <a href={notice.link} target="_blank" className="text-blue-600 underline flex items-center gap-1">
                  Google form Link <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <ArrowRight className="h-4 w-4 text-light-primary" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (Static UI only) */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button className="px-3 py-1 border rounded text-foreground">&lt;</button>
        {[1, 2, 3].map((n) => (
          <button key={n} className={`px-3 py-1 rounded ${n === 2 ? 'bg-foreground/80 text-white' : 'bg-foreground/10 text-foreground'}`}>
            {n}
          </button>
        ))}
        <span className="text-light-primary">...</span>
        <button className="px-3 py-1 border rounded text-foreground">&gt;</button>
      </div>
    </div>
  );
}
