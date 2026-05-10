import { z } from "zod";

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string().nullable(),
    other: z
      .object({
        "official-artwork": z.object({
          front_default: z.string().nullable(),
        }),
      })
      .optional(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
      }),
    }),
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({ name: z.string() }),
    }),
  ),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string() }),
      is_hidden: z.boolean(),
    }),
  ),
  moves: z.array(
    z.object({
      move: z.object({ name: z.string() }),
    }),
  ),
});

export const MoveDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  accuracy: z.number().nullable(),
  power: z.number().nullable(),
  pp: z.number(),
  priority: z.number(),
  type: z.object({ name: z.string() }),
  damage_class: z.object({ name: z.string() }),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({ name: z.string() }),
    }),
  ),
});

export type MoveDetail = z.infer<typeof MoveDetailSchema>;
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
