'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import pbstudent from '@/lib/db';

export default function ReportsPage() {
  const [scores, setScores] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examScores = await pbstudent.collection('exam_scores').getFullList({ sort: '-date' });
        const chartRecords = await pbstudent.collection('exam_chart').getFullList({ sort: 'subject' });

        // Format exam date
        const formattedScores = examScores.map(score => ({
          ...score,
          date: new Date(score.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        }));

        // Add dummy start & end points with value 0 and no subject name
        const paddedChart = [
          { subject: '', value: 0 },   // dummy start
          ...chartRecords,             // real chart data from PocketBase
          { subject: '', value: 0 },   // dummy end
        ];

        setScores(formattedScores);
        setChartData(paddedChart);  // use the padded array here
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 p-6">
        {/* Chart Section */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="text-light-primary font-medium">Filters:</span>
            <select className="border px-2 py-1 rounded"><option>Term: All</option></select>
            <select className="border px-2 py-1 rounded"><option>Subject: All</option></select>
            <select className="border px-2 py-1 rounded"><option>Date: Last 30d</option></select>
          </div>
          <h2 className="font-semibold text-sm mb-2">Academic Performance Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="subject" tickFormatter={(v) => (v === '' ? '' : v)} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#a855f7" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores Table Section */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <h2 className="font-semibold text-sm mb-2 text-primary">Exam & Assessment Scores</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-light-primary border-b">
                <th className="py-2">Subject</th>
                <th>Exam Type</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${score.subject === 'Mathematics' ? 'bg-purple-500' : score.subject === 'Science' ? 'bg-pink-500' : 'bg-yellow-400'}`}></span>
                    {score.subject}
                  </td>
                  <td>{score.exam}</td>
                  <td>{score.score}</td>
                  <td>
                    <span className="bg-green-100 text-xs px-2 py-0.5 rounded text-green-700">
                      {score.grade}
                    </span>
                  </td>
                  <td>{score.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-foreground text-xs font-medium mt-2 cursor-pointer">View All Exams ↓</div>
        </div>
      </div>
    </div>
  );
}
