'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
  {
    question: '5 + 3 = ?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
  {
    question: '9 x 2 = ?',
    options: ['18', '21', '12', '20'],
    answer: '18',
  },
  {
    question: '10 ÷ 2 = ?',
    options: ['2', '3', '5', '4'],
    answer: '5',
  },
  {
    question: 'Square of 4 = ?',
    options: ['8', '12', '16', '20'],
    answer: '16',
  },
  {
    question: '12 - 5 = ?',
    options: ['8', '6', '7', '9'],
    answer: '7',
  },
  {
    question: '7 + 6 = ?',
    options: ['11', '12', '13', '14'],
    answer: '13',
  },
  {
    question: 'What is 3²?',
    options: ['6', '9', '12', '8'],
    answer: '9',
  },
  {
    question: '20 ÷ 4 = ?',
    options: ['4', '5', '6', '7'],
    answer: '5',
  },
  {
    question: '15 - 9 = ?',
    options: ['5', '6', '7', '8'],
    answer: '6',
  },
  {
    question: 'Which is the smallest prime number?',
    options: ['1', '2', '3', '5'],
    answer: '2',
  },
];

export default function MathsQuiz() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Mathematics Quiz</h1>

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
                    ? 'bg-green-100 border-green-500 text-green-800'
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
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
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
