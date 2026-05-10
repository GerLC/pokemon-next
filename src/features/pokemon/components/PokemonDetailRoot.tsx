"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePokemonDetail } from "@/features/pokemon/hooks/use-pokemon";
import type { PokemonDetailRootProps } from "@/features/pokemon/types";
import { TYPE_COLORS } from "@/features/pokemon/types";
import { DetailSkeleton } from "./DetailSkeleton";
import { PokemonEvolution } from "./PokemonEvolution";
import { PokemonProfile } from "./PokemonProfile";
import { PokemonStats } from "./PokemonStats";

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
      <div className="flex flex-col gap-10">
        <PokemonProfile pokemon={pokemon} typeColor={typeColor} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PokemonStats stats={pokemon.stats} typeColor={typeColor} />
          <Link
            href={`/pokedex/${pokemon.name}/moves`}
            className="bg-surface-card border border-border rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-on-surface">
                Moves & Abilities
              </h3>
              <p className="text-sm text-on-surface-muted">
                Explore all {pokemon.moves.length} moves and hidden abilities.
              </p>
            </div>
            <div className="mt-2 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              Open Explorer <ArrowLeft className="w-3 h-3 rotate-180" />
            </div>
          </Link>
          <PokemonEvolution name={pokemon.name} />
        </div>
      </div>
    </div>
  );
}
