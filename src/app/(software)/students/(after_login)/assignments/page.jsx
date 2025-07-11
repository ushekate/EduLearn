'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import StudentAssignmentPage from "./components/AssignmentPage";
import Sidebar from "@/components/ui/Sidebar";
import { useEffect } from "react";


export default function AssignmentPage() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Assignments");
    }, [setTitle]);
    return (
        // <Sidebar>
            <StudentAssignmentPage />
        // </Sidebar>
    );
}
