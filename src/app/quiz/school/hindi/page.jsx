'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

const hindiQuestions = [
  {
    question: 'हिन्दी दिवस कब मनाया जाता है?',
    options: ['26 जनवरी', '15 अगस्त', '14 सितम्बर', '2 अक्टूबर'],
    answer: '14 सितम्बर',
  },
  {
    question: '‘रामायण’ के रचयिता कौन हैं?',
    options: ['वेदव्यास', 'तुलसीदास', 'कबीर', 'भवभूति'],
    answer: 'तुलसीदास',
  },
  {
    question: 'हिन्दी वर्णमाला में कुल कितने स्वर होते हैं?',
    options: ['11', '13', '10', '12'],
    answer: '13',
  },
  {
    question: '‘सरस्वती’ किसकी देवी हैं?',
    options: ['धन की', 'शक्ति की', 'विद्या की', 'संगीत की'],
    answer: 'विद्या की',
  },
  {
    question: '‘कविता’ किसे कहते हैं?',
    options: [
      'गद्य लेखन',
      'भावनाओं की अभिव्यक्ति छंद में',
      'निबंध लेखन',
      'उपन्यास',
    ],
    answer: 'भावनाओं की अभिव्यक्ति छंद में',
  },
  {
    question: '‘आप’ कौन सा सर्वनाम है?',
    options: ['सर्वनाम', 'निजवाचक', 'निम्नवाचक', 'उच्चवाचक'],
    answer: 'उच्चवाचक',
  },
  {
    question: '‘फल खाना’ में कौन-सा कारक है?',
    options: ['कर्ता', 'कर्म', 'करण', 'अपादान'],
    answer: 'कर्म',
  },
  {
    question: '‘मैंने किताब पढ़ी’ में क्रिया कौन-सी है?',
    options: ['मैंने', 'किताब', 'पढ़ी', 'नहीं'],
    answer: 'पढ़ी',
  },
  {
    question: '‘बिल्ली चूहे को पकड़ती है’ में कर्ता कौन है?',
    options: ['बिल्ली', 'चूहा', 'पकड़ती', 'है'],
    answer: 'बिल्ली',
  },
  {
    question: '‘कोयल कूकती है’ में विशेषण कौन-सा है?',
    options: ['कोयल', 'कूकती', 'है', 'कोई नहीं'],
    answer: 'कोई नहीं',
  },
];

export default function HindiQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const router = useRouter();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption === hindiQuestions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQ + 1 < hindiQuestions.length) {
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
      <h2 className="text-2xl font-bold mb-4 text-center">📝 हिंदी प्रश्नोत्तरी</h2>

      {showScore ? (
        <div className="text-center">
          <p className="text-xl font-semibold">आपके अंक: {score} / {hindiQuestions.length}</p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            पुनः प्रयास करें
          </button>
          <button
            onClick={() => router.push('/quiz')}
            className="mt-3 px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            होम पेज पर जाएं
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">{currentQ + 1}. {hindiQuestions[currentQ].question}</h3>
          <div className="space-y-2">
            {hindiQuestions[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`block w-full text-left px-4 py-2 border rounded 
                  ${selectedOption === option ? 'bg-pink-200 border-pink-500' : 'hover:bg-gray-100'}`}
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
            अगला प्रश्न
          </button>
        </div>
      )}
    </div>
  );
}
