## 📖 Book Finder: Client Application

The frontend application for Book Finder, built with **Vite**, **React 18**, and **TypeScript**. This client provides a modern, performant interface for searching and discovering books through the Google Books API.

---

## 🏗️ Technical Architecture

### Core Technologies

- **Build Tool:** Vite 5.x - Lightning-fast HMR and optimized production builds
- **Framework:** React 18 - Leveraging concurrent features and automatic batching
- **Language:** TypeScript 5.x - Strict type safety with comprehensive type definitions
- **Routing:** React Router DOM v6 - Declarative routing with data loading patterns

### State Management

- **Context API:** Global state management for themes and book data
- **Custom Hooks:** Encapsulated logic for mobile detection and responsive behavior
- **URL State:** Search queries and filters persisted in URL parameters for shareability

### Styling & UI

- **Tailwind CSS:** Utility-first CSS framework with custom configuration
- **shadcn/ui:** Accessible, customizable component library built on Radix UI primitives
- **Component Architecture:**
    - Atomic design principles (atoms, molecules, organisms)
    - Compound components for complex UI patterns
    - Headless UI components for maximum flexibility

### Performance Optimizations

- **Data Caching:** In-memory cache prevents redundant API calls during navigation
- **Code Splitting:** Route-based lazy loading reduces initial bundle size
- **Image Optimization:** Lazy loading for book covers with fallback states
- **Debounced Search:** Reduces API calls during user input with lodash debounce

### API Integration

- **Service Layer:** Abstracted Google Books API client with retry logic
- **Error Handling:** Exponential backoff with 3 retry attempts before user notification
- **Type Safety:** Full TypeScript definitions for API responses and entities

---

## � Dependencies

### Production

- `react` & `react-dom` - Core React libraries
- `react-router-dom` - Client-side routing
- `@radix-ui/*` - Headless UI primitives (Dialog, Dropdown, Scroll Area, etc.)
- `next-themes` - Theme management with system preference detection
- `sonner` - Toast notification system
- `clsx` & `tailwind-merge` - Conditional className utilities
- `lodash` - Utility functions (debounce, throttle)
- `slugify` - URL-friendly string generation

### Development

- `vite` - Build tool and dev server
- `typescript` - Type checking and compilation
- `eslint` - Linting with React and TypeScript plugins
- `@vitejs/plugin-react` - Vite plugin for React Fast Refresh
- `tailwindcss` - Styling framework
- `postcss` & `autoprefixer` - CSS processing

---


### Required Variables

Create a `.env` file in the client root directory:

```ini
# Google Books API Key (required)
VITE_GOOGLE_BOOK_API_KEY="YOUR_API_KEY_HERE"

# Backend API URL (for rating features, coming soon)
VITE_API_URL="http://localhost:3000"
````

### Getting an API Key

1. Visit the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Books API**
4. Navigate to **Credentials** and create an API key
5. (Optional) Restrict the key to Books API and your domain

**Note:** Vite requires client-side environment variables to be prefixed with `VITE_` for security.

---

## 🚀 Building for Production

```bash
# Build the application
pnpm build

# The output will be in the dist/ directory
# Optimized, minified, and ready for deployment
```

<!-- ### Build Optimizations

- **Tree Shaking:** Removes unused code
- **Code Splitting:** Dynamic imports for routes
- **Minification:** Terser for JavaScript, cssnano for CSS
- **Asset Optimization:** Images and fonts optimized for web

### Deployment

The `dist/` folder can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

--- -->

## 🔮 Upcoming Features

### Rating System Integration

The client is being prepared to integrate with the backend rating API:

- **UI Components:** Star/recommendation buttons on book detail pages
- **State Management:** Local state for optimistic updates
- **API Client:** Service methods for submitting and fetching ratings

---

## 🔧 Development Workflow

### Available Scripts

```bash
# Start development server (http://localhost:5173)
pnpm dev

# Type-check and build for production
pnpm build

# Preview production build locally
pnpm preview

# Run ESLint with auto-fix
pnpm lint
````

### Code Quality Tools

- **TypeScript:** Strict mode enabled with comprehensive type checking
- **ESLint:** Custom configuration with React Hooks and a11y rules
- **Prettier:** Code formatting (if configured)
- **Vite:** Fast HMR with module graph optimization

### Development Best Practices

1. **Type Safety:** All components use TypeScript with proper prop types
2. **Component Patterns:** Functional components with hooks
3. **Error Boundaries:** Graceful error handling at route level
4. **Accessibility:** ARIA attributes and keyboard navigation support
5. **Mobile First:** Responsive design starting from mobile breakpoints

---

## 🔑 Environment Variables (API Key)

This project requires a **Google Books API Key** to fetch data.

1.  **Get a Key:** Obtain an API key from the **Google Cloud Console**.
2.  **Create `.env` File:** Create a file named `.env` in the root directory of the project.
3.  **Set Variable:** Add your key to the file using the following format:

    ```ini
    VITE_GOOGLE_BOOK_API_KEY="YOUR_ACTUAL_API_KEY_HERE"
    ```

    _Note: **Vite** requires environment variables exposed to the client to be prefixed with `VITE_`.\_
