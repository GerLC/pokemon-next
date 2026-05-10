import { pokedexService } from "../services/pokedex.service";
import { PokemonListResponseSchema } from "../types/pokedex.schema";

export const getPokemonListUseCase = async (
  offset?: number,
  limit?: number,
) => {
  const data = await pokedexService.getList(offset, limit);
  const validated = PokemonListResponseSchema.parse(data);

  return {
    ...validated,
    results: validated.results.map((pokemon) => {
      const id = pokemon.url.split("/").filter(Boolean).pop() || "";
      return {
        ...pokemon,
        id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    }),
  };
};
