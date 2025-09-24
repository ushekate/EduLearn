'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import StudyMaterial from "./components/studyMaterial";

export default function Page(){
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Study Material");
    }, [setTitle]);
    return(
        <div>
            <StudyMaterial />
        </div>
    )
}