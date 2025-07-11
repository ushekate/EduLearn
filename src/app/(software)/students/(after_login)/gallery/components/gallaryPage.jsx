'use client';
import { ChevronDown, Funnel, Calendar, RefreshCw, Play, Star, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import CalendarSelector from './calendar';

export default function GalleryPage() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear ] = useState('');

    const categories = [
        "All", "Science Exhibition", "Annual Day",
        "Sports Day", "Republic Day", "Independence Day"
    ];

    const featuredAlbums = [
        {
            title: "Annual Day",
            date: "2025-03-10",
            topEvent: true,
            images: ["/gallaryImages/GImage1.jpg","/gallaryImages/GImage2.jpeg","/gallaryImages/GImage3.jpeg"],
        },
        {
            title: "Science Exhibition",
            date: "2025-02-04",
            images: ["/gallaryImages/GImage4.jpeg", "/gallaryImages/GImage5.jpeg", "/gallaryImages/GImage6.jpg"],
        },
        {
            title: "Sports Day",
            date: "2024-12-15",
            images: ["/gallaryImages/GImage7.jpeg", "/gallaryImages/GImage8.jpeg", "/gallaryImages/GImage9.jpg"],
        },
    ];

    const filteredAlbums = featuredAlbums.filter((album) => {
        const matchesCategory = selectedCategory === 'All' || album.title === selectedCategory;
        const albumDate = new Date(album.date);
        const matchesMonth = !selectedMonth || albumDate.getMonth() + 1 === parseInt(selectedMonth);
        const matchesYear = !selectedYear || albumDate.getFullYear() === parseInt(selectedYear);
        return matchesCategory && matchesMonth && matchesYear;
    })

    return (
        <div className="p-4 bg-background">
            {/* Filters */}
            <div className="flex items-center bg-white w-full p-4 mt-2 gap-4 rounded-md shadow relative">
                <h1 className="flex items-center text-light-primary gap-1 text-md font-semibold">
                    <Funnel size={18} /> Filters:
                </h1>

                {/* Category Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="px-3 py-2 rounded-md bg-background flex items-center justify-between text-sm text-foreground gap-2"
                    >
                        Category: {selectedCategory} <ChevronDown size={16} />
                    </button>
                    {showDropdown && (
                        <div className="absolute z-10 mt-2 w-40 bg-white border rounded-md shadow">
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setShowDropdown(false);
                                    }}
                                    className="px-4 py-2 text-sm text-light-primary hover:bg-background-2 cursor-pointer"
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Picker */}
                <CalendarSelector selectedMonth={selectedMonth} selectedYear={selectedYear} onMonthChange={setSelectedMonth} onYearChange={setSelectedYear} />


                {/* Reset Button */}
                <button
                    onClick={() => {
                        setSelectedCategory('All');
                        setSelectedMonth('');
                        setSelectedYear('');
                    }}
                    className="bg-light-primary/15 text-light-primary flex items-center text-sm px-4 py-2 gap-2 rounded-md"
                >
                    <RefreshCw size={15} /> Reset
                </button>
            </div>

            {/* Filtered Albums */}
            <div className="mt-6">
                {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album, i) => (
                        <div key={i} className="bg-white p-4 rounded-md shadow mb-4">
                            <div className="border border-light-primary/20 rounded-xl">
                                <div>
                                    <div className="flex justify-between items-center mb-2 bg-light-primary/15 w-full p-2 border-b border-light-primary/20 pl-5">
                                        <div>
                                            <h2 className="font-semibold text-sm flex items-center gap-1 text-light-primary mb-1">
                                                <Star size={16} className="text-foreground mb-0.5" />
                                                Featured Albums
                                            </h2>
                                            <h3 className="text-lg font-semibold text-light-primary">
                                                {album.title}
                                            </h3>
                                            <div className="flex items-center text-sm text-light-primary">
                                                <Calendar size={14} className="mr-1 mb-0.5" />
                                                {new Date(album.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {album.topEvent && (
                                            <div className="bg-foreground text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                ★ Top Event
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-5 p-5">
                                        {album.images.map((src, idx) => (
                                            <img
                                                key={idx}
                                                src={src}
                                                alt={`Slide ${idx}`}
                                                className="w-70 h-55 object-cover rounded-md"
                                            />
                                        ))}
                                        <div className="w-70 h-55 bg-background flex justify-center items-center rounded-md">
                                            <Play size={24} className="text-foreground" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-sm text-foreground font-medium border-t border-light-primary/40 p-3">
                                    <button className="flex gap-1">
                                        <Eye size={18} /> View
                                    </button>
                                    <button className="flex items-center gap-1 hover:underline">
                                        <Download size={17} /> Download Album
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-light-primary mt-10">
                        No albums found for selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}