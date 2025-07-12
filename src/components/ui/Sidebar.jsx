'use client';

import React from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import { Bell, LogOutIcon, User, ChevronDown,
    ChevronRight, X, ClipboardList, Book,
    BookOpen, Clock, Image, FileText,
    Megaphone, CalendarCheck2, Search
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { navLinks } from '@/constants/navLinks';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import pbstudent from '@/lib/db';
import { useTheme } from 'next-themes';
import { AppName } from '@/constants/AppName';


export default function Sidebar({
    children,
    defaultOpen = true,
    sidebarClassWidth = "w-[300px]",
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
    const [user, setUser] = useState(null);
    // const { theme, setTheme } = useTheme();

    // const menuItems = [
    //     { icon: <User className='text-white' />, text: "Dashboard" },
    //     { icon: <ClipboardList className='text-white' />, text: "Assignments" },
    //     { icon: <Book className='text-white' />, text: "Courses" },
    //     { icon: <BookOpen className='text-white' />, text: "Reports" },
    //     { icon: <Clock className='text-white' />, text: "Timetable" },
    //     { icon: <Image className='text-white' />, text: "Gallery" },
    //     { text: "Lecture Notes", icon: <FileText className='text-white' /> },
    //     { text: "Notices", icon: <Megaphone className='text-white' /> },
    //     { text: "Library", icon: <Book className='text-white' /> },
    //     { text: "Leaves", icon: <CalendarCheck2 className='text-white' /> },
    // ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authUser = pbstudent.authStore.model;
                if (authUser) {
                    const userCollection = access === 'teachers' ? 'teachers' : 'students';
                    const fullUser = await pbstudent.collection(userCollection).getOne(authUser.id);
                    setUser(fullUser);
                }
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    // Moved this useEffect above any early return
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 640;
            const tablet = window.innerWidth >= 640 && window.innerWidth < 768;

            setIsMobile(mobile);
            setIsTablet(tablet);

            if (mobile || tablet) {
                setIsOpen(false);
            } else {
                setIsOpen(defaultOpen);
            }
        };

        checkScreenSize();

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [defaultOpen, setIsOpen]);

    const handleLogout = async () => {
        try {
            pbstudent.authStore.clear();
            router.push(access === 'teachers' ? '/teachers/login' : '/students/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (!user) return null;


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
        <div className="fixed inset-0  flex min-h-screen overflow-hidden bg-white dark:bg-black">
            {/* Overlay for when sidebar is open on mobile/tablet */}
            {(isMobile || isTablet) && isOpen && (
                <div
                    className="fixed inset-0 bg-black dark:bg-white bg-opacity-50 z-20 transition-opacity duration-300"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
    fixed md:sticky top-0 shadow-2xl h-screen z-30
    ${getSidebarWidthClass()}
    ${isOpen ? 'translate-x-0' : (isMobile || isTablet ? '-translate-x-full md:w-0' : '-translate-x-[400px] md:w-0')}
    ${sidebarColor} text-purple-700 dark:text-white bg-white dark:bg-zinc-900
    transition-all duration-300 ease-in-out
    flex flex-col
  `}
            >

                {/* Sidebar Header */}
                <div className="p-3 md:p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold truncate">
                        {access === 'teachers' ? 'Teacher Portal' : AppName}
                    </h2>

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


                {/* User Info Card */}

                {user && (
                    <div className="bg-purple-100 dark:bg-zinc-800 text-black dark:text-white rounded-xl mx-4 my-2 pl-12 p-3 flex items-center gap-3">
                        <img
                            src={
                                user.profile_pic
                                    ? `${pbstudent.baseUrl}/api/files/${access}/${user.id}/${user.profile_pic}`
                                    : '/profileImage.png'
                            }
                            alt="avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => router.push(`/${access}/profile`)}
                            title="View Profile"
                        />
                        <div className="flex-1">
                            <div className="text-sm font-semibold">
                                {user.first_name} {user.last_name}
                            </div>
                            <div className="text-xs text-gray-600">
                                {user.level || user.subject || 'Fetching...'}
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1"
                            title="Logout"
                        >
                            <LogOutIcon className="w-4 h-4 text-purple-600" />
                        </button>
                    </div>
                )}

            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden shadow-md bg-white">
                {/* Top Bar */}
                <header className="p-4 flex items-center justify-between w-full">
                    <div className="flex items-center text-white">
                        {/* Toggle Button */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
                            aria-label="Toggle Sidebar"
                        >
                            {React.createElement(
                                navLinks.find(link => link.href === currentPath)?.icon || User,
                                { className: "w-5 h-5 text-purple-700" }
                            )}

                        </button>
                        <h1 className="ml-4 text-lg md:text-xl font-semibold text-purple-700">{title}</h1>
                    </div>
                    <div className="flex items-center gap-3">

                        <div className="relative">
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-400 text-gray-500 text-sm" />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        </div>

                        <button className="relative" aria-label="Notifications">
                            <Bell className="w-5 h-5 md:w-6 md:h-6" />
                            <div className="absolute -top-1 right-0 px-[3px] bg-primary rounded-full text-xs text-white">3</div>
                        </button>

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
