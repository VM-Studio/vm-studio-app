// components/ui/splash-screen.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo-vm.png"; // Cambiá por la ruta real de tu logo

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-500">
      <Image src={logo} alt="VM Studio Logo" width={100} height={100} className="mb-4" />
      <div className="w-72 h-2 bg-gray-700 rounded overflow-hidden">
        <div
          className="h-full bg-[#007BFF] transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-lg">{progress}% Cargando...</p>
    </div>
  );
}
