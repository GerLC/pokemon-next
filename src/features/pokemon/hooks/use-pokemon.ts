import { useQuery } from "@tanstack/react-query";
import { getEvolutionChainUseCase } from "@/features/pokemon/use-cases/get-evolution-chain.use-case";
import { getPokemonDetailUseCase } from "@/features/pokemon/use-cases/get-pokemon-detail.use-case";

export const usePokemonDetail = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", "detail", name],
    queryFn: () => getPokemonDetailUseCase(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEvolutionChain = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", "evolution", name],
    queryFn: () => getEvolutionChainUseCase(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 60,
  });
};
