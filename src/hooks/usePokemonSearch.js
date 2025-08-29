import { useState, useEffect } from "react";
import { fetchPokemonList } from "../services/pokemonApi";

export const usePokemonSearch = (query, limit = 100) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchPokemon = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const allPokemon = [];
        let offset = 0;
        const batchSize = 100;

        while (allPokemon.length < limit) {
          const data = await fetchPokemonList(offset, batchSize);
          const matchingPokemon = data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          );

          const detailedMatching = await Promise.all(
            matchingPokemon.map(async (pokemon) => {
              const id = pokemon.url.split("/").slice(-2, -1)[0];
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}`
              );
              const details = await response.json();
              return {
                id: parseInt(id),
                name: pokemon.name,
                sprite: details.sprites.front_default,
                types: details.types.map((type) => type.type.name),
              };
            })
          );

          allPokemon.push(...detailedMatching);

          if (data.results.length < batchSize) break;
          offset += batchSize;

          if (allPokemon.length >= limit) break;
        }

        setSearchResults(allPokemon.slice(0, limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPokemon, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, limit]);

  return { searchResults, loading, error };
};
