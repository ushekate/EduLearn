'use client';
import Link from 'next/link';

const collegeQuestions = [
  { id: 1, question: "Who is known as the father of computers?" },
  { id: 2, question: "What is the chemical symbol for Gold?" },
  { id: 3, question: "Which country hosted the 2024 Olympics?" },
];

export default function CollegeQuestions() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 College Quiz Questions</h1>
      <ul className="space-y-2">
        {collegeQuestions.map((q) => (
          <li key={q.id} className="bg-purple-100 p-4 rounded shadow">{q.question}</li>
        ))}
      </ul>
      <Link href="/quiz/college/answers" className="inline-block mt-6 text-white bg-purple-600 px-4 py-2 rounded">
        View Answers
      </Link>
    </div>
  );
}
