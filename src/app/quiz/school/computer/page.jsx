'use client';

import { useState } from 'react';

export default function ComputerQuiz() {
  const questions = [
    {
      question: "What is the brain of the computer called?",
      options: ["Monitor", "CPU", "Keyboard", "Mouse"],
      answer: "CPU"
    },
    {
      question: "Which device is used to print documents?",
      options: ["Scanner", "CPU", "Printer", "Speaker"],
      answer: "Printer"
    },
    {
      question: "Which key is used to erase something?",
      options: ["Shift", "Enter", "Escape", "Backspace"],
      answer: "Backspace"
    },
    {
      question: "Which part of the computer displays images and videos?",
      options: ["CPU", "Mouse", "Monitor", "Keyboard"],
      answer: "Monitor"
    },
    {
      question: "Which one is a storage device?",
      options: ["CD", "Mouse", "Monitor", "Printer"],
      answer: "CD"
    },
    {
      question: "What does 'www' stand for?",
      options: ["World Web Wide", "Wide Web World", "World Wide Web", "Web World Wide"],
      answer: "World Wide Web"
    },
    {
      question: "Which of the following is an input device?",
      options: ["Monitor", "Speaker", "Mouse", "Printer"],
      answer: "Mouse"
    },
    {
      question: "Which key is used to start a new line in a text document?",
      options: ["Spacebar", "Shift", "Enter", "Tab"],
      answer: "Enter"
    },
    {
      question: "Which software helps you to write documents?",
      options: ["MS Paint", "MS Word", "Calculator", "Windows Media Player"],
      answer: "MS Word"
    },
    {
      question: "Which of the following is an operating system?",
      options: ["MS Word", "Google", "Windows", "Chrome"],
      answer: "Windows"
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQ].answer) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
      setSelectedOption('');
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">💻 Computer Quiz</h1>

        {showScore ? (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">
              Your Score: {score} / {questions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setSelectedOption('');
                setShowScore(false);
              }}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Start Again
            </button>
            <br />
            <button
              onClick={() => window.history.back()}
              className="mt-3 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-lg font-medium">
                {currentQ + 1}. {questions[currentQ].question}
              </p>
            </div>
            <div className="space-y-2">
              {questions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 border rounded ${
                    selectedOption === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-blue-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedOption && (
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
