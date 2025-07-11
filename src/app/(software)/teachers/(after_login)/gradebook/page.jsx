'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import GradebookPage from "./components/gradeBook";
import { useEffect } from "react";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Gradebook");
    }, [setTitle]);
    return (
        <div>
            <GradebookPage />
        </div>
    )
}