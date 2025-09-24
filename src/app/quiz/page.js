'use client';

import Link from 'next/link';
import Navbar from '../components/header/navbar';
import Footer from '../components/Bottom/footer';


const school = [
  {
    name: 'Marathi',
    slug: '/school/marathi',
    description: 'Play the Marathi Subject Quiz',
  },
  {
    name: 'Mathematics',
    slug: '/school/mathematics',
    description: 'Play the Mathematics Subject Quiz',
  },
  {
    name: 'Science',
    slug: '/school/science',
    description: 'Play the Science Subject Quiz',
  },
  {
    name: 'History',
    slug: '/school/history',
    description: 'Play the History Subject Quiz',
  },
  {
    name: 'Geography',
    slug: '/school/geography',
    description: 'Play the Geography Subject Quiz',
  },
  {
    name: 'Hindi',
    slug: '/school/hindi',
    description: 'Play the Hindi Subject Quiz',
  },
  {
    name: 'English',
    slug: '/school/english',
    description: 'Play the English Subject Quiz',
  },
  {
    name: 'Computer',
    slug: '/school/computer',
    description: 'Play the Computer Subject Quiz',
  },
];

const college = [
  {
    name: 'Subject1',
    slug: 'subject1',
    description: 'Play the Subject1 Quiz',
  },
  {
    name: 'Subeject2',
    slug: 'subject2',
    description: 'Play the Subject2 Quiz',
  },
];

export default function GamesHub() {
  return (
    <main className="element min-h-screen bg-gray-100">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-blue-700 pt-5 mb-10">Let's Play Quiz</h1>
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">For School Students</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-6 px-10 mx-20">
        {school.map((quiz) => (
          <div
            key={quiz.slug}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{quiz.name}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <Link
              href={`/quiz/${quiz.slug}`}
              className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Play
            </Link>
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-700 pt-10 mb-10">For College Students</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-6 px-10 mx-20">
        {college.map((quiz) => (
          <div
            key={quiz.slug}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{quiz.name}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <Link
              href={`/quiz/${quiz.slug}`}
              className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Play
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
