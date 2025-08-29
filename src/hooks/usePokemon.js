import { useState, useEffect } from "react";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "../services/pokemonApi";

export const usePokemonList = (offset = 0, limit = 30) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList(offset, limit);
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const id = pokemon.url.split("/").slice(-2, -1)[0];
            const details = await fetchPokemonDetails(id);
            return {
              id: parseInt(id),
              name: pokemon.name,
              sprite: details.sprites.front_default,
              types: details.types.map((type) => type.type.name),
            };
          })
        );
        setPokemonList(detailedPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [offset, limit]);

  return { pokemonList, loading, error };
};

export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const [details, species] = await Promise.all([
          fetchPokemonDetails(id),
          fetchPokemonSpecies(id),
        ]);

        const description =
          species.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            ?.flavor_text.replace(/\f/g, " ") || "No description available";

        setPokemon({
          id: details.id,
          name: details.name,
          types: details.types.map((type) => type.type.name),
          description,
          image:
            details.sprites.other["official-artwork"].front_default ||
            details.sprites.front_default,
          weight: details.weight / 10,
          height: details.height / 10,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPokemon();
  }, [id]);

  return { pokemon, loading, error };
};

export const useFavoritePokemon = (favoriteIds) => {
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavoritePokemon = async () => {
      if (!favoriteIds || favoriteIds.length === 0) {
        setFavoritePokemon([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const detailedFavorites = await Promise.all(
          favoriteIds.map(async (id) => {
            const details = await fetchPokemonDetails(id);
            return {
              id: details.id,
              name: details.name,
              sprite: details.sprites.front_default,
              types: details.types.map((type) => type.type.name),
            };
          })
        );

        setFavoritePokemon(detailedFavorites);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritePokemon();
  }, [favoriteIds]);

  return { favoritePokemon, loading, error };
};
