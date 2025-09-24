'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    question: 'What do plants need to make food?',
    options: ['Sunlight', 'Moonlight', 'Stones', 'Sand'],
    answer: 'Sunlight',
  },
  {
    question: 'Which gas do humans breathe in?',
    options: ['Carbon dioxide', 'Oxygen', 'Hydrogen', 'Nitrogen'],
    answer: 'Oxygen',
  },
  {
    question: 'Water boils at what temperature?',
    options: ['50°C', '90°C', '100°C', '150°C'],
    answer: '100°C',
  },
  {
    question: 'Which organ pumps blood in our body?',
    options: ['Lungs', 'Brain', 'Heart', 'Liver'],
    answer: 'Heart',
  },
  {
    question: 'How many legs does an insect have?',
    options: ['4', '6', '8', '10'],
    answer: '6',
  },
  {
    question: 'What do bees make?',
    options: ['Silk', 'Wool', 'Milk', 'Honey'],
    answer: 'Honey',
  },
  {
    question: 'Which part of the plant is used for reproduction?',
    options: ['Leaf', 'Stem', 'Flower', 'Root'],
    answer: 'Flower',
  },
  {
    question: 'Which is the largest planet in the Solar System?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Jupiter',
  },
  {
    question: 'What do we call animals that eat only plants?',
    options: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores'],
    answer: 'Herbivores',
  },
];

export default function ScienceQuiz() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Science Quiz</h1>

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
          <p className="text-lg">Well done! 🌟</p>
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
