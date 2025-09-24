// components/QuoteCarousel.jsx
'use client'
import { useEffect, useState } from 'react';

const quotes = [
  "“Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela",
  "“The beautiful thing about learning is that no one can take it away from you.” – B.B. King",
  "“Tell me and I forget. Teach me and I remember. Involve me and I learn.” – Benjamin Franklin",
  "“Learning never exhausts the mind.” – Leonardo da Vinci",
  "“The more that you read, the more things you will know. The more that you learn, the more places you'll go.” – Dr. Seuss",
  "Access high-quality courses anytime, anywhere, and take control of your learning journey with ease.",
  "Unlock your potential with our expert-guided courses and achieve your academic goals."
];

export default function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/00 text-white text-center py-8 px-6 rounded-xl mx-5 my-4">
      <p className="text-lg md:text-2xl font-semibold italic transition-all duration-500">
        {quotes[index]}
      </p>
    </div>
  );
}
