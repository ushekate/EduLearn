'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import AttendancePage from "./components/attendancePage";
import { useEffect } from "react";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Attendance");
    }, [setTitle]);
    return (
        <div>
            <AttendancePage />
        </div>
    )
}