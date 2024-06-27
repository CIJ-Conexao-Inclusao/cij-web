import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";
import { getDesignTokens } from "../configs/theme/themeConfig";
import { THEME_OPTIONS } from "../constants";

interface ISwitchThemeContextData {
	themeMode: THEME_OPTIONS;
	switchTheme: (theme: THEME_OPTIONS) => void;
}

const SwitchThemeContext = createContext<ISwitchThemeContextData>(
	{} as ISwitchThemeContextData
);

interface ISwitchThemeProviderProps {
	children: React.ReactNode;
}

const SwitchThemeProvider: React.FC<ISwitchThemeProviderProps> = ({
	children,
}) => {
	const [mode, setMode] = useState<THEME_OPTIONS>(THEME_OPTIONS.LIGHT);

	const switchTheme = (theme: THEME_OPTIONS) => {
		setMode(theme);
	};

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<SwitchThemeContext.Provider value={{ switchTheme, themeMode: mode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</SwitchThemeContext.Provider>
	);
};

const useSwitchTheme = () => {
	const context = useContext(SwitchThemeContext);

	if (!context) {
		throw new Error(
			"useSwitchTheme deve ser usado dentro de um ThemeProvider"
		);
	}

	return context;
};

export { SwitchThemeProvider, useSwitchTheme };
