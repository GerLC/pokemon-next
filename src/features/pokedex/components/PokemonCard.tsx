"use client";
import Image from "next/image";
import Link from "next/link";
import type { PokemonCardProps } from "../types";

export function PokemonCard({ name, id, imageUrl }: PokemonCardProps) {
  const formattedId = `#${id.padStart(3, "0")}`;

  return (
    <Link
      href={`/pokemon/${name}`}
      className="group relative bg-surface-card border border-border rounded-[var(--radius-card)] p-5 overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/0 group-hover:bg-accent/8 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-on-surface-subtle tracking-wider">
            {formattedId}
          </span>
          <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_6px_var(--color-primary)] transition-all duration-300" />
        </div>

        <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full blur-2xl scale-50 group-hover:scale-90 transition-all duration-500 pointer-events-none" />
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="w-full pt-3 border-t border-border">
          <h3 className="text-sm font-bold capitalize tracking-wide text-on-surface group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
