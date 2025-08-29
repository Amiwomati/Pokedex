import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PokeGrid from "./pages/PokeGrid";
import Pokedex from "./pages/Pokedex";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/grid" element={<PokeGrid />} />
      <Route path="/pokemon/:id" element={<Pokedex />} />
    </Routes>
  );
}

export default App;
