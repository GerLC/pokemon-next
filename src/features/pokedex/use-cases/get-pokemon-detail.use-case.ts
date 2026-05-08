import { PokemonDetailSchema } from "../types/pokemon.schema";
import { pokemonService } from "../services/pokemon.service";

export const getPokemonDetailUseCase = async (name: string) => {
  const data = await pokemonService.getDetail(name);
  const validated = PokemonDetailSchema.parse(data);

  return {
    ...validated,
    displayHeight: (validated.height / 10).toFixed(1),
    displayWeight: (validated.weight / 10).toFixed(1),
    artwork:
      validated.sprites.other?.["official-artwork"].front_default ??
      validated.sprites.front_default ??
      "",
    formattedId: `#${String(validated.id).padStart(3, "0")}`,
  };
};
