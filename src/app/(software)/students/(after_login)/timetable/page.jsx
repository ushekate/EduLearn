'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import TimeTablePage from "./components/timeTable";
// import Sidebar from "@/components/ui/Sidebar";
import { useEffect } from "react";


export default function Page() {
  const { setTitle } = useSidebar();
  useEffect(() => {
    setTitle("Time Table");
  }, [setTitle]);
  return (
    // <Sidebar>
        <TimeTablePage />
    // </Sidebar>
  );
}
