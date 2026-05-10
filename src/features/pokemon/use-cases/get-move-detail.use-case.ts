import { pokemonService } from "../services/pokemon.service";
import { MoveDetailSchema } from "../types";

export const getMoveDetailUseCase = async (name: string) => {
  const data = await pokemonService.getMove(name.replace(" ", "-"));
  const validated = MoveDetailSchema.parse(data);

  const effectEntry = validated.effect_entries.find((e) => e.language.name === "en");
  let description = effectEntry?.short_effect ?? "";

  if (description.includes("$effect_chance") && validated.effect_chance != null) {
    description = description.replace("$effect_chance", String(validated.effect_chance));
  }

  if (!description) {
    description = validated.flavor_text_entries.find((e) => e.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") ?? "No description available.";
  }

  return {
    id: validated.id,
    name: validated.name.replace("-", " "),
    accuracy: validated.accuracy ?? "-",
    power: validated.power ?? "-",
    pp: validated.pp,
    priority: validated.priority,
    type: validated.type.name,
    damageClass: validated.damage_class.name,
    description: description.trim(),
  };
};
