import { Album, ArrowDown, Bell, Boxes, CreditCard, FastForward, FileSearch2, FileText, LayoutDashboard, LayoutGrid, MailQuestion, MapPinned, Package, Receipt, ReceiptText, Scale, Scan, Truck, UploadIcon, User } from "lucide-react";

export const navLinks = [
	{
		label: "Dashboard",
		href: "/students/dashboard",
		icon: LayoutDashboard,
		access: 'students',
	},
	{
		label: "Assignments",
		href: "/students/assignments",
		icon: ReceiptText,
		access: 'students',
	},
	{
		label: "Courses",
		href: '/students/courses',
		icon: Album,
		access: 'students',
	},
	{ label: "Notices", href: "/students/notices", access: 'students', icon: Bell },
	{ label: "Profile", href: "/students/profile", access: 'students', icon: User },
	{ label: "Gallery", href: "/students/gallery", access: 'students', icon: Package },
]