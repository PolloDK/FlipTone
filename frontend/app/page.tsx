"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GuitarCard from "@/components/GuitarCard";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["guitarras"],
    queryFn: async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/guitars?limit=100");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-fliptone-light dark:bg-fliptone-dark">
        <p className="text-gray-500 animate-pulse">Cargando guitarras...</p>
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex items-center justify-center bg-fliptone-light dark:bg-fliptone-dark">
        <p className="text-red-500">Error al cargar las guitarras 😢</p>
      </main>
    );

  return (
    <main className="pb-24 min-h-screen flex flex-col items-center justify-start bg-fliptone-light dark:bg-fliptone-dark pt-8 px-4">
      {/* Título principal */}
      <h1 className="text-gradient text-4xl font-bold font-primary text-center mb-2">
        FlipTone 🎸
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
        Visualiza el mercado de guitarras en tiempo real
      </p>

      {/* Listado de guitarras */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {data.map((guitar: any) => (
          <GuitarCard key={guitar.id} guitar={guitar} />
        ))}
      </div>

      {/* Espacio inferior para el BottomNav */}
      <div className="h-20" />
    </main>
  );
}
