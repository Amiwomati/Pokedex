const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset = 0, limit = 30) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch pokemon list");
  return response.json();
};

export const fetchPokemonDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error("Failed to fetch pokemon details");
  return response.json();
};

export const fetchPokemonSpecies = async (id) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!response.ok) throw new Error("Failed to fetch pokemon species");
  return response.json();
};
