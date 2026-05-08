import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { filterPokemonUseCase } from "../use-cases/filter-pokemon.use-case";
import { getPokemonDetailUseCase } from "../use-cases/get-pokemon-detail.use-case";
import { getPokemonListUseCase } from "../use-cases/get-pokemon-list.use-case";

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

  const globalData = globalQuery.data?.results ?? [];
  const filtered = filterPokemonUseCase(globalData, searchTerm);

  return {
    filtered,
    isSearching,
    isSearchingGlobal: globalQuery.isLoading && isSearching,
  };
};

export const usePokemonList = (searchTerm: string = "") => {
  const listQuery = usePokemonInfiniteList();
  const totalCount = listQuery.data?.pages[0]?.count ?? 0;
  const allLoaded = listQuery.data?.pages.flatMap((page) => page.results) ?? [];

  const { filtered, isSearching, isSearchingGlobal } = usePokemonSearch(
    searchTerm,
    totalCount,
  );

  return {
    ...listQuery,
    allLoaded,
    filtered: isSearching ? filtered : allLoaded,
    totalCount,
    isSearching,
    isSearchingGlobal,
  };
};

export const usePokemonDetail = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", "detail", name],
    queryFn: () => getPokemonDetailUseCase(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });
};
