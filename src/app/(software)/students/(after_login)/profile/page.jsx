'use client';
import Sidebar from "@/components/ui/Sidebar";
import StudentProfilePage from "./components/ProfilePage";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";

export default function Page(){
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Student Profile");
    }, [setTitle]);
    return (
        // <Sidebar>
            <StudentProfilePage />
        // </Sidebar>
    )
}