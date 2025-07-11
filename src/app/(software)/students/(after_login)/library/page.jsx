'use client';
import Sidebar from "@/components/ui/Sidebar";
import LibraryPage from "./components/Library";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";

export default function page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Library");
    }, [setTitle]);
    return (
        // <Sidebar>
            <LibraryPage />
        // </Sidebar>
    )
}