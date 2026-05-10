import { pokemonService } from "../services/pokemon.service";
import { MoveDetailSchema } from "../types";

export const getMoveDetailUseCase = async (name: string) => {
  const data = await pokemonService.getMove(name.replace(" ", "-"));
  const validated = MoveDetailSchema.parse(data);

  const flavorText =
    validated.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") ?? "No description available.";

  return {
    id: validated.id,
    name: validated.name.replace("-", " "),
    accuracy: validated.accuracy ?? "-",
    power: validated.power ?? "-",
    pp: validated.pp,
    priority: validated.priority,
    type: validated.type.name,
    damageClass: validated.damage_class.name,
    description: flavorText,
  };
};
