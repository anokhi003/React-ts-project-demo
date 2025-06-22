# Frontend

A modern React + Vite dashboard application using Tailwind CSS, Redux, React Query, and Radix UI.

## Features

- ⚡️ Vite for fast development and builds
- 🧩 Modular component structure
- 🎨 Tailwind CSS for styling
- 🗂️ Redux Toolkit for state management (with persistence)
- 🔄 React Query for data fetching and caching
- 🧑‍💻 TypeScript support
- 🧰 Radix UI primitives and shadcn/ui components
- 🍞 Toast notifications with Sonner
- 🧑‍🔒 Authentication-ready structure

## Project Structure

```
.
├── src/
│   ├── assets/           # Images and SVGs
│   ├── axios/            # Axios interceptors and API hooks
│   ├── components/       # UI and feature components
│   ├── hooks/            # Custom React hooks
│   ├── layout/           # Layout components (Default, Modal, Drawer, etc.)
│   ├── lib/              # Utilities and helpers
│   ├── pages/            # Route-based pages
│   ├── redux/            # Redux store, slices, and persist config
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── route.jsx         # Route definitions
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json / jsconfig.json
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```sh
npm install
# or
yarn install
```

### Development

```sh
npm run dev
# or
yarn dev
```

### Build

```sh
npm run build
# or
yarn build
```

### Preview

```sh
npm run preview
# or
yarn preview
```

## Customization

- **Theme**: Edit `tailwind.config.js` and `src/index.css` for color and theme customization.
- **Routes**: Update [`src/route.jsx`](src/route.jsx) for navigation and page structure.
- **State**: Redux slices are in [`src/redux/`](src/redux/).
- **API**: Axios and API hooks are in [`src/axios/`](src/axios/).

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Lint code

## License

MIT

---