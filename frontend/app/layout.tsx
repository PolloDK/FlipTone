

import "./globals.css";
import Providers from "./providers";
import BottomNav from "@/components/BottomNav";
import TopNavbar from "@/components/TopNavbar";

export const metadata = {
  title: "FlipTone",
  description: "Explora el mercado de guitarras en tiempo real 🎸",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-secondary bg-fliptone-light dark:bg-fliptone-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <TopNavbar />
          {children}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
