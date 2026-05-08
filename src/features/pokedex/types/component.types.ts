import type { ReactNode } from "react";

export interface PokemonCardProps {
  name: string;
  id: string;
  imageUrl: string;
}

export interface PokemonDetailRootProps {
  name: string;
}

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}
