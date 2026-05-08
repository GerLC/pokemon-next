"use client";

import { ArrowLeft, Ruler, Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePokemonDetail } from "../hooks/use-pokemon";
import type { PokemonDetailRootProps } from "../types";
import { TYPE_COLORS } from "../types";
import { DetailSkeleton } from "./DetailSkeleton";
import { StatCard } from "./StatCard";

export function PokemonDetailRoot({ name }: PokemonDetailRootProps) {
  const { data: pokemon, isLoading } = usePokemonDetail(name);

  if (isLoading) return <DetailSkeleton />;
  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const typeColor = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link
        href="/pokedex"
        className="inline-flex items-center gap-2 text-on-surface-muted hover:text-primary transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-semibold">Back to Pokédex</span>
      </Link>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square flex items-center justify-center rounded-[2rem] bg-surface-card border border-border overflow-hidden group">
            <div
              className="absolute inset-0 opacity-10 blur-[80px] pointer-events-none"
              style={{ backgroundColor: typeColor }}
            />

            <Image
              src={pokemon.artwork}
              alt={pokemon.name}
              width={400}
              height={400}
              className="w-[80%] h-[80%] object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-700"
              priority
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
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
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

          <div className="bg-surface-card border border-border rounded-[var(--radius-card)] p-6">
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
    </div>
  );
}
