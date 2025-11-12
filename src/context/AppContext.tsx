import { createContext } from "react";
import type { Theme } from "./contextTypes";

type AppContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);
