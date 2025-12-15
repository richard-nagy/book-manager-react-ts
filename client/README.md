## 📖 Book Finder: UI Overview

This is the **Vite, React, and TypeScript** part of the project named `book-finder`. It is designed to be a client for the **Google Books API**, allowing users to search for books and view detailed information about specific volumes.

---

## ✨ Features

- **Book Search:** Search for books using the Google Books API.
- **Detailed View:** Open a book from the results list to view its **details**.
- **URL-Driven Navigation:** Search queries and book details are reflected in the **URL** using **React Router DOM**.
- **Optimized Data Fetching:** Results are **stashed** to prevent unnecessary refetching when navigating back and forth between search pages and results.
- **Robust Error Handling:** The application automatically attempts to refetch data up to **3 times** before displaying a toast error message upon failure.
- **Theming:** Includes **light and dark modes**.
- **Responsive Design:** Offers a dedicated **mobile view**.
- **Styling:** Uses **Tailwind CSS** and **shadcn/ui** components for a clean, modern look.

---

## 🛠️ Tech Stack & Development

The project is built on **Vite** with **React** and **TypeScript**.

### Key Dependencies

- **UI/Styling:** `tailwind-css`, `shadcn/ui` (using **Radix UI** components).
- **Routing:** `react-router-dom`.
- **Utilities:** `lodash`, `slugify`, `clsx`.
- **State/UX:** `sonner` (for toasts), `next-themes`.

### Available Scripts

To get started, clone the repository and run:

`bash`
pnpm install

### Available Scripts

The following scripts are available for development and building:

- **Development:** `pnpm dev` (Starts the development server)
- **Build:** `pnpm build` (Compiles TypeScript and builds the project for production)
- **Linting:** `pnpm lint` (Runs **ESLint** for code quality checks)
- **Preview:** `pnpm preview` (Serves the production build locally)

**ESLint** and **Prettier** are configured to ensure a consistent and high-quality coding experience.

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
