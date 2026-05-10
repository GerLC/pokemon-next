"use client";

import { Ruler, Weight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { type PokemonProfileProps, TYPE_COLORS } from "../types";
import { StatCard } from "./StatCard";

export function PokemonProfile({ pokemon, typeColor }: PokemonProfileProps) {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = () => {
    setFailedImages((prev) => {
      const next = new Set(prev);
      next.add(pokemon.id);
      return next;
    });
  };

  const imgSrc = failedImages.has(pokemon.id)
    ? pokemon.artwork
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;

  return (
    <div className="flex flex-col md:flex-row gap-10 items-stretch">
      <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 relative aspect-square md:aspect-auto flex items-center justify-center rounded-[2rem] bg-surface-card border border-border overflow-hidden group">
        <div
          className="absolute inset-0 opacity-10 blur-[80px] pointer-events-none"
          style={{ backgroundColor: typeColor }}
        />

        <Image
          src={imgSrc}
          alt={pokemon.name}
          width={300}
          height={300}
          className="w-[60%] h-[60%] object-contain drop-shadow-lg [image-rendering:pixelated] group-hover:scale-110 transition-transform duration-500"
          unoptimized
          priority
          onError={handleImageError}
        />

        <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-sm border border-border px-3 py-1 rounded-full">
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: typeColor }}
          >
            {pokemon.formattedId}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 w-full">
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {pokemon.types.map((t) => {
              const color = TYPE_COLORS[t.type.name] ?? TYPE_COLORS.normal;
              return (
                <span
                  key={t.type.name}
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: color }}
                >
                  {t.type.name}
                </span>
              );
            })}
          </div>

          <h1 className="text-5xl md:text-6xl font-black capitalize tracking-tight text-on-surface leading-none">
            {pokemon.name}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Ruler className="w-4 h-4" />}
            label="Height"
            value={pokemon.displayHeight}
            unit="m"
            color={typeColor}
          />
          <StatCard
            icon={<Weight className="w-4 h-4" />}
            label="Weight"
            value={pokemon.displayWeight}
            unit="kg"
            color={typeColor}
          />
        </div>

        <div className="bg-surface-card border border-border rounded-[var(--radius-card)] p-5">
          <p className="text-sm text-on-surface-muted leading-relaxed">
            <span className="font-bold capitalize text-on-surface">
              {pokemon.name}
            </span>{" "}
            is a{" "}
            <span className="font-semibold" style={{ color: typeColor }}>
              {pokemon.types.map((t) => t.type.name).join(" / ")}
            </span>{" "}
            type Pokémon. It stands {pokemon.displayHeight}m tall and weighs{" "}
            {pokemon.displayWeight}
            kg. Ready to add this buddy to your team?
          </p>
        </div>
      </div>
    </div>
  );
}
