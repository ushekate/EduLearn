'use client';
import Link from 'next/link';

const collegeAnswers = [
  { id: 1, answer: "Charles Babbage" },
  { id: 2, answer: "Au" },
  { id: 3, answer: "France (Paris)" },
];

export default function CollegeAnswers() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 College Quiz Answers</h1>
      <ul className="space-y-2">
        {collegeAnswers.map((a) => (
          <li key={a.id} className="bg-yellow-100 p-4 rounded shadow">{a.answer}</li>
        ))}
      </ul>
      <Link href="/quiz/college/questions" className="inline-block mt-6 text-white bg-yellow-600 px-4 py-2 rounded">
        Back to Questions
      </Link>
    </div>
  );
}
