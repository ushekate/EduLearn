'use client';

import { useEffect, useState } from 'react';
import pbstudent from '@/lib/db';
import {
  Book, User, Calendar, Eye, Download, RefreshCcw, BookOpenCheck,
  Plus, X, MessageSquareMore, Check, TriangleAlert,
  Folder,
  MessageCircle,
  Send
} from 'lucide-react';

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    comment: '',
    request_date: new Date().toISOString().split('T')[0]
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const toggleRequestForm = () => setShowRequestForm(!showRequestForm);

  const fetchBooks = async () => {
    let filterQuery = [];

    if (searchTerm) filterQuery.push(`title ~ "${searchTerm}"`);
    if (filterCategory) filterQuery.push(`status = "${filterCategory}"`);
    if (filterSubject) filterQuery.push(`subject = "${filterSubject}"`);
    if (showAvailableOnly) filterQuery.push(`status = "Available"`);

    const query = filterQuery.join(' && ');

    const records = await pbstudent.collection('books').getFullList({
      filter: query,
      sort: '-created'
    });

    setBooks(records);
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, filterCategory, filterSubject, showAvailableOnly]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pbstudent.collection('book_requests').create(formData);
    toggleRequestForm();
    setFormData({
      title: '',
      author: '',
      subject: '',
      comment: '',
      request_date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className='flex min-h-screen bg-background relative'>
      <main className="flex-1 p-6">
        {/* Filter UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mb-6">
          <div>
            <label className="text-sm font-medium text-black">Search Book:</label>
            <input
              type="text"
              placeholder="Search"
              className="w-full mt-1 p-2 h-10 border border-light-primary text-light-primary rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-black">Category:</label>
            <select
              className="w-full mt-1 p-2 h-10 border border-light-primary text-light-primary rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-black">Subject:</label>
            <select
              className="w-full mt-1 p-2 h-10 border border-light-primary text-light-primary rounded"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="">All</option>
              <option value="Science">Science</option>
              <option value="Math">Math</option>
              <option value="English">English</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className='text-sm font-medium text-black'>Availability: </label>
          <div className="flex items-end pt-2 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={() => setShowAvailableOnly(!showAvailableOnly)}
              />
              <span className="text-sm font-medium text-light-primary">Show available only</span>
            </label>
          </div>
          </div>
        </div>

        {/* Book Listings */}
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow border border-light-primary/20">
              <h2 className="text-lg font-semibold text-black flex items-center">
                <Book size={25} className="w-4 h-4 mr-2" /> {book.title}
              </h2>
              <p className="text-sm text-light-primary mt-1">Author: {book.author}</p>
              {book.isbn && <p className="text-sm text-light-primary">ISBN: {book.isbn}</p>}
              <div className="flex justify-between mt-2">
                {book.status === 'Available' ? (
                  <p className="flex gap-2 text-green-600 text-sm font-semibold">
                    <Check size={20} /> Available
                  </p>
                ) : (
                  <p className="flex gap-2 text-red-600 text-sm font-semibold">
                    <TriangleAlert size={20} /> Overdue
                  </p>
                )}
                <div className="flex gap-2">
                  <button className="flex items-center h-10 px-3 py-1 text-sm border rounded-md hover:bg-light-primary">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </button>
                  {book.isEbook ? (
                    <button className="flex items-center h-10 px-3 py-1 bg-foreground text-white rounded-md hover:bg-foreground/80">
                      <BookOpenCheck className="w-4 h-4 mr-1" /> View Online
                    </button>
                  ) : (
                    <button className="flex items-center h-10 px-3 py-1 bg-foreground text-white rounded-md hover:bg-foreground/80">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request Book Button */}
        <div className="bg-background-2 mt-6 p-4 border border-foreground rounded-lg flex items-center justify-between">
          <div>
            <h3 className="flex gap-3 text-foreground font-semibold text-lg">
              <Book size={18} className='mt-1' /> Request New Book
            </h3>
            <p className="text-xs text-gray-600">Can’t find what you’re looking for? Request a new book.</p>
          </div>
          <button onClick={toggleRequestForm} className="flex items-center bg-foreground text-white h-10 px-4 py-2 rounded-md text-sm hover:bg-foreground/80">
            <Plus className="w-4 h-4 mr-1" /> Make Request
          </button>
        </div>

        {/* Modal Form */}
        {showRequestForm && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40"></div>
              <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <button onClick={toggleRequestForm} className="absolute top-3 right-3 text-light-primary hover:text-light-primary/80">
                  <X />
                </button>
                <h2 className="flex text-2xl font-semibold text-foreground mb-6">
                  <Book className='mr-2 mt-1' /> Book Request Form
                </h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className='flex gap-2 mb-2 text-black'><Book size={18} className='mt-1 text-foreground' />Book Title</label>
                    <input name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="Book Title" className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label htmlFor="" className='flex gap-2 mb-2 text-black'><User size={18} className='mt-1 text-foreground' />Author Name</label>
                    <input name="author" value={formData.author} onChange={handleInputChange} type="text" placeholder="Author Name" className="w-full p-2 border rounded" required />
                </div>
                  <div>
                    <label htmlFor="" className='flex gap-2 mb-2 text-black'><Folder size={18} className='mt-1 text-foreground' />Subject/Category</label>
                    <input name="subject" value={formData.subject} onChange={handleInputChange} type="text" placeholder="Subject or Category" className="w-full p-2 border rounded" required />
                </div>
                  <div>
                    <label htmlFor="" className='flex gap-2 mb-2 text-black'><MessageCircle size={18} className='mt-1 text-foreground' />Reason/Comment</label>
                    <textarea name="comment" value={formData.comment} onChange={handleInputChange} placeholder="Why are you requesting this book?" className="w-full p-2 border rounded" rows="3"></textarea>
                </div>
                  <div>
                    <label htmlFor="" className='flex gap-2 mb-2 text-black'><Calendar size={18} className='mt-1 text-foreground' />Date of Request</label>
                    <input name="request_date" value={formData.request_date} onChange={handleInputChange} type="date" className="w-full p-2 border rounded" required />
                </div>
                    <div className="flex items-center justify-center gap-2">
                    <button type="submit" className="flex gap-2 bg-foreground text-white px-4 py-2 rounded hover:bg-foreground/80 text-sm"><Send size={18} className='mt-0.5' />Submit</button>
                    <button type="button" onClick={toggleRequestForm} className="flex gap-2 border px-4 py-2 rounded text-sm"><X size={18} className='mt-0.5' />Cancel</button>
                  </div>
                </form>
              </div>
          </>
        )}
      </main>
    </div>
  );
}
