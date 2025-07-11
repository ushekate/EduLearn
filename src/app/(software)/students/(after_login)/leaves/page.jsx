'use client';

import Sidebar from "@/components/ui/Sidebar";
import { useSidebar } from "@/contexts/SidebarProvider"
import { useEffect } from "react";
// import LeavePage from "./components/leavePage";
import LeaveRequests from "./components/leavePage";

export default function page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Leave Request');
    }, [setTitle])
    return (
        // <Sidebar>
            <LeaveRequests />
        // </Sidebar>
    )
}