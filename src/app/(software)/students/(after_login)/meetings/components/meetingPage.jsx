'use client';
import {
    Calendar,
    Clock,
    Globe,
    Building2,
    FileDown,
    RotateCw,
    Search,
    User,
    FlaskConical,
    Mic,
    BookOpen
} from 'lucide-react';

export default function MeetingPage() {
    const meetings = [
        {
            icon: <FlaskConical size={20} />,
            iconColor: 'bg-purple-100 text-purple-600',
            title: 'Project Review – Physics',
            date: '26 June 2025',
            time: '11:00 AM – 11:30 AM',
            person: 'Mr. Sharma',
            mode: 'Online Meeting',
            status: 'Scheduled',
            button: 'Join Now'
        },
        {
            icon: <Mic size={20} />,
            iconColor: 'bg-pink-100 text-pink-600',
            title: 'Counseling Session',
            date: '28 June 2025',
            time: '09:00 AM – 09:30 AM',
            person: 'School Counselor',
            room: 'Room: 102',
            status: 'Scheduled'
        },
        {
            icon: <BookOpen size={20} />,
            iconColor: 'bg-gray-100 text-gray-500',
            title: 'Chemistry Lab Feedback',
            date: '22 June 2025',
            time: '02:00 PM – 02:20 PM',
            person: 'Dr. Verma',
            notes: 'Download',
            status: 'Completed'
        }
    ];

    return (
        <div className="p-4 space-y-6 bg-[var(--background)]">
            {/* Filter + Search */}
            <div className="bg-white w-full flex flex-wrap items-center gap-3 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Show Meetings For:</span>
                    <select className="border rounded-md px-3 py-1 text-sm focus:outline-none bg-gray-50 text-gray-800">
                        <option>Today</option>
                        <option>Upcoming</option>
                        <option>Past</option>
                    </select>
                </div>
                <div className="flex items-center ml-auto gap-2">
                    <div className="flex items-center border rounded-md px-3 py-1 bg-gray-50">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search Topic"
                            className="bg-transparent outline-none text-sm w-40"
                        />
                    </div>
                    <button className="flex items-center gap-1 bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-purple-200 transition">
                        <RotateCw size={14} />
                    </button>
                </div>
            </div>

            {/* Meeting Cards */}
            {meetings.map((meet, idx) => (
                <div
                    key={idx}
                    className="bg-white border-l-4 rounded-xl p-5 shadow-sm flex justify-between items-start"
                    style={{
                        borderColor: meet.iconColor.includes('purple')
                            ? '#A46BF5'
                            : meet.iconColor.includes('pink')
                                ? '#F65C9C'
                                : '#D1D5DB'
                    }}
                >
                    <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-md ${meet.iconColor}`}>{meet.icon}</div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{meet.title}</h2>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <Calendar size={14} className="text-gray-500" />
                                {meet.date}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <Clock size={14} className="text-gray-500" />
                                {meet.time}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <User size={14} className="text-gray-500" />
                                With: {meet.person}
                            </div>

                            {meet.mode && (
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                    <Globe size={14} className="text-gray-500" />
                                    {meet.mode}
                                </div>
                            )}

                            {meet.room && (
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                    <Building2 size={14} className="text-gray-500" />
                                    {meet.room}
                                </div>
                            )}

                            {meet.notes && (
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                    <FileDown size={14} className="text-gray-500" />
                                    Notes: <span className="text-purple-600 underline cursor-pointer">{meet.notes}</span>
                                </div>
                            )}

                            <div className="mt-2">
                                <span
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${meet.status === 'Scheduled'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {meet.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {meet.button && (
                        <button className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-purple-700 transition whitespace-nowrap">
                            🔗 {meet.button}
                        </button>
                    )}
                </div>
            ))}

            {/* Footer Note */}
            <div className="bg-white text-[#6B21A8] text-sm p-4 rounded-xl flex items-center gap-2">
                <span className="text-lg">💡</span>
                Tap <strong>“Join Now”</strong> for online meetings 5–10 minutes before start to ensure your audio and video are working properly.
            </div>
        </div>
    );
}