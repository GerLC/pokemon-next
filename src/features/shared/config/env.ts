import { envSchema } from "../schemas/env.schema";
import { z } from "zod";

const _env = envSchema.safeParse({
  NEXT_PUBLIC_POKEMON_API_BASE_URL: process.env.NEXT_PUBLIC_POKEMON_API_BASE_URL,
});

if (!_env.success) {
    console.error("Environment validation failed:", z.treeifyError(_env.error));
    throw new Error("Fix your .env file before continuing.");
}

export const env = _env.data;