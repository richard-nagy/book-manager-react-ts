import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";

type ContextProviderInterface = {
    children: ReactNode;
};
export const ContextProvider = (props: ContextProviderInterface) => {
    const { children } = props;

    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () =>
        setTheme((t) => (t === "light" ? "dark" : "light"));

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};
