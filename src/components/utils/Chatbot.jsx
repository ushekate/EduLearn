'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{ sender: 'bot', text: '👋 Hi there! I\'m your School Assistant. How can I help you today?' }
	]);
	const [input, setInput] = useState('');
	const [lastProactiveTime, setLastProactiveTime] = useState(Date.now());
	const [longDismissal, setLongDismissal] = useState(false);
	const messagesEndRef = useRef(null);

	const knowledgeBase = {
		"timetable": "You can view your class-wise timetable in the 'Timetable' section of the dashboard.",
		"homework": "Homework is listed under the 'Assignments' tab for each subject.",
		"exam": "Exam schedules are available in the 'Notices' or 'Calendar' section.",
		"library": "Library is open from 8:30 AM to 1:30 PM. You can borrow 2 books at a time.",
		"contact": "Call: 0123-4567890 | Email: info@greenschool.edu",
		"default": "You can ask about timetable, homework, library, exams, or school contact info!"
	};

	const getBotReply = (msg) => {
		const text = msg.toLowerCase();

		if (text.match(/hi|hello|hey/)) return "Hello! Need help with timetable, homework, or anything else?";
		if (text.match(/thank/)) return "You're welcome! 😊";
		if (text.match(/bye|goodbye/)) return "Goodbye! 👋 Come back if you need help.";
		for (let key in knowledgeBase) {
			if (text.includes(key)) return knowledgeBase[key];
		}
		return knowledgeBase.default;
	};

	const handleSend = () => {
		if (!input.trim()) return;
		const userMsg = { sender: 'user', text: input };
		setMessages(prev => [...prev, userMsg]);

		const botText = getBotReply(input);
		setTimeout(() => {
			setMessages(prev => [...prev, { sender: 'bot', text: botText }]);
			setLastProactiveTime(Date.now());
		}, 500);
		setInput('');
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className="fixed bottom-5 right-5 z-50">
			{!isOpen ? (
				<button
					onClick={() => setIsOpen(true)}
					className="w-14 h-14 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all"
				>
					<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
				</button>
			) : (
				<div className="w-[320px] h-[500px] rounded-xl shadow-xl bg-[var(--background-2)] flex flex-col overflow-hidden">
					{/* Header */}
					<div className="bg-[var(--primary)] text-white p-4 font-bold flex justify-between items-center">
						<span>School Assistant</span>
						<button
							onClick={() => setIsOpen(false)}
							className="text-xl font-bold hover:text-gray-200"
						>✕</button>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-3 flex flex-col">
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`mb-2 px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap max-w-[80%]
								${msg.sender === 'bot'
									? 'self-start bg-white text-[var(--accent)]'
									: 'self-end bg-[var(--primary)] text-white'}`}
							>
								{msg.text}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className="flex p-2 bg-white border-t border-gray-300">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && handleSend()}
							className="flex-1 p-2 rounded-l-xl border border-gray-300 focus:outline-none text-sm text-gray-800 placeholder:text-[var(--light-primary)]"
							placeholder="Ask about school..."
						/>
						<button
							onClick={handleSend}
							className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-xl text-sm hover:bg-[var(--primary)]/80"
						>Send</button>
					</div>
				</div>
			)}
		</div>
	);
}
