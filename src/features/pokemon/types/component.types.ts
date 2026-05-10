import { ReactNode } from "react";
import type { getMoveDetailUseCase } from "../use-cases/get-move-detail.use-case";
import type { getPokemonDetailUseCase } from "../use-cases/get-pokemon-detail.use-case";

export type PokemonData = Awaited<ReturnType<typeof getPokemonDetailUseCase>>;
export type MoveData = Awaited<ReturnType<typeof getMoveDetailUseCase>>;

export interface PokemonDetailRootProps {
  name: string;
}

export interface PokemonProfileProps {
  pokemon: PokemonData;
  typeColor: string;
}

export interface PokemonStatsProps {
  stats: PokemonData["stats"];
  typeColor: string;
}

export interface PokemonEvolutionProps {
  name: string;
}

export interface PokemonAbilitiesProps {
  abilities: PokemonData["abilities"];
  typeColor: string;
}

export interface PokemonMovesProps {
  moves: PokemonData["moves"];
  typeColor: string;
}

export interface MoveExplorerProps {
  pokemonName: string;
  moves: string[];
  abilities: { name: string; isHidden: boolean }[];
  typeColor: string;
}

export interface MoveDetailCardProps {
  move: MoveData | null | undefined;
  isLoading: boolean;
  typeColor: string;
}

export interface StatBarProps {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}

export interface EvolutionNode {
  name: string;
  id: number;
  artwork: string;
}

export interface PokemonPageProps {
  params: Promise<{ name: string }>;
}
