import { pokemonService } from "../services/pokemon.service";

export type EvolutionNode = {
  name: string;
  id: number;
  artwork: string;
};

export const getEvolutionChainUseCase = async (name: string): Promise<EvolutionNode[]> => {
  const species = await pokemonService.getSpecies(name);
  const chainData = await pokemonService.getEvolutionChain(species.evolution_chain.url);

  const evolutions: EvolutionNode[] = [];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (node: any) => {
    if (!node) return;
    
    const urlParts = node.species.url.split("/").filter(Boolean);
    const id = parseInt(urlParts[urlParts.length - 1], 10);
    
    if (!evolutions.some(e => e.id === id)) {
      evolutions.push({
        name: node.species.name,
        id,
        artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      });
    }
    
    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(traverse);
    }
  };

  traverse(chainData.chain);
  
  return evolutions;
};
