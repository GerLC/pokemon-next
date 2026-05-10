import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { filterPokemonUseCase } from "@/features/pokedex/use-cases/filter-pokemon.use-case";
import { getPokemonListUseCase } from "@/features/pokedex/use-cases/get-pokemon-list.use-case";

export const usePokemonInfiniteList = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ pageParam = 0 }) => getPokemonListUseCase(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length * 20;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePokemonSearch = (searchTerm: string, totalCount: number) => {
  const isSearching = searchTerm.length > 0;

  const globalQuery = useQuery({
    queryKey: ["pokemon", "global", totalCount],
    queryFn: () => getPokemonListUseCase(0, totalCount),
    staleTime: 1000 * 60 * 60,
    enabled: isSearching && totalCount > 0,
  });

  const allData = globalQuery.data?.results ?? [];
  const filtered = filterPokemonUseCase(allData, searchTerm);

  return {
    filtered,
    isSearching,
    isSearchingGlobal: globalQuery.isLoading && isSearching,
  };
};

export const usePokedex = (searchTerm: string = "") => {
  const list = usePokemonInfiniteList();
  const allLoaded = list.data?.pages.flatMap((page) => page.results) ?? [];
  const totalCount = list.data?.pages[0]?.count ?? 0;

  const search = usePokemonSearch(searchTerm, totalCount);

  return {
    ...list,
    ...search,
    allLoaded,
    totalCount,
    filtered: search.isSearching ? search.filtered : allLoaded,
  };
};
