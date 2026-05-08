export const filterPokemonUseCase = <T extends { name: string }>(
  list: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm) return list;
  
  const normalizedSearch = searchTerm.toLowerCase();
  return list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(normalizedSearch)
  );
};
