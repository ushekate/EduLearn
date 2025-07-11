'use client';
import { useSidebar } from "@/contexts/SidebarProvider";
import CoursesPage from "./components/coursePage";
import Sidebar from "@/components/ui/Sidebar";
import { useEffect } from "react";


export default function Page() {
    const { setTitle } = useSidebar();
    useEffect(() => {
        setTitle("Courses");
      }, [setTitle]);
    return (
        // <Sidebar>
            <CoursesPage />
        // </Sidebar>
    );
}


















// 'use client';
// import Sidebar from "@/components/ui/Sidebar";
// import { useSidebar } from "@/contexts/SidebarProvider";
// import { useEffect } from "react";
// import CoursePage from "./components/coursePage";

// export default function Page() {
//     const { setTitle } = useSidebar();
//     useEffect(() => {
//         setTitle("Courses");
//       }, []);
//   return (
//     <Sidebar>
//         <section className="">
//             <CoursePage />
//         </section>
//     </Sidebar>
//   );
// }
