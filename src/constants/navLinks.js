import { Album, ArrowDown, Bell, Book, BookOpen, Boxes, CalendarCheck2, ClipboardList, Clock, CreditCard, FastForward, FileSearch2, FileText, LayoutDashboard, LayoutGrid, MailQuestion, MapPinned, Megaphone, Package, Receipt, ReceiptText, Scale, Scan, Truck, UploadIcon, User } from "lucide-react";

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
		label: "Leaves",
		href: "/students/leaves",
		icon: CalendarCheck2,
		access: 'students',
	},
	{
		label: "Meetings",
		href: "/students/meetings",
		icon: CreditCard,
		access: 'students',
	},

]