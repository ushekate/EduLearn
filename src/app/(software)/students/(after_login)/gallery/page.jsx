'use client';
import Sidebar from "@/components/ui/Sidebar";
import GalleryPage from "./components/gallaryPage";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle('Gallery');
    },[setTitle]);
    return (
        // <Sidebar>
            <GalleryPage />
        // </Sidebar>
    )
}