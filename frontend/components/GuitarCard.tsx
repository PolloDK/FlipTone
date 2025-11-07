"use client";

import Image from "next/image";
import { Guitar, MapPin, ExternalLink } from "lucide-react";

interface GuitarCardProps {
  guitar: {
    id: string | number;
    titulo?: string;
    marca?: string;
    modelo?: string;
    ciudad?: string;
    precio?: number | string;
    thumbnail?: string;
    url?: string;
  };
}

export default function GuitarCard({ guitar }: GuitarCardProps) {
  const hasLink = Boolean(guitar.url);

  const content = (
    <div
      className={`bg-white dark:bg-fliptone-dark/60 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-3 flex items-center gap-4 border border-gray-100 dark:border-gray-800 ${
        hasLink ? "cursor-pointer hover:-translate-y-1" : "cursor-default"
      }`}
    >
      {/* Imagen */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        {guitar.thumbnail ? (
          <Image
            src={guitar.thumbnail}
            alt={guitar.titulo || "Guitarra"}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Guitar size={28} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate flex items-center gap-1">
          {guitar.titulo || "Guitarra sin título"}
          {hasLink && (
            <ExternalLink
              size={14}
              className="text-fliptone-blue opacity-70 group-hover:opacity-100 transition"
            />
          )}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {guitar.marca || "Desconocida"} • {guitar.modelo || "Sin modelo"}
        </p>

        {guitar.ciudad && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <MapPin size={12} />
            <span className="truncate">{guitar.ciudad}</span>
          </div>
        )}

        <p className="text-lg font-bold text-fliptone-blue mt-1">
          {guitar.precio
            ? `$${Number(guitar.precio).toLocaleString("es-CL")}`
            : "Sin precio"}
        </p>
      </div>
    </div>
  );

  // Si hay link, envolver con <a>
  return hasLink ? (
    <a
      href={guitar.url!}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {content}
    </a>
  ) : (
    content
  );
}
