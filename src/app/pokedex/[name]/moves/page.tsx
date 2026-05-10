import { ArrowLeft } from "lucide-react";
import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { MoveExplorer } from "@/features/pokemon/components/MoveExplorer";
import { type PokemonPageProps, TYPE_COLORS } from "@/features/pokemon/types";
import { getPokemonDetailUseCase } from "@/features/pokemon/use-cases/get-pokemon-detail.use-case";

export default async function PokemonMovesPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemonDetailUseCase(name);

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const typeColor = TYPE_COLORS[primaryType] ?? TYPE_COLORS.normal;
  const capitalizedName = capitalize(name);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Link
            href={`/pokedex/${name}`}
            className="inline-flex items-center gap-2 text-on-surface-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold text-on-surface-muted">
              Back to {capitalizedName}
            </span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black capitalize tracking-tight">
            <span style={{ color: typeColor }}>{pokemon.name}'s</span>
            <br />
            Moveset
          </h1>
        </div>
      </div>

      <MoveExplorer
        pokemonName={pokemon.name}
        moves={pokemon.moves}
        abilities={pokemon.abilities}
        typeColor={typeColor}
      />
    </div>
  );
}
