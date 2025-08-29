# Pokédex App

A modern React application that consumes the PokéAPI to display Pokémon information with a beautiful, responsive interface.

## Features

### 🏠 Landing Page

- Attractive landing page with animations
- "START" button to navigate to the Pokémon grid

### 🎯 PokeGrid

- Responsive 3-column grid layout
- Pokémon cards showing name and sprite
- Click on cards to view detailed information
- Loading spinner during data fetching
- Search functionality by Pokémon name
- Add/remove Pokémon from favorites
- Filter to show only favorite Pokémon
- Pagination (30 Pokémon per page)
- Unit tests for component functionality

### 📋 Pokedex

- Detailed Pokémon information display
- Number, name, types, description, image
- Weight and height information
- Back button to return to grid
- Favorite toggle functionality

## Technologies Used

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **PokéAPI** - Pokémon data source
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **Testing Library** - Component testing utilities
- **CSS3** - Modern styling with responsive design

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Loader.jsx      # Loading spinner
│   ├── PokemonCard.jsx # Individual Pokémon card
│   ├── SearchBar.jsx   # Search input component
│   └── Pagination.jsx  # Page navigation
├── pages/              # Main application pages
│   ├── Landing.jsx     # Welcome page
│   ├── PokeGrid.jsx    # Pokémon grid view
│   └── Pokedex.jsx     # Detailed Pokémon view
├── hooks/              # Custom React hooks
│   ├── usePokemon.js   # Pokémon data management
│   └── useFavorites.js # Favorites management
├── services/           # API service functions
│   └── pokemonApi.js   # PokéAPI integration
├── test/               # Test files
│   ├── setup.js        # Test configuration
│   └── PokeGrid.test.jsx # Component tests
└── utils/              # Utility functions
```

## Assets

### Logo Customization

- Place your `pokedex.png` image in the `public/` folder
- The logo will automatically replace the default Pokédex logo in the header
- **Recommended size**: 300px width × 80px height maximum
- **Format**: PNG with transparency support
- **Fallback**: If no logo is found, a beautiful animated CSS logo will be displayed

### Logo Examples

If you don't have a custom logo, you can:

1. Download from Google Images: "Pokédex logo PNG transparent"
2. Use the default animated CSS logo (automatically displayed)
3. Create your own using design tools

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. **Add your logo** (optional):
   ```bash
   # Place your pokedex.png in the public folder
   cp /path/to/your/logo.png ./public/pokedex.png
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Logo Testing

- With logo: The custom image will be displayed
- Without logo: An animated CSS Pokédex logo will appear
- Logo not found: Graceful fallback to text header

### Testing

Run the test suite:

```bash
npm run test
```

### Build

Build for production:

```bash
npm run build
```

## API Integration

The application integrates with the [PokéAPI](https://pokeapi.co/) to fetch:

- Pokémon list with pagination
- Detailed Pokémon information
- Pokémon species data for descriptions
- Official artwork images

## Features Overview

### Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions

### State Management

- Custom hooks for data fetching
- Local storage for favorites persistence
- Efficient re-rendering with React hooks

### User Experience

- Smooth animations and transitions
- Loading states for better feedback
- Intuitive navigation flow
- Search and filter capabilities

### Code Quality

- Clean, readable code structure
- Modular component architecture
- Comprehensive unit tests
- English variable names and comments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
