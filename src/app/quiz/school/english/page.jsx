'use client';

import { useState } from 'react';

const englishQuestions = [
  {
    question: 'Which word is a noun?',
    options: ['Quickly', 'Beautiful', 'Happiness', 'Run'],
    answer: 'Happiness',
  },
  {
    question: 'Choose the correct plural form of "child".',
    options: ['Childs', 'Childes', 'Children', 'Childrens'],
    answer: 'Children',
  },
  {
    question: 'What is the past tense of "go"?',
    options: ['Went', 'Go', 'Goes', 'Gone'],
    answer: 'Went',
  },
  {
    question: 'Which sentence is correct?',
    options: ['He don’t like apples.', 'He doesn’t like apples.', 'He didn’t liked apples.', 'He don’t likes apples.'],
    answer: 'He doesn’t like apples.',
  },
  {
    question: 'What is an adjective in this sentence: "The sky is blue"?',
    options: ['Sky', 'Is', 'Blue', 'The'],
    answer: 'Blue',
  },
  {
    question: 'Identify the verb in the sentence: "She sings beautifully."',
    options: ['She', 'Sings', 'Beautifully', 'None'],
    answer: 'Sings',
  },
  {
    question: 'What do we call words that sound the same but have different meanings?',
    options: ['Antonyms', 'Homophones', 'Synonyms', 'Adverbs'],
    answer: 'Homophones',
  },
  {
    question: 'Which of the following is a synonym of "happy"?',
    options: ['Sad', 'Joyful', 'Angry', 'Cry'],
    answer: 'Joyful',
  },
  {
    question: 'Which sentence uses punctuation correctly?',
    options: [
      'Where are you?',
      'Where are you.',
      'Where are you',
      'Where are you!',
    ],
    answer: 'Where are you?',
  },
  {
    question: 'What is the opposite of "begin"?',
    options: ['Start', 'Open', 'End', 'Go'],
    answer: 'End',
  },
];

export default function EnglishQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === englishQuestions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQ + 1 < englishQuestions.length) {
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
      <h2 className="text-2xl font-bold mb-4 text-center">📘 English Quiz</h2>

      {showScore ? (
        <div className="text-center">
          <p className="text-xl font-semibold">Your Score: {score} / {englishQuestions.length}</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Again
          </button>
          <button
            onClick={() => window.location.href = '/games'}
            className="mt-3 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">{currentQ + 1}. {englishQuestions[currentQ].question}</h3>
          <div className="space-y-2">
            {englishQuestions[currentQ].options.map((option, index) => (
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
