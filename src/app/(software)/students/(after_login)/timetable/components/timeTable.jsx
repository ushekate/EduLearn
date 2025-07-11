'use client';

import { useEffect, useState } from "react";
import pbstudent from '@/lib/db';
import * as Lucide from 'lucide-react';
import { Calendar, Clock, Clipboard, MessageCircle, BookOpen, Calculator, ClipboardList, Mic } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function TimeTablePage() {
  const [view, setView] = useState("daily");
  const [dailyTimetable, setDailyTimetable] = useState([]);
  const [writtenExams, setWrittenExams] = useState([]);
  const [oralExams, setOralExams] = useState([]);
  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', {
      // weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    setTodayStr(`Today: ${formatted}`);
  }, []);

  const fetchData = async () => {
    const [daily, written, oral] = await Promise.all([
      pbstudent.collection('daily_timetable').getFullList({ sort: 'time' }),
      pbstudent.collection('written_exams').getFullList({ sort: 'date' }),
      pbstudent.collection('oral_exams').getFullList({ sort: 'date' })
    ]);
    setDailyTimetable(daily);
    setWrittenExams(written);
    setOralExams(oral);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getIcon = (iconName) => {
    const Icon = Lucide[iconName] || Lucide.BookOpen;
    return <Icon size={30} className="bg-foreground/20 text-foreground p-1 rounded-full" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <div className="p-6 font-sans">
        <div className="flex items-center justify-between bg-white rounded p-2 mb-4">

          <h1 className="flex text-lg font-bold text-foreground">
            <Calendar className="mr-2" />
            {view === 'daily' ? todayStr : 'Exam Timetable'}
          </h1>

          <div className="space-x-2">
            <button
              className={`px-4 py-1 rounded-md ${view === "daily" ? "bg-foreground text-white" : "bg-light-primary/20 text-black border"}`}
              onClick={() => setView("daily")}
            >
              Daily
            </button>
            <button
              className={`px-4 py-1 rounded-md ${view === "exam" ? "bg-foreground text-white" : "bg-light-primary/20 text-black border"}`}
              onClick={() => setView("exam")}
            >
              Exam Timetable
            </button>
          </div>
        </div>

        {view === "daily" ? (
          <table className="w-full rounded-2xl text-left bg-white shadow-md">
            <thead className="bg-foreground text-white">
              <tr>
                <th className="px-4 py-2">
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2" />
                    Time
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex items-center">
                    <FaChalkboardTeacher size={18} className="mr-2 mt-1" />
                    Subject & Teacher
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex items-center">
                    <Clipboard size={18} className="mr-2" />
                    Notes
                  </div>
                </th>
                <th className="px-4 py-2">
                  <div className="flex items-center">
                    <MessageCircle size={18} className="mr-2" />
                    Remarks
                  </div>
                </th>
              </tr>

            </thead>
            <tbody className="text-black">
              {dailyTimetable.map((item, idx) => (
                <tr key={idx} className="border border-light-primary hover:bg-light-primary/10">
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {getIcon(item.icon)}
                      <div>
                        <strong>{item.subject}</strong>
                        {item.teacher && <div className="text-sm text-light-primary">{item.teacher}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.notes}</td>
                  <td className="px-4 py-2">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="space-y-6">
            {/* Written Exams */}
            <div>
              <h2 className="text-lg font-semibold text-primary flex items-center mb-2">
                <ClipboardList className="w-4 h-4 mr-2" />Written Exams
              </h2>
              <table className="w-full bg-white rounded-2xl shadow-sm">
                <thead className="bg-foreground text-white">
                  <tr>
                    <th className="px-4 py-2"><Calendar className="inline-block mr-2" />Date</th>
                    <th className="px-4 py-2"><Clock className="inline-block mr-2" />Time</th>
                    <th className="px-4 py-2"><BookOpen className="inline-block mr-2" />Subject</th>
                    <th className="px-4 py-2"><Calculator className="inline-block mr-2" />Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {writtenExams.map((exam, idx) => (
                    <tr key={idx} className="border-t text-black border-light-primary hover:bg-light-primary/10">
                      {/* <td className="px-[7%] py-2">{exam.date}</td> */}
                      <td className="px-[6%] py-2">
                        {new Date(exam.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-[5%] py-2">{exam.time}</td>
                      <td className="px-[6%] py-2">{exam.subject}</td>
                      <td className="px-[13%] py-2">{exam.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Oral Exams */}
            <div>
              <h2 className="text-lg font-semibold text-primary flex items-center mb-2">
                <Mic className="w-4 h-4 mr-2" />Oral Exams
              </h2>
              <table className="w-full bg-white rounded-2xl shadow-sm">
                <thead className="bg-foreground text-white">
                  <tr>
                    <th className="px-4 py-2"><Calendar className="inline-block mr-2" />Date</th>
                    <th className="px-4 py-2"><Clock className="inline-block mr-2" />Time</th>
                    <th className="px-4 py-2"><BookOpen className="inline-block mr-2" />Subject</th>
                    <th className="px-4 py-2"><Calculator className="inline-block mr-2" />Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {oralExams.map((exam, idx) => (
                    <tr key={idx} className="border-t text-black border-light-primary hover:bg-light-primary/10">
                      {/* <td className="px-[7%] py-2">{exam.date}</td> */}
                      <td className="px-[6%] py-2">
                        {new Date(exam.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-[5%] py-2">{exam.time}</td>
                      <td className="px-[6%] py-2">{exam.subject}</td>
                      <td className="px-[13%] py-2">{exam.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm text-sm text-light-primary">
              <div className="flex mb-3 gap-2">
                <div className="rounded-full h-8 w-8 p-1.5 bg-foreground">
                  <Lucide.Pin size={20} className="text-white fill-white" />
                </div>
                <h1 className="text-black font-bold text-xl">Notes</h1>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Please arrive 15 minutes early for all exams</li>
                <li>Carry your ID card for verification</li>
                <li>No electronic devices allowed in the examination hall</li>
                <li>Bring all necessary stationery items</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



