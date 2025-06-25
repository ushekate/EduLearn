'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import StudentAssignmentPage from "./components/Table";
import Sidebar from "@/components/ui/Sidebar";


export default function AssignmentPage() {
    const { setTitle } = useSidebar();
    setTitle("Assignments");
    return (
        <Sidebar>
            <StudentAssignmentPage />
        </Sidebar>
    );
}
