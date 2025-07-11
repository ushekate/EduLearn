'use client';
import Sidebar from "@/components/ui/Sidebar";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import EventPage from "./components/eventPage";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Events');
    }, [setTitle]);
    return (
        // <Sidebar>
            <EventPage />
        // </Sidebar>
    )
}