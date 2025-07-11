import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/contexts/SidebarProvider";
import ChatBot from "@/components/utils/Chatbot";
import { AuthContextProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduLearn",
  description: "Learning made easy!",
};

export default function MainRootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-background-dark`}
      >
          {/* <SidebarProvider> */}
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
          {/* </SidebarProvider> */}
          <ChatBot />
      </body>
    </html>
  );
}
