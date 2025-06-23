import CoursesPage from "./components/coursePage";


export default function Page() {
    return (
        <section>
            <CoursesPage />
        </section>
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
