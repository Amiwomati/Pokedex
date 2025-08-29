import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokeGrid from "../pages/PokeGrid";
import { usePokemonList } from "../hooks/usePokemon";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { useFavorites } from "../hooks/useFavorites";

vi.mock("../hooks/usePokemon");
vi.mock("../hooks/usePokemonSearch");
vi.mock("../hooks/useFavorites");
vi.mock("../components/PokemonCard", () => ({
  default: ({ pokemon }) => (
    <div data-testid="pokemon-card">{pokemon.name}</div>
  ),
}));
vi.mock("../components/SearchBar", () => ({
  default: ({ onSearch }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Busca tu Pokémon..."
    />
  ),
}));
vi.mock("../components/Pagination", () => ({
  default: ({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  ),
}));
vi.mock("../components/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

const mockPokemonList = [
  { id: 1, name: "bulbasaur", sprite: "bulbasaur.png", types: ["grass"] },
  { id: 2, name: "ivysaur", sprite: "ivysaur.png", types: ["grass"] },
  { id: 3, name: "venusaur", sprite: "venusaur.png", types: ["grass"] },
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("PokeGrid", () => {
  beforeEach(() => {
    usePokemonList.mockReturnValue({
      pokemonList: mockPokemonList,
      loading: false,
      error: null,
    });

    usePokemonSearch.mockReturnValue({
      searchResults: [],
      loading: false,
      error: null,
    });

    useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });
  });

  it("renders the PokeGrid component correctly", () => {
    renderWithRouter(<PokeGrid />);

    expect(screen.getByText("Pokémon Grid")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByText("Show Favorites")).toBeInTheDocument();
  });

  it("displays pokemon cards when data is loaded", () => {
    renderWithRouter(<PokeGrid />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
    expect(screen.getByText("venusaur")).toBeInTheDocument();
  });

  it("shows loader when loading", () => {
    usePokemonList.mockReturnValue({
      pokemonList: [],
      loading: true,
      error: null,
    });

    renderWithRouter(<PokeGrid />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    usePokemonList.mockReturnValue({
      pokemonList: [],
      loading: false,
      error: "Failed to fetch",
    });

    renderWithRouter(<PokeGrid />);

    expect(
      screen.getByText("Error loading Pokémon: Failed to fetch")
    ).toBeInTheDocument();
  });

  it("filters pokemon based on search query", async () => {
    const searchResults = [
      { id: 1, name: "bulbasaur", sprite: "bulbasaur.png", types: ["grass"] },
    ];

    usePokemonSearch.mockReturnValue({
      searchResults,
      loading: false,
      error: null,
    });

    renderWithRouter(<PokeGrid />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "bulb" } });

    await waitFor(() => {
      expect(usePokemonSearch).toHaveBeenCalledWith("bulb");
    });
  });

  it("toggles favorites filter", () => {
    renderWithRouter(<PokeGrid />);

    const filterButton = screen.getByText("Show Favorites");
    fireEvent.click(filterButton);

    expect(screen.getByText("Show All")).toBeInTheDocument();
  });

  it("shows pagination when not searching or filtering favorites", () => {
    renderWithRouter(<PokeGrid />);

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("hides pagination when searching", () => {
    usePokemonSearch.mockReturnValue({
      searchResults: mockPokemonList,
      loading: false,
      error: null,
    });

    renderWithRouter(<PokeGrid />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("shows no results message when search returns empty", () => {
    usePokemonSearch.mockReturnValue({
      searchResults: [],
      loading: false,
      error: null,
    });

    renderWithRouter(<PokeGrid />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(
      screen.getByText('No Pokémon found matching "nonexistent"')
    ).toBeInTheDocument();
  });
});
