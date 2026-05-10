import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { getPokemonDetailUseCase, PokemonDetailRoot } from "@/features/pokemon";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonDetailUseCase(name).catch(() => null);

  return pokemon
    ? {
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`,
        description: `Learn about ${pokemon.name} — a ${pokemon.types.map((t) => t.type.name).join(" / ")} type Pokémon!`,
      }
    : { title: "Pokémon Not Found" };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pokemon", "detail", name],
    queryFn: () => getPokemonDetailUseCase(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailRoot name={name} />
    </HydrationBoundary>
  );
}
