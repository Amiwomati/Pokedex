import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemon";
import { useFavorites } from "../hooks/useFavorites";
import Loader from "../components/Loader";
import "./Pokedex.css";

const Pokedex = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetails(id);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleBack = () => {
    navigate("/grid");
  };

  const handleFavorite = () => {
    if (pokemon) {
      toggleFavorite(pokemon.id);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!pokemon) return <div className="error">Pokémon not found</div>;

  return (
    <div className="pokedex page-transition">
      <div className="pokedex-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Grid
        </button>
      </div>

      <div
        className={`pokedex-card ${isFavorite(pokemon.id) ? "favorite" : ""}`}
      >
        <div className="pokedex-registration">
          Pokédex registration completed.
        </div>

        <div className="pokedex-main-content">
          <div className="pokemon-image-container">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-sprite"
            />
          </div>

          <div className="pokemon-data">
            <div className="pokemon-basic-info">
              <div className="pokemon-number">
                #{String(pokemon.id).padStart(3, "0")}
              </div>
              <div className="pokemon-name">{pokemon.name.toUpperCase()}</div>
              <div className="pokemon-species">Shadow Pokémon</div>
            </div>

            <div className="pokemon-details-grid">
              <div className="pokemon-types-section">
                {pokemon.types.map((type) => (
                  <span key={type} className={`type-badge ${type}`}>
                    {type}
                  </span>
                ))}
              </div>

              <div className="pokemon-stats-section">
                <div className="stat-item">
                  <span className="stat-abbrev">HT</span>
                  <span className="stat-value">{pokemon.height} m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-abbrev">WT</span>
                  <span className="stat-value">{pokemon.weight} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pokemon-description-box">
          <p>{pokemon.description}</p>
        </div>

        <button
          className={`favorite-btn-card ${
            isFavorite(pokemon.id) ? "active" : ""
          }`}
          onClick={handleFavorite}
        >
          {isFavorite(pokemon.id) ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
