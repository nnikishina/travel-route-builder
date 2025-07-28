# Travel Route Builder

An interactive web application for building and visualizing travel routes between countries using React, TypeScript and ReactFlow.

## Features

- **Country Search**: Real-time search for countries with autocomplete functionality
- **Visual Route Planning**: Interactive canvas for adding and connecting countries
- **Country Information**: Display countries with their flags and names
- **Debounced Search**: Optimized API calls with 600ms debounce for better performance
- **TypeScript Support**: Full type safety throughout the application

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **ReactFlow** - Interactive node-based editor for route visualization
- **React Select** - Advanced select component with async search
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Fast build tool and development server
- **@yusifaliyevpro/countries** - Country data API for search functionality (uses [REST Countries API](https://restcountries.com/))

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd travel-route-builder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Search for Countries**: Use the search bar to find countries by name
2. **Add Countries**: Select a country from the dropdown and click "Add country"
3. **Organize Route**: Drag countries around the canvas to arrange your travel route
4. **Connect Countries**: Draw connections between countries to create your route
5. **Zoom and Pan**: Use mouse controls or the built-in controls to navigate the canvas

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── CountrySelector.tsx
├── hooks/              # Custom React hooks
│   └── useDebounce.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
