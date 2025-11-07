"use client";

import { Menu, User } from "lucide-react";
import Image from "next/image";

export default function TopNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-fliptone-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm h-14 flex items-center justify-between px-4">
      {/* Botón de menú hamburguesa */}
      <button
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Logo o título */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="FlipTone"
          width={26}
          height={26}
          className="rounded"
        />
        <h1 className="text-gradient font-bold text-lg font-primary tracking-tight">
          FlipTone
        </h1>
      </div>

      {/* Avatar o sesión */}
      <button
        className="p-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:scale-105 hover:border-fliptone-blue transition-all"
        aria-label="Perfil"
      >
        <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </button>
    </header>
  );
}
