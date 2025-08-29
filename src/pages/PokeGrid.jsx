import { useState, useMemo } from "react";
import { usePokemonList, useFavoritePokemon } from "../hooks/usePokemon";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { useFavorites } from "../hooks/useFavorites";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import PokedexLogo from "../components/PokedexLogo";
import "./PokeGrid.css";

const ITEMS_PER_PAGE = 30;

const PokeGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const {
    pokemonList,
    loading: listLoading,
    error: listError,
  } = usePokemonList(offset, ITEMS_PER_PAGE);
  const {
    searchResults,
    loading: searchLoading,
    error: searchError,
  } = usePokemonSearch(searchQuery);
  const {
    favoritePokemon,
    loading: favoritesLoading,
    error: favoritesError,
  } = useFavoritePokemon(favorites);

  const loading =
    listLoading || searchLoading || (showFavoritesOnly && favoritesLoading);
  const error = listError || searchError || favoritesError;

  const filteredPokemon = useMemo(() => {
    if (showFavoritesOnly) {
      return favoritePokemon;
    }

    if (searchQuery) {
      return searchResults;
    }

    return pokemonList;
  }, [
    pokemonList,
    searchResults,
    favoritePokemon,
    searchQuery,
    showFavoritesOnly,
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading Pokémon: {error}</p>
      </div>
    );
  }

  return (
    <div className="pokegrid page-transition">
      <div className="pokegrid-header">
        <div className="logo-container">
          <img
            src="/pokedex.png"
            alt="Pokédex Logo"
            className="pokedex-logo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <PokedexLogo />
        </div>
        <div className="controls">
          <SearchBar onSearch={handleSearch} />
          <button
            className={`filter-btn ${showFavoritesOnly ? "active" : ""}`}
            onClick={toggleFavoritesFilter}
          >
            {showFavoritesOnly ? "Show All" : "Show Favorites"}
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="pokemon-grid">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {!showFavoritesOnly && !searchQuery && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(1010 / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          )}

          {searchQuery && filteredPokemon.length === 0 && !loading && (
            <div className="no-results">
              <p>No Pokémon found matching "{searchQuery}"</p>
            </div>
          )}

          {showFavoritesOnly && filteredPokemon.length === 0 && !loading && (
            <div className="no-results">
              <p>No favorite Pokémon yet. Add some to see them here!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokeGrid;
