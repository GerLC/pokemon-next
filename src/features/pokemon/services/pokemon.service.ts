const BASE_URL =
  process.env.NEXT_PUBLIC_POKEMON_API_URL || "https://pokeapi.co/api/v2";

export const pokemonService = {
  async getList(offset = 0, limit = 20) {
    const res = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
    );
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    return await res.json();
  },

  async getDetail(name: string) {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);
    if (!res.ok) throw new Error(`Failed to fetch pokemon: ${name}`);
    return await res.json();
  },
};
