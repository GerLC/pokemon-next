import type { ReactNode } from "react";
import type { getPokemonDetailUseCase } from "../use-cases/get-pokemon-detail.use-case";

export type PokemonData = Awaited<ReturnType<typeof getPokemonDetailUseCase>>;

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
