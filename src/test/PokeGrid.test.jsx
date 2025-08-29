import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import PokeGrid from "../pages/PokeGrid";
import { usePokemonList } from "../hooks/usePokemon";
import { useFavorites } from "../hooks/useFavorites";

vi.mock("../hooks/usePokemon");
vi.mock("../hooks/useFavorites");

const mockPokemonList = [
  {
    id: 1,
    name: "bulbasaur",
    sprite: "https://example.com/bulbasaur.png",
    types: ["grass", "poison"],
  },
  {
    id: 2,
    name: "ivysaur",
    sprite: "https://example.com/ivysaur.png",
    types: ["grass", "poison"],
  },
];

const mockUsePokemonList = {
  pokemonList: mockPokemonList,
  loading: false,
  error: null,
};

const mockUseFavorites = {
  favorites: [],
  toggleFavorite: vi.fn(),
  isFavorite: vi.fn().mockReturnValue(false),
};

describe("PokeGrid", () => {
  beforeEach(() => {
    usePokemonList.mockReturnValue(mockUsePokemonList);
    useFavorites.mockReturnValue(mockUseFavorites);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderPokeGrid = () => {
    return render(
      <BrowserRouter>
        <PokeGrid />
      </BrowserRouter>
    );
  };

  test("renders the PokeGrid component correctly", () => {
    renderPokeGrid();

    expect(screen.getByText("Pokémon Grid")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search Pokémon...")
    ).toBeInTheDocument();
    expect(screen.getByText("Show Favorites")).toBeInTheDocument();
  });

  test("displays pokemon cards when data is loaded", () => {
    renderPokeGrid();

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("ivysaur")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  test("filters pokemon based on search query", async () => {
    renderPokeGrid();

    const searchInput = screen.getByPlaceholderText("Search Pokémon...");
    fireEvent.change(searchInput, { target: { value: "bulba" } });

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.queryByText("ivysaur")).not.toBeInTheDocument();
    });
  });

  test("shows loader when loading", () => {
    usePokemonList.mockReturnValue({
      ...mockUsePokemonList,
      loading: true,
    });

    renderPokeGrid();

    expect(document.querySelector(".loader")).toBeInTheDocument();
  });

  test("displays error message when there is an error", () => {
    usePokemonList.mockReturnValue({
      ...mockUsePokemonList,
      error: "Failed to fetch",
    });

    renderPokeGrid();

    expect(
      screen.getByText("Error loading Pokémon: Failed to fetch")
    ).toBeInTheDocument();
  });

  test("toggles favorites filter", () => {
    renderPokeGrid();

    const filterButton = screen.getByText("Show Favorites");
    fireEvent.click(filterButton);

    expect(screen.getByText("Show All")).toBeInTheDocument();
  });

  test("shows pagination when not filtering", () => {
    renderPokeGrid();

    expect(document.querySelector(".pagination")).toBeInTheDocument();
  });

  test("hides pagination when searching", async () => {
    renderPokeGrid();

    const searchInput = screen.getByPlaceholderText("Search Pokémon...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(document.querySelector(".pagination")).not.toBeInTheDocument();
    });
  });
});
