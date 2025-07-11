'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Edit,
  X,
  RotateCcw,
  FileText,
  CalendarDays,
  Send,
} from 'lucide-react';
import pbstudent from '@/lib/db';

export default function LeaveRequests() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLeave, setEditingLeave] = useState(null);

  const toggleRequestForm = () => {
    setShowRequestForm(!showRequestForm);
    if (!showRequestForm) setEditingLeave(null); // Reset edit mode when closing
  };

  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    leaveType: 'Full Day',
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fromDate', formData.fromDate);
    data.append('toDate', formData.toDate);
    data.append('reason', formData.reason);
    data.append('leaveType', formData.leaveType);
    data.append('status', 'Pending');
    data.append('user', pbstudent.authStore.model?.id);
    if (formData.attachment) data.append('certificate', formData.attachment);

    try {
      if (editingLeave) {
        await pbstudent.collection('leave_requests').update(editingLeave.id, data);
      } else {
        await pbstudent.collection('leave_requests').create(data);
      }

      toggleRequestForm();
      setFormData({
        fromDate: '',
        toDate: '',
        reason: '',
        leaveType: 'Full Day',
        attachment: null,
      });
      setEditingLeave(null);
      fetchLeaves();
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const records = await pbstudent.collection('leave_requests').getFullList({
        sort: '-created',
        filter: `user.id = "${pbstudent.authStore.model?.id}"`,
      });
      setLeaveData(records);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pbstudent.authStore.isValid) {
      window.location.href = '/login';
    } else {
      fetchLeaves();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showRequestForm ? 'hidden' : '';
  }, [showRequestForm]);

  const handleEdit = (leave) => {
    setFormData({
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      reason: leave.reason,
      leaveType: leave.leaveType,
      attachment: null,
    });
    setEditingLeave(leave);
    setShowRequestForm(true);
  };

  const handleCancel = async (id) => {
    try {
      await pbstudent.collection('leave_requests').delete(id);
      fetchLeaves();
    } catch (err) {
      console.error('Cancel Error:', err);
    }
  };

  const handleApplyAgain = (leave) => {
    setFormData({
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      reason: leave.reason,
      leaveType: leave.leaveType,
      attachment: null,
    });
    setEditingLeave(null);
    setShowRequestForm(true);
  };

  const handleDownload = (leave) => {
    const url = `http://127.0.0.1:8090/api/files/leave_requests/${leave.id}/${leave.certificate}`;
    window.open(url, '_blank');
  };

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const statusColor = {
    Approved: 'text-green-600 bg-green-100',
    Pending: 'text-yellow-600 bg-yellow-100',
    Rejected: 'text-red-600 bg-red-100',
  };

  const borderColor = {
    Approved: 'border-l-4 border-green-400',
    Pending: 'border-l-4 border-yellow-400',
    Rejected: 'border-l-4 border-red-400',
  };

  return (
    <div className="flex min-h-screen bg-background relative">
      <main className="flex-1 p-6 space-y-4">
        <button
          onClick={toggleRequestForm}
          className="bg-foreground hover:bg-foreground/80 text-white px-4 py-2 rounded-md"
        >
          + Apply for Leave
        </button>

        {showRequestForm && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40"></div>
            <div className="fixed z-50 top-1/2 left-1/2 w-full max-w-xl transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText size={20} />
                  {editingLeave ? 'Edit Leave Request' : 'Apply for Leave'}
                </h2>
                <span className="text-sm text-gray-500">Today: {today}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                      <CalendarDays size={16} /> From Date
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                      <CalendarDays size={16} /> To Date
                    </label>
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Reason</label>
                  <textarea
                    name="reason"
                    rows={3}
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="Please provide a detailed reason..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Leave Type</label>
                    <select
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option>Full Day</option>
                      <option>Half Day</option>
                      <option>Work From Home</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Attachment (optional)</label>
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={toggleRequestForm}
                    className="flex items-center gap-1 px-4 py-2 border rounded-md text-light-primary hover:bg-light-primary/30"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    <Send size={16} />
                    {editingLeave ? 'Update Request' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          leaveData.map((leave) => (
            <div
              key={leave.id}
              className={`bg-white p-4 rounded-lg shadow ${borderColor[leave.status]} space-y-2`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold flex items-center gap-2 text-gray-700">
                     <div>
                       <Calendar className="w-4 h-4" />
                     </div>
                     <div>
                       Date :
                     </div>
                     <div>
                       {new Date(leave.fromDate).toLocaleDateString('en-US', {
                         day: 'numeric',
                         month: 'short',
                         year: 'numeric',
                       })
                       }
                     </div>
                     <div>
                       to
                     </div>
                     <div>
                       {new Date(leave.toDate).toLocaleDateString('en-US', {
                         day: 'numeric',
                         month: 'short',
                         year: 'numeric',
                       })
                       }
                     </div>
                   </div>

                  <p className="flex items-center gap-2 text-gray-700">
                    <ClipboardList className="w-4 h-4" /> Reason: {leave.reason}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4" /> Type: {leave.leaveType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Certificate:{' '}
                    {leave.certificate ? (
                      <a
                        href={`http://127.0.0.1:8090/api/files/leave_requests/${leave.id}/${leave.certificate}`}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor[leave.status]}`}
                  >
                    {leave.status === 'Approved' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {leave.status === 'Pending' && <AlertCircle className="w-4 h-4 mr-1" />}
                    {leave.status === 'Rejected' && <XCircle className="w-4 h-4 mr-1" />}
                    {leave.status}
                  </span>

                  {leave.status === 'Approved' && leave.certificate && (
                    <button
                      className="flex items-center gap-1 border px-3 py-1 rounded hover:bg-gray-100 text-sm"
                      onClick={() => handleDownload(leave)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}

                  {leave.status === 'Pending' && (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleCancel(leave.id)}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded flex items-center gap-1"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                      <button
                        onClick={() => handleEdit(leave)}
                        className="bg-purple-500 text-white px-3 py-1 text-sm rounded flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </div>
                  )}

                  {leave.status === 'Rejected' && (
                    <button
                      onClick={() => handleApplyAgain(leave)}
                      className="bg-purple-100 text-purple-700 px-3 py-1 text-sm rounded flex items-center gap-1"
                    >
                      <RotateCcw className="w-4 h-4" /> Apply Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}


