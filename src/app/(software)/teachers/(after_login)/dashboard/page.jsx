'use client';

import TeachersDashboard from "./components/dashboardTeacher";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";


export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Dashboard");
    }, [setTitle]);
    return(
        // <Sidebar access="teachers">
            <TeachersDashboard />
        // </Sidebar>
    )
}