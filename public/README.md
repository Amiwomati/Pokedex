# Public Assets Folder

This folder contains static assets that will be served directly by the application.

## Required Files

### pokedex.png

- **Location**: `public/pokedex.png`
- **Purpose**: Logo displayed in the PokeGrid header
- **Recommended specs**:
  - Format: PNG (with transparency support)
  - Max width: 300px
  - Max height: 80px
  - Aspect ratio: Maintain original proportions

## How to Add Your Logo

1. Place your `pokedex.png` file in this folder
2. The application will automatically detect and use it
3. If no logo is found, it will display "Pokémon Grid" text instead

## Example Logo URLs (if you don't have one)

You can download a Pokédex logo from:

- Google Images search for "Pokédex logo PNG"
- The Pokémon Company website
- Fan-made Pokédex logos from various artists

## File Structure

```
public/
├── pokedex.png    # Your custom logo (optional)
└── README.md      # This file
```
