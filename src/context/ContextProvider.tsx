import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import { Theme } from "./contextTypes";

type AppContextProviderInterface = {
    children: ReactNode;
};
export const AppContextProvider = (props: AppContextProviderInterface) => {
    const { children } = props;

    const [theme, setTheme] = useState<Theme>(Theme.Dark);

    const toggleTheme = () =>
        setTheme((t) =>
            t === Theme.Light ? Theme.Dark : Theme.Light,
        );

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};
