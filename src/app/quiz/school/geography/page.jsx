'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

const geographyQuestions = [
  {
    question: 'Which is the largest continent in the world?',
    options: ['Africa', 'Asia', 'Europe', 'Australia'],
    answer: 'Asia',
  },
  {
    question: 'What is the capital of India?',
    options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'],
    answer: 'New Delhi',
  },
  {
    question: 'Which is the longest river in the world?',
    options: ['Amazon', 'Ganga', 'Nile', 'Yangtze'],
    answer: 'Nile',
  },
  {
    question: 'Mount Everest is located in which mountain range?',
    options: ['Andes', 'Alps', 'Himalayas', 'Rockies'],
    answer: 'Himalayas',
  },
  {
    question: 'Which ocean is on the west coast of India?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    answer: 'Indian Ocean',
  },
  {
    question: 'Which desert is the largest in the world?',
    options: ['Thar', 'Gobi', 'Sahara', 'Kalahari'],
    answer: 'Sahara',
  },
  {
    question: 'What is the name of the imaginary line that divides Earth into the Northern and Southern Hemispheres?',
    options: ['Equator', 'Tropic of Cancer', 'Prime Meridian', 'Longitude'],
    answer: 'Equator',
  },
  {
    question: 'Which country has the most population?',
    options: ['USA', 'India', 'China', 'Russia'],
    answer: 'China',
  },
  {
    question: 'Which is the smallest country in the world?',
    options: ['Nepal', 'Vatican City', 'Bhutan', 'Sri Lanka'],
    answer: 'Vatican City',
  },
  {
    question: 'Which Indian state is known as the “Land of Five Rivers”?',
    options: ['Punjab', 'Haryana', 'Gujarat', 'Bihar'],
    answer: 'Punjab',
  },
];

export default function GeographyQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const router = useRouter();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === geographyQuestions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQ + 1 < geographyQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedOption('');
    setShowScore(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">🌍 Geography Quiz</h2>

      {showScore ? (
        <div className="text-center">
          <p className="text-xl font-semibold">Your Score: {score} / {geographyQuestions.length}</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">{currentQ + 1}. {geographyQuestions[currentQ].question}</h3>
          <div className="space-y-2">
            {geographyQuestions[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full text-left px-4 py-2 border rounded 
                  ${selectedOption === option ? 'bg-blue-200 border-blue-500' : 'hover:bg-gray-100'}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            disabled={!selectedOption}
            className={`mt-4 px-6 py-2 rounded 
              ${selectedOption ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
