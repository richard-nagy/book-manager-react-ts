import { createContext } from "react";

type AppContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);
