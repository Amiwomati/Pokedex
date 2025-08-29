import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(true);
    // Pequeño delay para mostrar el efecto antes de navegar
    setTimeout(() => {
      navigate(`/pokemon/${pokemon.id}`);
    }, 150);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  return (
    <div
      className={`pokemon-card ${isClicked ? "clicked" : ""} ${
        isFavorite(pokemon.id) ? "favorite" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="pokemon-image">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <div className="pokemon-shine"></div>
      </div>
      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
      <button
        className={`favorite-btn ${isFavorite(pokemon.id) ? "active" : ""}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite(pokemon.id) ? "★" : "☆"}
      </button>
      <div className="pokemon-glow"></div>
    </div>
  );
};

export default PokemonCard;
