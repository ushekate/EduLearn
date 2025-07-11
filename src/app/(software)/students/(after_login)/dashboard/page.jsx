'use client';
import Sidebar from "@/components/ui/Sidebar";
import StudentDashboardPage from "./components/DashboardPage";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";

export default function DashboardPage() {
  const { setTitle } = useSidebar();
  
  useEffect(() => {
  setTitle("Dashboard");
}, [setTitle]);


  return (      
        // <Sidebar access="students">
          <StudentDashboardPage />
        // </Sidebar>
  );
}









