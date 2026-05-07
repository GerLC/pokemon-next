import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getPokemonListUseCase,
  PokemonListHero,
  PokemonListRoot,
} from "@/features/pokemon";

export default async function PokemonListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: () => getPokemonListUseCase(0),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonListHero />
      <PokemonListRoot />
    </HydrationBoundary>
  );
}
