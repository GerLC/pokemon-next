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
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
