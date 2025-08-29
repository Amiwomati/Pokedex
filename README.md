# Pokédex App

Una aplicación moderna en React que consume la PokéAPI para mostrar información de Pokémon con una interfaz atractiva y responsiva.

## Características

### 🏠 Página de inicio

- Página de inicio atractiva con animaciones
  
- Botón "START" para navegar al grid de Pokémon
  
### 🎯 PokeGrid

- Grid responsivo con diseño de 3 columnas

- Tarjetas de Pokémon mostrando nombre y sprite

- Clic en las tarjetas para ver información detallada

- Spinner de carga durante la obtención de datos

- Funcionalidad de búsqueda por nombre de Pokémon

- Agregar/eliminar Pokémon de favoritos

- Filtro para mostrar solo los Pokémon favoritos

- Paginación (30 Pokémon por página)

- Pruebas unitarias para la funcionalidad de componentes


### 📋 Pokedex

- Visualización detallada de la información del Pokémon

- Número, nombre, tipos, descripción e imagen

- Información de peso y altura

- Botón de regreso para volver al grid

- Funcionalidad para marcar/desmarcar favoritos

## Tecnologías utilizadas

- **React 18** 
- **React Router** 
- **PokéAPI** 
- **Vite** 
- **Vitest** 
- **Testing Library** 
- **CSS3** 

## Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables de UI
│   ├── Loader.jsx      # Spinner de carga
│   ├── PokemonCard.jsx # Tarjeta individual de Pokémon
│   ├── SearchBar.jsx   # Componente de búsqueda
│   └── Pagination.jsx  # Navegación de páginas
├── pages/              # Páginas principales de la aplicación
│   ├── Landing.jsx     # Página de bienvenida
│   ├── PokeGrid.jsx    # Vista en grid de Pokémon
│   └── Pokedex.jsx     # Vista detallada de Pokémon
├── hooks/              # Hooks personalizados de React
│   ├── usePokemon.js   # Manejo de datos de Pokémon
│   └── useFavorites.js # Manejo de favoritos
├── services/           # Funciones de servicio para API
│   └── pokemonApi.js   # Integración con PokéAPI
├── test/               # Archivos de prueba
│   ├── setup.js        # Configuración de pruebas
│   └── PokeGrid.test.jsx # Pruebas de componentes
└── utils/              # Funciones utilitarias

```


