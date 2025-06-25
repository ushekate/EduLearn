'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push('/students/login'); // Redirect to the login page
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="element flex flex-col gap-4 w-full h-screen items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <button className="flex text-5xl text-white items-center gap-3 p-4 rounded-xl">
          <GraduationCap size={60} />
          EduLearn
        </button>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-gray-700 rounded overflow-hidden">
          <div
            className="h-full bg-white rounded transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-white text-lg">{`Loading... ${progress}%`}</div>
      </div>
    </main>
  );
}




