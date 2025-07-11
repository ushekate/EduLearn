'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import LectureNotes from "./components/lectureNotes";
import { useEffect } from "react";
import Sidebar from "@/components/ui/Sidebar";

export default function Page() {
  const { setTitle } = useSidebar();
  useEffect(() => {
    setTitle("Lecture Notes");
  }, [setTitle]);
  return (
    // <Sidebar>
    <LectureNotes />
    // </Sidebar>
  );
}
