import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("pokemon-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pokemon-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemonId) => {
    setFavorites((prev) => [...prev, pokemonId]);
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prev) => prev.filter((id) => id !== pokemonId));
  };

  const toggleFavorite = (pokemonId) => {
    if (favorites.includes(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  const isFavorite = (pokemonId) => favorites.includes(pokemonId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
