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
          <div className="bg-surface-card/30 border border-border border-dashed rounded-[var(--radius-card)] p-5 flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-on-surface-muted font-medium text-sm">
              Abilities & Moves (Coming Soon)
            </span>
          </div>
          <PokemonEvolution name={pokemon.name} />
        </div>
      </div>
    </div>
  );
}
