'use client';

import Sidebar from "@/components/ui/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarProvider";

export default function RootStudentsLayout({ children }) {
    // const { setTitle } = useSidebar();
    // useEffect(() => {
    //     setTitle("Dashboard");
    // }, [setTitle]);
    return (
        <SidebarProvider>
            <Sidebar>
                {children}
            </Sidebar>
        </SidebarProvider>
    )
}