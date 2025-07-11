'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import SchedulePage from "./components/schedulePage";
import { useEffect } from "react";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Schedule");
    }, [setTitle]);
    return (
        <div>
            <SchedulePage />
        </div>
    )
}