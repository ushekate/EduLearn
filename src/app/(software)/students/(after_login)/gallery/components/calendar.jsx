'use client';
import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CalendarSelector({
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
}) {
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    const months = [
        { name: "All", value: "" },
        { name: "January", value: "1" },
        { name: "February", value: "2" },
        { name: "March", value: "3" },
        { name: "April", value: "4" },
        { name: "May", value: "5" },
        { name: "June", value: "6" },
        { name: "July", value: "7" },
        { name: "August", value: "8" },
        { name: "September", value: "9" },
        { name: "October", value: "10" },
        { name: "November", value: "11" },
        { name: "December", value: "12" },
    ];

    const years = ["All", "2024", "2025"];

    const getMonthLabel = (value) =>
        months.find((m) => m.value === value)?.name || "Month";

    const getYearLabel = (value) =>
        value === "" ? "Year" : value;

    return (
        <div className="flex items-center gap-2">
            {/* Calendar Icon */}
            <div className="p-2 rounded-md bg-[#EBDDFC] text-[#7E22CE] flex items-center text-sm">
                <Calendar size={16} />
            </div>

            {/* Month Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowMonthDropdown(!showMonthDropdown);
                        setShowYearDropdown(false);
                    }}
                    className="px-3 py-2 rounded-md bg-[#EBDDFC] flex items-center justify-between text-sm text-[#7E22CE] gap-2 min-w-[120px]"
                >
                   Month: {getMonthLabel(selectedMonth)} <ChevronDown size={16} />
                </button>
                {showMonthDropdown && (
                    <div className="absolute z-10 mt-2 w-40 bg-white border rounded-md shadow">
                        {months.map((m) => (
                            <div
                                key={m.value}
                                onClick={() => {
                                    onMonthChange(m.value);
                                    setShowMonthDropdown(false);
                                }}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-[#EBDDFC] cursor-pointer"
                            >
                                {m.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Year Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowYearDropdown(!showYearDropdown);
                        setShowMonthDropdown(false);
                    }}
                    className="px-3 py-2 rounded-md bg-[#EBDDFC] flex items-center justify-between text-sm text-[#7E22CE] gap-2 min-w-[100px]"
                >
                    {getYearLabel(selectedYear)} <ChevronDown size={16} />
                </button>
                {showYearDropdown && (
                    <div className="absolute z-10 mt-2 w-32 bg-white border rounded-md shadow">
                        {years.map((y, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    onYearChange(i === 0 ? "" : y);
                                    setShowYearDropdown(false);
                                }}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-[#EBDDFC] cursor-pointer"
                            >
                                {y}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}