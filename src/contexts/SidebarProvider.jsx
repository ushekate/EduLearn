'use client';
import { useContext, createContext, useState } from "react"

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [title, setTitle] = useState('');
	const [access, setAccess] = useState('students'); // Optional: default to 'students'

	return (
		<SidebarContext.Provider value={{ open, setOpen, title, setTitle, access, setAccess }}>
			{children}
		</SidebarContext.Provider>
	);
}

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};




















// 'use client';
// import { useContext, createContext, useState } from "react"

// const SidebarContext = createContext();

// export const SidebarProvider = ({ children }) => {
// 	const [open, setOpen] = useState(true);
// 	const [title, setTitle] = useState('');

// 	return (
// 		<SidebarContext.Provider value={{ open, setOpen, title, setTitle }}>
// 			{children}
// 		</SidebarContext.Provider >
// 	);
// }

// export const useSidebar = () => {
// 	const context = useContext(SidebarContext);
// 	if (!context) {
// 		throw new Error("useSidebar must be used within a SidebarProvider");
// 	}
// 	return context;
// };
