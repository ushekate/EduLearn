'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const questions = [
  {
    question: 'शिवाजी महाराजांचे गुरु कोण होते?',
    options: ['रामदास स्वामी', 'तुकाराम महाराज', 'एकनाथ', 'ज्ञानेश्वर'],
    answer: 'रामदास स्वामी',
  },
  {
    question: 'मराठी भाषेतील पहिला कवी कोण?',
    options: ['ज्ञानेश्वर', 'तुकाराम', 'नामदेव', 'एकनाथ'],
    answer: 'ज्ञानेश्वर',
  },
  {
    question: 'शिवाजी महाराजांचा राज्याभिषेक कधी झाला?',
    options: ['1670', '1674', '1680', '1665'],
    answer: '1674',
  },
  {
    question: 'लोकमान्य टिळक यांनी कोणता सण सार्वजनिक केला?',
    options: ['गुढी पाडवा', 'दिवाळी', 'गणपती', 'होळी'],
    answer: 'गणपती',
  },
  {
    question: 'राजा शिवछत्रपती हे पुस्तक कोणी लिहिले?',
    options: ['बाळशास्त्री जांभेकर', 'गजानन माधव मुक्तिबोध', 'जदुनाथ सरकार', 'बाबासाहेब पुरंदरे'],
    answer: 'बाबासाहेब पुरंदरे',
  },
  {
    question: 'मराठीतील प्रसिद्ध संतकवी कोण?',
    options: ['तुकाराम', 'कबीर', 'सूरदास', 'मीराबाई'],
    answer: 'तुकाराम',
  },
  {
    question: 'मराठा साम्राज्याचे संस्थापक कोण?',
    options: ['शाहू महाराज', 'संभाजी महाराज', 'शिवाजी महाराज', 'माधवराव पेशवे'],
    answer: 'शिवाजी महाराज',
  },
  {
    question: 'ज्ञानेश्वरी हा ग्रंथ कोणत्या भाषेत आहे?',
    options: ['संस्कृत', 'हिंदी', 'मराठी', 'उर्दू'],
    answer: 'मराठी',
  },
  {
    question: 'छत्रपती संभाजी महाराज हे कोणाचे पुत्र होते?',
    options: ['शिवाजी महाराज', 'शहाजीराजे', 'शाहू महाराज', 'राजाराम महाराज'],
    answer: 'शिवाजी महाराज',
  },
  {
    question: 'पहिला मराठी वृत्तपत्र कोणते?',
    options: ['Kesari', 'Maharashtra Times', 'दर्पण', 'लोकमत'],
    answer: 'दर्पण',
  },
];

export default function MarathiQuiz() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-700">मराठी विषय क्विझ</h1>

      {!showScore ? (
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold mb-4">
            प्रश्न {currentQ + 1} / {questions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">{questions[currentQ].question}</h2>
          <div className="space-y-3">
            {questions[currentQ].options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 border rounded ${selectedOption === option
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
            className={`mt-6 w-full py-2 px-4 rounded text-white ${selectedOption ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
              }`}
            disabled={!selectedOption}
          >
            पुढे जा
          </button>
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">तुमचे गुण: {score} / {questions.length}</h2>
          <p className="text-lg">छान काम! 💐</p>
          <div className='grid grid-cols-1'>
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setSelectedOption('');
                setShowScore(false);
              }}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              पुन्हा सुरवात करा
            </button>
            <button
              // onClick={() => window.location.href = '/quiz'}
              onClick={() => router.push('/quiz')}
              className="mt-3 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              मागे जा
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
