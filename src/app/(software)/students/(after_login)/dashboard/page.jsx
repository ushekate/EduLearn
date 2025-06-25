'use client';
import Sidebar from "@/components/ui/Sidebar";
import StudentDashboardPage from "./components/Table";
import { useSidebar } from "@/contexts/SidebarProvider";

export default function DashboardPage() {
  const { setTitle } = useSidebar();
  setTitle("Dashboard");
  return (      
        <Sidebar>
          <StudentDashboardPage />
        </Sidebar>
  );
}









