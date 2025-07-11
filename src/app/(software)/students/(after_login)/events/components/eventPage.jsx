'use client';
import { Volleyball, Funnel, Search, RotateCw, FlaskConical, Calendar, User, MapPin, Music, Trophy, Eye, Check, Presentation, BookOpen, CalendarDays, Clock } from 'lucide-react';
import { useState } from 'react';

export default function EventPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const events = [
        {
            icon: <FlaskConical size={22} />,
            iconColor: "bg-purple-100 text-purple-600",
            title: "Science Exhibition",
            date: "10 July 2025, 10:00 AM",
            organiser: "Organized by: Science Dept.",
            location: "Location: Hall A"
        },
        {
            icon: <Music size={22} />,
            iconColor: "bg-pink-100 text-pink-600",
            title: "Independence Day Cultural Show",
            date: "15 August 2025, 09:00 AM",
            organiser: "Coordinated by: Arts Club",
            location: "Location: Main Stage"
        },
        {
            icon: <Volleyball size={22} />,
            iconColor: "bg-indigo-100 text-indigo-600",
            title: "Inter-School Football Match",
            date: "20 August 2025, 04:00 PM",
            organiser: "Coach: Mr. Deshmukh",
            location: "Location: Playground"
        }
    ];

    const upcomingEvents = [
        {
            icon: <Presentation size={40} />,
            bg: 'bg-pink-200',
            iconColor: 'text-[#A46BF5]',
            title: 'Parent–Teacher Meeting',
            date: '5 September 2025',
            time: '10:00 AM – 02:00 PM',
        },
        {
            icon: <Trophy size={40} />,
            bg: 'bg-purple-200',
            iconColor: 'text-[#F65C9C]',
            title: 'Annual Sports Day',
            date: '15 September 2025',
            time: '08:00 AM – 05:00 PM',
        },
        {
            icon: <BookOpen size={40} />,
            bg: 'bg-pink-200',
            iconColor: 'text-[#A46BF5]',
            title: 'Book Fair',
            date: '20 September 2025',
            time: '09:00 AM – 04:00 PM',
        },
    ];

    return (
        <div className="bg-[var(--background)] p-4 space-y-6">
            {/* Filter Bar */}
            <div className="bg-white w-full flex flex-wrap items-center gap-3 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                    <Funnel size={18} className="text-purple-500" />
                    <label className="text-gray-700 font-medium">Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border border-[#E5E7EB] shadow rounded-md px-3 py-1 text-sm focus:outline-none bg-[#E5E7EB]/30 text-[#2E2E2E]">
                        <option>All</option>
                        <option>Exhibition</option>
                        <option>Webinars</option>
                        <option>Meetups</option>
                        <option>Match</option>
                    </select>
                </div>
                <div className="flex items-center ml-auto gap-2">
                    <div className="flex items-center  rounded-md px-3 py-1 border border-[#E5E7EB] shadow">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="bg-transparent outline-none text-sm w-40"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setSearchQuery('');
                        }}
                        className="flex items-center gap-1 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-200 transition">
                        <RotateCw size={14} />
                        Reset
                    </button>
                </div>
            </div>

            {/* Detailed Event List */}
            {events.
                filter((event) => {
                    const matchesSearch = event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || (event.title && event.title.toLowerCase().includes(selectedCategory.toLowerCase()));
                    return matchesSearch || matchesCategory;
                }).map((event, idx) => (
                    <div key={idx} className="bg-white flex justify-between items-start p-5 rounded-xl shadow-sm border-l-4" style={{ borderColor: event.iconColor.split(" ")[1] }}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-md ${event.iconColor}`}>{event.icon}</div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h2>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                    <Calendar size={16} className="text-[#F65C9C] mb-0.5" /> {event.date}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                    <User size={16} className="text-[#F65C9C] mb-0.5" /> {event.organiser}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                    <MapPin size={16} className="text-[#F65C9C] mb-0.5" /> {event.location}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0 sm:ml-auto">
                            <button className="flex items-center gap-1 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-200 transition">
                                <Eye size={14} /> View Details
                            </button>
                            <button className="flex items-center gap-1 bg-purple-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-700 transition">
                                <Check size={14} /> Interested
                            </button>
                        </div>
                    </div>

                ))}

            {/* Upcoming Events Grid */}
            <div className="space-y-4 mt-10">
                <h1 className="text-xl font-semibold text-gray-800">Upcoming Events</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {upcomingEvents.map((event, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className={`p-10 flex justify-center ${event.bg}`}>
                                <div className={`${event.iconColor}`}>{event.icon}</div>
                            </div>
                            <div className="p-5">
                                <h2 className="font-semibold text-gray-800 mb-3">{event.title}</h2>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                    <CalendarDays size={14} className="text-[#F65C9C]" />
                                    {event.date}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                                    <Clock size={14} className="text-[#F65C9C]" />
                                    {event.time}
                                </div>
                                <button className="bg-[#8F6BF5] text-white w-full py-2 rounded-md font-medium text-sm hover:bg-purple-700 transition">
                                    Event Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}