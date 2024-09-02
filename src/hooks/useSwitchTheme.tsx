import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";
import { IPaletteOptions } from "../configs/theme/theme.interface";
import { themeDark } from "../configs/theme/themeDark";
import { themeLight } from "../configs/theme/themeLight";
import { THEME_OPTIONS } from "../constants";

interface ISwitchThemeContextData {
  themeMode: THEME_OPTIONS;
  switchTheme: (theme: THEME_OPTIONS) => void;
  changeThemeColors: (
    themeToChange: THEME_OPTIONS,
    newColors: NewColor[]
  ) => void;
}

const SwitchThemeContext = createContext<ISwitchThemeContextData>(
  {} as ISwitchThemeContextData
);

interface ISwitchThemeProviderProps {
  children: React.ReactNode;
}

export interface NewColor {
  key: string;
  hex: string;
}

const SwitchThemeProvider: React.FC<ISwitchThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<THEME_OPTIONS>(THEME_OPTIONS.LIGHT);
  const [themeLightColors, setThemeLightColors] = useState(themeLight);
  const [themeDarkColors, setThemeDarkColors] = useState(themeDark);

  const switchTheme = (theme: THEME_OPTIONS) => {
    setMode(theme);
  };

  const changeThemeColors = (
    themeToChange: THEME_OPTIONS,
    newColors: NewColor[]
  ) => {
    const colorsAux = { ...getThemeConfig(themeToChange) };

    for (let color of newColors) {
      if (colorsAux[color.key]) colorsAux[color.key].main = color.hex;
    }

    setThemeConfig(themeToChange, colorsAux);
  };

  const getThemeConfig = (themeOption: THEME_OPTIONS) => {
    switch (themeOption) {
      case THEME_OPTIONS.LIGHT:
        return themeLight;
      case THEME_OPTIONS.DARK:
        return themeDark;
      default:
        return themeLight;
    }
  };

  const setThemeConfig = (
    themeOption: THEME_OPTIONS,
    newColors: IPaletteOptions
  ) => {
    switch (themeOption) {
      case THEME_OPTIONS.LIGHT:
        setThemeLightColors(newColors);
        break;
      case THEME_OPTIONS.DARK:
        setThemeDarkColors(newColors);
        break;
      default:
        setThemeLightColors(newColors);
        break;
    }
  };

  const getDesignTokens = (
    mode: THEME_OPTIONS,
    themeColors: IPaletteOptions
  ) => {
    const tokens = {
      palette: {
        mode: mode,
      },
    };

    tokens.palette = {
      ...tokens.palette,
      ...themeColors,
    };

    return tokens;
  };

  const theme = useMemo(
    () =>
      createTheme(
        getDesignTokens(
          mode,
          THEME_OPTIONS.LIGHT ? themeLightColors : themeDarkColors
        )
      ),
    [mode, themeLightColors, themeDarkColors]
  );

  return (
    <SwitchThemeContext.Provider
      value={{ switchTheme, themeMode: mode, changeThemeColors }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SwitchThemeContext.Provider>
  );
};

const useSwitchTheme = () => {
  const context = useContext(SwitchThemeContext);

  if (!context) {
    throw new Error("useSwitchTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
};

export { SwitchThemeProvider, useSwitchTheme };
