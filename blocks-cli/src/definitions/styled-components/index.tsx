export * from "./dark";
export * from "./light";

import React, {useState} from "react";
import {ThemeProvider} from "styled-components";

import {dark} from "./dark";
import {light} from "./light";
import {themeAtom} from "@atoms";
import {useAtom} from "jotai";
import {storage} from "@utils";

export const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => undefined,
});

export const useTheme = () => {
    const {theme, toggleTheme} = React.useContext(ThemeContext);

    return {theme: theme === "light" ? light : dark, toggleTheme: toggleTheme, themeName: theme};
};

export const StyledThemeProvider: React.FC = ({children}) => {
    const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };
    const values = React.useMemo(
        () => ({
            theme,
            toggleTheme,
        }),
        [toggleTheme, theme]
    );


    return (
        // @ts-ignore
        <ThemeContext.Provider value={values}>
            <ThemeProvider theme={theme === "light" ? light : dark}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
