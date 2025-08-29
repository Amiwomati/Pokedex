import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/grid");
  };

  return (
    <div className="landing page-transition">
      <div className="landing-content">
        <div className="landing-header">
          <h1 className="landing-title">Pokédex</h1>
          <p className="landing-subtitle">Discover the world of Pokémon</p>
        </div>

        <div className="landing-pokemon">
          <div className="pokemon-illustration">
            <div className="pokeball">
              <div className="pokeball-top"></div>
              <div className="pokeball-center"></div>
              <div className="pokeball-bottom"></div>
            </div>
          </div>
        </div>

        <button className="start-btn" onClick={handleStart}>
          START
        </button>
      </div>
    </div>
  );
};

export default Landing;
