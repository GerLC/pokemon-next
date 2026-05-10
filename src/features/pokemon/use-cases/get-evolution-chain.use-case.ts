import { pokemonService } from "../services/pokemon.service";
import type { EvolutionNode, RawEvolutionNode } from "../types";

const flattenEvolutionChain = (
  node: RawEvolutionNode,
  list: EvolutionNode[] = [],
) => {
  if (!node) return list;

  const urlParts = node.species.url.split("/").filter(Boolean);
  const id = parseInt(urlParts[urlParts.length - 1], 10);

  if (!list.some((e) => e.id === id)) {
    list.push({
      name: node.species.name,
      id,
      artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    });
  }

  if (node.evolves_to && node.evolves_to.length > 0) {
    for (const nextNode of node.evolves_to) {
      flattenEvolutionChain(nextNode, list);
    }
  }

  return list;
};

export const getEvolutionChainUseCase = async (
  name: string,
): Promise<EvolutionNode[]> => {
  const species = await pokemonService.getSpecies(name);
  const chainData = await pokemonService.getEvolutionChain(
    species.evolution_chain.url,
  );

  return flattenEvolutionChain(chainData.chain);
};
