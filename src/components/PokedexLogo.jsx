import "./PokedexLogo.css";

const PokedexLogo = () => {
  return (
    <div className="pokedex-logo-fallback">
      <div className="logo-text">
        <span className="poke">Poké</span>
        <span className="dex">dex</span>
      </div>
      <div className="logo-icon">
        <div className="mini-pokeball">
          <div className="mini-pokeball-top"></div>
          <div className="mini-pokeball-center"></div>
          <div className="mini-pokeball-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default PokedexLogo;
