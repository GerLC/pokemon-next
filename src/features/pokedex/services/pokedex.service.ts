import { env } from "@/config/env";

export const pokedexService = {
  async getList(offset = 0, limit = 20) {
    const res = await fetch(
      `${env.NEXT_PUBLIC_POKEMON_API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
    );
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    return await res.json();
  },
};
