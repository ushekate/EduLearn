import { Album, ArrowDown, BarChart, Bell, Book, BookDashed, BookOpen, Boxes, Calendar, CalendarCheck2, CircleUserRound, ClipboardList, Clock, Cog, CreditCard, FastForward, FileSearch2, FileText, LayoutDashboard, LayoutGrid, MailQuestion, MapPinned, Megaphone, Package, Receipt, ReceiptText, Scale, Scan, Truck, UploadIcon, User, Users } from "lucide-react";

export const navLinks = [
	{
		label: "Dashboard",
		href: "/students/dashboard",
		icon: User,
		access: 'students',
	},
	{
		label: "Assignments",
		href: "/students/assignments",
		icon: ClipboardList,
		access: 'students',
	},
	{
		label: "Reports",
		href: "/students/reports",
		icon: BookOpen,
		access: 'students',
	},
	{
		label: "Courses",
		href: '/students/courses',
		icon: Book,
		access: 'students',
	},
	{
		label: "Timetable",
		href: '/students/timetable',
		icon: Clock,
		access: 'students',
	},
	{ 
		label: "Gallery",
		href: "/students/gallery",
		icon: Package,
		access: 'students',
	},
	{
		label: "Lecture Notes",
		href: "/students/lecturenotes",
		icon: FileText,
		access: 'students',
	},
	{ 
		label: "Notices",
		href: "/students/notices",
		icon: Megaphone,
		access: 'students',
	 },
	{ 
		label: "Library",
		href: "/students/library",
		icon: Book,
		access: 'students',
	 },
	 {
		label: "Leave Request",
		href: "/students/leaves",
		icon: CalendarCheck2,
		access: 'students',
	},
	{
		label: "Meetings",
		href: "/students/meetings",
		icon: Users,
		access: 'students',
	},
	{
		label: "Settings",
		href: "/students/settings",
		icon: Cog,
		access: 'students',
	},
	{
		label: "Events",
		href: "/students/events",
		icon: Calendar,
		access: 'students',
	},

	// Teacher Links
  {
    label: 'Dashboard',
    href: '/teachers/dashboard',
    icon: LayoutDashboard,
    access: 'teachers',
  },
  {
    label: 'My Courses',
    href: '/teachers/myCourses',
    icon: ClipboardList,
    access: 'teachers',
  },
  {
    label: 'My Students',
    href: '/teachers/myStudents',
    icon: FileText,
    access: 'teachers',
  },
  {
    label: 'Assignments',
    href: '/teachers/assignments',
    icon: CalendarCheck2,
    access: 'teachers',
  },
//   {
//     label: 'Schedule',
//     href: '/teachers/schedule',
//     icon: BarChart,
//     access: 'teachers',
//   },
//   {
//     label: 'Gradebook',
//     href: '/teachers/gradebook',
//     icon: BookDashed,
//     access: 'teachers',
//   },
//   {
//     label: 'Messages',
//     href: '/teachers/messages',
//     icon: CircleUserRound,
//     access: 'teachers',
//   },
//   {
//     label: 'Reports',
//     href: '/teachers/reports',
//     icon: ReceiptText,
//     access: 'teachers',
//   },
//   {
//     label: 'Settings',
//     href: '/teachers/settings',
//     icon: Cog,
//     access: 'teachers',
//   },

]