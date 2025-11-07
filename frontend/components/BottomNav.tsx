"use client";
import { Home, BarChart3, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/insights", icon: BarChart3, label: "Insights" },
  { href: "/alertas", icon: Bell, label: "Alertas" },
  { href: "/cuenta", icon: User, label: "Cuenta" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white/80 dark:bg-fliptone-dark/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-nav h-16">
      {navItems.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1"
          >
            <div
              className={clsx(
                "w-6 h-6 transition-transform duration-200",
                active
                  ? "text-fliptone-blue scale-110 drop-shadow-[0_0_6px_rgba(6,95,168,0.5)]"
                  : "text-gray-500 hover:text-fliptone-cyan"
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span
              className={clsx(
                "text-xs font-medium",
                active ? "text-fliptone-blue" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
