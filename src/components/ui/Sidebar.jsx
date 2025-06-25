'use client';

import { useSidebar } from '@/contexts/SidebarProvider';
import { Bell, LogOutIcon, PanelLeft, User, ChevronDown, ChevronRight, X, MessageSquare, CircleUserRound, Sailboat, Settings, LayoutDashboard, Ticket, BookDashed, Album, ClipboardList, Book, BookOpen, Clock, Image, FileText, Megaphone, CalendarCheck2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { navLinks } from '@/constants/navLinks';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { Popover } from './Popover';

export default function Sidebar({
	children,
	defaultOpen = true,
	sidebarClassWidth = "w-[300px]", // Use tailwind class instead of fixed px
	sidebarColor = "bg-[var(--primary)]",
	access = 'students',
	sidebarItems = navLinks.filter((link) => link.access === access)
}) {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [expandedItems, setExpandedItems] = useState({});
	const { open: isOpen, setOpen: setIsOpen, title } = useSidebar();
	const currentPath = usePathname();
	const router = useRouter();

	const menuItems = [
		{ icon: <User className='text-white' />, text: "Dashboard" },
		{ icon: <ClipboardList className='text-white' />, text: "Assignments" },
		{ icon: <Book className='text-white' />, text: "Courses" },
		{ icon: <BookOpen className='text-white' />, text: "Reports" },
        { icon: <Clock className='text-white' />, text: "Timetable" },
        { icon: <Image className='text-white' />, text: "Gallery" },
        { text: "Lecture Notes", icon: <FileText className='text-white' /> },
        { text: "Notices", icon: <Megaphone className='text-white' /> },
        { text: "Library", icon: <Book className='text-white' /> },
        { text: "Leaves", icon: <CalendarCheck2 className='text-white' /> },
	];

	const hostItems = [
		{
			title: "Student Login",
			description: "Get started with Student Side.",
			icon: <User className='text-[var(--foreground)]' />
		},
		{ title: "Log out", icon: <LogOutIcon className='w-5 h-5 text-[var(--foreground)]' /> }
	];

	// Check screen size and adjust layout accordingly
	useEffect(() => {
		const checkScreenSize = () => {
			const mobile = window.innerWidth < 640; // sm breakpoint
			const tablet = window.innerWidth >= 640 && window.innerWidth < 768; // md to lg

			setIsMobile(mobile);
			setIsTablet(tablet);

			// Set default sidebar state based on screen size
			if (mobile) {
				setIsOpen(false);
			} else if (tablet) {
				setIsOpen(false); // Collapsed by default on tablet
			} else {
				setIsOpen(defaultOpen);
			}
		};

		// Check on first render
		checkScreenSize();

		// Check for Ctrl+B
		const handleKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
				e.preventDefault(); // Prevent browser default (like bold in inputs)
				toggleSidebar();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		// Add event listener for window resize
		window.addEventListener('resize', checkScreenSize);

		// Clean up
		return () => {
			window.removeEventListener('resize', checkScreenSize)
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [defaultOpen, setIsOpen]);

	// Toggle sidebar
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	// Determine if a navigation item is active
	const isActive = (href) => {
		return href === currentPath;
	};

	// Toggle the expanded state of a menu item
	const toggleItemExpand = (index) => {
		setExpandedItems(prev => ({
			...prev,
			[index]: !prev[index]
		}));
	};

	// Determine sidebar width class based on screen size
	const getSidebarWidthClass = () => {
		if (isMobile) return "w-3/4 max-w-xs"; // 75% width on mobile, max 320px
		if (isTablet) return "w-72"; // Fixed width on tablet
		return sidebarClassWidth; // Default width on desktop
	};

	return (
		<div className="fixed inset-0  flex min-h-screen overflow-hidden bg-accent">
			{/* Overlay for when sidebar is open on mobile/tablet */}
			{(isMobile || isTablet) && isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
					onClick={toggleSidebar}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`
fixed md:sticky top-0 h-screen z-30
${getSidebarWidthClass()}
${isOpen ? 'translate-x-0' : (isMobile || isTablet ? '-translate-x-full md:w-0' : '-translate-x-[400px] md:w-0')}
${sidebarColor} text-purple-700 bg-white 
transition-all duration-300 ease-in-out
flex flex-col
`}
			>
				{/* Sidebar Header */}
				<div className="p-4 md:p-6 flex justify-between items-center">
					<h2 className="text-xl font-semibold truncate">EduLearn</h2>
					{(isMobile || isTablet) && (
						<button
							onClick={toggleSidebar}
							className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
							aria-label="Close sidebar"
						>
							<X className="w-5 h-5" />
						</button>
					)}
				</div>

				{/* Sidebar Content - Scrollable */}
				<div className="p-4 flex-grow overflow-y-auto scrollbar-thin">
					<nav>
						<ul className="space-y-2">
							{sidebarItems.map((item, index) => {
								const active = isActive(item.href);
								const hasSubItems = item.subItems && item.subItems.length > 0;
								const isExpanded = expandedItems[index];

								return (
									<li key={index}>
										{hasSubItems ? (
											<div
												className={`flex items-center justify-between cursor-pointer p-2 rounded transition-colors duration-200 ${active
													? 'bg-white text-[var(--foreground)] font-medium'
													: 'hover:bg-white hover:text-[var(--foreground)] hover:bg-opacity-20'
													}`}
												onClick={() => toggleItemExpand(index)}
											>
												<div className="flex items-center gap-3">
													{item?.icon && <item.icon className="w-5 h-5" />}
													<span className="truncate">{item.label}</span>
												</div>
												<div className="ml-2 flex-shrink-0">
													{isExpanded ? (
														<ChevronDown className="w-4 h-4" />
													) : (
														<ChevronRight className="w-4 h-4" />
													)}
												</div>
											</div>
										) : (
											<Link
												href={item.href}
												className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-200 ${active
													? 'bg-purple-100 text-purple-700 border-l-4 font-medium'
													: 'hover:bg-purple-100 hover:text-purple-700 hover:bg-opacity-20'
													}`}
												onClick={() => (isMobile || isTablet) && setIsOpen(false)}
											>
												<div className="flex items-center gap-3">
													{item?.icon && <item.icon className="w-5 h-5" />}
													<span className="truncate">{item.label}</span>
												</div>
											</Link>
										)}

										{/* Render subItems if they exist and the item is expanded */}
										{hasSubItems && isExpanded && (
											<ul className="ml-6 mt-1 space-y-1">
												{item.subItems.map((subItem, subIndex) => {
													const subActive = isActive(subItem.href);
													return (
														<li key={`${index}-${subIndex}`}>
															<Link
																href={subItem.href}
																className={`flex items-center gap-3 p-2 rounded transition-colors duration-200 ${subActive
																	? 'bg-white text-[var(--foreground)] font-medium'
																	: 'hover:bg-white hover:text-[var(--foreground)] hover:bg-opacity-20'
																	}`}
																onClick={() => (isMobile || isTablet) && setIsOpen(false)}
															>
																{subItem?.icon && <subItem.icon className="w-4 h-4" />}
																<span className="truncate">{subItem.label}</span>
															</Link>
														</li>
													);
												})}
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					</nav>
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 flex justify-center">
					<button
						title="Logout"
						variant="invert"
						className="w-full rounded-xl"
						icon={<LogOutIcon className="w-4 h-4 ml-2" />}
						onClick={() => access === 'Students' ?
							router.push('/students/login')
							: (
								access === 'Parents'
									? router.push('/parents/login')
									: router.push('/')
							)
						}
					// iconPosition="right"
					/>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Bar */}
				<header className="border-b p-4 flex items-center justify-between w-full">
					<div className="flex items-center text-white">
						{/* Toggle Button */}
						<button
							onClick={toggleSidebar}
							className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
							aria-label="Toggle Sidebar"
						>
							<User />
						</button>
						<h1 className="ml-4 text-lg md:text-xl font-semibold">{title}</h1>
					</div>
					<div className="flex items-center gap-3">

                        <div className="relative">
                            <input type="text" placeholder="Search Dashboard..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-400 text-gray-500 text-sm" />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>

						<button className="relative" aria-label="Notifications">
							<Bell className="w-5 h-5 md:w-6 md:h-6" />
							<div className="absolute -top-1 right-0 p-[5px] bg-red-500 rounded-full"></div>
						</button>
						<Popover
							trigger={
                                <img src="/profileImage.png" alt="avatar" className="rounded-full w-8 h-8" />
								// <User className="w-7 h-7 md:w-8 md:h-8 bg-[var(--primary)] text-[var(--background)] p-1.5 rounded-full" />
							}
						>
							<div className="w-64">
								{/* Regular menu items */}
								<div className="py-4">
									{menuItems.map((item, index) => (
										<div key={index} className="flex items-center py-1.5 px-4 hover:bg-[var(--background)] cursor-pointer">
											<span className="w-6 text-center mr-4">{item.icon}</span>
											<span className="text-gray-800 text-sm">{item.text}</span>
										</div>
									))}
								</div>

								{/* Divider */}
								<div className="flex items-center justify-center">
									<div className="border-t border-[var(--foreground)]/20 my-1 px-2 w-[90%]"></div>
								</div>

								{/* Host section */}
								<div className="pt-2 pb-2">
									{hostItems.map((item, index) => (
										<div key={index} className="flex items-start py-3 px-4 hover:bg-gray-100 cursor-pointer">
											<div className="flex-1">
												<div className="text-gray-800 text-sm">{item.title}</div>
												{item.description && (
													<div className="text-gray-500 text-xs mt-1">{item.description}</div>
												)}
											</div>
											{item.icon && (
												<div className="ml-2 text-lg">{item.icon}</div>
											)}
										</div>
									))}
								</div>
							</div>
						</Popover>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
