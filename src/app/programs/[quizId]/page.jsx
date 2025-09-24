'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const quizQuestions = [
    {
        question: "What excites you the most?",
        options: [
            { text: "Building apps, websites, or software", value: "tech" },
            { text: "Solving scientific or math problems", value: "science" },
            { text: "Designing graphics, videos, or creative work", value: "arts" },
            { text: "Understanding business or managing money", value: "business" },
            { text: "Cracking exams like JEE, NEET, or SAT", value: "testprep" },
        ],
    },
    {
        question: "What is your current level of experience?",
        options: [
            { text: "Beginner – Just starting out", value: "beginner" },
            { text: "Intermediate – Some prior experience", value: "intermediate" },
            { text: "Advanced – I’m confident in the basics", value: "advanced" },
        ],
    },
    {
        question: "What kind of learning style suits you best?",
        options: [
            { text: "Hands-on with projects", value: "tech" },
            { text: "Logical and problem-solving tasks", value: "science" },
            { text: "Creative and visual work", value: "arts" },
            { text: "Case studies and market trends", value: "business" },
            { text: "Exam patterns and practice tests", value: "testprep" },
        ],
    },
];

const categoryMap = {
    tech: "Technology & Programming",
    science: "Science & Mathematics",
    arts: "Arts & Design",
    business: "Business & Finance",
    testprep: "Test Preparation",
};

export default function QuizPage() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const { quizId } = useParams();

    const handleStart = () => {
        setStarted(true);
    };

    const handleAnswer = (value) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate most selected category
            const categoryCount = {};
            newAnswers.forEach((val) => {
                if (!categoryCount[val]) categoryCount[val] = 0;
                categoryCount[val]++;
            });

            const topCategory = Object.entries(categoryCount).reduce((a, b) =>
                a[1] >= b[1] ? a : b
            )[0];

            setResult(categoryMap[topCategory] || "a suitable course");
        }
    };

    return (
        <main className="min-h-screen px-6 md:px-20 py-16 bg-white text-gray-800 text-center">
            <h1 className="text-4xl font-bold mb-6 text-primary">Quiz ID: {quizId}</h1>
            <p className="text-lg">This is the quiz detail page for: <strong>{quizId}</strong></p>
            {!started && !result && (
                <>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                        Course Placement Quiz
                    </h1>
                    <p className="text-lg mb-10 max-w-2xl mx-auto">
                        Answer a few quick questions, and we'll help match you with the perfect course.
                    </p>
                    <button
                        onClick={handleStart}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                    >
                        Start Quiz
                    </button>
                </>
            )}

            {started && !result && (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">
                        {quizQuestions[currentQuestion].question}
                    </h2>
                    <div className="space-y-4">
                        {quizQuestions[currentQuestion].options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option.value)}
                                className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {result && (
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-4 text-green-700">🎉 You're best suited for:</h2>
                    <p className="text-2xl mb-8 font-medium text-blue-700">{result}</p>
                    <a
                        href="/students/login"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                    >
                        View Recommended Courses
                    </a>
                </div>
            )}
        </main>
    );
}
