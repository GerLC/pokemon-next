import { z } from "zod";

export const PokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const PokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonListItemSchema),
});

export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>;
