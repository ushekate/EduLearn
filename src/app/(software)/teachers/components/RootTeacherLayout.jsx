'use client';

import Sidebar from "@/components/ui/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarProvider";

export default function RootTeachersLayout({ children }) {
    return (
        <SidebarProvider>
            <Sidebar access="teachers">
                {children}
            </Sidebar>
        </SidebarProvider>
    )
}