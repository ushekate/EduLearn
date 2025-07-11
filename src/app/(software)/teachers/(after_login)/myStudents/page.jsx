'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import MyStudentsPage from "./components/myStudentsPage";

export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("My Students");
    }, [setTitle]);
    return (
        <div>
            <MyStudentsPage />
        </div>
    )
}