'use client';
import { useEffect } from "react";
import AssignmentsPage from "./components/assignmentPage";
import { useSidebar } from "@/contexts/SidebarProvider";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Assignments");
    }, [setTitle]);
    return (
        <div>
            <AssignmentsPage />
        </div>
    )
}