import { THEME_OPTIONS } from "../../constants";
import { themeDark } from "./themeDark";
import { themeLight } from "./themeLight";

export const getDesignTokens = (mode: THEME_OPTIONS) => {
	const tokens = {
		palette: {
			mode,
		},
	};

	switch (mode) {
		case THEME_OPTIONS.LIGHT:
			tokens.palette = {
				...tokens.palette,
				...themeLight,
			};
			break;
		case THEME_OPTIONS.DARK:
			tokens.palette = {
				...tokens.palette,
				...themeDark,
			};
			break;
		default:
			tokens.palette = {
				...tokens.palette,
				...themeLight,
			};
	}

	return tokens;
};
