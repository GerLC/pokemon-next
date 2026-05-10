import { env } from "@/config/env";

export const pokemonService = {
  async getDetail(name: string) {
    const res = await fetch(
      `${env.NEXT_PUBLIC_POKEMON_API_BASE_URL}/pokemon/${name}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch pokemon: ${name}`);
    return await res.json();
  },

  async getSpecies(name: string) {
    const res = await fetch(
      `${env.NEXT_PUBLIC_POKEMON_API_BASE_URL}/pokemon-species/${name}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch species: ${name}`);
    return await res.json();
  },

  async getEvolutionChain(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch evolution chain`);
    return await res.json();
  },

  async getMove(name: string) {
    const res = await fetch(
      `${env.NEXT_PUBLIC_POKEMON_API_BASE_URL}/move/${name}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch move: ${name}`);
    return await res.json();
  },
};
