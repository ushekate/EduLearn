'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import ReportsPage from "./components/report";
import Sidebar from "@/components/ui/Sidebar";
import { useEffect } from "react";

export default function Page() {
  const { setTitle } = useSidebar();
  useEffect(() => {
    setTitle("Reports");
  }, [setTitle]);
  return (
    // <Sidebar>
      <ReportsPage />
    // </Sidebar>
  );
}
