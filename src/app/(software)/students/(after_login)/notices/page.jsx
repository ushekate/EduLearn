'use client';
import Sidebar from "@/components/ui/Sidebar";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import NoticesPage from "./components/noticePage";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Notices");
    }, [setTitle]);
    return(
        // <Sidebar>
            <NoticesPage />
        // </Sidebar>
    )
}