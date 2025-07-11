'use client';
import Sidebar from "@/components/ui/Sidebar";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import MeetingPage from "./components/meetingPage";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Meetings");
    }, [setTitle]);
    return (
        // <Sidebar>
            <MeetingPage />
        // </Sidebar>
    )
}