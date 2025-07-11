'use client';
import Sidebar from "@/components/ui/Sidebar";
import CoursesPage from "./components/coursesPage";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("My Courses");
    }, [setTitle]);
    return (
        // <Sidebar>
            <CoursesPage />
        // </Sidebar>
    )
}