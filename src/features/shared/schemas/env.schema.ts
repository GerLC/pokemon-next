import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_POKEMON_API_BASE_URL: z
    .url()
    .default("https://pokeapi.co/api/v2"),
});

export type Env = z.infer<typeof envSchema>;
