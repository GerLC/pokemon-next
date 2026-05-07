import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemonDetailUseCase } from "../use-cases/get-pokemon-detail.use-case";
import { getPokemonListUseCase } from "../use-cases/get-pokemon-list.use-case";

export const usePokemonList = (searchTerm: string = "") => {
  const listQuery = useInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ pageParam = 0 }) => getPokemonListUseCase(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length * 20;
    },
    initialPageParam: 0,
  });

  const totalCount = listQuery.data?.pages[0]?.count ?? 0;
  const allLoaded = listQuery.data?.pages.flatMap((page) => page.results) ?? [];

  const globalQuery = useQuery({
    queryKey: ["pokemon", "global", totalCount],
    queryFn: () => getPokemonListUseCase(0, totalCount),
    staleTime: 1000 * 60 * 60,
    enabled: totalCount > 0,
  });

  const isSearching = searchTerm.length > 0;
  const globalData = globalQuery.data?.results ?? [];

  const filtered = isSearching
    ? globalData.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allLoaded;

  return {
    ...listQuery,
    allLoaded,
    filtered,
    totalCount,
    isSearching,
    isSearchingGlobal: globalQuery.isLoading && isSearching,
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
