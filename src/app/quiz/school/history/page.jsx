'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
  {
    question: 'Who was the first President of India?',
    options: ['Dr. B. R. Ambedkar', 'Mahatma Gandhi', 'Dr. Rajendra Prasad', 'Sardar Patel'],
    answer: 'Dr. Rajendra Prasad',
  },
  {
    question: 'In which year did India gain independence?',
    options: ['1945', '1946', '1947', '1948'],
    answer: '1947',
  },
  {
    question: 'Who founded the Maurya Empire?',
    options: ['Ashoka', 'Bindusara', 'Chandragupta Maurya', 'Harsha'],
    answer: 'Chandragupta Maurya',
  },
  {
    question: 'Who wrote the national anthem of India?',
    options: ['Bankim Chandra Chatterjee', 'Rabindranath Tagore', 'Sarojini Naidu', 'Subhash Chandra Bose'],
    answer: 'Rabindranath Tagore',
  },
  {
    question: 'Where did the Jallianwala Bagh massacre happen?',
    options: ['Delhi', 'Amritsar', 'Lahore', 'Kolkata'],
    answer: 'Amritsar',
  },
  {
    question: 'Who was known as the Iron Man of India?',
    options: ['Mahatma Gandhi', 'Nehru', 'Sardar Patel', 'Lal Bahadur Shastri'],
    answer: 'Sardar Patel',
  },
  {
    question: 'Which Mughal emperor built the Taj Mahal?',
    options: ['Babur', 'Akbar', 'Shah Jahan', 'Aurangzeb'],
    answer: 'Shah Jahan',
  },
  {
    question: 'What was the capital of British India?',
    options: ['Delhi', 'Mumbai', 'Chennai', 'Calcutta'],
    answer: 'Calcutta',
  },
  {
    question: 'When was the Quit India Movement launched?',
    options: ['1940', '1942', '1944', '1946'],
    answer: '1942',
  },
  {
    question: 'Who was the last Governor-General of India?',
    options: ['Lord Mountbatten', 'Warren Hastings', 'Cornwallis', 'Curzon'],
    answer: 'Lord Mountbatten',
  },
];

export default function HistoryQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const router = useRouter();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOption('');
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-red-700">History Quiz</h1>

      {!showScore ? (
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold mb-4">
            Question {currentQ + 1} / {questions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">{questions[currentQ].question}</h2>
          <div className="space-y-3">
            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 border rounded ${
                  selectedOption === option
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`mt-6 w-full py-2 px-4 rounded text-white ${
              selectedOption
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Your Score: {score} / {questions.length}
          </h2>
          <p className="text-lg">Great Job! 🎉</p>
          <div className="grid grid-cols-1">
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setSelectedOption('');
                setShowScore(false);
              }}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Start Again
            </button>
            <button
              onClick={() => router.push('/quiz')}
              className="mt-3 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
